$(function(){
    let id = $.session.get("custom_id")
    console.log(id)
    $.ajax({
        url:"http://localhost:8000/getCustomer/"+id,
        type:"GET",
        async:false,
        dataType:"json",
        success: function(result){
            console.log(result)
            $("#cusId").text(result[0].cust_id)
            $("#name").text(result[0].name)
            $("#emailId").text(result[0].emailId)
            $("#phone").text(result[0].phone_no)
            $("#address").text(result[0].address)
        }
    })
})