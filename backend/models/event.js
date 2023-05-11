const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required : false
    },
    eventDate: {
        type: Date,
        required : false
    },
    departHour:{
        type: String,
        required : false
    },
    duration: {
        type: Number,
        required : false
    },
    endDate: {
        type: Date,
        required : false
    },
    places: {
        type: Array,
        required : false
    },
    lon:{
        type: String
    },
    lat:{
        type: String
    },
    googleMapsUrl:{
        type: String
    },
    price: {
        type: Number,
        required: false
    },
    capacity: {
        type: Number,
        required: false
    }, 
    numberOfPlacesLeft: {
        type: Number,
        required: false
    },
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    categorie: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    niveauMin: {
        type: Number,
        required: false
    },
    eventImage:{
        type: String,
        required: false
    },
    transport:{
        type: Array,
        required: false
    },
    logement:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    chat :{type: mongoose.Schema.Types.ObjectId, ref: 'chat'},
    galerie:[{
        type: String,
        required: false
    }],
    select : {
        type: String,
        required:false
    },
    point_de_depart:{
        type : String,
        required: false
    },
    canceled: { type: Boolean, default: false}
    //localisation google maps
})
const Event = mongoose.model('event', eventSchema);
module.exports = Event;