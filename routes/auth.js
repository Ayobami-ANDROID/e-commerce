const router = require('express').Router()
const User = require("../model/User")
const cryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')
require('dotenv').config()

router.post('/register',async (req,res)=>{
     const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
     }) 
     try {
      const savedUser = await  newUser.save()
     res.status(200).json({savedUser})
      
     } catch (error) {
      res.status(400).send(error)
     }
    
})

router.post('/login',async (req,res)=>{
   try { 
      const {email,password}= req.body
      const user = await User.findOne({email})
      if(!user){
         res.status(500).send('wrong credentials')
      }
      const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
      const pass = hashedPassword.toString(cryptoJS.enc.Utf8)
      pass !== password && res.status(401).json('wrong credentials')
      const acessToken = JWT.sign({
         id:user._id,isAdmin:user.isAdmin
      },process.env.JWT_SEC ,{expiresIn:'3d'})
      res.status(200).json({user,acessToken})
   } catch (error) {
      console.log(error)
   }
})

module.exports = router