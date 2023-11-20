$(function(){
    let cust_id = $.session.get("id")
    let i = $.session.get("i")
    console.log("hmmm")
    var reservation_data=[]
    var car_data=[]
    var cust_data = []
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
    }

    $.ajax({
        url:"http://localhost:8000/getCustomer/"+reservation_data[i].cust_id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            cust_data = result
            console.log(result)
        }
    })

    $("#reservId").text(reservation_data[i].res_id)
    $("#cusId").text(cust_data[0].cust_id)
    $("#cName").text(cust_data[0].name)
    $("#cEmail").text(cust_data[0].emailId)
    $("#cPhone").text(cust_data[0].phone_no)
    $("#carId").text(car_data[i][0].car_id)
    $("#carBrand").text(car_data[i][0].car_brand)
    $("#carModel").text(car_data[i][0].car_model)
    $("#carNumber").text(car_data[i][0].car_no)
    $("#carMilage").text(car_data[i][0].car_milage)

    if(reservation_data[i].reservation_type=="per hour"){
    $("#reciptDetails").append("<tr>"+
    "<td>"+reservation_data[i].reserved_date+"</td>"+
    "<td>"+reservation_data[i].returned_date+"</td>"+
    "<td>"+reservation_data[i].no_of_cars+"</td>"+
    "<td>"+car_data[i][0].renting_per_hour+"</td>"+
    "<td>"+reservation_data[i].reservation_type+"</td>"+
    "<td>"+reservation_data[i].total_amount+"</td>"+
    "</tr>") 
    }
    else{
        $("#reciptDetails").append("<tr>"+
        "<td>"+reservation_data[i].reserved_date+"</td>"+
        "<td>"+reservation_data[i].returned_date+"</td>"+
        "<td>"+reservation_data[i].no_of_cars+"</td>"+
        "<td>"+car_data[i][0].renting_per_day+"</td>"+
        "<td>"+reservation_data[i].reservation_type+"</td>"+
        "<td>"+reservation_data[i].total_amount+"</td>"+
        "</tr>") 
    } 

    $("#printRecipt").on("click",function(e){
        e.preventDefault()
        window.print()
    })
})