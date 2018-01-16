$(()=>{
//主页引入jquery.js
//1F:$(".wrapper-content").html()
    $.ajax({
        type:"get",
        url:"data/second_sell.php",
        success:function (data) {
            var html="";
            for(var item of data ){
                html+=`
            <li>
                    <a href="second-sell.shtml">
                        <div class="wrap">
                            <img src="${item.img}" alt="">
                            <span>${item.price}万元</span>
                            <div class="wrap-bottom">
                                <p>${item.title}</p>
                                <p>
                                <!--item.label截取获得小区或者....-->
                                    <span>${item.label}</span>  
                                    <span>${item.house_room}室${item.house_hall}厅</span>
                                    <span>${item.space}平米</span>
                                </p>
                            </div>
                        </div>
                        <div class="tips">
                            <p>
                                <span>近期关注度较高房源</span>
                            </p>
                        </div>
                    </a>
                </li>`
            }
            $(".wrapper-content").html(html) ;
        },
        error:function () {
            alert("网络错误请检查");
        }
    });
//2F:$(".floor2-item").html()**租房
    $.ajax({
        type:"get",
        url:"data/rent.php",
        success:function (data) {
            var html="";
            //console.log(data);
            for(var item of data ){
                html+=`
            <li class="lf">
                            <a href="publish-sell.shtml" target="_blank">
                                <div class="img-container">
                                    <img src="${item.img}" alt="">
                                </div>
                                <div class="title">
                                    <div class="item-name">${item.district}</div>
                                    <div class="item-desc">
                                        <span>${item.price}元/月</span>
                                        <span class="item-year">${item.floor}</span>
                                    </div>
                                </div>
                            </a>
                        </li>`
            }
            $(".floor2-item").html(html) ;
        },
        error:function () {
            alert("网络错误请检查");
        }
    });
//3F:$(".floor3-item").html() **新房
    $.ajax({
        type:"get",
        url:"data/new_house.php",
        success:function (data) {
            //console.log(data);
            var html="";
            for(var item of data ){
                html+=`
             <li>
                    <a href="new_house_index.shtml">
                        <img src="${item.img}" alt="">
                        <div class="notes">
                            <p>${item.title}</p>
                            <p><label>${item.space}</label>平米</p>
                        </div>
                        <div style="display: none"><span >鼓楼区中央北路河路道1号</span>
                        </div>
                    </a>
                </li>`
            }
           // console.log(html);
            $(".floor3-item").html(html) ;
        },
        error:function () {
            alert("网络错误请检查");
        }
    });
});
//注册
$(()=>{
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
	$(".reg_log").click(function () {
		$("#dialog_reg").fadeOut();
		$("#dialog").show();
	});
		function test(txt) {
			$(".show-err").css("display","list-item");
			$(".show-err>dd").text(txt);
		}
		function addStyle(name) {
			name.addClass("success");
			$(".show-err").addClass("show-suc");
		}
		function removeStyle(name) {
			name.removeClass("success");
			$(".show-err").removeClass("show-suc");
		}
		let $name = $("#tName"), $pwd = $("#tPwd"),
			$cpwd = $("#cPwd"), $phone = $("#phone");
		 let uPatt= /^[\u4e00-\u9fa5\w]{2,16}$/i,
			 pPatt=/^\w{6,12}$/i, pNumber=/^1[3|4|5|8][0-9]\d{4,8}$/;
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
	function checkPwd() {
		$pwd.blur(e=>{
			var p=$pwd.val();
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
	function cpwdBlur() {
		$cpwd.blur(e=> {
			var p=$pwd.val();
			var cp = $cpwd.val();
			removeStyle($cpwd);
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
	$("#btnReg").click(function () {
		var num =0;
		$("#con_reg_user li").each(function () {
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
						location.href="index.shtml";
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
})
//登录
$(()=>{
	$("[data-log=login]").click(function () {
		$("div.overlay_bg").show();
		$("#dialog").show();
		$("#setYzm").attr("src","data/03_code_gg.php")
	});
	$(".close_login").click(function () {
		$("#dialog").fadeOut();
		$("div.overlay_bg").fadeOut();
	});
	$(".overlay_bg").click(function () {
		$("#dialog").fadeOut();
		$("div.overlay_bg").fadeOut();
	})
	$("#setYzm").click(function () {
		this.src="data/03_code_gg.php";
	})
		function testlog(txt) {
			$(".log-show-err").css("display","list-item");
			$(".log-show-err>dd").text(txt);
		}
			var count=0;
		$("#btnLogin").click(function (e) {
			e.preventDefault();
		   var u = $("#txtName").val();
		   var p = $("#txtPwd").val();
		   var yzm=$("#yzm").val();
		   var uPatt= /^[\u4e00-\u9fa5\w]{2,16}$/i;
		   var pPatt=/^\w{6,12}$/i;
		   var yzmPatt=/^[a-z]{4}$/i;
			if(!uPatt.test(u)){
				var txt="用户名格式不正确，请检查后再试";
				testlog(txt);
				return;
			};
			if(!pPatt.test(p)){
				var txt="密码格式不正确，请检查后再试";
				testlog(txt);
				return;
			};
			if (yzm){
				if(!yzmPatt.test(yzm)){
					var txt="验证码格式不正确，请检查后再试";
					testlog(txt);
					return;
				};
			}
			$.ajax({
				type:"POST",
				url:"data/routes/users/login.php",
				data:{uname:u,upwd:p,yzm:yzm},
				success:function (data) {
					if(data.code==0){
						location.href="index.shtml"
					}else if(data.code==-1){
						var txt="用户名或密码错误，请检查后再试";
						testlog(txt);
						count++;
						if(count>=2){
							$(".checkVerimg").css("display","block");
							$("#setYzm").attr("src","data/03_code_gg.php")
						}
					}else{
						$(".log-show-err>dd").html("验证码错误,请重新输入");
						$("#setYzm").attr("src","data/03_code_gg.php")
					}
				},
				error:function () {
					alert("网络发生了故障，请检查");
				}
			})
		})
	$(".password-view").click(function () {
		var txtval=$("#txtPwd").attr("type");
		if(txtval=="text"){
			$("#txtPwd").attr('type','password');
		}else{
			$("#txtPwd").attr("type","text");
		}
	})
})
