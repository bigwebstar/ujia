/**
 * Created by web-01 on 2017/12/19.
 */
$(()=>{

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
            $(".mainContainer").css("height","700px");
        }else if($index==0){
            $(".mainContainer").css("height","925px");
        }else if($index==1){
            $(".mainContainer").css("height","925px");
        }else{
            $(".mainContainer").css("height","700px");
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
				console.log($("#t1>div").not(":first-child"));
        $("#t1>div").not(":first-child").hide();
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
        $("#t2>div").not(":first-child").hide();
    });

		// 2.房价计算
		  $(".bg").on("click",function(){
        var $ul = $(".bg .option");
        $ul.toggleClass("show");
    });
    $(".bg1").on("click",function(){
        var $ul = $(".bg1 .option");
        $ul.toggleClass("show");
    });
    $(".bg .option li").on("click",e=>{
        $tar = $(e.target);
        $(".bg .lei").html($tar.html());
    })
    $(".bg1 .option li").on("click",e=>{
        $tar = $(e.target);
        $(".bg1 .lei").html($tar.html());
    })
    $(".sumCal").on("click",function(){
        var $area =parseInt($(".area").val()), $price =parseInt($(".price").val());
        if($(".area").val() == ""){
            alert("请输入住宅面积");
            return
        }else if($(".price").val()==""){
           alert("请输入房屋总价");
           return
       }
       if($(".bg .lei").html()=="普通住宅"){
           $(".num1").html("￥"+ $area*3);
           $(".num2").html("￥"+ $price*150);
           $(".num3").html("￥"+ $price*300);
           $(".num4").html("￥"+ 80);
           $(".num5").html("￥"+ ($area*3+$price*150+$price*300+80));
       }else if($(".bg .lei").html()=="非普通住宅"){
           $(".num1").html("￥"+ $area*11);
           $(".num2").html("￥"+ $price*300);
           $(".num3").html("￥"+ $price*300);
           $(".num4").html("￥"+ 80);
           $(".num5").html("￥"+ ($area*11+$price*300+$price*300+80));
       }

    })
    //房贷计算器
    var sp=$(".bg> .lei").html();
    var type="";
    var html="";
    var rate=[["7折","7.5折","8折","8.5折","9折","最新基准利率","1.05","1.1","1.2","1.3"],["最新基准利率","1.1","1.2"]];
    var rateInput= $("#item-span").next().children().first();
//获取需要显示隐藏的两个item  .item:nth-child(3) .item:nth-child(4)
//console.log($(" .item:nth-child(3)").html()) ;

//默认加载商业贷款的基准利率
    var ratefun= function(){
        for(var i=0;i<rate[0].length;i++){
            // console.log(rate[1][i])
            html+=`<li>${rate[0][i]}</li>`;
            $("#short").html(html);
        };
//    最新基准利率
//console.log($("#item-span").next().children().first().val())
        rateInput.val(4.9)
    }
    ratefun();
//*********************************添加单击弹出****************************************************
$("div.bg").on("click",function(){
    $(".pull-down").css("display","none");
    $(this).next().css("display","block")
   // $(e.target).parent().next().toggle();
})

///***********************************************************************************************************************************************************************
$("#item-span").on("click",function(){
    $(this).children().last().css("display","block")
    // $(e.target).children().last().toggle();
})

