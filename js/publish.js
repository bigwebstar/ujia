$(()=>{
    $(".publish-details").hide();
    $("#btn1").click(function (e) {
        e.preventDefault();
        var data1=$(".main-form").serialize();
        $.ajax({
            type:"POST",
            url:"data/routes/products/publish-step1.php",
            data:data1,
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    $(".publish-details").show();
                    $(".publish-details").attr("data-uid",data.uid);
                    $(".form-details").attr("data-hid",data.hid);
                }else{
                    alert(data.msg);
                }
                console.log(data);
            },
            error:function(){
                alert("网络错误");
            }
        });
    });
    $("#cancel-btn").click(function (e) {
        e.preventDefault();
        $(".publish-details").hide();
    });
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
        xhr.open("POST","data/controllers/product_upload.php",true);
        xhr.setRequestHeader("X-Requested-With",
            "XMLHttpRequest");
        xhr.send(fd);
    });
    $("#submit-btn").click(function (e) {
        e.preventDefault();
        var data2=$(".form-details").serialize()+"&uid="+$(".publish-details").attr("data-uid");
        $.ajax({
            type:"POST",
            url:"data/routes/products/publish-step2.php",
            data:data2,
            success:function (data) {
                alert(data.msg);
                location.href="publish.shtml";
            },
            error:function(){
                alert("网络错误");
            }
        });
    })
});

