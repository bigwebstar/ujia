
 $(".more-search-aspect").on("mouseenter",".h-more",function(){
     $(".more-search-aspect").children("ul").show();
     $(".floor-age").hide();
     $(".floor-plan").hide();
     $(".floor-else").hide();
 });
$(".more-search-aspect").mouseleave(function(){
    $(".more-search-aspect").children("ul").hide();
    $(".floor-age").show();
    $(".floor-plan").show();
    $(".floor-else").show();
});

  $(".floor-age").on("mouseenter",".h-age",function(){
    $(".floor-age").children("ul").show();

    $(".floor-plan").hide();
    $(".floor-else").hide();
});
$(".floor-age").mouseleave(function(){
    $(".floor-age").children("ul").hide();

    $(".floor-plan").show();
    $(".floor-else").show();
});

$(".floor-plan").on("mouseenter",".h-plan",function(){
    $(".floor-plan").children("ul").show();
    $(".floor-else").hide();
});
$(".floor-plan").mouseleave(function(){
    $(".floor-plan").children("ul").hide();
    $(".floor-else").show();
});

$(".floor-else").on("mouseenter",".h-else",function(){
    $(".floor-else").children("ul").show();

});
$(".floor-else").mouseleave(function(){
    $(".floor-else").children("ul").hide();
});

