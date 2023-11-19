$(function(){
    let cust_id = $.session.get("id")
    let name = $.session.get("name")
    let phone = $.session.get("phone_no")
    let emailId = $.session.get("emailId")
    let address = $.session.get("address")

    $("#cusId").text(cust_id)
    $("#name").text(name)
    $("#emailId").text(emailId)
    $("#phone").text(phone)
    $("#address").text(address)
})