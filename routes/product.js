const router = require('express').Router()
const Product = require('../model/product')
const cryptoJS = require('crypto-js')
require('dotenv').config() 
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('./verifyToken')

router.post("/", verifyTokenAndAdmin,async(req,res)=>{
     const newProduct = new Product(req.body)
     try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
     } catch (error) {
        res.status(500).json(error)
     }
})

router.delete(":/id",verifyTokenAndAdmin,async (req,res) =>{
    try {
        await Product.findByIdAndDelete({_id:req.params.id})
        res.status(200).json('Product has been deleted...')
    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.get("/find/:id", async(req,res)=>{
    try {
        const product = await Product.findById({_id:req.params.id})
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json('you are not authorized')
    }
}) 

router.get("/",async (req,res)=>{
    const qNew = req.query.new
    const qCategory = req.query.categories
    try {
        let products;
        if(qNew){
             products = await Product.find().sort({_id:-1}).limit(5) 
        }
        else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]
            }})
        }else{
            products = await Product.find({})
        }
        
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json('you are not authorized')
    }
}) 

// router.get('/stats',verifyTokenAndAdmin,async (req,res)=>{
//     const date = new Date()
//     const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
//     try {
//         const data = await User.aggregate([
//             {$match :{createdAt:{$gte: lastYear}}},
//             {
//                 $project:{
//                     month:{$month :"$createdAt"}
//                 }
//             },{
//                 $group:{
//                     _id:"$month",
//                     total:{$sum:1},
//                 }
//             }
//         ])
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(500).json(err)
//     }
// })

module.exports = router