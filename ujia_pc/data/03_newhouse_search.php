<?php
//需要的项:小区名称/小区地址/五证齐全/车位充足/在售/写字楼/五证齐全/单价*****元/平米
//页面选项:区域/售价/面积
require("00_init.php");
@$area = $_REQUEST['area'];//地区
if(!$area){
    $area ="";
}
@$pricelow = $_REQUEST['pricelow'];//价格下限
if(!$pricelow){
    $pricelow = 0;
}
@$pricehigh = $_REQUEST['pricehigh'];//价格上限
if(!$pricehigh ){
    $pricehigh  = 99999999;
}
@$house_room = $_REQUEST['house_room'];//房型
if(!$house_room){
    $house_room = 99999;
}
@$kw = $_REQUEST['kw'];//标题
if(!$kw){
    $kw ="";
}

$sql = " SELECT * FROM re_house WHERE area like '%$area%' AND title like '%$kw%' AND  price >= $pricelow AND price <= $pricehigh ";
$sql .= " AND house_room <= $house_room ";


$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($rows);