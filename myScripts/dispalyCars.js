$(function(){
    let allCars = []
    
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
        $("#allCars").append("<li class=''><span> Car number :"+allCars[i].car_no+"</span><br>"+
        "<span> Car Brand :"+allCars[i].car_brand+"</span><br>"+
        "<span> Car Model :"+allCars[i].car_model+"</span><br>"+
        "<span> Car Milage :"+allCars[i].car_milage+"</span><br>"+
        "<span> Car Image :"+allCars[i].car_image+"</span><br>"+
        "<span> Car rent per hour :"+allCars[i].renting_per_hour+"</span><br>"+
        "<span> Car rent per day :"+allCars[i].renting_per_day+"</span><br>"+
        "</li>")
    }
    

})