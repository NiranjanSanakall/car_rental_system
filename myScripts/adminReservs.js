$(function(){
    let All_reservation_data=[]

    $.ajax({
        url:"http://localhost:8000/getReservsForAdmin",
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            All_reservation_data = result
        }
    })

    for(let i=0; i<All_reservation_data.length; i++){
        $("#adminReservs").append("<li>"+
        "Reservation Id : <span id='res_id"+i+"'>"+All_reservation_data[i].res_id+"</span><br>"+
        "Customer Id : <span id='cust_id-"+i+"'>"+All_reservation_data[i].cust_id+"</span><br>"+
        "Car Id : <span id='car_id-"+i+"'>"+All_reservation_data[i].car_id+"</span><br>"+
        "Reservation Type : <span id='resType"+i+"'>"+All_reservation_data[i].reservation_type+"</span><br>"+
        "Reserved Date : <span id='resDate"+i+"'>"+All_reservation_data[i].reserved_date+"</span><br>"+
        "Returning Date : <span id='retDate"+i+"'>"+All_reservation_data[i].returned_date+"</span><br>"+
        "Number Of Cars : <span id='noOfCar"+i+"'>"+All_reservation_data[i].no_of_cars+"</span><br>"+
        "Total Amount : <span id='totalAmt"+i+"'>"+All_reservation_data[i].total_amount+"</span><br>"+
        "<button id='btnCanel-"+i+"'>Cancel</button>"+
        "</li>")       
    }

    $("#adminReservs").on("click","button",function(e){
        e.preventDefault()
        let btnType = this.id.split('-')[0]
        let i = this.id.split('-')[1]
    
        if(btnType=="btnCanel"){
            $.ajax({
                url:"http://localhost:8000/deleteReservations/"+All_reservation_data[i].res_id,
                type:"GET",
                dataType:"json",
                success: function(result){
                    alert("data deleted...")
                }
            })
            $("#adminReservs li:eq("+i+")").remove();
        }
    })

    $("#adminReservs").on("click","span",function(e){
        e.preventDefault()
        let idType = this.id.split('-')[0]
        let i = this.id.split('-')[1]
        let id = $("#"+idType+"-"+i).text()
        
        if(idType=="cust_id"){
            $.session.set("custom_id",id)
            window.location = "../myPages/customerForAdmin.html"
        }
        else if(idType=="car_id"){
            $.session.set("caar_id",id)
            window.location = "../myPages/carsForAdmin.html"
        }
    })
})
