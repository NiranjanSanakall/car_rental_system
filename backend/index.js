const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const myDB = require('./DBconnect')
const registration = require('./registration')
const authentication = require('./authentication')
const addCar = require('./addCar')
const getCars = require('./getCars')


const app = new express()

app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({
    extended:false,
}))

app.use(bp.json())
app.use('/',registration)
app.use('/',authentication)
app.use('/',addCar)
app.use('/',getCars)





app.listen(8000,(err)=>{
    if(err) console.log("Unable to start server")
    else console.log("Server running at port 8000")
})