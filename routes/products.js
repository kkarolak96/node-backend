const router = require('express').Router();
const Product = require('../model/Product')
const verify = require('./verifyToken');

function findProduct(){

}
//Add new product
router.post('/',verify, async (req,res) => {

    //Check if the product already exists
    const nameExist = await Product.findOne({name:req.body.name})
    const barcodeExist = await Product.findOne({barcode:req.body.barcode})
    if(nameExist || barcodeExist) return res.status(400).send('Product already exists');
    const product = new Product(req.body);

    try{
        const savedProduct = await product.save();
        res.send(savedProduct);
    }catch(err){
        res.status(400).send(err)
    }
})
//Find all products
router.get('/',verify, async (req,res) => {
    try{
        const allProducts = await Product.find()
        res.send(allProducts)
    }catch(err){
        res.send(err);
    }
    
})

//Find product by id
router.get('/:id',verify, async (req,res,next) =>{
    const productExist = await Product.findOne({barcode:req.params.id})
    if(!productExist) return res.send(JSON.stringify("Produkt nie istnieje"));
    try{
        res.send(productExist);
    }catch(err){
        res.status.send(err);
    }
    
})
//Update product
router.put('/:id',verify, async (req,res,next) => {
    //Check if the product already exists
    const productExist = await Product.findOne({_id:req.params.id})
    if(!productExist) return res.status(400).send("Product doesn't exist");
    try{
        await productExist.updateOne(req.body)
        res.send("Udało się zaaktualizować dane");
    }catch(err){
        res.status(400).send(err)
    }
    
})
//Delete product
router.delete('/:id',verify, async (req,res,next) => {
    const productExist = await Product.findOne({_id:req.params.id})
    if(!productExist) return res.status(400).send("Product doesn't exist");
    try{
        await productExist.delete()
        res.send("Udało się usunąć produkt");
    }catch(err){
        res.status(400).send(err);
    }
})
module.exports = router;