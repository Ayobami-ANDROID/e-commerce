const mongoose = require('mongoose')

const connectDb = (url) =>{
  return mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log('connected to the db')).catch((err)=>console.log(err))
}

module.exports = connectDb