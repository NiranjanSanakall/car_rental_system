const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()

router.post('/authenticate',(req,resp)=>{
    let uid = req.body.uid
    let pwd = req.body.pwd

    let num = []

    let myQuery1 = "select * from customers where emailId='"+uid+"' or  phone_no='"+uid+"'"
    let myQuery2 = "select * from customers where (emailId='"+uid+"' or  phone_no='"+uid+"') and password='"+pwd+"'"

    myDB.query(myQuery1,(err,result1)=>{
        if(err) console.log("Some error"+err)
        else{
            if(result1.length>0){
                myDB.query(myQuery2,(err,result2)=>{
                    if(err) console.log("Some error"+err)
                    else{
                        if(result2.length>0){
                            resp.send(result2)
                        }
                        else{
                            num={key:2}
                            resp.send(num)
                        }
                    }
                })
            }
            else{
                num = {key:1}
                resp.send(num)
            }
        }
    })
})




module.exports=router
