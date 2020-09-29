const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min: 6,
    },
    sex:{
        type:String,
        required:true,
    },
    birthDate:{
        type: Date,
        required:true,
    },
    height:{
        type: Number,
        required:true,
    },
    actualBodyWeight:{
        type: Number,
        required:true,
    },
    target:{
        type:Number,
        required:true,
    },
    targetBodyWeight:{
        type:Number,
        required: true,
    },
    activityLevel:{
        type:Number,
        required:true,
    },
    weeklyGoal:{
        type:Number,
        required:true,
    },
    fitbit_access:{
        type:String,
        default: ''
    },
    fitbit_refresh:{
        type:String,
        default: '',
    },
    bodySizes:[
        {
            bodyWeight:{
                type:String,
                required:true,
            },
            date:{
                type: Date,
                required:true,
            },
            neck:{
                type: Number,
                default: 0,
            },
            chest:{
                type:Number,
                default:0,
            },
            biceps:{
                type:Number,
                default: 0,
            },
            stomach:{
                type:Number,
                default: 0,
            },
            hips:{
                type:Number,
                date:Date,
            },
            thigh:{
                type:Number,
                default: 0,
            },
            calf:{
                type:Number,
                default: 0,
            },
            waist:{
                type:Number,
                default:0,
            }
        }
    ],
    dailyStuff:[
        {
            date:{
                type: Date,
                required:true,
            },
            products:[
                {
                    product_id:{
                        type:String,
                        required:true,
                    },
                    name:{
                        type:String,
                        required:true,
                    },
                    gram:{
                        type:Number,
                        required:true,
                    },
                    kcal_per100:{
                        type:Number,
                        required:true,
                    },
                    mealType:{
                        type:String, //breakfast,second_breakfast,lunch,dinner,snack,supper
                        required:true
                    },
                    carbs:{
                        type:Number,
                        required:true
                    },
                    protein:{
                        type:Number,
                        required:true,
                    },
                    fat:{
                        type:Number,
                        required:true,
                    }
                }
            ],
            training:[
                {
                    activity_id:{
                        type:String,
                        required:true,
                    },
                    time:{
                        type:Number,
                        required:true,
                    },
                    name:{
                        type:String,
                        required:true,
                    },
                    kcal_per10:{
                        type:Number,
                        required:true,
                    }
                }
            ],
        }
    ]

});

module.exports = mongoose.model('User', userSchema);