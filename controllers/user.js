const getUser = (req,res)=>{
    res.send('get user')
}

const postUser = (req,res)=>{
    const {username} = req.body.username
   res.send(`your username ${username}`)
}

module.exports= {getUser,postUser}