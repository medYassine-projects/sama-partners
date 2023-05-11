const reser = require("../models/reservation");
const Event = require("../models/event") ;
const User = require("../models/user");
const stripe = require('stripe')('sk_test_51Kehe2EBwxdizjs5p1moZLMC7hOSSO8PcxLl9nVW9wcdrAAlPOPIjb8xVayeVe5oD28ZJtrsPw2LPDpTKk3LnxKz002GOBgDE3');
const mongoDB = require('mongodb')
const PayEmail = require('../utils/payEmail')

exports.createReservation = async(req,res)=> {
  try{
  const events=[]
  req.body.events.map((element,index) => {
    const evenement = Event.findById(element.event)
    events.push({_id:element.event,title:element.title,price:element.price,plc:element.plc,participants:element.participants})
  if (evenement.canceled){
    res.json({error : {type : 'eventCanceled', message : 'event canceled'}})
  }  
  if (!evenement){
    res.status(500).json({ error: { type: 'eventNonExistent', message: 'Event no longer exists.' } });}
  else if (evenement.numberOfPlacesLeft<element.plc){
    res.json({error: {type: 'capacityProblem', message:'probléme de capacité'}})}
  else if (evenement.eventDate < new Date()) {
    res.json({ error: { type: 'eventEnded', message: 'Event has already ended.' } });}
  });
  const reservation = new reser({
      user : req.params.userId,
      event :events,
      prix_total : req.body.amount
  })
  const user = await User.findById(req.params.userId);
    
  
  const amount = req.body.amount;
  const token = req.body.token;
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.paymentIntents.create({
        amount: parseFloat(amount) * 100,
        description: `Payment for USD ${amount}`,
        currency: "USD",
        customer: customer.id,
        payment_method: token.card.id,
      });
    })
    .then((charge) => {stripe.paymentIntents.confirm(charge.id).then((c)=> {
      req.body.events.map((element,i)=>{
        Event.findById(element.event).then((evenement)=>{
          
          evenement.numberOfPlacesLeft=evenement.numberOfPlacesLeft-element.plc;
          Event.findByIdAndUpdate(element.event,{numberOfPlacesLeft:evenement.numberOfPlacesLeft}).then((e)=>console.log('event',e))})})
    reservation.save().then( (r1)=>{
    new PayEmail(user,amount).send().then(()=>{
    console.log("created succ")
    res.status(200).json({res:r1,payement:c})
    })
    }
   )
    })})
    .catch((err) => res.send('Error' + err));
  }catch(err){
      res.send('Error ligne catch :' + err)
      console.log(err)
  }
}

exports.getReservations = async (req, res, next) => {
    const reservations = await reser.find({}).populate('event').populate('user');
    res.status(200).json({
     data: reservations
    });
   }


exports.getReservation = async (req, res, next) => {
    try {
     const reservationId = req.params.id;
     const reservation = await reser.findById(reservationId);
     if (!reservation) return next(new Error('User does not exist'));
      res.status(200).json({
      data: reservation
     });
    } catch (error) {
      res.send('Error' + error)
    }
}

/*exports.updateReservation = async (req, res, next) => {
    try {
     const update = req.body
     const reservationId = req.params.id;
     await reser.findByIdAndUpdate(reservationId, update);
     const reservation = await reser.findById(reservationId)
     res.status(200).json({
      data: reservation,
      message: 'res has been updated'
     });
    } catch (error) {
      res.send('Error' + error)
    }
}   */
    

exports.deleteReservation = async (req, res, next) => {
    try {
     const reservationId = req.params.id;
     const reservation =await reser.findById(reservationId)
     const ev = await Event.findById(reservation.event)
     const up = ev;
     up.numberOfPlacesLeft = up.numberOfPlacesLeft + reservation.nombre_de_place
     //console.log(up)
     await Event.updateOne({_id:ev.id},up)
     await reser.findByIdAndDelete(reservationId);
     res.status(200).json({
      data: null,
      message: 'reservation has been deleted'
     });
    } catch (error) {
     next(error)
    }
}   


exports.getConnectedUserReservations = async (req, res, next) =>{
  try {
    const reservations = await reser.find({'user':res.locals.loggedInUser.id})
    res.status(200).json({
      data: reservations,
      message: '  '
     });
  } catch (error) {
    res.status(400).send('Error' + error)
    
  }

 }
exports.getReservationParticipants = async (req,res) => {
  try {
    const reservation = await reser.find().populate('event')
    const users = []
    
    reservation.forEach(element => {
      //console.log('res',element.event._id)
      element.event.forEach(e =>{
        if (e?.participants.length>=1){
          if (e?._id.equals( mongoDB.ObjectId(req.params.eventId))) {
            element.user.forEach(e => {
              users.push(e)
            })
          }
        }
        
      })
      
      ;
      //users.push(element.user)
    });
    const clients = []
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      const client = await User.findById(element)
      clients.push(client)
    }

    res.status(200).json({
     clients
    })
  } catch (error) {
    console.log(error)
    res.status(400).send('Error' + error)
  }
} 


exports.getByUser = async(req,res) => {
    try {
      const reservations = await reser.find({'user': req.params.userId}).populate('event')
      const events = [];
      const ev = []
      for (let index = 0; index < reservations.length; index++) {
        const e = reservations[index];
        events.push(e.event)
      }
      
      for (let index = 0; index < events.length; index++) {
        events[index].forEach(e => {
          ev[index]={title:e.title,start:new Date(e.eventDate),end:new Date(e.endDate)}
        }); 
      }
      res.status(200).json(
        ev
      )
    } catch (error) {
      console.log(error)
      res.status(400).send('Error' + error)
    }
}

exports.checkEventReservations = async (req,res) => {
  try {
    var canDelete = false
    const eventId = req.params.eventId;
    const eventReservations = await reser.find({'event':eventId})
    if (eventReservations.length===0) {
      canDelete=true
    }
    res.status(200).json({eventId:eventId,reservations:eventReservations,canDelete:canDelete})
  } catch (error) {
    res.status(400).send('error',error)
  }
}

exports.numberOfReservationsChart = async (req,res) => {
  try {
    
    const day = new Date()
    const day1 = new Date()
    day.setDate(day.getDate()-6)
    day1.setDate(day.getDate()+1)
    const data=[]
    
    for (let index = 0; index < 7; index++) {
      const reservation = await reser.count({ reservationDate: {$gte:day.toISOString().split('T')[0], $lt:day1.toISOString().split('T')[0]} })
      data.push(reservation)
      day.setDate(day.getDate()+1)
      day1.setDate(day.getDate()+1)
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(400).send('error',error)
  }
}