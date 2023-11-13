const express = require("express")
const myDB = require("./DBconnect")
const router = express.Router()


router.post('/addCar',(req,resp)=>{
    let brand = req.body.brand
    let model = req.body.model
    let cNumber = req.body.cNumber
    let imgUrl = req.body.imgUrl
    let milage = req.body.milage
    let rentPerHour = req.body.rentPerHour
    let rentPerDay = req.body.rentPerDay

    let data = []
    data.push(cNumber);data.push(brand);data.push(model);
    data.push(milage); data.push(imgUrl);data.push(rentPerHour);data.push(rentPerDay);

    let mySql = "insert into cars(car_no,car_brand,car_model,car_milage,car_image,renting_per_hour,renting_per_day) values(?,?,?,?,?,?,?)"

    myDB.query(mySql,data,(err,result)=>{
        if(err) console.log("Some Error"+err)
        else{
            console.log(result.affectedRows+" rows inserted...")
            resp.send(result)
        }
    })
})


module.exports = router