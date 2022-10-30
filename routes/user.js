const express = require('express')
const User = require('../model/User')
const router = express.Router()
const cryptoJS = require('crypto-js')
require('dotenv').config()
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('./verifyToken')
const { findByIdAndUpdate } = require('../model/User')

router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
  if (req.body.password){
    req.body.password =  cryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString() 
  }
    try {
        const updateUser = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        res.status(200).json({updateUser})
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete

router.delete(":/id",verifyTokenAndAuthorization,async (req,res) =>{
    try {
        await User.findByIdAndDelete({_id:req.params.id})
        res.status(200).json('User has been deleted...')
    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const user = await User.findById({_id:req.params.id})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json('you are not authorized')
    }
}) 

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    const query = req.query.new
    try {
        const user = query ? await User.find().sort({_id:-1}).limit(5) : await User.find({ })
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json('you are not authorized')
    }
}) 

router.get('/stats',verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try {
        const data = await User.aggregate([
            {$match :{createdAt:{$gte: lastYear}}},
            {
                $project:{
                    month:{$month :"$createdAt"}
                }
            },{
                $group:{
                    _id:"$month",
                    total:{$sum:1},
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(err)
    }
})
module.exports = router