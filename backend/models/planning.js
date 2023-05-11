const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    events : [{type: mongoose.Schema.Types.ObjectId, ref: 'event'}],
    price : {
        type: Number,
    }
})

const Planning = mongoose.model('planning', planningSchema);
module.exports = Planning;