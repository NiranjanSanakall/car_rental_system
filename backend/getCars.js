const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()

router.get('/getCars',(req,resp)=>{
    let myQuery = "select * from cars";
    myDB.query(myQuery,(err,result) =>{
        if(err) console.log("Some Error"+err)
        else{
            resp.send(result)
        }
    })
})




module.exports = router