$(()=>{
    $(".publish-details").hide();
    $("#btn1").click(function (e) {
        e.preventDefault();
        $(".publish-details").show();
    });
    $("#close").click(function(e){
        e.preventDefault();
        $(".publish-details").hide();
    })

	$("#upload").click(function(){
    $("#img-upload").click();
    });
    var file = $("#img-upload");
    file.on('change', function( e ){
        var fileInfo = e.currentTarget.files[0].name;
        $("#up-routes").val(fileInfo);
        console.log(fileInfo);
    });

    $("#up-btn").click(function () {
        var hid=$(".form-details").attr("data-hid");
        var fileInfo = document.getElementById("img-upload").files;
        var rs = fileInfo[0].type.indexOf("image");
        if(rs==-1){
            alert("只能上传图片格式的文件");
            return;
        }
        var size = Math.ceil(fileInfo[0].size/1024);
        if(size>2048){
            alert("上传图片太大，不能超过2MB");
            return;
        }
        var fd = new FormData();
        fd.append("mypic",fileInfo[0]);
        fd.append("hid",hid);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(xhr.responseText);
        };
        xhr.open("POST","data/product_upload.php",true);
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        xhr.send(fd);
    });
});

