<?php
//data/controllers/user.controller.php
//data/init.php
require_once("../../init.php");//$conn
function register(){
	global $conn;//引入全局变量
	//从request中获得uname和upwd
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$phone=$_REQUEST["phone"];
	if($uname&&$upwd){
	$sql="insert into t_user(uid,uname,upwd,phone) values(null,'$uname',md5('$upwd'),'$phone')";
	$result=mysqli_query($conn,$sql);
    		if($result==true)
    			echo '{"code":1,"msg":"注册成功"}';
    		else//否则
    			echo '{"code":-1,"msg":"注册失败"}';
   }
}
function checkName(){
	global $conn;
	@$uname=$_REQUEST["uname"];//从request中获得uname
	if($uname){
		$sql=//定义SQL语句select * from xz_user...
			"select * from t_user where uname='$uname'";
		$result=mysqli_query($conn,$sql);//执行SQL查询
		$users=//获得查询结果
			mysqli_fetch_all($result,1);//MYSQLI_ASSOC
		if(count($users)!=0)//如果查询结果中有数据
			echo '{"code":-1,"msg":"用户名不可用"}';//不能使用
		else//否则
			echo '{"code":1,"msg":"用户名可用"}';//可以使用
	}
}
function login(){
	global $conn;
	session_start();
	 //4:获取参数 uname upwd
	 @$u = $_REQUEST["uname"];
	 @$p = $_REQUEST["upwd"];
	 @$yzm = $_REQUEST["yzm"];//获取用户输入验证码
	 //5:验证格式是否正确 preg_match($pattern,$str)
	// $uPattern = '/^[\u4e00-\u9fa5a-zA-Z0-9_]{3,12}$/';
	// $pPattern = '/^[a-zA-Z0-9_]{3,12}$/';
	 //验证:验证码格式的正则表达式
	// $yPattern = '/^[a-zA-Z]{4}$/';

	// if(!preg_match($uPattern,$u)){
	//   echo '{"code":-2,"msg":"用户名格式不正确"}';
	//   exit;//停止php执行
	// }
	// if(!preg_match($pPattern,$p)){
	//   echo '{"code":-3,"msg":"密码格式不正确"}';
	//   exit;
	// }
	// if(!preg_match($yPattern,$yzm)){
	//   echo '{"code":-3,"msg":"验证码格式不正确"}';
	//   exit;
	// }
	 //验证:用户输入验证码是否正确
	 $code = $_SESSION["code"];
	 if($yzm){
		 if($code!=$yzm){
		   echo '{"code":-3,"msg":"验证码不正确"}';
		   exit;
		 }
	 }
	 //6:创建sql并且发送sql
	 $sql = " SELECT * FROM t_user";
	 $sql .=" WHERE uname='$u'";
	 $sql .=" AND upwd=md5('$p')";
	 //解决方案一:输出sql
	 //echo $sql;
	 $result = mysqli_query($conn,$sql);
	 //解决方案二:判断sql是否出错
	 if(mysqli_error($conn)){
	   echo mysqli_error($conn);
	 }
	 $row = mysqli_fetch_assoc($result);
	// var_dump($row);
	 //7:判断返回结果是否正确
	 //8:输出结果 json
	 if($row===null){
	   echo '{"code":-1,"msg":"用户名或密码错误"}';
	 }else{
	   $_SESSION["uid"]=$row["uid"];
	   echo '{"code":0,"msg":"登录成功"}';
	 }
}
function logout(){
	session_start();
	$_SESSION["uid"]=null;
	echo '{"code":1,"msg":"注销成功"}';
}
function isLogin(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql=
			"select uname from t_user where uid=$uid";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
		echo json_encode(["ok"=>1,"uname"=>$user[0]["uname"]]);
	}else
		echo json_encode(["ok"=>0]);
}