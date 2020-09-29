const router = require('express').Router();
const Acitivity = require('../model/Activity')
const verify = require('./verifyToken');

function findProduct(){

}
//Add new activity
router.post('/',verify, async (req,res) => {

    //Check if the activity already exists
    const nameExist = await Acitivity.findOne({name:req.body.name})
    if(nameExist) return res.status(400).send('Activity already exists');
    const activity = new Acitivity(req.body);

    try{
        const savedActivity = await activity.save();
        res.send(savedActivity);
    }catch(err){
        res.status(400).send(err)
    }
})
//Find all acitivities
router.get('/',verify, async (req,res) => {
    try{
        const allActivities = await Acitivity.find()
        res.send(allActivities)
    }catch(err){
        res.send(err);
    }
    
})

//Find acitivity by id
router.get('/:id',verify, async (req,res,next) =>{
    const activityExist = await Acitivity.findOne({_id:req.params.id})
    if(!activityExist) return res.status(400).send("Activity doesn't exist");

    try{
        res.send(activityExist);
    }catch(err){
        res.status.send(err);
    }
    
})
//Update activity
router.put('/:id',verify, async (req,res,next) => {
    //Check if the activity already exists
    const activityExist = await Acitivity.findOne({_id:req.params.id})
    if(!activityExist) return res.status(400).send("Activity doesn't exist");

    try{
        await activityExist.updateOne(req.body)
        res.send("Udało się zaaktualizować dane");
    }catch(err){
        res.status(400).send(err)
    }
    
})
//Delete activity
router.delete('/:id',verify, async (req,res,next) => {
    const acitivityExist = await Acitivity.findOne({_id:req.params.id})
    if(!acitivityExist) return res.status(400).send("Activity doesn't exist");
    try{
        await acitivityExist.delete()
        res.send("Udało się usunąć ćwiczenie");
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;