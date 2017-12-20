/**
 * Created by web-01 on 2017/12/12.
 */
//售价/面积/房型等选中效果切换
$(".list-more").on("click","ul li a span",function (e) {
    e.preventDefault();
    $(".chose").show();
    $(this).parent().children("span").eq(0).toggleClass("fangkuang").toggleClass("gou");
    var searchItem=$(this).parent().children("span").eq(1).html();
    var html=$(".chose").html();


    if(!$(this).parent().children("span").eq(0).hasClass("fangkuang")){
        html+=`
        <a href="#" class="chose-item">
            <span class="chose-name">${searchItem}</span>
            <i class="chose-close">X</i>
        </a>
        `;
        //发送请求
        var $taeget = $(this).parent().parent().prev().children().html();
        if($taeget=="区域"){
            var area = $(this).parent().children().eq(1).html();
        }else if($taeget=="售价"){
            var price = $(this).parent().children().eq(1).html();
            var pricelow = parseFloat(price);
            if(!pricelow){
                pricelow=1;
            }
            var pricehigh = parseInt((price+"").split("-")[1]);
            if(!pricehigh){
                pricehigh=99999999;
            }
        }else if($taeget=="房型"){
            var style = $(this).parent().children().eq(1).html();
            var house_room =parseInt(style);
            if(!house_room){
                house_room=999;
            }
        }

        $.ajax({
            type:"GET",
            url:"data/03_newhouse_search.php",
            data:{area:area,house_room:house_room,pricelow:pricelow,pricehigh:pricehigh},
            success:function(data){
                console.log(data);
                var htmll="";
                for(var obj of data){
                    htmll+=`
                <li>
               <a href="#">
                   <img src="img/second-sell/1.jpg" alt="">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${obj.area}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				 ${obj.address}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.ladder_ratio}
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.shot_time}
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">在售</span>
                       		<span class="taxfree">${obj.building_type}</span>
                       		<span class="haskey">五证齐全</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${obj.price}万元</span>
                   		</div>
                   </div>
               </div>
           </li>
                `
                }
                var len = data.length;
                $(".resultDes").children("h2").children("span").eq(0).html(len);
                $(".main .ss-product").html(htmll);
            },
            error:function(){
                alert("网络错误,请检查!");
            }
        })


    }else{
        //取消搜索
        //发送请求
        var $taeget = $(this).parent().parent().prev().children().html();
        if($taeget=="区域"){
            var area = "";
        }else if($taeget=="售价"){

            var pricelow = 1;
            var pricehigh = 99999999;
        }else if($taeget=="房型"){
            var house_room =999;
            }

        $.ajax({
            type:"GET",
            url:"data/03_newhouse_search.php",
            data:{area:area,house_room:house_room,pricelow:pricelow,pricehigh:pricehigh},
            success:function(data){
                console.log(data);
                var htmll="";
                for(var obj of data){
                    htmll+=`
                <li>
               <a href="#">
                   <img src="img/second-sell/1.jpg" alt="">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${obj.area}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				 ${obj.address}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.ladder_ratio}
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.shot_time}
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">在售</span>
                       		<span class="taxfree">${obj.building_type}</span>
                       		<span class="haskey">五证齐全</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${obj.price}万元</span>
                   		</div>
                   </div>
               </div>
           </li>
                `
                }
                var len = data.length;
                $(".resultDes").children("h2").children("span").eq(0).html(len);
                $(".main .ss-product").html(htmll);
            },
            error:function(){
                alert("网络错误,请检查!");
            }
        })
    }
        $(".chose").html(html);

});
$(".position").on("click",".position-nav li a:last-child",function (e) {
    e.preventDefault();
    $(".position-content").children("li").eq(1).show();
    $(".position-content").children("li").eq(0).hide();
});
//更多选项/收起选项显示及隐藏
$(".btn-more").on("click",function (e) {
    e.preventDefault();
    $(this).html($(this).html()==="收起选项"?"更多选项":"收起选项");
    $(this).prev().children("ul").toggleClass("list_small").toggleClass("try");
    $(this).prev().find("ul:gt(3)").toggle();
});
//选择条件的关闭
$(".chose").on("click","a.chose-item>i.chose-close",function (e) {
    e.preventDefault();
    $(this).parent().remove();
    getData();
    // var itemName = $(this).prev().html();
    // console.log(itemName);
    // for(var i=0;i<16;i++){
    //     console.log($(".list_small").children("li").eq(1).children("a").eq(i).children("span").eq(1).html());
    //   if($(".list_small").children("li").eq(1).children("a").eq(i).children("span").eq(1).html()===itemName){
    //       console.log(1);
    //      $(".list_small").children("li").eq(1).children("a").eq(i).children("span").eq(0).removeClass("fangkuang") }
    //  }
    if($(".chose>a").hasClass("chose-item")){
        $(".chose").show();
    }else{
        $(".chose").hide();
    }
});
//点击搜索条件后在下方显示
$(()=>{
    var kw =sessionStorage.getItem("kw");
    console.log(kw);
    var area =sessionStorage.getItem("area");
    if(area=="不限"){
        area="";
    }
    console.log(area);
    var house_room =parseInt(sessionStorage.getItem("style"));
    if(!house_room){
        house_room=999;
    }
    console.log(house_room);
    var pricelow = parseFloat(sessionStorage.getItem("price"));
    if(!pricelow){
        pricelow=1;
    }
    console.log(pricelow);
    var pricehigh = parseInt(sessionStorage.getItem("price")+"".split("-")[1]);
    if(!pricehigh){
        pricehigh=99999999;
    }
    console.log(pricehigh);
    $.ajax({
        type:"GET",
        url:"data/03_newhouse_search.php",
        data:{kw:kw,area:area,house_room:house_room,pricelow:pricelow,pricehigh:pricehigh},
        success:function(data){
            console.log(data);
            var html="";
            for(var obj of data){
                html+=`
                <li>
               <a href="#">
                   <img src="img/second-sell/1.jpg" alt="">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${obj.area}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				 ${obj.address}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.ladder_ratio}
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.shot_time}
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">在售</span>
                       		<span class="taxfree">${obj.building_type}</span>
                       		<span class="haskey">五证齐全</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${obj.price}万元</span>
                   		</div>
                   </div>
               </div>
           </li>
                `
            }
            var len = data.length;
            $(".resultDes").children("h2").children("span").eq(0).html(len);
            $(".main .ss-product").html(html);
            // sessionStorage.setItem("kw",null);
            // sessionStorage.setItem("area",null);
            // sessionStorage.setItem("style",null);
            // sessionStorage.setItem("price",null);
        },
        error:function(){
            alert("网络错误,请检查!");
        }
    })
});

