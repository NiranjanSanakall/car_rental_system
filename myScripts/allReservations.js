$(function(){

    let cust_id = $.session.get("id")
    console.log("hello")
    var reservation_data=[]
    var car_data=[]
    // var cust_data = []
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
        $("#allReservations").append("<li class=''>"+
        "Car id : <span id='cId"+i+"'>"+reservation_data[i].car_id+"</span><br>"+
        "Car number : <span id='cNo"+i+"'>"+car_data[i][0].car_no+"</span><br>"+
        "Car Brand : <span id='cBrand"+i+"'>"+car_data[i][0].car_brand+"</span><br>"+
        "Car Model : <span id='cModel"+i+"'>"+car_data[i][0].car_model+"</span><br>"+
        "Car Milage : <span id='cMilage"+i+"'>"+car_data[i][0].car_milage+"</span><br>"+
        "Reservation type : <span id='cRph"+i+"'>"+reservation_data[i].reservation_type+"</span><br>"+
        "Reserved Date : <span id='rDate"+i+"'>"+reservation_data[i].reserved_date+"</span><br>"+
        "Returning Date : <span id='retDate"+i+"'>"+reservation_data[i].returned_date+"</span><br>"+
        "Number Of Cars : <span id='numCar"+i+"'>"+reservation_data[i].no_of_cars+"</span><br>"+
        "Total Amount : <span id='tAmt"+i+"'>"+reservation_data[i].total_amount+"</span><br>"+
        "<button id='cancelRent-"+i+"' style='display:block'>Cancel</button>"+
        "<button id='recipt-"+i+"' style='display:block'>Recipt</button>"+
        "</li>")
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
        else{
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
        
    })
    
})