$(".item2").on("click",".item3 ul li",function (e) {
    e.preventDefault();
    var k = $(this).html();

    var i = $(this).parent().parent().prev().children().html();
    console.log(i);
    if (i === "售价") {
        var pricelow = parseFloat((k + "").split("-")[0]);
        var pricehigh = parseFloat((k + "").split("-")[1]);

        if (!pricelow) {
            pricelow = 1;
        }
        if (!pricehigh) {
            pricehigh = 9999999999;
        }
        $.ajax({
            url: "data/map.search.php",
            type: "GET",
            data: {pricelow: pricelow, pricehigh: pricehigh},
            success: function (data) {
                console.log(data);
                var html = "";
                for (var item of data) {

                    html += `<li class="list-item">
                            <a href="#" target="_blank" title="劲顺花园 居家装修 南北户型 芳草园 莫愁湖地铁。">
                                <div class="item-aside">
                                    <img src="img/map/list1.jpg">
                                    <div class="item-btm">
                                        <span class="item-img-icon">
                                            <i class="i-icon-arrow"></i>
                                            <i class="i-icon-dot"></i>
                                        </span>
                                        <span>7</span>
                                    </div>
                                </div>
                                <div class="item-main" style="position: relative;top: -15px;">
                                    <p class="item-tle">${item.title}</p>
                                    <p class="item-des">
                                        <span>${item.house_room}室${item.house_hall}厅</span>
                                        <span>${item.space}平米</span>
                                        <span>${item.side}</span>
                                        <span class="item-side">${item.price}<span>万</span></span>
                                    </p>
                                    <p class="item-community">
                                        <span>${item.area}</span>
                                    </p>
                                    <p class="item-tag-wrap">
                                        <span class="item-tag-subway item-extra" title="距离2号线汉中门站604米">地铁</span>
                                        <span class="item-tag-taxfree item-extra" title="">房本满五年</span>
                                    </p>
                                </div>
                            </a>
                        </li>`
                }
                $(".r-content").html(html);
            },
            error: function () {
                alert("网络发了故障，请检查");
            }
        });
    } else if (i === "面积") {
        var sizelow = parseFloat((k + "").split("-")[0]);
        var sizehigh = parseFloat((k + "").split("-")[1]);
        console.log(k);
        if (!sizelow) {
            sizelow = 0;
        }
        if (!sizehigh) {
            sizehigh = 99999;
        }
        $.ajax({
            url: "data/map.search.php",
            type: "GET",
            data: {sizehigh: sizehigh, sizelow: sizelow},
            success: function (data) {
                var html = "";
                for (var item of data) {
                    console.log(data)
                    html += `<li class="list-item">
                            <a href="#" target="_blank" title="劲顺花园 居家装修 南北户型 芳草园 莫愁湖地铁。">
                                <div class="item-aside">
                                    <img src="img/map/list1.jpg">
                                    <div class="item-btm">
                                        <span class="item-img-icon">
                                            <i class="i-icon-arrow"></i>
                                            <i class="i-icon-dot"></i>
                                        </span>
                                        <span>7</span>
                                    </div>
                                </div>
                                <div class="item-main" style="position: relative;top: -15px;">
                                    <p class="item-tle">${item.title}</p>
                                    <p class="item-des">
                                        <span>${item.house_room}室${item.house_hall}厅</span>
                                        <span>${item.space}平米</span>
                                        <span>${item.side}</span>
                                        <span class="item-side">${item.price}<span>万</span></span>
                                    </p>
                                    <p class="item-community">
                                        <span>${item.area}</span>
                                    </p>
                                    <p class="item-tag-wrap">
                                        <span class="item-tag-subway item-extra" title="距离2号线汉中门站604米">地铁</span>
                                        <span class="item-tag-taxfree item-extra" title="">房本满五年</span>
                                    </p>
                                </div>
                            </a>
                        </li>`
                }
                $(".r-content").html(html);
            },
            error: function () {
                alert("网络发了故障，请检查");
            }
        });
    }else if(i==="房型"){
        var house_room=k;
        if(!house_room){
            house_room="";
        }
        $.ajax({
            url: "data/map.search.php",
            type: "GET",
            data: {sizehigh: sizehigh, sizelow: sizelow},
            success: function (data) {
                var html = "";
                for (var item of data) {
                    console.log(data)
                    html += `<li class="list-item">
                            <a href="#" target="_blank" title="劲顺花园 居家装修 南北户型 芳草园 莫愁湖地铁。">
                                <div class="item-aside">
                                    <img src="img/map/list1.jpg">
                                    <div class="item-btm">
                                        <span class="item-img-icon">
                                            <i class="i-icon-arrow"></i>
                                            <i class="i-icon-dot"></i>
                                        </span>
                                        <span>7</span>
                                    </div>
                                </div>
                                <div class="item-main" style="position: relative;top: -15px;">
                                    <p class="item-tle">${item.title}</p>
                                    <p class="item-des">
                                        <span>${item.house_room}室${item.house_hall}厅</span>
                                        <span>${item.space}平米</span>
                                        <span>${item.side}</span>
                                        <span class="item-side">${item.price}<span>万</span></span>
                                    </p>
                                    <p class="item-community">
                                        <span>${item.area}</span>
                                    </p>
                                    <p class="item-tag-wrap">
                                        <span class="item-tag-subway item-extra" title="距离2号线汉中门站604米">地铁</span>
                                        <span class="item-tag-taxfree item-extra" title="">房本满五年</span>
                                    </p>
                                </div>
                            </a>
                        </li>`
                }
                $(".r-content").html(html);
            },
            error: function () {
                alert("网络发了故障，请检查");
            }
        });
     }


    $(this).parent().parent().prev().children().html(k);
});

 $(".item5").on("click","ul li",function (e) {
     e.preventDefault();
     var k=$(this).html();
     $(this).parent().prev().prev().children().html(k);
 })

 $(".item5").on("click","ul li",function (e) {
     e.preventDefault();
     var k=$(this).html();
     $(this).parent().prev().prev().children().html(k);
 })

 $(".header-search").on("click","ul a li",function (e) {
     e.preventDefault();
    var k=$(this).html();
    $(this).parent().parent().prev().html(k);
 })

 $(".clear").on("click","span",function (e) {
     e.preventDefault();
     $(".h-type").children().html("房型");
     $(".h-area").children().html("面积");
     $(".h-price").children().html("售价");
     $(".h-more").children("p").html("不限");
     $(".h-age").children("p").html("5年以内");
     $(".h-plan").children("p").html("不限");
     $(".h-else").children("p").html("不限");
 })

