<?php
require("00_init.php");
@$title = $_REQUEST['title'];

$sql = " SELECT title FROM re_house WHERE title LIKE '%$title%' ";
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($rows);