const express = require("express")
const myDB = require("./DBconnect")
const router = express.Router()
const multer = require('multer')


var fname = "";
router.get("/maxOfCarIdForNaming",(req,resp)=>{
    myDB.query("select max(car_id) as lastAid from cars",(err,result)=>{
        if(err) console.log(err)
        else fname =(result[0].lastAid+1)+"photo"
     })
})

const storage =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../carImages/');
    },
    filename: function (req, file, callback) {
      let ofname=file.originalname
      extn=ofname.substring(ofname.lastIndexOf('.'),ofname.length)
      // console.log("This is extn"+extn)
      // console.log("This is fname"+fname)
      callback(null, fname+extn);
    }
  });

  const upload = multer({ storage : storage}).single('file')

  router.post('/uploadCarImg',function(req,res,err){
    // console.log("lets test")
    
      upload(req,res,function(err) {
      if(err) {
      res.status(400).send("Something went wrong!");
      }
      else
        res.sendStatus(200);
     }); 
});


router.post('/addCar',(req,resp)=>{
    let brand = req.body.brand
    let model = req.body.model
    let extn = req.body.extn
    let cNumber = req.body.cNumber
    let imgUrl = "../carImages/"+fname+extn
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