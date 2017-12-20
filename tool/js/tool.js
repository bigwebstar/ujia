/**
 * Created by web-01 on 2017/12/19.
 */
$(()=>{
    $("").load("product-header.html");
    $("#footer").load("footer.html");
    // tab页切换
    $(".toolTag").on("click","li",function(e){
        e.preventDefault();
        // console.log($(this));
        $(this).css({background:"#394043"});
        $(this).siblings().css({background:"#fff"});
        $(this).addClass("li_on").siblings().removeClass("li_on");
        $(this).children().addClass("a_on").parents().siblings().children().removeClass("a_on");
        // console.log($(this).children());
        // console.log(this);
        var $index=$(this).index();
        $(".appContainer").find(".toolContent:eq("+$index+")").show().siblings().hide();
        if($index==2){
            $(".mainContainer").css("height","797px");
        }else if($index==0){
            $(".mainContainer").css("height","958px");
        }else if($index==1){
            $(".mainContainer").css("height","958px");
        }else{
            $(".mainContainer").css("height","797px");
        }
    });
    //获得焦点事件
    $(".toolTag").on("mouseenter","li:not(.li_on)",function(e){
        e.preventDefault();
        console.log(1);
        $(this).css("background","#F5F5F6");
    });
    $(".toolTag").on("mouseleave","li:not(.li_on)",function(e){
        e.preventDefault();
        $(this).css("background","#fff");
    });

    //购房资质测试
    $("#d1").on("click",".choice",function(e){
        e.preventDefault();
         // var a=$(this).is($(".choice").first());
        if($(this).is($("#d1 .choice").first())){
            // console.log(1);
            $("#d1").css("display","none");
            $("#d2").css("display","block");
        }else{
            $("#d1").css("display","none");
            $("#d4").css("display","block");
        }
    });
    $("#d2").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d2 .choice").first())){
            // $("#d1").css("display","none");
            $("#d2").css("display","none");
            $("#d3").css("display","block");
        }else{
            $("#d2").css("display","none");
            $("#d7").css("display","block");
        }
    });
    $("#d3").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d3 .choice").first())){
            // $("#d1").css("display","none");
            $("#d3").css("display","none");
            $("#d5").css("display","block");
        }else{
            $("#d3").css("display","none");
            $("#d6").css("display","block");
        }
    });
    $("#d4").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d4 .choice").first())){
            // $("#d1").css("display","none");
            $("#d4").css("display","none");
            $("#d8").css("display","block");
        }else{
            $("#d4").css("display","none");
            $("#d9").css("display","block");
        }
    });
    $(".prevBtn").on("click","input",function(e){
        e.preventDefault();
        // console.log(e.target);
        // console.log(this);
        if($(this).parent().parent().parent().is($("#d4"))){
            $(this).parent().parent().parent().hide();
            $("#d1").show();
        }else{
            $(this).parent().parent().parent().hide();
            $(this).parent().parent().parent().prev().show();
        }
    });
    $(".dd2").on("click","span:last-child",function(e){
        e.preventDefault();
        $("#d1").show();
        $(".toolLeft>div").not(":first-child").hide();
    });
    //最低首付测试
    $("#d11").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($(".choice").first());
        if($(this).is($("#d11 .choice").first())){
            // console.log(1);
            $("#d11").css("display","none");
            $("#d12").css("display","block");
        }else{
            $("#d11").css("display","none");
            $("#d14").css("display","block");
        }
    });
    $("#d12").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d12 .choice").first())){
            // $("#d1").css("display","none");
            $("#d12").css("display","none");
            $("#d13").css("display","block");
        }else{
            $("#d12").css("display","none");
            $("#d17").css("display","block");
        }
    });
    $("#d13").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d13 .choice").first())){
            // $("#d1").css("display","none");
            $("#d13").css("display","none");
            $("#d15").css("display","block");
        }else if($(this).is($(" #d13 .choice").last())){
            $("#d13").css("display","none");
            $("#d16").css("display","block");
        }else{
            $("#d13").css("display","none");
            $("#d18").css("display","block");
        }
    });
    $("#d14").on("click",".choice",function(e){
        e.preventDefault();
        // var a=$(this).is($("#d2 .choice").first());
        // console.log(a);
        if($(this).is($(" #d14 .choice").first())){
            // $("#d1").css("display","none");
            $("#d14").css("display","none");
            $("#d18").css("display","block");
        }else{
            $("#d14").css("display","none");
            $("#d19").css("display","block");
        }
    });
    $(".prevBtn2").on("click","input",function(e){
        e.preventDefault();
        // console.log(e.target);
        // console.log(this);
        if($(this).parent().parent().parent().is($("#d14"))){
            $(this).parent().parent().parent().hide();
            $("#d11").show();
        }else{
            $(this).parent().parent().parent().hide();
            $(this).parent().parent().parent().prev().show();
        }
    });
    $(".dd2").on("click","span:last-child",function(e){
        e.preventDefault();
        $("#d11").show();
        $(".toolLeft>div").not(":first-child").hide();
    });
});
