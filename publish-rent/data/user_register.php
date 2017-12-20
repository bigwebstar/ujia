<?php
    require("00_init.php");
    @$uname = $_REQUEST["uname"];
    @$phone = $_REQUEST["phone"];

    $sql =  "INSERT INTO t_user (uid,uname,phone) VALUES (null,'$uname',$phone)";
    mysqli_query($conn,$sql);
