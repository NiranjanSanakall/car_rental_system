$(function(){

    $("#addCar").on("click",function(e){
        e.preventDefault()

        let brand = $("#brand").val()
        let model = $("#model").val()
        let cNumber = $("#cNumber").val()
        let imgUrl = $("#imgUrl").val()
        let milage = $("#milage").val()
        let rentPerHour = $("#rentPerHour").val()
        let rentPerDay = $("#rentPerDay").val()

        $.ajax({
            url:"http://localhost:8000/addCar",
            type:"POST",
            dataType:"json",
            data:{"brand":brand,"model":model,"cNumber":cNumber,
            "imgUrl":imgUrl,"milage":milage,
            "rentPerHour":rentPerHour,"rentPerDay":rentPerDay},
            success:function(result){
                alert("Car is Added")
            }
        })
    })
})