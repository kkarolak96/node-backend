const router = require('express').Router();
const User = require('../model/User');
const Product = require('../model/Product');
const Activity = require('../model/Activity');
const verify = require('./verifyToken');


router.post('/', verify, async (req, res) => {

    //Check if the activity already exists
    
        var user = await User.findOne({ _id: req.user._id })
        date = new Date(req.body.date)
        var keys = Object.keys(user.dailyStuff);

        var len = keys.length
   
    //res.send(len.toString())
    
        var products = req.body.products
        if(products){
            var productsKeys = Object.keys(products)
            var productsLen = productsKeys.length
        }
        var activities = req.body.training
        if(activities){
            var activitiesKeys = Object.keys(activities)
            var activitiesLen = activitiesKeys.length
        }
       
    
    

    const getDate = req.body.date.split('/')
    var help = false
    console.log(len)
    console.log(help)
    try{
    if (len > 0) {
            for (i = 0; i < len; i++) {
                var getDay = user.dailyStuff[i].date.getDate().toString();
                var getMonth = user.dailyStuff[i].date.getMonth() + 1
                getMonth.toString();
                var getYear = user.dailyStuff[i].date.getFullYear()
                getYear.toString()

                if (getDay < 10)
                    getDay = '0' + getDay
                if (getMonth < 10)
                    getMonth = '0' + getMonth
                //console.log(getDate)
                console.log(getMonth.toString(), getDate[0])
                console.log(getYear.toString(), getDate[2])
                console.log(getDay.toString(), getDate[1])
                if (getMonth == getDate[0] && getYear == getDate[2] && getDate[1] == getDay) {
                     res.send(JSON.stringify("Ten dzień już istnieje"))
                    help = true
                    break;
                }
                // else
                //help = true   
            }

        // help = true
    }
 
        if (productsLen > 0) {
            for (i = 0; i < productsLen; i++) {
                    var product = await Product.findOne({ _id: products[i].product_id })
                    if (!product) res.status(400).send("Złe dane! Jeden z produktów nie istnieje")
               
    
            }
        }
    
        if (activitiesLen > 0) {
            for (i = 0; i < activitiesLen; i++) {
               
                    var activity = await Activity.findOne({ _id: activities[i].activity_id })
                    if (!activity) res.status(400).send("Złe dane! Jedno z ćwiczeń nie istnieje")
                
    
            }
        }
        console.log("lalal", help)
        if (help == false || activitiesLen == 0 || productsLen == 0) {
            var dailyStuff = req.body
            
                user.dailyStuff.push(dailyStuff)
                await user.save();
                console.log(user)
                res.send(user);
           
        }
        else {
            res.send(JSON.stringify("Ten produkt już istnieje"))
            console.log('done')
        }
    }catch(err){
        res.send(JSON.stringify(err))
    }
           
        

})
router.post('/:id/product', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    // 
    var dailyStuff = user.dailyStuff
    //  console.log(dailyStuff)
    var dailyStuffKeys = Object.keys(dailyStuff)

    var dailyStuffLen = dailyStuffKeys.length
    //  console.log(dailyStuffLen)
    var help = true;
    var request = req.body
    /*var requestKeys = Object.keys(request)
    var requestLen = requestKeys.length */
    //  if( requestLen > 0)
    // {
    //  for(i=0;i<requestLen;i++){ // W razie gdybym chciał dodawać kilka na raz produktów do istniejącego już dnia
    var product = await Product.findOne({ _id: request.product_id })
    //console.log(product)
    if (!product) res.status(400).send("Złe dane!")
    // }
    // }
    for (i = 0; i < dailyStuffLen; i++) {
        // console.log(user.dailyStuff[i]._id, req.params.id)
        if (user.dailyStuff[i]._id == req.params.id) {
            var products = user.dailyStuff[i].products;
            //  console.log(products)
            var productsKeys = Object.keys(products);
            //     console.log(productsKeys)
            var productsLen = productsKeys.length;
            //    console.log(productsLen)
            for (j = 0; j < productsLen; j++) {
                if (products[j].product_id == req.body.product_id && products[j].mealType == req.body.mealType) {
                    //  console.log("jo")
                    help = false
                    //   console.log(false)
                    res.status(400).send(JSON.stringify("Ten produkt już istnieje"))
                }

            }
            // console.log(help)
            if (help == true) {
                user.dailyStuff[i].products.push(req.body)
                await user.save();
                res.send(user)
            }

            // console.log(help)
        }
        // console.log(help)
        //  res.send("siema")
    }
})
router.put('/:id/product/:product_id', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    var dailyStuff = user.dailyStuff
    var dailyStuffKeys = Object.keys(dailyStuff)
    var dailyStuffLen = dailyStuffKeys.length
    //console.log(dailyStuffLen)

    for (i = 0; i < dailyStuffLen; i++) {
        if (user.dailyStuff[i]._id == req.params.id) {
            //   console.log(req.params.id, user.dailyStuff[i]._id)
            var products = user.dailyStuff[i].products;
            var productsKeys = Object.keys(products);
            var productsLen = productsKeys.length;
            //  console.log(productsLen)
            for (j = 0; j < productsLen; j++) {
                console.log(products[j]._id, req.params.product_id)
                if (products[j].product_id == req.params.product_id) {

                    try {
                        products[j].set(req.body)
                        await user.save();
                        res.send(user);
                    } catch (err) {
                        res.send(err);
                    }
                } else if (j == productsLen - 1 && products[j] != req.params.product_id) {
                    res.status(400).send(JSON.stringify("Something went wrong"))
                }
            }
        }
    }
})
router.put('/:id/training/:activity_id', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    var dailyStuff = user.dailyStuff
    var dailyStuffKeys = Object.keys(dailyStuff)
    var dailyStuffLen = dailyStuffKeys.length

    for (i = 0; i < dailyStuffLen; i++) {
        if (user.dailyStuff[i]._id == req.params.id) {
            var activities = user.dailyStuff[i].training;
            var activitiesKeys = Object.keys(activities);
            var activitiesLen = activitiesKeys.length;
            for (j = 0; j < activitiesLen; j++) {
                console.log(activities[j]._id, req.params.activity_id)
                if (activities[j].activity_id == req.params.activity_id) {

                    try {
                        activities[j].set(req.body)
                        await user.save();
                        res.send(user);
                    } catch (err) {
                        res.send(err);
                    }
                } else if (j == activitiesLen - 1 && training[j] != req.params.activity_id) {
                    res.status(400).send(JSON.stringify("Something went wrong"))
                }
            }
        }
    }
})
router.post('/:id/product', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    // 
    var dailyStuff = user.dailyStuff
    //  console.log(dailyStuff)
    var dailyStuffKeys = Object.keys(dailyStuff)

    var dailyStuffLen = dailyStuffKeys.length
    //  console.log(dailyStuffLen)
    var help = true;
    var request = req.body
    /*var requestKeys = Object.keys(request)
    var requestLen = requestKeys.length */
    //  if( requestLen > 0)
    // {
    //  for(i=0;i<requestLen;i++){ // W razie gdybym chciał dodawać kilka na raz produktów do istniejącego już dnia
    var product = await Product.findOne({ _id: request.product_id })
    //console.log(product)
    if (!product) res.status(400).send("Złe dane!")
    // }
    // }
    for (i = 0; i < dailyStuffLen; i++) {
        // console.log(user.dailyStuff[i]._id, req.params.id)
        if (user.dailyStuff[i]._id == req.params.id) {
            var products = user.dailyStuff[i].products;
            //  console.log(products)
            var productsKeys = Object.keys(products);
            //     console.log(productsKeys)
            var productsLen = productsKeys.length;
            //    console.log(productsLen)
            for (j = 0; j < productsLen; j++) {
                if (products[j].product_id == req.body.product_id && products[j].mealType == req.body.mealType) {
                    //  console.log("jo")
                    help = false
                    //   console.log(false)
                    res.status(400).send(JSON.stringify("Ten produkt już istnieje"))
                }

            }
            // console.log(help)
            if (help == true) {
                user.dailyStuff[i].products.push(req.body)
                await user.save();
                res.send(user)
            }

            // console.log(help)
        }
        // console.log(help)
        //  res.send("siema")
    }
})
router.post('/:id/training', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    // 
    var dailyStuff = user.dailyStuff
    //  console.log(dailyStuff)
    var dailyStuffKeys = Object.keys(dailyStuff)

    var dailyStuffLen = dailyStuffKeys.length
    //  console.log(dailyStuffLen)
    var help = true;
    var request = req.body
    /*var requestKeys = Object.keys(request)
    var requestLen = requestKeys.length */
    //  if( requestLen > 0)
    // {
    //  for(i=0;i<requestLen;i++){ // W razie gdybym chciał dodawać kilka na raz produktów do istniejącego już dnia
    var activity = await Activity.findOne({ _id: request.activity_id })
    //console.log(product)
    if (!activity) res.status(400).send("Złe dane!")
    // }
    // }
    for (i = 0; i < dailyStuffLen; i++) {
        // console.log(user.dailyStuff[i]._id, req.params.id)
        if (user.dailyStuff[i]._id == req.params.id) {
            var activity = user.dailyStuff[i].training;
            //  console.log(products)
            var activitiesKeys = Object.keys(activity);
            //     console.log(productsKeys)
            var activitiesLen = activitiesKeys.length;
            //    console.log(productsLen)
            for (j = 0; j < activitiesLen; j++) {
                if (activity[j].activity_id == req.body.activity_id) {
                    //  console.log("jo")
                    help = false
                    //   console.log(false)
                    res.status(400).send(JSON.stringify("Ten produkt już istnieje"))
                }

            }
            // console.log(help)
            if (help == true) {
                user.dailyStuff[i].training.push(req.body)
                await user.save();
                res.send(user)
            }

            // console.log(help)
        }
        // console.log(help)
        //  res.send("siema")
    }
})
router.delete('/:id/training/:activity_id', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    var dailyStuff = user.dailyStuff
    var dailyStuffKeys = Object.keys(dailyStuff)
    var dailyStuffLen = dailyStuffKeys.length


    for (i = 0; i < dailyStuffLen; i++) {
        if (user.dailyStuff[i]._id == req.params.id) {
            var activities = user.dailyStuff[i].training;
            var activitiesKeys = Object.keys(activities);
            var activitiesLen = activitiesKeys.length;
            for (j = 0; j < activitiesLen; j++) {
                if (activities[j]._id == req.params.activity_id) {
                    try {
                        activities.pull(req.params.activity_id)
                        await user.save();
                        res.send(user);
                        return;
                    } catch (err) {
                        res.status(400).send(err);
                    }
                } else if (j == activitiesLen - 1 && activities[activitiesLen - 1] != req.params.activity_id) {
                    res.status(400).json("Something went wrong")
                }
            }
        }
    }
})
router.delete('/:id/product/:product_id', verify, async (req, res) => {

    var user = await User.findOne({ _id: req.user._id })
    var dailyStuff = user.dailyStuff
    var dailyStuffKeys = Object.keys(dailyStuff)
    var dailyStuffLen = dailyStuffKeys.length


    for (i = 0; i < dailyStuffLen; i++) {
        if (user.dailyStuff[i]._id == req.params.id) {
            var products = user.dailyStuff[i].products;
            var productsKeys = Object.keys(products);
            var productsLen = productsKeys.length;
            for (j = 0; j < productsLen; j++) {
                if (products[j]._id == req.params.product_id) {
                    try {
                        products.pull(req.params.product_id)
                        await user.save();
                        res.send(user);
                        return;
                    } catch (err) {
                        res.status(400).send(err);
                    }
                } else if (j == productsLen - 1 && products[j] != req.params.product_id) {
                    res.status(400).json("Something went wrong")
                }
            }
        }
    }
})
module.exports = router;