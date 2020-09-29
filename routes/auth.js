const router = require('express').Router();
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken');

//REGISTER
router.post('/register', async (req,res)=>{
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists!');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        sex: req.body.sex,
        activityLevel: req.body.activityLevel,
        birthDate: req.body.birthDate,
        height: req.body.height,
        actualBodyWeight: req.body.actualBodyWeight,
        targetBodyWeight: req.body.targetBodyWeight,
        target: req.body.target,
        weeklyGoal: req.body.weeklyGoal,

    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    //Lets validate the data before make a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if the email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).send(token);
    
   
});

//Update user info
router.put('/:id',verify, async (req,res,next) => {
    //Check if the product already exists
    const userExist = await User.findOne({_id:req.params.id})
    if(!userExist) return res.status(400).send("User doesn't exist");
    //Only you can update your profile
    if(userExist._id != req.user._id) return res.status(400).send("Access Denied");

    try{
        await userExist.updateOne(req.body)
        res.send(JSON.stringify("Udało się zaaktualizować dane"));
    }catch(err){
        res.status(400).send(err)
    }
    
});

router.get('/:id', verify, async (req,res,next) =>{
    const userExist = await User.findOne({_id:req.params.id})
    if(!userExist) return res.status(400).send("User doesn't exist");
    if(userExist._id != req.user._id) return res.status(400).send("Access Denied");

    try{
        res.send(userExist);
    }catch(err){
        res.status.send(err);
    }
})
module.exports = router;