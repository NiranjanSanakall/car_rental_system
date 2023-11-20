$(function () {
  let data = [];
  data = $.session.get("data");
  console.log(data);

  $("#addCar").on("click", function (e) {
    e.preventDefault();

    let brand = $("#brand").val();
    let model = $("#model").val();
    let cNumber = $("#cNumber").val();
    let milage = $("#milage").val();
    let rentPerHour = $("#rentPerHour").val();
    let rentPerDay = $("#rentPerDay").val();

    var formData = new FormData();
    var fileInput1 = $("#imgUrl")[0].files[0];
    let fnamex = fileInput1.name;
    console.log(fileInput1);
    var extn = fnamex.substring(fnamex.lastIndexOf("."), fnamex.length);
    // alert(extn)
    if (fileInput1.size <= 1000000) {
      $.ajax({
        url: "http://localhost:8000/maxOfCarIdForNaming",
        type: "GET",
        dataType: "json",
        success: function (result) {
          console.log(result);
        },
      });
      formData.append("file", fileInput1);
      $.ajax({
        url: "http://localhost:8000/uploadCarImg",
        type: "POST",
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function (result) {
          $("#status").text("Uploaded Succesfully");
          $("#status").css("color", "green");
          $("#status").fadeOut(10000);
        },
        error: function (error) {
          console.log(error);
        },
      });

      $.ajax({
        url: "http://localhost:8000/addCar",
        type: "POST",
        dataType: "json",
        data: {
          brand: brand,
          model: model,
          cNumber: cNumber,
          extn: extn,
          milage: milage,
          rentPerHour: rentPerHour,
          rentPerDay: rentPerDay,
        },
        success: function (result) {
          alert("Car is Added");
        },
      });
    } 
    else {
      $("#status").text("Upload Failed!!! Fsize>100KB");
      $("#status").css("color", "red");
      $("#status").fadeOut(5000);
      $("#fileInput").val("");
      // alert("File size must be less than 100kb")
    }
  });
});
