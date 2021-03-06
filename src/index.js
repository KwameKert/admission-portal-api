const express = require('express')
const cors = require('cors')
require('./db/mongoose.js')


const app = express()

const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log("Server up and running")
})


const userRouter = require('./router/user')
const applicantDetailRouter = require('./router/applicantDetail')
const programRouter = require('./router/program')
const applicationRouter = require('./router/application')
const dashboardRouter = require('./router/dashboard')
const transactionRouter = require('./router/transaction')

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(applicantDetailRouter)
app.use(programRouter)
app.use(applicationRouter)
app.use(dashboardRouter)
app.use(transactionRouter)

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

