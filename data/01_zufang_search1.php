<?php
    require("00_init.php");
    @$title=$_REQUEST["title"];
    $sql="SELECT * FROM re_zufang ";
    if($title){
        $titles=explode(" ",$title);
        for($i=0;$i<count($titles);$i++){
            $titles[$i]=" title LIKE '%".$titles[$i]."%' ";
        }
        $sql .=" WHERE ".implode(" and ",$titles);
    }
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);