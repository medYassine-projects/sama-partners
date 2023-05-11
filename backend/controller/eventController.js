const event = require('../models/event')
const yup = require('yup')
const { findOneAndUpdate } = require('../models/event')

let schema = yup.object().shape({
  duration: yup.number().positive().integer().required(),
  price: yup.number().positive().integer().required(),
  capacity: yup.number().positive().integer().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  places: yup.string().required(),
  transport: yup.array().of(yup.string()).required(),
  logement: yup.string().required(),
  categorie: yup.string(),
  organizer: yup.string().required(),
  eventDate: yup.date().required(),
  niveauMin: yup.number().positive().integer().required(),
})

exports.getAll = async (req, res) => {
  try {
    const events = await event.find().populate("chat").populate("organizer").populate("categorie")
    res.json(events)
  } catch (err) {
    res.send('Error' + err)
  }
}

exports.createEvent =  async (req, res) => {
  const valid = await schema.isValid(req.body)
   /* if ( !valid) {
    res.status(400).send({
      message: "Check the fields",
    });
  }else{*/
    /*console.log(req.files)
    const g = []
    req.files.forEach(e => {
      g.push(...g,e.path)
    });
    console.log(g)*/
    const Event = new event({
          title : req.body.title,
          eventDate : req.body.eventDate,
          select : req.body.select,
          duration : req.body.duration,
          places : req.body.places,
          lon:req.body.lon,
          lat:req.body.lat,
          googleMapsUrl:"https://www.google.com/maps/dir//".concat(req.body.lat,',',req.body.lon),
          price : req.body.price,
          capacity : req.body.capacity,
          numberOfPlacesLeft : req.body.capacity,
          organizer : req.body.organizer,
          eventImage: req.file.path,
          //galerie:g,
          categorie: req.body.categorie,
          transport:req.body.transport,
          logement: req.body.logement,
          description : req.body.description,
          niveauMin : req.body.niveauMin,
          point_de_depart: req.body.point_de_depart
      })
      if (req.body.eventDate==!undefined){
        Event.eventDate=new Date(req.body.eventDate)
        //Event.eventDate = req.body.eventDate
        Event.endDate=new Date()
        Event.endDate.setDate(Event.eventDate.getDate() + Event.duration)}
      
        
      try{const e1 = await Event.save()
          res.status(200).json({Event})
  
      }catch(err){
          console.log(err)
          res.send('Error' + err)
      }

    
  
 // }  

 }


//}

exports.updateEvent = async (req, res) => {
  try {
    console.log('req.body:',req.body)
    const {title,description,duration,niveauMin,chat} = req.body
    const g = []
    const up = {
      title,
      description,
      duration,
      niveauMin,
      chat,}
    if(req.files){
      var uniqueArr = [...new Set(req.files)]
      uniqueArr.forEach(e => {
      g.push(e.path)
    });
    up.galerie=g
  }
    const e2 = await event.updateOne({ _id: req.params.id }, up)
    res.json(e2)
  } catch (err) {
    res.send('Error' + err)
  }
}
exports.updateEventWithOutGalerie = async (req, res) => {
  try {
    console.log('req.body:',req.body.niveauMin)
    const {title,description,duration,niveauMin} = req.body
    console.log(title,niveauMin)
    const up = {
      title,
      description,
      duration,
      niveauMin,
      eventImage:req?.file?.path    }
    
    const e2 = await event.updateOne({ _id: req.params.id }, up)
    console.log('res',e2)
    res.status(200).json(e2)
  } catch (err) {
    res.status(400).send('Error' + err)
  }
}

exports.getById = async (req, res) => {
  try {
    const events = await event.findById(req.params.id).populate("chat").populate("organizer")
    res.json(events)
  } catch (err) {
    res.send('Error' + err)
  }
}

exports.deleteById = async (req, res) => {
  try {
    const events = await event.findByIdAndDelete(req.params.id)
    const Events = await event.find()
    res.json(Events)
  } catch (err) {
    res.send('Error' + err)
  }
}

exports.getByCategory = async (req, res, next) => {
  try {
    const events = await event.find({ categorie: req.params.category })
    res.status(200).json({
      data: events,
      message: '  ',
    })
  } catch (error) {
    res.status(400).send('Error' + error)
  }
}

exports.getByOrganizer = async (req, res, next) => {
  try {
    const events = await event.find({ organizer: req.params.organizerId })
   // events[0].eventDate.setDate(events[0].eventDate.getDate() + events[0].duration)

   const ev = []

   for (let index = 0; index < events.length; index++) {
    const e = events[index];
    ev[index]={title:e.title,start:new Date(e.eventDate),end:new Date(e.endDate),_id: e.id,capacity:e.capacity,numberOfPlacesLeft:e.numberOfPlacesLeft,galerie:e.galerie}
  }

    res.status(200).json({
      data: ev,
      message: '  ',
    })
  } catch (error) {
    res.status(400).send('Error' + error)
  }
}

exports.getLastEvents = async (req, res, next) => {
  try {
    const e = await event.find()
    const events = await event.find({ eventDate: {$gte: Date.now()} })
    events.forEach(event => {
      if (event.canceled) {
        const index = events.indexOf(event);
        if (index > -1) { // only splice array when item is found
          events.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    });
    e.forEach(ev=>{
      if (!ev.eventDate && !ev.canceled){
        events.push(ev)
      }
    })
    res.status(200).json({
      data: events,
    })
  } catch (error) {
    console.log(error)
    //res.status(400).send('Error' + error)
  }
}


exports.getLastEventsNumber = async (req, res, next) => {
  try {
    const events = await event.count({ eventDate: {$gte: Date.now()} })
    res.status(200).json({
      data: events,
    })
  } catch (error) {
    console.log(error)
    //res.status(400).send('Error' + error)
  }
}
exports.getAllEventsNumber = async (req,res,next) => {
  try {
    const events = await event.count({})
    res.status(200).json({
      data: events,
    })
  } catch (error) {
    console.log(error)
    //res.status(400).send('Error' + error)
  }
}

exports.cancelEvent = async (req,res,next) => {
  try {
    const update = {canceled:true}
    const ev = await event.findByIdAndUpdate(req.params.id,update)
    res.status(200).json(
      {data:ev}
    )
  } catch (error) {
    console.log(error)
  }
}

exports.activateEvent = async (req,res,next) => {
  try {
    const update = {canceled:false}
    const ev = await event.findByIdAndUpdate(req.params.id,update)
    res.status(200).json(
      {data:ev}
    )
  } catch (error) {
    console.log(error)
  }
}