const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    option: {
      type: String,
      required: true
    },
    optionImage: {
        type: String,
        required: false
    },
    optionScore: {
        type:Number,
        required: true
    }
  });
  
  const questionSchema = new mongoose.Schema({
      question: {
          type: String,
          required: true
      },
      answers: [optionSchema],
      })
  
 
  const quizSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true,
          unique: true,
      },
      user:
        {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
      ,
  
      questions: [questionSchema],
      totalScore: {
          type: Number,
          required: false
      },
      categorie:{
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
      }
      });


     /* const quizHistorySchema = new Schema({
        date: {
            type: Date,
            required: true,
            default: new Date()
        },
        user:
          {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        quiz: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
        },
        questions:[],
        Score: {
            type: Number,
            required: false
        }
        });*/


  
 const Quizes = mongoose.model('Quiz', quizSchema);
 const Questions = mongoose.model('Question', questionSchema);
 const options = mongoose.model('Options', optionSchema)
  
  module.exports = Quizes,Questions,options