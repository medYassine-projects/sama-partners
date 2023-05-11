const express = require('express');
const router = express.Router();
const planning = require('../models/planning');
const Event = require('../models/event')

router.get('/', async(req,res)=> {
    try{const plannings = await planning.find()
        res.json(plannings) 

    }catch(err){
        res.send('Error' + err)
    }
})



router.post('/createPlanning', async(req,res)=> {
    const Planning = new planning(req.body)
      
    try{const e1 = await Planning.save()
        res.json(e1)

    }catch(err){
        res.send('Error' + err)
    }
})




router.get('/:id', async(req,res)=> {
    try{const Planning = await planning.findById(req.params.id)
        res.json(Planning) 

    }catch(err){
        res.send('Error' + err)
    }
})

router.delete('/:id', async(req,res)=> {
    try{const Planning = await planning.findByIdAndDelete(req.params.id)
        const plannings = await planning.find()
        res.json(plannings) 

    }catch(err){
        res.send('Error' + err)
    }
})

module.exports=router;