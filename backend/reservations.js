const express = require('express')
const myDB = require('./DBconnect')
const router = express.Router()


router.post('/addReservation',(req,resp)=>{
    let cust_id = req.body.cust_id
    let car_id = req.body.car_id
    let rentType = req.body.rentType
    let resDate = req.body.resDate
    let retDate = req.body.retDate
    let totalAmt = req.body.totalAmt
    let noOfCars = req.body.noOfCars

    let data =[]
    data.push(cust_id);data.push(car_id);data.push(rentType);
    data.push(resDate);data.push(retDate);data.push(noOfCars);data.push(totalAmt);

    let mySql = "insert into reservations(cust_id,car_id,reservation_type,reserved_date,returned_date,no_of_cars,total_amount) values(?,?,?,?,?,?,?)"

    myDB.query(mySql,data,(err,result)=>{
        if (err) console.log("Some Error"+err);
        else{
            resp.send(result)
        }
    })
})

router.get('/getCustomer/:cust_id',(req,resp)=>{
    let cust_id= req.params.cust_id;
    myDB.query("select * from customers where cust_id="+cust_id,(err,result)=>{
        if(err) console.log("some Error"+err)
        else{
            resp.send(result)
        }
    })
})

module.exports = router