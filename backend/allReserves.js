const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()


router.get('/allReservations/:cust_id',(req,resp)=>{
    let cust_id= req.params.cust_id;
    myDB.query("select * from reservations where cust_id="+cust_id,(err,result)=>{
        if(err) console.log("some Error"+err)
        else{
            resp.send(result)
        }
    })
})

router.get('/deleteReservations/:res_id',(req,resp)=>{
    let res_id= req.params.res_id;
    myDB.query("delete from reservations where res_id="+res_id,(err,result)=>{
        if(err) console.log("some Error"+err)
        else{
            resp.send(result)
        }
    })
})


router.get('/car/:car_id',(req,resp)=>{
    let car_id= req.params.car_id;
    myDB.query("select * from cars where car_id="+car_id,(err,result)=>{
        if(err) console.log("some Error"+err)
        else{
            resp.send(result)
        }
    })
})


module.exports = router