$("#short>li").on("click",function(e){
    e.stopPropagation();
    $(e.target).parent().css("display","none");
})
//****************************************************************************************************************************************************************************
$(".item>.pull-down>li").mouseover(function () {
    $(this).css("backgroundColor","#d6d6d6")
})
$(".item>.pull-down>li").mouseout(function () {
    $(this).css("backgroundColor","#fff")
})
//*********************************************************************************
//下拉菜单以及显示修改
$(".item .pull-down>li").on("click",function(e){
    var a=$(this).html();
   type= $(this).parent().prev().children().first().html(a);
   //console.log(type.html())

    var html="";
    if(type.html()=='公积金贷款'){
      $(".item-rate").children().first().html("公积金年利率");
        $("#item-span>.lei").html("最新基准利率")
      for(var i=0;i<rate[1].length;i++){
            // console.log(rate[1][i])
          html+=`<li>${rate[1][i]}</li>`;
          $("#short").html(html);
      };
        $("#short>li").on("click",function(){
            e.stopPropagation();
            $b=$(this).html();
            //console.log(2)
            type= $(this).parent().parent().children().first().html($b);
            /**************************************************************************************************************************************************/
            //$("#short>li").on("click",function(){
                $rateNum= $(this).html();
                $multiple= $(this).parent().parent().children().first().html($rateNum);
                $mul=parseFloat($multiple.html());
              // console.log($mul);
                if(isNaN($mul)){
                    rateInput.val(3.25);
                }else{
                    $result=$mul*3.25;
                    rateInput.val(Math.ceil($result*100)/100);
                }
           // })
            /**************************************************************************************************************************************************/

        })
        $("#short>li").on("click",function(e){
            e.stopPropagation();
            $(e.target).parent().css("display","none");
        })
        rateInput.val(3.25);
    }
    if(type.html()=='商业贷款'){ratefun();
        $("#item-span>.lei").html("最新基准利率")
        $("#short>li").on("click",function(){
            $b=$(this).html();
            //console.log(2)
            type= $(this).parent().parent().children().first().html($b);
            /**************************************************************************************************************************************************/
           // $("#short>li").on("click",function(){
                $rateNum= $(this).html();
                $multiple= $(this).parent().parent().children().first().html($rateNum);
               // console.log($multiple.html())
               // console.log(parseFloat($multiple.html()))
                $mul=parseFloat($multiple.html());
                //console.log($mul);
                if(isNaN($mul)){
                    rateInput.val(4.9);
                }else if($mul>2){
                    $result=$mul*10;
                    rateInput.val(Math.ceil($result*4.9)/100);
                }else{
                    $result=$mul*4.9;
                    rateInput.val(Math.ceil($result*100)/100);
                }
            //})
            /**************************************************************************************************************************************************/

           // console.log($(this).parent().css("display"))
        })
        $("#short>li").on("click",function(e){
            e.stopPropagation();
            $(e.target).parent().css("display","none");
        })
    }
    if(type.html()=='按贷款总额'){
        $(" .item:nth-child(3)").css("display","none");
        $(" .item:nth-child(4)").css("display","none")
    }
    if(type.html()=='按房屋总价'){
        $(" .item:nth-child(3)").css("display","block");
        $(" .item:nth-child(4)").css("display","block")
    }
    // var s=$(e.target).parent().parent().children().first().html()
    // console.log(s)
     if($(e.target).parent().parent().children().first().html()=="贷款比例"){house();}
     $(this).parent().css("display","none");

})
//********************************房屋总价与贷款总额********************************************
 var house=function(){
    if($(".num1").val()!=""){
        $houseValue=parseFloat($(".num1").val());
        $scale=parseInt($(".item:nth-child(4) .lei").html());
        $(".num2").val($houseValue * $scale /10);
    }
}
$(".num1").blur(function(){
    house();
})
//******************************基准利率项点击事件***************************
    $("#short>li").on("click",function(){
        $rateNum= $(this).html();
        $multiple= $(this).parent().parent().children().first().html($rateNum);
        //console.log($multiple.html())
        //console.log(parseFloat($multiple.html()))
        $mul=parseFloat($multiple.html());
        //console.log($mul);
        if(isNaN($mul)){
            rateInput.val(4.9);
        }else if($mul>2){
            $result=$mul*10;
            rateInput.val(Math.ceil($result*4.9)/100);
        }else{
            $result=$mul*4.9;
            rateInput.val(Math.ceil($result*100)/100);
        }
    })

//*************************************计算部分************************************************
    $(".btn").on("click",function(){
        $principal=parseFloat($(".num2").val())    //贷款总额
        $rate=$(".rate").val()                       //利率
        $year=parseInt($(".nian").html())
        $monthNum=parseInt($principal*$rate/12*100)
        $month=$year*12
        $accrual=parseInt($principal*$rate*$year*100)
        $(".monthNum").html($monthNum)
        $(".month").html($month)
        $(".accrual").html($accrual)
        $(".sumMoney").html($accrual+$principal*10000)
    })




});
