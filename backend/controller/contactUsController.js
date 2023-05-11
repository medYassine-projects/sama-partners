const nodemailer = require('nodemailer');

require('dotenv').config()


exports.contactUs = async(req,res) => {
  console.log(req.body)
    const contactEmail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.Pass,
        },
    });
    
    contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });
    const name = req.body.first_name;
    const last_name=req.body.last_name;
    const email = req.body.email;
    const message = req.body.message; 
    const sub = req.body.type;
    const doc = req.path.file
    const mail = {
      from: email,
      to: process.env.EMAIL_FROM,
      subject: sub,
      html: `<p>Name: ${name}</p><p>Last name: ${last_name}</p><p>Email: ${email}</p><p>Message: ${message}</p></br>${doc}`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "failed" });
      } else {
        res.json({ status: "sent" });
      }
    });
};

