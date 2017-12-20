<?php
//专用连接数据库
 header("Content-Type:application/json;charset=utf-8");
$conn = mysqli_connect("127.0.0.1","root","","ujia",3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);