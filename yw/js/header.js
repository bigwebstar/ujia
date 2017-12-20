// /**
//  * Created by web-01 on 2017/12/13.
//  */
// /*登录判断*/
 $(function(){
     var $loginList=$("#loginList");
     var $welcomeList=$("#welcomeList");
     $.ajax({
         type:"GET",
         url:"data/routes/users/isLogin.php",
         success:function(data){
            if(data.ok==1){
                $loginList.css("display","none");
                $welcomeList.css("display","block");
                $("#username").html(data.uname);
            }else{
                $welcomeList.css("display","none");
                $loginList.css("display","block");
            }
         },
         error:function(){
             alert("网络错误,请检查");
         }
     });
    $("#logout").click(function(){
         $.ajax({
             type:"GET",
             url:"data/routes/users/logout.php",
             success:function(data){
                 location.reload();
             },
             error:function(){
                 alert("网络错误,请检查");
             }
         })
     })
 });
/*搜索框上方的轮播*/
function scroll(lh,speed,delay) {
    var p=false;
    var t;
    var o=document.getElementById("advs");
    o.innerHTML+=o.innerHTML;
    o.style.marginTop=0;
    function start(){
        t=setInterval(scrolling,speed);
        if(!p)
            o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
    }

    function scrolling(){
        if(parseInt(o.style.marginTop)%lh!=0){
            o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
            if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2)
                o.style.marginTop=0;
        }else{
            clearInterval(t);
            setTimeout(start,delay);
        }
    }
    setTimeout(start,delay);
}
scroll(35,35,3000);
