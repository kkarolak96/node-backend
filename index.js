const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');
//Import Routes
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/products');
const activitiesRoute = require('./routes/activities');
const bodySizeRoute = require('./routes/bodySize');
const mealArrangmentRoute = require('./routes/mealArrangment');
const dailyStuffRoute = require('./routes/dailyStuff');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true  },
() => console.log('connected to db!'))

//Middlewares
app.use(express.json());
app.use(cors());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/product', productsRoute);
app.use('/api/activity', activitiesRoute);
app.use('/api/body_size', bodySizeRoute);
app.use('/api/meal_arrangment',mealArrangmentRoute);
app.use('/api/daily_stuff',dailyStuffRoute);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'server.html'));
});
app.listen(process.env.PORT || 3001, function(){
    console.log('Your node js server is running');
});