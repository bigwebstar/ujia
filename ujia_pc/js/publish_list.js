function loadProducts(){
    $.ajax({
        type:"GET",
        url: "data/routes/products/02_zufang_search.php",
        success: function(data){
            var html = "";
                for(var i of data){
                
                var price = parseInt(i.price);
                html += `
               <li data-id="${i.zid}">
               <a  href="#">
                   <img src="img/publish-sell/1.jpg" width="173px" height="135px">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${i.title}</a>
                   		</div>
                   		<div>
                   			<span></span>
                   			<a href="#">${i.area}</a>
                   			 | ${i.house_room}室${i.house_hall}厅 | ${i.size}平米 | ${i.side} 
                   		</div>
                       <div>
                       		<span></span>
                       		${i.floor} 2012年建  -  
                       		<a href="#">百家湖</a>
                       </div>
                       <div>
                       </div>
                       <div>
                       		<span class="subway">距离3号线胜太西路站693米</span>
                       		<span class="taxfree">房本满五年</span>
                       		<span class="haskey">随时看房</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div style="margin-top:65px;margin-right:65px;color:red">
                   			<span style="font-size: 30px;font-weight: 700;">`+price+`</span>元/月
                   		</div>
                   </div>
               </div>
            </li>`;
            }
            $(".ss-product").html(html);
						$(".resultDes").children().children().html(data.length);
        },
        error:function(){
            alert("网络故障请检查！");
        }
    });
}
loadProducts();
$(".filter").on("click","a",function(e){
	e.preventDefault();
//获取数据方式
	var pricelow=0;         //
	var pricehigh=99999;    //租金
	var spacelow=0;         //
	var spacehigh=99999;    //面积
	var house_room=1;       //房型
	var side="";            //朝向
	var floor="";           //楼层
	var decoration="";      //装修
	var is_lift="0";        //有无电梯

	if($("#price").children().has(".gou").length!=0)
		var price=(($("#price").children().has(".gou"))[0].children)[1].getAttribute("data-price");
	if(!(price==null)){
		pricelow=price.split("_")[0];
		pricehigh=price.split("_")[1];
	}
	console.log(pricehigh);
	if($("#size").children().has(".gou").length!=0)
		var space=(($("#size").children().has(".gou"))[0].children)[1].getAttribute("data-size");
	if(!(space==null)){
		spacelow=space.split("_")[0];
		spacehigh=space.split("_")[1];
	}
	
	if($("#room").children().has(".gou").length!=0)
		var house=(($("#room").children().has(".gou"))[0].children)[1].getAttribute("data-room");
	if(!(house==null)){
		house_room=house.split("_")[0];
	}
	
	if($("#side").children().has(".gou").length!=0)
		var Side=(($("#side").children().has(".gou"))[0].children)[1].innerHTML;
	if(!(Side==null)){
		side=Side.slice(1,2);
	}
	
	if($("#floor").children().has(".gou").length!=0)
		var Floor=(($("#floor").children().has(".gou"))[0].children)[1].innerHTML;
	if(!(Floor==null)){
		floor=Floor;
	}
	

	if($("#decoration").children().has(".gou").length!=0)
		var Decoration=(($("#decoration").children().has(".gou"))[0].children)[1].innerHTML;
	if(!(Decoration==null)){
		decoration=Decoration.slice(0,2);
	}
	

//
	$.ajax({
		type:"get",
		url:"data/routes/products/02_zufang_search.php",
		data:{
			pricelow:pricelow,
			pricehigh:pricehigh,
			sizelow:spacelow,
			sizehigh:spacehigh,
			house_room:house_room,
			side:side,   //
			floor:floor
		},
				success: function(data){
            var html = "";
                for(var i of data){
                
                var price = parseInt(i.price);
                html += `
               <li>
               <a href="#">
                   <img src="img/publish-sell/1.jpg" width="173px" height="135px">
               </a>
               <div class="ss-product-details">
                   <div class="lf details-left">
                   		<div>
                   			<a href="#">${i.title}</a>
                   		</div>
                   		<div>
                   			<span></span>
                   			<a href="#">${i.area}</a>
                   			 | ${i.house_room}室${i.house_hall}厅 | ${i.size}平米 | ${i.side} 
                   		</div>
                       <div>
                       		<span></span>
                       		${i.floor} 2012年建  -  
                       		<a href="#">百家湖</a>
                       </div>
                       <div>
                       </div>
                       <div>
                       		<span class="subway">距离3号线胜太西路站693米</span>
                       		<span class="taxfree">房本满五年</span>
                       		<span class="haskey">随时看房</span>
                       </div>
                   </div>
                   <div class="rt details-right">
                   		<div style="margin-top:65px;margin-right:65px;color:red">
                   			<span style="font-size: 30px;font-weight: 700;">`+price+`</span>元/月
                   		</div>
                   </div>
               </div>
            </li>`;
            }
            $(".ss-product").html(html);
						$(".resultDes").children().children().html(data.length);
        },
        error:function(){
            alert("网络故障请检查！");
        }
	})
})