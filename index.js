const express = require('express')
const app = express()
const connectDb = require('./db/connectDb')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/Product')
require('dotenv').config()

app.use(express.json())
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)

const port = process.env.PORT || 8080

const start = async () =>{
    try { 
        await connectDb(process.env.Mongo_URL)
        app.listen(port,()=>{
         console.log(`listening on 8080`)
        }
        )
        
    } catch (error) {
        console.log(error)
    }
}

start()


