$(function(){

    
    $("#authenticate").on("click",function(e){
        e.preventDefault()

        var info = [];

        let uid = $("#uid").val()
        let pwd = $("#pwd").val()
        $.ajax({
            url:"http://localhost:8000/authenticate",
            type:"POST",
            async:false,
            dataType:"json",
            data:{"uid":uid,"pwd":pwd},
            success: function(result){
                info = result;
            },
        })

        if(info.key == 1){
            alert("It seems like you have not yet created an account")
        }
        else if(info.key == 2){
            alert("It seems like your password is wrong!!!")
        }
        else{
            window.location = "../myPages/profile.html"
            $.session.set("id",info[0].cust_id)
            $.session.set("name",info[0].name)
            $.session.set("emailId",info[0].emailId)
            $.session.set("phone_no",info[0].phone_no)
            $.session.set("address",info[0].address) 
        }
    })
})