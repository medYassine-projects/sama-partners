const mongoose = require("mongoose");

const passedQuizesSchema = new mongoose.Schema({
  quiz: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
  score: {type : Number}
})

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: false},
  password: { type: String },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "supervisor", "admin"]},
  token: { type: String },
  userImage:{type: String, required:false},
  passedQuizes:[passedQuizesSchema],
  favori :[{type: mongoose.Schema.Types.ObjectId, ref: 'category'}],
  //reservationEnCours: [{type: mongoose.Schema.Types.ObjectId, ref: 'reservation'}],
  //reservationsHistorique: [{type: mongoose.Schema.Types.ObjectId, ref: 'reservation'}],
  passwordResetToken:{type: String},
  passwordResetExpires: {type: Date},
  verified: { type: Boolean, default: false },
});


const User = mongoose.model("user", userSchema);
const PassedQuizes = mongoose.model('passedQuiz', passedQuizesSchema);
module.exports = User, PassedQuizes
