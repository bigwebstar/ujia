/**
 * Created by web-01 on 2017/12/12.
 */
//售价/面积/房型等选中效果切换
$(".list-more").on("click","ul li a span",function (e) {
    e.preventDefault();
    $(this).parent().children("span").eq(0).toggleClass("fangkuang").toggleClass("gou");
});
//筛选选中效果切换
$(".filterAgain").on("click","ul li h3 a span.checkbox",function(e){
    e.preventDefault();
    $(this).toggleClass("dian");
});
//更多选项/收起选项显示及隐藏
$(".btn-more").on("click",function (e) {
    e.preventDefault();
    $(this).html($(this).html()==="收起选项"?"更多选项":"收起选项");
    $(this).prev().children("ul").toggleClass("list_small").toggleClass("try");
    $(this).prev().find("ul:gt(3)").toggle();
});
//区域/地铁线切换
$(".position").on("click",".position-nav li a:first-child",function (e) {
    e.preventDefault();
    $(".position-content").children("li").eq(0).show();
    $(".position-content").children("li").eq(1).hide();
});
$(".position").on("click",".position-nav li a:last-child",function (e) {
    e.preventDefault();
    $(".position-content").children("li").eq(1).show();
    $(".position-content").children("li").eq(0).hide();
});

