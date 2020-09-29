const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    barcode:{
        type:String,
        required:true,
        //min max etc
    },
    kcal:{
        type:Number,
        required:true,
        min: 0
    },
    protein:{
        type:Number,
        required:true,
        min: 0,
    },
    animalProtein:{
        type:Number,
        default:-1,
    },
    vegetableProtein:{
        type:Number,
        default:-1,
    },
    fat:{
        type:Number,
        required:true,
        min:-1,
    },
    saturatedFat:{
        type:Number,
        default:-1,
    },
    gram: {
        type:Number,
        default: 100,
    },
    omega3:{
        type:Number,
        default:-1,
    },
    omega6:{
        type:Number,
        default:-1,
    },
    carbs:{
        type:Number,
        required:true,
        min:-1
    },
    sugar:{
        type:Number,
        default:-1,
    },
    fibre:{
        type:Number,
        default:-1,
    },
    salt:{
        type:Number,
        default:-1,
    },
    cholesterol:{
        type:Number,
        default:-1,
    },
    caffein:{
        type:Number,
        default:-1,
    },
    A:{
        type:Number,
        default:-1,
    },
    B1:{
        type:Number,
        default:-1,
    },
    B2:{
        type:Number,
        default:-1,
    },
    B6:{
        type:Number,
        default:-1,
    },
    biotin:{
        type:Number,
        default:-1,
    },
    folicAcid:{
        type:Number,
        default:-1,
    },
    B16:{
        type:Number,
        default:-1,
    },
    C:{
        type:Number,
        default:-1,
    },
    D:{
        type:Number,
        default:-1,
    },
    E:{
        type:Number,
        default:-1,
    },
    PP:{
        type:Number,
        default:-1,
    },
    K:{
        type:Number,
        default:-1,
    },
    zinc:{
        type:Number,
        default:-1,
    },
    phosphorus:{
        type:Number,
        default:-1,
    },
    iodine:{
        type:Number,
        default:-1,
    },
    magnesium:{
        type:Number,
        default:-1,
    },
    copper:{
        type:Number,
        default:-1,
    },
    potassium:{
        type:Number,
        default:-1,
    },
    sodium:{
        type:Number,
        default:-1,
    },
    calcium:{
        type:Number,
        default:-1,
    },
    iron:{
        type:Number,
        default:-1,
    },
    brand:{
        type:String,
        default:-1,
    },
    verified:{
        type:Boolean,
        default:false,
    },






    

});

module.exports = mongoose.model('Product', productSchema);