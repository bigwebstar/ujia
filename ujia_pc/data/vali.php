<?php
header("Content-Type:text/plain");
require_once("init.php");
@$uname=$_REQUEST["uname"];
$sql="select count(*) from t_user where ";
if($uname){
	$sql.=" uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$count=mysqli_fetch_row($result)[0];
	if($count==1) echo "false";
	else echo "true";
}
?>