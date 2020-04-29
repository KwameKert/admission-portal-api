const express = require('express')
require('./db/mongoose.js')

const app = express()

const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Server up and running")
})



const userRouter = require('./router/user')
const studentDetailRouter = require('./router/studentDetail')

app.use(express.json())
app.use(userRouter)
app.use(studentDetailRouter)





