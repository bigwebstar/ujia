<?php
require("init.php");
$sql="SELECT zid,district,price,floor FROM";
$sql.=" re_zufang LIMIT 6";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo print_r($rows);
//echo json_encode($rows);
$imgs=array();
for($l=0;$l<count($rows);$l++){
	$zid=$rows[$l]['zid'];
	$sql="SELECT img FROM re_zufang_pic WHERE zid=$zid LIMIT 1";
	$result=mysqli_query($conn,$sql);
	$img=mysqli_fetch_all($result,MYSQLI_ASSOC);
	$imgs[$l]=$img[0]["img"];
}
$all=array();
for($j=0;$j<count($rows);$j++){
        $output=[
            "district"=>$rows[$j]['district'],//标题
            "price"=>$rows[$j]['price'],//面积
            "img"=>$imgs[$j],//图片
            "floor"=>$rows[$j]['floor']
       ];
       $all[$j]=$output;
}//echo print_r($all);
	echo json_encode($all);
?>