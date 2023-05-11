require("dotenv").config();
//const http = require('http');
const mongoose = require('mongoose');
const hostname = '127.0.0.1';
const port = 3030;
const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const bodyparser = require('body-parser')
const path = require('path')


const app = express()

const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json())
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')))

const contactUsRouter = require('./routes/contactUs')
const eventRouter = require('./routes/events')
const userRouter = require('./routes/users')
const User = require("./models/user");
const payRouter = require("./routes/payments");
const quizRouter = require("./routes/quizzs");
const planningRouter = require("./routes/plannings");
const reservationRouter = require("./routes/reservations")
const categoryRouter = require("./routes/categories");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const replyRouter = require("./routes/reply")

//const server = http.createServer((req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World');
//});
//const auth = require("./middleware/auth");

//app.post("/welcome", auth, (req, res) => {
  //res.status(200).send("Welcome 🙌 ");
//});

app.use(async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      console.log('aef'+req.headers["x-access-token"])
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId);
      next(); 
    } else { 
     next(); 
    } 
  } catch (error) {
    res.status(401).json(error)
  }
  
});
app.use(express.static('uploads'))
app.use('/user',userRouter)
app.use('/event', eventRouter)
app.use('/',payRouter)
app.use('/quiz',quizRouter)
app.use('/planning',planningRouter)
app.use('/res',reservationRouter)
app.use('/category', categoryRouter)
app.use('/contactUs',contactUsRouter)
app.use('/api/chat', chatRouter)
app.use('/message',messageRouter)
app.use('/reply',replyRouter)

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



mongoose.connect(process.env.url, {useNewUrlParser: true})
const con = mongoose.connection
 
con.on('open', function(){
  console.log('connected...')
})

const io = socket(server,{
  cors:{origin: "http://localhost:3000"}
})
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("setup", (chat) => {
    socket.join(chat);
    console.log("connected to : ",chat)
    socket.emit("connected");
  });
  socket.on("message sent", (msg) => {
    console.log("message sent: " + msg.data.content)
    socket.in(msg.data.chatId._id).emit("message received",msg)
  });
  socket.on('message deleted',(msg) => {
    console.log('msg', msg.data.del)
    socket.in(msg.data.del.chatId).emit("mess deleted",msg.data.del)
  })
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});