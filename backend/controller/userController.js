const User = require('../models/user')
const Email = require('../utils/email')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { roles } = require('./roles')
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const mongoDB = require('mongodb')


const yup = require('yup')
const VerifEmail = require('../utils/verifEmail')

let schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required().email(),
  role: yup.string().required(),
  password: yup.string().required().min(8, "Mot de passe doit être plus grand que 8 caractères")
})

async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.register = async (req, res) => {
   const valid = await schema.isValid(req.body)
    if ( !valid) {
    res.status(400).send({
      message: "Check the fields",
    });
  }else{
    //const roles = ["admin","supervisor","basic"]
    //if (roles.includes(req.body.role)){
  try {
    const rol = req.body.role || "basic"
    const { first_name, last_name, email, password } = req.body
    const userImage= req?.file?.path
    const hashedPassword = await hashPassword(password)
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: rol,
      userImage: userImage ,
    })
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )
    newUser.accessToken = accessToken
    const user =await newUser.save()
    const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
    const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
		await new VerifEmail(user.email, url).send();
    res.json({
      data: newUser,
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({message:"something went wrong"})
  }}}
  //else{res.status(500).send('role is indefined')}}
//}
exports.verifyEmail = async (req,res) => {
  console.log('verif:')
  try {
		const user = await User.findOne({_id:req.params.id});
    console.log(user)
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: req.params.id,
			token: req.params.token,
		});
		if (!token){
      return res.status(400).send({ message: "Invalid link" });} 

		await User.updateOne({_id: req.params.id},{verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate({path:'passedQuizes',populate:{path:'quiz'}})
    if (!user) return next(new Error('Email does not exist'))
    const validPassword = await validatePassword(password, user.password)
    if (!validPassword) return next(res.status(500).json({message:'password is incorrect'}))
    if (!user.verified) return next(res.status(500).json({message:'verifiez votre Email svp'}))
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    })
    await User.findByIdAndUpdate(user._id, { accessToken })
    res.status(200).json({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        userImage: user.userImage,
        id: user.id,
        favori:user.favori,
        passedQuizes:user.passedQuizes
      },
      accessToken,
    })
  } catch (error) {
    res.send('Error' + error)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      data: users,
    })
  } catch (err) {
    res.status(500).send('Error', err)
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId).populate('favori').populate({path:'passedQuizes',populate:{path:'quiz'}})
    if (!user) return next(new Error('User does not exist'))
    console.log(user.favori)
    res.status(200).json({
      data: user,
    })
  } catch (error) {
    res.send('Error' + error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body
    const userImage= req?.file?.path
    if (password) {
      const hashedPassword = await hashPassword(password)
      const update = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        userImage: userImage 
      }
      const userId = req.params.id
    await User.findByIdAndUpdate(userId, update)
    const user = await User.findById(userId)
    res.status(200).json({
      data: user,
      message: 'User has been updated',
    })
    }else{
      const update = {
        first_name,
        last_name,
        email,
        //password: hashedPassword,
        userImage: userImage 
      }
      const userId = req.params.id
    await User.findByIdAndUpdate(userId, update)
    const user = await User.findById(userId)
    res.status(200).json({
      data: user,
      message: 'User has been updated',
    })
    }
    
    //const update = req.body
   // update.userImage = req?.file?.path
    //console.log(update)
    
  } catch (error) {
    console.log(error)
   // res.send('Error' + error)
  }
}


exports.addFavori = async (req, res, next) => {
  try {
    const favori= req.body
    const userId = req.params.id
    await User.findByIdAndUpdate(userId, {$set:{favori : favori}})
    const user = await User.findById(userId)
    res.status(200).json({
      data: user,
      message: 'User has been updated',
    })
  } catch (error) {
    console.log(error)
   // res.send('Error' + error)
  }
}

exports.deleteFavori = async (req, res, next) => {
  try {
    const favoriId = req.body.favori
    const userId = req.params.id
    const user = await User.findById(userId)
    user.favori.some((favori,index) => {
      if (favori.equals(mongoDB.ObjectId(favoriId))){
        console.log("in")
        user.favori.splice(index,1)
      }
    })
    console.log('after some',user)
    const deletedUser = await User.findByIdAndUpdate(userId, user)
    res.status(200).json({
      data: deletedUser,
      message: 'user favori has been updated'
    })
  } catch (error) {
    console.log(error)
  }
}


exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
      data: null,
      message: 'User has been deleted',
    })
  } catch (error) {
    next(error)
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    
    const user = res.locals.loggedInUser
    if (!user)
      return res.status(401).json({
        error: 'You need to be logged in to access this route',
      })
    req.user = user

    next()
  } catch (error) {
    return error
  }
}

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource)
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        })
      }
      next()
    } catch (error) {
      
      res.send('Error' + error)
    }
  }
}

function createPasswordResetToken() {
  const restToken = crypto.randomBytes(32).toString('hex')
  //crypted version of restToken
  pwdResetToken = crypto.createHash('sha256').update(restToken).digest('hex')
  passwordResetExpires = new Date('1/1/23')
  return restToken
}

exports.frogotPassword = async (req, res, next) => {
  try {
    //Get user based on posted email

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw 'user does not exist'
    }
    //generate token
    user.passwordResetToken = createPasswordResetToken()
    user.passwordResetExpires = new Date('1/1/23')
    
    // console.log(user.passwordResetToken);
    //console.log(user.passwordResetExpires)
    //ignore schema


    await User.findByIdAndUpdate(user.id, user)
    const up = await User.findById(user.id)

    

    //send it back to email
    /*const restUrl = `${req.protocol}://${req.get(
      'host'
    )}/restPassword/${restToken}`;

    const message = `forgot your password ? submit your new password to :${restUrl}`;*/

    /*  await sendEmail({
      email: user.email,
      subject: 'password reset valid for 10 minutes',
      message,
    });
 */
    const url = `http://localhost:3000/reinisialisation-mot-de-passe/${user.passwordResetToken}`
    await new Email(user,url).sendPasswordReset(url)

    res.status(200).json({
      status: 'success',
      message: 'token sent',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err,
    })
  }
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

exports.resetPassword = async (req, res, next) => {
  try {
    // 1)get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')

    const t = req.params.token

    const user = await User.findOne({
      passwordResetToken: t,
      //passwordResetExpires> Date.now() }
    })
    // 2)if token has not expired && user exist set the new password
    if (!user) {
      throw 'token is invalid or expired ! 400'
    }
    //3 )update changedPasswordAt for the user
    user.password = await hashPassword(req.body.password)
    user.passwordResetToken = null
    user.passwordResetExpires = null
    console.log(user)
    await User.findByIdAndUpdate(user.id, user)
    console.log(user.password)
    res.status(200).json({
      status: 'success',
      message: 'password changed',
    })
    //4) log in the user in ,send jwt
    // createSendToken(user, 200, req, res);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.numberOfUsers = async (req, res, next) => {
  try {
    const users = await User.count({})
    res.status(200).json({
      data: users,
    })
  } catch (err) {
    res.status(500).send('Error', err)
  }
}