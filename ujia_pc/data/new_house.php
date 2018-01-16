<?php
require("init.php");
$sql="SELECT hid,title,space FROM";
$sql.=" re_house WHERE house_type='1' LIMIT 6";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo print_r($rows);
//echo json_encode($rows);
$imgs=array();
for($l=0;$l<count($rows);$l++){
	$hid=$rows[$l]['hid'];
	$sql="SELECT img FROM re_house_pic WHERE hid=$hid LIMIT 1";
	$result=mysqli_query($conn,$sql);
	$img=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$imgs[$l]=$img[0]["img"];
}
$all=array();
for($j=0;$j<count($rows);$j++){
        $output=[
            "title"=>$rows[$j]['title'],//标题
            "space"=>$rows[$j]['space'],//面积
            "img"=>$imgs[$j]//图片
       ];
       $all[$j]=$output;
}//echo print_r($all);
	echo json_encode($all);
?>