$(function(){
    let id = $.session.get("caar_id")
    console.log(id)
    $.ajax({
        url: "http://localhost:8000/car/"+id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            $("#carId").text(result[0].car_id)
            $("#carNo").text(result[0].car_no)
            $("#carBrand").text(result[0].car_brand)
            $("#carModel").text(result[0].car_model)
            $("#carMilage").text(result[0].car_milage)
            $("#carImage").attr("src",result[0].car_image)
            $("#rentPhr").text(result[0].renting_per_hour)
            $("#rentPday").text(result[0].renting_per_day)
        }
    })
})