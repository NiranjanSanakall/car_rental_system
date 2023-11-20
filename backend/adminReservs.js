const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()

router.get('/getReservsForAdmin',(req,resp)=>{
    let myQuery = "select * from reservations";
    myDB.query(myQuery,(err,result) =>{
        if(err) console.log("Some Error"+err)
        else{
            resp.send(result)
        }
    })
})


module.exports = router