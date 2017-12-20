$("#side_nav").on("mouseenter","a",function(e){
		var i=$(this).css("background-position").split(" ")[1].split("px")[0];
		$(this).css("background-position",0+"px "+i+"px");
		var p=$(this);
		p.children().css("display","block");
		setTimeout(function(){
				p.children().addClass("active");
		},1)
})
$("#side_nav").on("mouseleave","a",function(e){
		var i=$(this).css("background-position").split(" ")[1].split("px")[0];
		$(this).css("background-position",-38+"px "+i+"px");
		var p=$(this);
		p.children().removeClass("active");
		setTimeout(function(){
				p.children().css("display","none");
		},300)

})
$("#box .tab").on("click","span",function(e){
		if(!$(this).hasClass("box_active")) {
				$(this).addClass("box_active").siblings().removeClass();
				$(this).append("<i></i>").siblings().children().remove();
		}
})
//城市切换列表出现
$(".city").on("click","option",function (e) {
	e.preventDefault();
	$(".city-change").show();
	$(".test").show();
	var opa = parseFloat($(".test").css("opacity"));
	var timer = setInterval(function () {
		opa+=0.15;
        $(".test").css("opacity",opa);
        if(opa>0.55){
        	clearInterval(timer);timer=null;
		}
    },50);
});
//关闭城市列表
$(".test,.close-img").on("click",function (e) {
    e.preventDefault();
    var opa = parseFloat($(".test").css("opacity"));
    $(".city-change").hide();
    var timer = setInterval(function () {
        opa-=0.15;
        $(".test").css("opacity",opa);
        if(opa<=0){
            $(".test").hide();
            clearInterval(timer);timer=null;
        }
    },50);
})
//筛选查询上
$(".x-f-block").on("click","#filBtn",function (e) {
    e.preventDefault();
    var kw = $(this).parent().children("input").val();
    sessionStorage.setItem("kw",kw);
	location.href="new-house-sell.html";
});
//筛选查询下
//点击切换
$(".choose").on("click","ul li",function (e) {
    e.preventDefault();
    var opts = $(this).html();
    $(this).parent().prev().html(opts);
    //$(this).parent().css("display","none");
})
//点击发送数据并跳转
$(".fil-btn").on("click",function (e) {
    e.preventDefault();
    var area = $(".choose").children(".fix-item").eq(0).html();
    sessionStorage.setItem("area",area);
    var style = $(".choose").children(".fix-item").eq(2).html();
    sessionStorage.setItem("style",style);
    var price = $(".choose").children(".fix-item").eq(3).html();
    sessionStorage.setItem("price",price);
    location.href="new-house-sell.html";
})