function getData(){
    var area = "";
    var pricelow = 1;
    var pricehigh = 99999999;
    var house_room =999;
$.ajax({
    type:"GET",
    url:"data/03_newhouse_search.php",
    data:{area:area,house_room:house_room,pricelow:pricelow,pricehigh:pricehigh},
    success:function(data){
        console.log(data);
        var htmll="";
        for(var obj of data){
            htmll+=`
                <li>
               <a href="#">
                   <img src="img/second-sell/1.jpg" alt="">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${obj.area}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				 ${obj.address}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.ladder_ratio}
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.shot_time}
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">在售</span>
                       		<span class="taxfree">${obj.building_type}</span>
                       		<span class="haskey">五证齐全</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${obj.price}万元</span>
                   		</div>
                   </div>
               </div>
           </li>
                `
        }
        var len = data.length;
        $(".resultDes").children("h2").children("span").eq(0).html(len);
        $(".main .ss-product").html(htmll);
    },
    error:function(){
        alert("网络错误,请检查!");
    }
});
}
//更多搜索
$(".list_small").on("click","li form button",function(){
    var kw = $(this).prev().val();
    $.ajax({
        type:"GET",
        url:"data/03_newhouse_search.php",
        data:{kw:kw},
        success:function(data){
            console.log(data);
            var htmll="";
            for(var obj of data){
                htmll+=`
                <li>
               <a href="#">
                   <img src="img/second-sell/1.jpg" alt="">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${obj.area}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				 ${obj.address}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.ladder_ratio}
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			${obj.shot_time}
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">在售</span>
                       		<span class="taxfree">${obj.building_type}</span>
                       		<span class="haskey">五证齐全</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${obj.price}万元</span>
                   		</div>
                   </div>
               </div>
           </li>
                `
            }
            var len = data.length;
            $(".resultDes").children("h2").children("span").eq(0).html(len);
            $(".main .ss-product").html(htmll);
        },
        error:function(){
            alert("网络错误,请检查!");
        }
    });

})
