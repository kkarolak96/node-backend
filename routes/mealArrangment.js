const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');


router.post('/',verify, async (req,res) => {

    var user = await User.findOne({_id:req.user._id})
    var keys = Object.keys(user.mealArrangment);
    var len = keys.length
    
    var mealArrangment = req.body
    if(len == 0){
        try{
            user.mealArrangment.push(mealArrangment)
            await user.save();
            res.send(user);
        }catch(err){
            res.send(err)
        }
    }
    else
        res.status(400).send("Nie można dodać kolejnego rozstawienia!")
})
//Find all bodysizes
router.get('/',verify, async (req,res) => {
    try{
        const user = await User.findOne({_id:req.user._id})
        res.send(user.mealArrangment)
    }catch(err){
        res.send(err);
    }
    
})

router.put('/',verify, async (req,res,next) => {

    const user = await User.findOne({_id:req.user._id})
    var keys = Object.keys(user.mealArrangment);
    var len = keys.length

    if(len == 1){
        try{
            user.mealArrangment[0].set(req.body)
            await user.save();
            res.send(user);
        }catch(err){
            res.status(400).send(err);
        }
    }else
        res.status(400)

   
    
})
module.exports = router;