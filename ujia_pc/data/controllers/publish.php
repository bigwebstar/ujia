<?php
require_once('../../00_init.php');
function publish_step1(){
    global $conn;
    @$area=$_REQUEST['area'];
    if(!$area){
       echo '{"code":-2,"msg":"小区名不能为空"}';
       exit;
     }
    @$b_No=$_REQUEST['building_No'];
    if(!$b_No){
        echo '{"code":-2,"msg":"楼栋号不能为空"}';
        exit;
    }
    @$u_No=$_REQUEST['unit_No'];
    if(!$u_No){
        echo '{"code":-2,"msg":"单元号不能为空"}';
        exit;
    }
    @$d_No=$_REQUEST['door_No'];
    if(!$d_No){
        echo '{"code":-2,"msg":"门牌号不能为空"}';
        exit;
    }
    @$price=$_REQUEST['price'];
    if(!$price){
        echo '{"code":-2,"msg":"价格不能为空"}';
        exit;
    }
    @$uname=$_REQUEST['uname'];
    if(!$uname){
        echo '{"code":-2,"msg":"请问您怎么称呼"}';
        exit;
    }
    @$phone=$_REQUEST['phone'];
    if(!$phone){
        echo '{"code":-2,"msg":"手机号不能为空"}';
        exit;
    }
    $sql="INSERT INTO t_user(uid,uname,upwd,phone) VALUES(null,'$uname','000000','$phone')";
    $result=mysqli_query($conn,$sql);
    $msg2=mysqli_affected_rows($conn);
    $sql="SELECT uid FROM t_user WHERE uname='$uname'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $uid=end($rows)['uid'];
    $sql="INSERT INTO re_house(hid,uid,area,price,building_No,unit_No,door_No) VALUES";
    $sql.=" (null,$uid,'$area','$price','$b_No','$u_No','$d_No')";
    $result=mysqli_query($conn,$sql);
    $msg1=mysqli_affected_rows($conn);
    $sql="SELECT hid FROM re_house WHERE uid='$uid'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $hid=end($rows)['hid'];
    if($msg1==1&&$msg2==1){
        echo '{"code":1,"msg":"请继续完善信息","uid":'.$uid.',"hid":'.$hid.'}';
    }else{
        echo '{"code":-1,"msg":"信息出错啦,请核对"}';
    }
}
//publish_step1();
function publish_step2(){
    global $conn;
    @$uid=$_REQUEST['uid'];
    @$t=$_REQUEST['title'];
    @$st=$_REQUEST['subtitle'];
    @$sp=$_REQUEST['space'];
    @$hr=$_REQUEST['house_room'];
    @$hh=$_REQUEST['house_hall'];
    @$hk=$_REQUEST['house_kitchen'];
    @$ht=$_REQUEST['house_tollet'];
    @$sd=$_REQUEST['side'];
    @$il=$_REQUEST['is_lift'];
    @$d=$_REQUEST['decoration'];
    @$f=$_REQUEST['floor']."共(".$_REQUEST['floor_num'].")层";
    @$bt=$_REQUEST['building_type'];
    @$lr=$_REQUEST['ladder_ratio'];
    @$py=$_REQUEST['property_year'];
    @$htype=$_REQUEST['house_type'];
    $sql="UPDATE re_house SET ";
    $sql.=" title='$t',subtitle='$st',space=$sp, ";
    $sql.=" house_room='$hr',house_hall='$hh',house_kitchen='$hk', ";
    $sql.=" house_toilet='$ht',side='$sd',is_lift='$il', ";
    $sql.=" decoration='$d',floor='$f',building_type='$bt', ";
    $sql.=" ladder_ratio='$lr',property_year='$py',house_type='0' ";
    $sql.=" WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    $msg=mysqli_affected_rows($conn);
    if($msg==1){
        echo '{"code":1,"msg":"提交成功"}';
    }else{
        echo '{"code":-1,"msg":"信息出错啦,请核对"}';
    }
}