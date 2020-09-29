const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');


//Add new activity
router.post('/',verify, async (req,res) => {

    //Check if the activity already exists
    var user = await User.findOne({_id:req.user._id})
    //date = new Date(req.body.date)
    var keys = Object.keys(user.bodySizes);
    var len = keys.length
    var bodySize = req.body
    console.log(len)
    const getDate = req.body.date.split('/')
    var help = false
    if(len > 0){
        for(i=0; i<len;i++)
        {   
            console.log()
            var getDay = user.bodySizes[i].date.getDate().toString();
            var getMonth = user.bodySizes[i].date.getMonth() + 1
            getMonth.toString();
            var getYear = user.bodySizes[i].date.getFullYear()
            getYear.toString()

            if(getDay < 10)
                getDay = '0' + getDay
            if(getMonth < 10)
                getMonth = '0' + getMonth
        
                if (getMonth == getDate[0] && getYear == getDate[2] && getDate[1] == getDay) {
                    res.send(user.bodySizes[i]._id)
                    help = true
                    break;
                } 
    }
    }
    if(help == false || len == 0){
        var bodySize = req.body
        try{
            user.bodySizes.push(bodySize)
            await user.save();
            res.send(user);
        }catch(err){
            res.send(err)
        }    
    }
})
//Find all bodysizes
router.get('/',verify, async (req,res) => {
    try{
        const allBodySizes = await User.findOne({_id:req.user._id})
        res.send(allBodySizes.bodySizes)
    }catch(err){
        res.send(err);
    }
    
})

//Find specific body size by id
router.get('/:id',verify, async (req,res,next) =>{
    const user = await User.findOne({_id:req.user._id})
    var keys = Object.keys(user.bodySizes);
    var len = keys.length
    if(!user || len == 0) return res.status(400)
    
    try{
        for(i=0;i<len;i++)
        {
            if(user.bodySizes[i]._id == req.params.id)
            {
                res.send(user.bodySizes[i]);
                break;
            }
        }
    }catch(err){
        res.status.send(err);
    }
    
})
//Update body size
router.put('/:id',verify, async (req,res,next) => {

    const user = await User.findOne({_id:req.user._id})
    var keys = Object.keys(user.bodySizes);
    var len = keys.length
    console.log
    if(!user || len == 0) return res.status(400)

    try{
        for(i=0;i<len;i++)
        {
            if(user.bodySizes[i]._id == req.params.id)
            {
                user.bodySizes[i].set(req.body)
                await user.save();
                res.send(user);
            }
        }
    }catch(err){
        res.send(err);
    }
    
})
//Delete activity
router.delete('/:id',verify, async (req,res,next) => {
    const user = await User.findOne({_id:req.user._id})
    var keys = Object.keys(user.bodySizes);
    var len = keys.length

    if(!user || len == 0) return res.status(400)

    try{
        
        user.bodySizes.pull(req.params.id)
        await user.save();
        res.send(user);
    }catch(err){
        res.status(400).send(err);
    }
})
module.exports = router;