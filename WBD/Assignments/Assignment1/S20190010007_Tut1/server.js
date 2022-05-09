//This is Server.js file

//Using Express
const express = require('express')
const app = express()

//Using the Express JSON
app.use(express.json())
const climateSurvey = require('./routes/climateSurvey')
app.use('/climateSurveys', climateSurvey)

app.listen(3000, ()=>{console.log("Server has started successfully!")})