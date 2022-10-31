const router = require('express').Router()
const Cart = require('../model/Cart')
const cryptoJS = require('crypto-js')
require('dotenv').config() 
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('./verifyToken')

router.post("/", verifyTokenAndAdmin,async(req,res)=>{
     const newCart = new Cart(req.body)
     try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
     } catch (error) {
        res.status(500).json(error)
     }
})

router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
   
    try {
        const updateCart = await Cart.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        res.status(200).json({updateCart })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.delete(":/id",verifyTokenAndAuthorization,async (req,res) =>{
    try {
        await Cart.findByIdAndDelete({_id:req.params.id})
        res.status(200).json('Cart has been deleted...')
    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId:req.params.userId})
        res.status(200).json({cart})
    } catch (error) {
        res.status(500).json('you are not authorized')
    }
}) 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const carts = await Cart.find({})
        res.status(200).json({carts})
    } catch (error) {
        res.status(500).json(error)
    }
})

// router.get("/",async (req,res)=>{
//     const qNew = req.query.new
//     const qCategory = req.query.categories
//     try {
//         let products;
//         if(qNew){
//              products = await Product.find().sort({_id:-1}).limit(5) 
//         }
//         else if(qCategory){
//             products = await Product.find({categories:{
//                 $in:[qCategory]
//             }})
//         }else{
//             products = await Product.find({})
//         }
        
//         res.status(200).json({products})
//     } catch (error) {
//         res.status(500).json('you are not authorized')
//     }
// }) 
module.exports = router