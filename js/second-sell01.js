$(function(){
    //分页函数
    function pading(pno=1,pageSize=3,price='',space='',house_room='',floor='',side='',house_type='',is_lift='',decoration=''){
        $.ajax({
            type:"GET",
            url:"data/second_sell_list.php",
            data:{pno:pno,pageSize:pageSize,price:price,space:space,house_room:house_room,floor:floor,side:side,house_type:house_type,is_lift:is_lift,decoration:decoration},
            success:function(output){
                console.log(output);
                let html = "";
                for(var p of output["data"]){
                    html +=`
            <li>
               <a href="#"  >
                   <img src="${p.img}" alt="照片没了" width="232px" height="174px" >
               </a>
               <div class="ss-product-details clear">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${p.title}</a>
                   		</div>
                   		<div>
                   			<p>
                   				<span></span>
                   				<a href="#">${p.area}</a>
                   				 | ${p.house_hall}室${p.house_room}厅 | ${p.space}平米 | ${p.side} | ${p.decoration}| ${p.is_lift==1?"有电梯":"无电梯"}
                   			</p>
                   		</div>
                       <div>
                       		<p>
                       			<span></span>
                       			 ${p.floor}${p.building_type} -  
                       			<a href="#">${p.area}</a>
                       		</p>
                       </div>
                       <div>
                       		<p>
                       			<span></span>
                       			402人关注 / 共146次带看 / 4个月以前发布
                       		</p>
                       </div>
                       <div>
                       		<span class="subway">${p.address}</span>
                       		<span class="taxfree">${p.label}</span>
                       		<span class="haskey">${p.shot_time}</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div>
                   			<span>${p.price}</span>
                   			万
                   		</div>
                   		<div>
                   			<span>单价${(p.price/p.space*10000).toFixed(2)}元/平米</span>
                   		</div>
                   </div>
               </div>
           </li>                    
                    `
                }
               $(".ss-product").html(html);
                let pno = parseInt(output["pno"]);
                let pageCount = parseInt(output["pageCount"]);
                let count = parseInt(output["count"]);
                let pageSize =parseInt(output["pageSize"]);
                $("#all-count").html(count);
                $("#btn-page").prev().val(pageSize);
               html = "";
               html +=`
                        <a class="on" href="#" data-page="1">首页</a>`
                if(pno-1>0){
                    html +=`  <a href="#" data-page="${pno-1}">上一页</a>`
                }
                if(pno-2>0){
                    html+=` <a href="#" data-page="${pno-2}">${pno-2}</a>`;
                }
                if(pno-1>0){
                   html +=` <a href="#" data-page="${pno-1}">${pno-1}</a>`;
                }


                     html +=` <a href="#" data-page="pno" class="active">${pno}</a>`;

                if(pno+1<=pageCount){
                    html+=` <a href="#" data-page="${pno+1}">${pno+1}</a>`;
                }
                if(pno+2<=pageCount){
                    html+=` <a href="#" data-page="${pno+2}">${pno+2}</a>`;
                }
                if(pno+1<=pageCount){
                      html +=`  <a href="#" data-page="${pno+1}">下一页</a>`
                }
                    html +=`  <a href="#" data-page="${pageCount}">尾页</a>  `;

                $(".page-box").html(html);
            },
            error:function(){
                alert("网络错误,请检查")
            }
        })
    }
    pading();
    $(".page-box").on("click","a",function(e){
        e.preventDefault();
        $tar = $(e.target);
        if($tar.parent().is(".page-box")){
            console.log($tar.data("page"));
            pading(pno=$tar.data("page"),pageSize=$("#btn-page").prev().val())
        }
    })
    $("#btn-page").click(function(){
        pading(pno=1,pageSize=$("#btn-page").prev().val())
    });
    //点击显示隐藏
    $(".btn-more").click(function(e){
        if(($(e.target).prev().has(":hidden")).length==1){
            $(e.target).prev().children("ul").css({display:"block"})
        }else{
            $(e.target).prev().children("ul:nth-child(n+4)").css({display:"none"})
        }
    })
    //当被点击的时候更换背景图片
    $(".list-more ul li:last-child a").click(function(e){
        e.preventDefault();
    })
    $clickimg = $(".list-more ul li:last-child a span:first-child");
    $clickimg.click(function(e){
        e.preventDefault();
        $tar = $(e.target);
       // console.log($tar);
        var index = $tar.parent().parent().parent().index();
       // console.log(index);
        $tar.css({background:"url(img/second-sell/sprite.png) no-repeat -518px -173px"}).addClass("woc");
        $tar.parent().siblings().children("span:first-child").css({background:"url(img/second-sell/sprite.png) no-repeat -535px -185px"}).removeClass("woc")
        if($(".orderFilter .filterAgain ul li.woc-"+index).length==1){
            $(".orderFilter .filterAgain ul li.woc-"+index).replaceWith( `<li class="woc-${index}">
                    <h3><a href="#/ershoufang/co41ty1/"></span>${$tar.next().html()}</a></h3>
            </li>`)
        }else{
        $(".orderFilter .filterAgain ul").append( `<li class="woc-${index}">
                    <h3><a href="#/ershoufang/co41ty1/"></span>${$tar.next().html()}</a></h3>
            </li>`)}
        //发送ajax请求了开始每次点击都发送的
        //售价
        if($(".list-more ul:nth-child(1)>li:last-child a span:first-child").hasClass("woc")){

            var $price = $(".list-more ul:nth-child(1)>li:last-child a span:first-child.woc").next().html();
            var price = $price.split("-");
            for(var p=0;p< price.length;p++){
                price[p] = parseInt(price[p]);
            }

        }
        //面积
        if($(".list-more ul:nth-child(2)>li:last-child a span:first-child").hasClass("woc")){
            var space =[];
            var $space = $(".list-more ul:nth-child(2)>li:last-child a span:first-child.woc").next().html();
            var space = $space.split("-");
            for(var p=0;p< space.length;p++){
                space[p] = parseInt(space[p]);
            }
        }
        //房型
        if($(".list-more ul:nth-child(3)>li:last-child a span:first-child").hasClass("woc")){
            var $house_room = $(".list-more ul:nth-child(3)>li:last-child a span:first-child.woc").next().html();
            $house_room == "一室"?$house_room =1 :
                $house_room == "二室"?$house_room =2 :
                    $house_room == "三室"?$house_room =3 :
                        $house_room == "四室"?$house_room =4 :$house_room=5;
            var  house_room=$house_room;

        }
        //用途 数据库缺省
        // if($(".list-more ul:nth-child(4)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(4)>li:last-child a span:first-child.woc").next().html()
        // }
        // //权属数据库缺省
        // if($(".list-more ul:nth-child(5)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(5)>li:last-child a span:first-child.woc").next().html()
        // }
        //楼层
        if($(".list-more ul:nth-child(6)>li:last-child a span:first-child").hasClass("woc")){
            var $floor = $(".list-more ul:nth-child(6)>li:last-child a span:first-child.woc").next().html();
            var floor = $floor;
        }
        //朝向
        if($(".list-more ul:nth-child(7)>li:last-child a span:first-child").hasClass("woc")){
            var $side = $(".list-more ul:nth-child(7)>li:last-child a span:first-child.woc").next().html();
            var side = $side.slice(1);
        }
        //楼龄数据库缺省
        // if($(".list-more ul:nth-child(8)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(8)>li:last-child a span:first-child.woc").next().html()
        // }
        //类型 塔楼啊什么的
        if($(".list-more ul:nth-child(9)>li:last-child a span:first-child").hasClass("woc")){
            var $house_type = $(".list-more ul:nth-child(9)>li:last-child a span:first-child.woc").next().html();
            var house_type = $house_type;
        }
        //电梯
        if($(".list-more ul:nth-child(10)>li:last-child a span:first-child").hasClass("woc")){
            var $is_lift = $(".list-more ul:nth-child(10)>li:last-child a span:first-child.woc").next().html();
            $is_lift == "有电梯"? $is_lift=1:$is_lift=0;
            var is_lift =$is_lift;
        }
        //装修
        if($(".list-more ul:nth-child(11)>li:last-child a span:first-child").hasClass("woc")){
            var $decoration = $(".list-more ul:nth-child(11)>li:last-child a span:first-child.woc").next().html();
            $decoration=="精装修"?$decoration="精装":
                $decoration=="普通装修"?$decoration="简装":
                    $decoration="毛坯";
            var decoration = $decoration;
        }
        //其他
        pading(pno=1,pageSize=3,price=price,space=space,house_room=house_room,floor=floor,side =side,house_type =house_type,is_lift=is_lift,decoration=decoration)




    })

    //判断是否被点击
    //清空
    $(".list-more").on("click",".qk",function(e){
          $tar = $(e.target);
        //console.log($tar.next().find("a span:first-child"));
        $(".woc-"+$tar.parent().index()).remove();
        $tar.next().find("a span:first-child").css({background:"url(img/second-sell/sprite.png) no-repeat -535px -185px"}).removeClass("woc");
        //售价
        if($(".list-more ul:nth-child(1)>li:last-child a span:first-child").hasClass("woc")){

            var $price = $(".list-more ul:nth-child(1)>li:last-child a span:first-child.woc").next().html();
            var price = $price.split("-");
            for(var p=0;p< price.length;p++){
                price[p] = parseInt(price[p]);
            }

        }
        //面积
        if($(".list-more ul:nth-child(2)>li:last-child a span:first-child").hasClass("woc")){
            var space =[];
            var $space = $(".list-more ul:nth-child(2)>li:last-child a span:first-child.woc").next().html();
            var space = $space.split("-");
            for(var p=0;p< space.length;p++){
                space[p] = parseInt(space[p]);
            }
        }
        //房型
        if($(".list-more ul:nth-child(3)>li:last-child a span:first-child").hasClass("woc")){
            var $house_room = $(".list-more ul:nth-child(3)>li:last-child a span:first-child.woc").next().html();
            $house_room == "一室"?$house_room =1 :
                $house_room == "二室"?$house_room =2 :
                    $house_room == "三室"?$house_room =3 :
                        $house_room == "四室"?$house_room =4 :$house_room=5;
            var  house_room=$house_room;

        }
        //用途 数据库缺省
        // if($(".list-more ul:nth-child(4)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(4)>li:last-child a span:first-child.woc").next().html()
        // }
        // //权属数据库缺省
        // if($(".list-more ul:nth-child(5)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(5)>li:last-child a span:first-child.woc").next().html()
        // }
        //楼层
        if($(".list-more ul:nth-child(6)>li:last-child a span:first-child").hasClass("woc")){
            var $floor = $(".list-more ul:nth-child(6)>li:last-child a span:first-child.woc").next().html();
            var floor = $floor;
        }
        //朝向
        if($(".list-more ul:nth-child(7)>li:last-child a span:first-child").hasClass("woc")){
            var $side = $(".list-more ul:nth-child(7)>li:last-child a span:first-child.woc").next().html();
            var side = $side.slice(1);
        }
        //楼龄数据库缺省
        // if($(".list-more ul:nth-child(8)>li:last-child a span:first-child").hasClass("woc")){
        //     var $price = $(".list-more ul:nth-child(8)>li:last-child a span:first-child.woc").next().html()
        // }
        //类型 塔楼啊什么的
        if($(".list-more ul:nth-child(9)>li:last-child a span:first-child").hasClass("woc")){
            var $house_type = $(".list-more ul:nth-child(9)>li:last-child a span:first-child.woc").next().html();
            var house_type = $house_type;
        }
        //电梯
        if($(".list-more ul:nth-child(10)>li:last-child a span:first-child").hasClass("woc")){
            var $is_lift = $(".list-more ul:nth-child(10)>li:last-child a span:first-child.woc").next().html();
            $is_lift == "有电梯"? $is_lift=1:$is_lift=0;
            var is_lift =$is_lift;
        }
        //装修
        if($(".list-more ul:nth-child(11)>li:last-child a span:first-child").hasClass("woc")){
            var $decoration = $(".list-more ul:nth-child(11)>li:last-child a span:first-child.woc").next().html();
            $decoration=="精装修"?$decoration="精装":
                $decoration=="普通装修"?$decoration="简装":
                    $decoration="毛坯";
            var decoration = $decoration;
        }
        pading(pno=1,pageSize=3,price=price,space=space,house_room=house_room,floor=floor,side =side,house_type =house_type,is_lift=is_lift,decoration=decoration)

    })


})