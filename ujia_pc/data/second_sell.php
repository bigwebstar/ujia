<?php
require('init.php');
$sql="SELECT hid,title,price,house_hall,house_room,space FROM";
$sql.=" re_house WHERE house_type='0' LIMIT 8";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo print_r($rows);
//echo json_encode($rows);
$labels=array();
for($i=0;$i<count($rows);$i++){
	$hid=$rows[$i]['hid'];
	$sql1="SELECT label FROM re_house_feature WHERE hid=$hid";
	$result=mysqli_query($conn,$sql1);
	$label=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$labels[$i]=$label[0]["label"];
}
for($l=0;$l<count($rows);$l++){
	$hid=$rows[$l]['hid'];
	$sql="SELECT img FROM re_house_pic WHERE hid=$hid LIMIT 1";
	$result=mysqli_query($conn,$sql);
	$img=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$imgs[$l]=$img[0]["img"];
}
//echo print_r($labels);
$all=array();
for($j=0;$j<count($rows);$j++){
        $price=ceil($rows[$j]['price']);
        $title=mb_substr($rows[$j]['title'],0,12,"UTF-8");
        $output=[
            "title"=>$title,//标题
            "price"=>$price,//价格
            "house_hall"=>$rows[$j]['house_hall'],//室
           "house_room"=>$rows[$j]['house_room'],//厅
            "space"=>$rows[$j]['space'],//面积
            "label"=>$labels[$j],//小标题
            "img"=>$imgs[$j]//图片
       ];
       $all[$j]=$output;
}//echo print_r($all);
	echo json_encode($all);
//var_dump($rows);
?>