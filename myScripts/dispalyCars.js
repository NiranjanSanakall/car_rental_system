$(function(){
    let allCars = []
    var totalAmt = 0;
    let cust_id = $.session.get("id")
    let name = $.session.get("name")
    let emailId = $.session.get("emailId")
    let phone_no = $.session.get("phone_no")
    let address = $.session.get("address")

    $.ajax({
        url:"http://localhost:8000/getCars",
        type:"GET",
        async:false,
        dataType:'json',
        success: function(result){
            allCars = result
        }
    })
    for(let i=0;i<allCars.length;i++){
        $("#allCars").append("<li class=''>"+
        "Car id :<span id='cId"+i+"'>"+allCars[i].car_id+"</span><br>"+
        "Car number :<span id='cNo"+i+"'>"+allCars[i].car_no+"</span><br>"+
        "Car Brand :<span id='cBrand"+i+"'>"+allCars[i].car_brand+"</span><br>"+
        "Car Model :<span id='cModel"+i+"'>"+allCars[i].car_model+"</span><br>"+
        "Car Milage :<span id='cMilage"+i+"'>"+allCars[i].car_milage+"</span><br>"+
        "Car Image :<span id='cImg"+i+"'>"+allCars[i].car_image+"</span><br>"+
        "<input id='rphB"+i+"' type='radio' value='per hour' name='rentType'>Rent per hour :<span id='cRph"+i+"'>"+allCars[i].renting_per_hour+"</span><br>"+
        "<input id='rpdB"+i+"' type='radio' value='per day' name='rentType'>Rent per day :<span id='cRpd"+i+"'>"+allCars[i].renting_per_day+"</span><br>"+
        "<input type='number' id='num-"+i+"' style='display:none' placeholder='Enter Number of cars'>"+
        "<input type='datetime-local' id='resDate-"+i+"' style='display:none' placeholder='Enter Your reservation date'>"+
        "<input type='datetime-local' id='retDate-"+i+"' style='display:none' placeholder='Enter Your returning date'>"+
        "<button id='takeRent-"+i+"' style='display:block'>Buy For rent</button>"+
        "<button id='cnfRent-"+i+"' style='display:none'>confirm rent</button>"+
        "</li>")
    }

    
    $("#allCars").on("click","button",function(e){
        e.preventDefault()
        let i = this.id.split('-')[1]
        let btnType = this.id.split('-')[0]
        if (btnType == 'takeRent') { 
            $("#resDate-"+i).css("display","block")
            $("#retDate-"+i).css("display","block")
            $("#num-"+i).css("display","block")
            $("#takeRent-"+i).hide();
            $("#cnfRent-"+i).show();
        }
        else{
            let car_id = $("#cId"+i).text()
            let rentType = $("input[type = 'radio']:checked").val()
            let resDate = $("#resDate-"+i).val()
            let retDate = $("#retDate-"+i).val()
            let noOfCars = $("#num-"+i).val()

            let reservedDate = new Date(resDate)
            let returningDate = new Date(retDate)
            let rentPerHr = allCars[i].renting_per_hour
            let rentPerDay = allCars[i].renting_per_day
            

            if (!isNaN(reservedDate) && !isNaN(returningDate)) {
                var difference = returningDate.getTime() - reservedDate.getTime();
                var minutesDifference = Math.floor(difference / (1000 * 60));
                if(rentType=="per hour"){
                    totalAmt = (minutesDifference/60)*rentPerHr*noOfCars
                }
                else{
                    totalAmt = (minutesDifference/(60*24))*rentPerDay*noOfCars
                }
            }
            console.log(totalAmt)
            
            $.ajax({
                url:"http://localhost:8000/addReservation",
                type:"POST",
                dataType:"json",
                data:{"cust_id":cust_id,"car_id":car_id,"rentType":rentType,"resDate":resDate,"retDate":retDate,"noOfCars":noOfCars,"totalAmt":totalAmt},
                success: function(result){
                    alert("reservation added successfully");
                }
            })
        }   
    })

})