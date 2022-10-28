const express = require('express')
const app = express()
const connectDb = require('./db/connectDb')
const user = require('./routes/user')
require('dotenv').config()

app.use('/api/v1',user)
app.use(express.json())

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


