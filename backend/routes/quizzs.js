const express = require('express');
const router = express.Router();
const quizz = require('../models/quizz');
const user = require('../models/user')
const mongoDB = require('mongodb')

const userController = require('../controller/userController')

//create a quiz
router.post('/createQuiz', async(req,res)=> {
    

    const Quizz = new quizz(req.body)
      /*  name : req.body.name,
        //user : userController.allowIfLoggedin().id,
        categorie : req.body.categorie
    })
    for (var i = 0; i < req.body.questions.length; i++) {
        scoreMax = 0;
        //Quizz.questions.push(req.body.questions[i]);
        const question = new quizz.Questions({
            question : req.body.questions[i].question
        })
        var max = req.body.questions[i].options[0].optionScore
        for (var j = 0; j<req.body.questions[i].options.length; j++){
            var option = new quizz.options({
                option : req.body.questions[i].options[j].option,
                optionImage : req.body.questions[i].options[j].optionImage,
                optionScore : req.body.questions[i].options[j].optionScore
            })
            if (max < req.body.questions[i].options[j].optionScore){max =req.body.questions[i].options[j].optionScore } 
            question.answers.push(option);
            scoreMax+=max;
        }
        Quizz.questions.push(question);
        Quizz.totalScore.push(scoreMax);*/
    

      
    try{const Q1 = await Quizz.save()
        //const User = await user.findById(userController.allowIfLoggedin().id)
        //await quizz.findByIdAndUpdate(Q1._id,{user : User.id})
        res.status(200).json({Quizz})

    }catch(err){
        res.send('Error' + err)
    }
}
)

router.post('/:id', async (req,res,next) => {
const User = await user.findById(userController.allowIfLoggedin().id);
const passedQuizes = new user.passedQuizes({
    quiz:req.params.id,
})
s=0 
for (var i = 0; i < req.body.questions.answers; i++) {
    s+= req.body.questions.answers.optionScore
}
passedQuizes.score.push(s);
})



router.put('/:id', async (req, res, next) => {
    try {
     const update = req.body
     const quizzId = req.params.id;
     await quizz.findByIdAndUpdate(quizzId, update);
     const q = await quizzId.findById(quizzId)
     res.status(200).json({
      data: q,
      message: 'quiz has been updated'
     });
    } catch (error) {
      res.send('Error' + error)
    }
   })


//delete quizz 
router.delete('/:id', async(req,res)=> {
    try{const q = await quizz.findByIdAndDelete(req.params.id)
        const quizes = await quizz.find()
        res.json(quizes) 

    }catch(err){
        res.send('Error' + err)
    }
})


router.get('/:id', async(req,res)=> {
    try{const q = await quizz.findById(req.params.id)
        res.json(q) 

    }catch(err){
        res.send('Error' + err)
    }  
})


router.get('/', async(req,res)=> {
    try{const q = await quizz.find().populate('categorie')
        res.json(q) 

    }catch(err){
        res.send('Error' + err)
    }  
})



router.put('/:idQuiz/:idUser/:score', async (req,res,next) => {
    try {var i ;
        const User = await user.findById(req.params.idUser).populate('passedQuizes');
        const idTab = User.passedQuizes.map(row=>row.quiz)
        const yes = idTab.some(id=>id.equals(mongoDB.ObjectId(req.params.idQuiz)))
        
        if(yes){
            idTab.some((id,index)=>{if (id.equals(mongoDB.ObjectId(req.params.idQuiz))){i=index};})
            User.passedQuizes[i].score=req.params.score
            const u = await user.findByIdAndUpdate(User.id, User)
            res.status(200).send({u})
        }
        else{
            const passedQuizes = {
                quiz:req.params.idQuiz,
                score:req.params.score,
                categorie:req.body.categorie
            }
            User.passedQuizes.push(passedQuizes) 
           
            const u = await user.findByIdAndUpdate(User.id, User)
            res.status(200).send({u})
        }
           } catch (error) {
            console.log(error)
           }     
          
    
  
    
    
    })

module.exports=router;