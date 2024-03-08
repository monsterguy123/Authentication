const express = require('express')
const dotenv = require('dotenv')
const DB = require('./config/db')
const userRoute = require('./routes/user')
const bodyParser = require('body-parser');
dotenv.config()
const app = express()
app.use(bodyParser.json())

//Database
DB();

app.use('/api/v1/user/',userRoute)


const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log("server is running in port ",PORT)
})