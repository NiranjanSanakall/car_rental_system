$(function(){
    $("#registerForm").on("click",function(e){
        e.preventDefault()
        var name = $('#name').val();
        var email = $('#emailid').val();
        var phoneNo = $('#phoneNo').val();
        var address = $('#address').val();
        var newPassword = $('#newPassword').val();
        var rePassword = $('#rePassword').val();
        if (name == "" || email==""|| phoneNo==""|| address==""|| newPassword==""|| rePassword=="")
            $("#alertMsg").text("Enter all details")
        if(newPassword==rePassword){
            $.ajax({
                url:"http://localhost:8000/registerForm",
                type:"POST",
                dataType:"json",
                data:{"name":name,"email":email,"phoneNo":phoneNo,"address":address,"password":newPassword},
                success:function(result){
                    alert("Registration Successfull...")
                }
            })
        }
    })
})