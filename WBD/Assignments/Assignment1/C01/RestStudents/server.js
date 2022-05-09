const express = require('express')
const app = express()

app.use(express.json())
const surveyRouter = require('./routes/surveyRoutes')
app.use('/surveys', surveyRouter)

app.listen(3000, ()=>{console.log("server started...")})