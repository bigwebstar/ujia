<?php
require_once('../../00_init.php');
function addDetail(){
	global $conn;
	@$zid=$_REQUEST['zid'];
	$output = [];
	if(!$zid){
		$zid = 1;
	}
	//房源右侧信息
	$sql = " SELECT title,price,size,house_room,house_hall,house_kitchen,house_toilet,floor,side,metro,district,area,publish_time FROM re_zufang WHERE zid=$zid";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	$output['detail_right']=$row;
	//房源图片
	$sql = " SELECT sm,md,lg FROM re_zufang_pic WHERE zid=$zid ";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output['detail_pic']= $rows;
	//房源特色
	$sql = " SELECT * FROM re_zufang_feature WHERE zid=$zid";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	$output['detail_feature'] = $row;
	//交易记录
	$sql = " SELECT * FROM re_zufang_transaction ";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output['detail_transaction'] = $rows;
	echo json_encode($output);
}
function recodeDetail(){
	global $conn;
	$output = [];
	$sql="SELECT * FROM re_zufang_transaction";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output['content']=$rows;
	echo json_encode($output);
}
function re_zufang_transaction(){
	global $conn;
	$output = [];
	$sql="SELECT * FROM re_zufang_pic";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output['pic']=$rows;
	$sql="SELECT * FROM re_zufang";
	$result = mysqli_query($conn,$sql);
	$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
	$output['content']=$rows;
	echo json_encode($output);
}