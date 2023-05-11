const mongoose = require('mongoose');
const { date } = require('yup/lib/locale');
const reservationSchema = new mongoose.Schema({

    name: {
        type: String,
       // required : true
    },

    user:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
      ],
    
    event:
        [{_id : {type: mongoose.Schema.Types.ObjectId, ref: 'event',
         required: true},
         plc:{
            type: Number,
            required: false},
         participants:[{nom : {type : String},prenom : {type : String},sexe:{trype:String},birthdate:{type:String}}]
        }]
    ,
    /*nombre_de_place: {type: Number,
                      required: true
    },*/
    prix_total: {
        type: Number,
        required: false
    },
    reservationDate: {
        type: Date,
        default: Date.now()
    },
    payementId:{
        type: String,
    }
});


const reservation = mongoose.model('reservation', reservationSchema);
module.exports = reservation;