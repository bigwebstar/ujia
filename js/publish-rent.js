$(()=>{
    $("#btn1").click(function(e){
        e.preventDefault();
        var uname = $("#uname").val();
        var phone = $("#phone").val();

        var unameReg = /^[A-Za-z0-9]{3,12}$/i;
        if(!unameReg.test(uname)){
            alert("用户名格式不正确,请检查后再试");
            $(".publish-details").hide();
            return;
        }
        var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ ;
        if(!phoneReg.test(phone)){
            alert("手机号格式不正确,请检查后再试");
            $(".publish-details").hide();
            return;
        }

        $.ajax({
            url:"data/user_register.php",
            type:"POST",
            data:{uname:uname,phone:phone},
        });
    });
});
