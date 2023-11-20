const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()

router.post('/registerForm',(req,resp)=>{
    let name = req.body.name
    let email = req.body.email
    let phoneNo = req.body.phoneNo
    let address = req.body.address
    let password = req.body.password
    let data = []
    data.push(name);data.push(email);data.push(phoneNo);data.push(address);data.push(password);

    let myQuery = "insert into customers(name,emailId,phone_no,address,password) values(?,?,?,?,?)"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log("Some error"+err)
        else{
        console.log(result.affectedRows+" rows inserted...")
        resp.send(result)
        }
    })
})



module.exports=router
