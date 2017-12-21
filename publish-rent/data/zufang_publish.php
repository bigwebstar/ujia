<?php
    require("00_init.php");
    @$title = $_REQUEST['title'];
    @$area = $_REQUEST['area'];
    @$district = $_REQUEST['district'];
    @$metro = $_REQUEST['metro'];
    @$buildingNo = $_REQUEST['buildingNo'];
    @$price = $_REQUEST['price'];
    @$size = $_REQUEST['size'];
    @$house_room = $_REQUEST['house_room'];
    @$house_hall = $_REQUEST['house_hall'];
    @$house_kitchen = $_REQUEST['house_kitchen'];
    @$house_toilet = $_REQUEST['house_toilet'];
    @$side = $_REQUEST['side'];
    @$floor = $_REQUEST['floor'];

    $sql = "INSERT INTO re_zufang (zid,title,area,size,floor,metro,district,house_room,house_hall,house_kitchen,house_toilet,price,side,building_No)
    VALUES (null,'$title','$area',$size,'$floor','$metro','$district',$house_room,$house_hall,$house_kitchen,$house_toilet,$price,'$side','$buildingNo')";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_affected_rows($conn);
    if($row>0){
        echo '{"code":1,"msg":"添加成功"}';
    }else{
        echo '{"code":-1,"msg":"添加失败"}';
    }
