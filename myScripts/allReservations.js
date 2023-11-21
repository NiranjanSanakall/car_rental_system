$(function(){

    let cust_id = $.session.get("id")
    console.log("hello")
    var old_reservation_data=[]
    var reservation_data=[]
    var car_data=[]
    // var cust_data = []
    $.ajax({
        url: "http://localhost:8000/allReservations/"+cust_id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            old_reservation_data=result
        }
    })
    console.log(old_reservation_data.length)

    let present_date = new Date()
    for (let i = 0; i < old_reservation_data.length ; i++) {
        let old_date = new Date(old_reservation_data[i].reserved_date) 
        if(present_date.getTime() >= old_date.getTime() && old_reservation_data[i].reserv_status!="Car Returned"){
            let status = "Running on rent"
            $.ajax({
                url: "http://localhost:8000/updateStatus",
                type:"POST",
                async:false,
                dataType:"json",
                data:{res_id:old_reservation_data[i].res_id,status:status},
                success: function(result){
                    console.log(result)
                }
            }) 
        } 
    }

    $.ajax({
        url: "http://localhost:8000/allReservations/"+cust_id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            reservation_data=result
        }
    })
    console.log(reservation_data.length)

    for(let i=0;i<reservation_data.length;i++){
    $.ajax({
        url: "http://localhost:8000/car/"+reservation_data[i].car_id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            car_data.push(result)
        }
    })
    
        if(reservation_data[i].reserv_status=="yet to start"){
            $("#allReservations").append("<li class=''>"+
            "Car id : <span id='cId"+i+"'>"+reservation_data[i].car_id+"</span><br>"+
            "Car number : <span id='cNo"+i+"'>"+car_data[i][0].car_no+"</span><br>"+
            "Car Brand : <span id='cBrand"+i+"'>"+car_data[i][0].car_brand+"</span><br>"+
            "Car Model : <span id='cModel"+i+"'>"+car_data[i][0].car_model+"</span><br>"+
            "Car Milage : <span id='cMilage"+i+"'>"+car_data[i][0].car_milage+"</span><br>"+
            "Reservation type : <span id='cRph"+i+"'>"+reservation_data[i].reservation_type+"</span><br>"+
            "Reserved Date : <span id='rDate"+i+"'>"+reservation_data[i].reserved_date+"</span><br>"+
            "Returning Date : <span id='retDate"+i+"'>"+reservation_data[i].returned_date+"</span><br>"+
            "Reservation Status : <span id='resSts"+i+"' style='color:blue;'>"+reservation_data[i].reserv_status+"</span><br>"+
            "Number Of Cars : <span id='numCar"+i+"'>"+reservation_data[i].no_of_cars+"</span><br>"+
            "Total Amount : <span id='tAmt"+i+"'>"+reservation_data[i].total_amount+"</span><br>"+
            "<button id='cancelRent-"+i+"' style='display:block'>Cancel</button>"+
            "</li>")
        }
        else if(reservation_data[i].reserv_status=="Running on rent"){
            $("#allReservations").append("<li class=''>"+
            "Car id : <span id='cId"+i+"'>"+reservation_data[i].car_id+"</span><br>"+
            "Car number : <span id='cNo"+i+"'>"+car_data[i][0].car_no+"</span><br>"+
            "Car Brand : <span id='cBrand"+i+"'>"+car_data[i][0].car_brand+"</span><br>"+
            "Car Model : <span id='cModel"+i+"'>"+car_data[i][0].car_model+"</span><br>"+
            "Car Milage : <span id='cMilage"+i+"'>"+car_data[i][0].car_milage+"</span><br>"+
            "Reservation type : <span id='cRph"+i+"'>"+reservation_data[i].reservation_type+"</span><br>"+
            "Reserved Date : <span id='rDate"+i+"'>"+reservation_data[i].reserved_date+"</span><br>"+
            "Returning Date : <span id='retDate"+i+"'>"+reservation_data[i].returned_date+"</span><br>"+
            "Reservation Status : <span id='resSts"+i+"' style='color:red;'>"+reservation_data[i].reserv_status+"</span><br>"+
            "Number Of Cars : <span id='numCar"+i+"'>"+reservation_data[i].no_of_cars+"</span><br>"+
            "Total Amount : <span id='tAmt"+i+"'>"+reservation_data[i].total_amount+"</span><br>"+
            "<button id='return-"+i+"' style='display:block'>Return</button>"+
            "</li>")
        }
        else{
            $("#allReservations").append("<li class=''>"+
            "Car id : <span id='cId"+i+"'>"+reservation_data[i].car_id+"</span><br>"+
            "Car number : <span id='cNo"+i+"'>"+car_data[i][0].car_no+"</span><br>"+
            "Car Brand : <span id='cBrand"+i+"'>"+car_data[i][0].car_brand+"</span><br>"+
            "Car Model : <span id='cModel"+i+"'>"+car_data[i][0].car_model+"</span><br>"+
            "Car Milage : <span id='cMilage"+i+"'>"+car_data[i][0].car_milage+"</span><br>"+
            "Reservation type : <span id='cRph"+i+"'>"+reservation_data[i].reservation_type+"</span><br>"+
            "Reserved Date : <span id='rDate"+i+"'>"+reservation_data[i].reserved_date+"</span><br>"+
            "Returning Date : <span id='retDate"+i+"'>"+reservation_data[i].returned_date+"</span><br>"+
            "Reservation Status : <span id='resSts"+i+"' style='color:green;'>"+reservation_data[i].reserv_status+"</span><br>"+
            "Number Of Cars : <span id='numCar"+i+"'>"+reservation_data[i].no_of_cars+"</span><br>"+
            "Total Amount : <span id='tAmt"+i+"'>"+reservation_data[i].total_amount+"</span><br>"+
            "<button id='recipt-"+i+"' style='display:block'>Recipt</button>"+
            "</li>")
        }
    }

    $("#allReservations").on("click","button",function(e){
        e.preventDefault()
        let btnType = this.id.split('-')[0]
        let i = this.id.split('-')[1]
        if(btnType=="recipt"){
            console.log("heppp")
            $.session.set("i",i)
            window.location = "../myPages/recipts.html"
        }
        else if(btnType=="cancelRent"){
            $.ajax({
                url:"http://localhost:8000/deleteReservations/"+reservation_data[i].res_id,
                type:"GET",
                dataType:"json",
                success: function(result){
                    alert("data deleted...")
                }
            })
            $("#allReservations li:eq("+i+")").remove();
        }
        else{
            // $("#return-"+i).css("display","none")
            // $("#recipt-"+i).css("display","block")
            let status = "Car Returned"
            let reservedDate = new Date(reservation_data[i].reserved_date)
            let currentDate = new Date()
            let reservId = reservation_data[i].res_id
            let noOfCars = reservation_data[i].no_of_cars
            let rentPerHr = car_data[i][0].renting_per_hour
            let rentPerDay = car_data[i][0].renting_per_day
            let rentType = reservation_data[i].reservation_type
            let totalAmt = 0

            if (!isNaN(reservedDate) && !isNaN(currentDate)) {
                var difference = currentDate.getTime() - reservedDate.getTime();
                var minutesDifference = Math.floor(difference / (1000 * 60));
                if(rentType=="per hour"){
                    totalAmt = (minutesDifference/60)*rentPerHr*noOfCars
                }
                else{
                    totalAmt = (minutesDifference/(60*24))*rentPerDay*noOfCars
                }
            }
            console.log(totalAmt)
            $("#tAmt-"+i).text(totalAmt)
            $.ajax({
                url:"http://localhost:8000/updateStsAmt",
                type:"POST",
                async:false,
                dataType:"json",
                data:{totalAmt:totalAmt,status:status,reservId:reservId},
                success: function(result){
                    alert("Amount and status updated...")
                }
            })
        }
        
    })
    
})