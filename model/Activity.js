const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min: 1,
        max: 255
    },
    kcal:{
        type:Number,
        required:true,
        min: 1
    },
    time:{
        type:Number,
        required:true,
        min:10,
    },
    description:{
        type:String,
        default:'',
    },
    verified:{
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Activity', activitySchema);