/**
 * Created by web-01 on 2017/12/14.
 */
//打开 关闭注册页面
$("[data-log=reg]").click(function (e) {
    e.preventDefault();
    $("div.overlay_bg").show();
    $("#dialog_reg").show();
})
$(".close_login").click(function () {
    $("#dialog_reg").fadeOut();
    $("div.overlay_bg").fadeOut();
});
$(".overlay_bg").click(function () {
    $("#dialog_reg").fadeOut();
    $("div.overlay_bg").fadeOut();
})
// 切换登录
$(".reg_log").click(function () {
    $("#dialog_reg").fadeOut();
    $("#dialog").show();
});
//改变提示框中的内容
    function test(txt) {
        $(".show-err").css("display","list-item");
        $(".show-err>dd").text(txt);
    }
    //为输入框文本框改变样式
    function addStyle(name) {
        name.addClass("success");
        $(".show-err").addClass("show-suc");
    }
    function removeStyle(name) {
        name.removeClass("success");
        $(".show-err").removeClass("show-suc");
    }
    //获取输入框
    let $name = $("#tName"), $pwd = $("#tPwd"),
        $cpwd = $("#cPwd"), $phone = $("#phone");
     let uPatt= /^[\u4e00-\u9fa5\w]{2,16}$/i,
         pPatt=/^\w{6,12}$/i, pNumber=/^1[3|4|5|8][0-9]\d{4,8}$/;
//用户框失去焦点后验证value值
function checkName() {
    $name.blur(e=>{
        removeStyle($name);
        var n =$name.val();
        if(!n){
            var txt="用户名不能为空";
            test(txt);
        }else if(!uPatt.test(n)){
            var txt="用户名格式不正确，请检查后再试";
            test(txt);
        }else {
            $.ajax({
                type:"POST",
                url:"data/routes/users/checkName.php",
                data:{uname:n},
                dataType:'json',
                success:function (data) {
                    // console.log(data);
                    if(data.code==1){
                        addStyle($name);
                        var txt="用户名可以使用";
                        test(txt);
                    }else{
                        var txt="用户名已被占用，请重新输入";
                        test(txt);
                    }
                },
                error:function () {
                    alert("网络故障请检查");
                }
            })
        }
    })
}
checkName()
//密码框失去焦点后验证value值
function checkPwd() {
    $pwd.blur(e=>{
        var p=$pwd.val();
        // console.log(p);
        $(".show-err").removeClass("show-suc");
        if(!p){
            var txt="密码不能为空,请输入密码";
            test(txt);
        }else if(!pPatt.test(p)){
            var txt="密码格式不正确,请检查";
            test(txt);
        }else {
            var txt="密码格式正确";
            test(txt);
            addStyle($pwd);
            var cp=$cpwd.val();
            if(cp){
                if(p==cp){
                    var txt="两次密码输入一致";
                    test(txt);
                    addStyle($cpwd);
                }else{
                    $(".show-err").removeClass("show-suc");
                    $cpwd.removeClass("success");
                    var txt="两次密码不一致,请检查";
                    test(txt);

                }
            }
        }
    })
}
checkPwd()
//密码框失去焦点后验证value值
function cpwdBlur() {
    $cpwd.blur(e=> {
        var p=$pwd.val();
        var cp = $cpwd.val();
        removeStyle($cpwd);
        // console.log(cp);
        if(!cp){
            var txt="密码不能为空,请输入密码";
            test(txt);
        }else if(!pPatt.test(cp)){
            var txt="密码格式不正确,请检查";
            test(txt);
        }else if(cp!=p){
            var txt="两次密码不一致,请检查";
            test(txt);
        }else{
            var txt="两次密码输入一致";
            test(txt);
            addStyle($cpwd);
        }
    })
}
cpwdBlur();
// 手机号码框失去焦点后验证
function phoneBlur(){
        $phone.blur(e=>{
            removeStyle($phone);
            var pho =$phone.val();
            if(!pho){
                var txt="手机号不能为空,请输入";
                test(txt);
            }else if(!pNumber.test(pho)){
                var txt="号码格式不正确,请检查";
                test(txt);
            }else{
                var txt="号码正确，可以使用";
                test(txt);
                addStyle($phone);
            }
        })
    }
phoneBlur()
// 注册按钮 验证  不通过阻止提交
$("#btnReg").click(function () {
    var num =0;
    $("#con_reg_user li").each(function () {
        // console.log($(this));
        if($(this).find('input').hasClass('success')){
            num++;
        }
    })
    if(num==4){
        var pho =$phone.val();
        var name =$name.val();
        var pwd=$pwd.val();
        $.ajax({
            type:"POST",
            url:"data/routes/users/register.php",
            data:{uname:name,upwd:pwd,phone:pho},
            success:function (data) {
                if(data.code==1){
                    location.href="index.html";
                }else{
                    var txt="用户名已被占用，请重新输入";
                    test(txt);
                }
            },
            err:function () {
                alert("网络故障请检查");
            }
        })
    }else {
        checkName();
    }
})