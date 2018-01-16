<?php
  require("../00_init.php");
  require("../00_imageUtils.php");
  //1.0 如果上传文件数组为空，出错  empty($_FILES)
  $rs = empty($_FILES);
  if($rs){
    die('{"code":-1,"msg":"没有上传文件请检查"}');
  }
//(1)上传图片
  //1.1:获取上传文件名文件大小
  $picname =  $_FILES["mypic"]["name"];
  $picsize =  ceil($_FILES["mypic"]["size"]/1024);
  //1.2:判断大小/判断类型 2048==2MB
  if($picsize>2048){
   die('{"code":-2,"msg":"上传文件不能直过2MB"}');
  }
  $type = strstr($picname,".");//1.jpg=>.jpg
  if($type!=".gif" && $type!=".png" && $type!=".jpg"){
   die('{"code":-3,"msg":"上传格式不正确"}');
  }
  //1.3:生成新文件名
  $filename = time().rand(1,9999).$type;
  //1.4:移动
  $src = $_FILES["mypic"]["tmp_name"];
  $des = "../../upload/product/bs/".$filename;
  move_uploaded_file($src,$des);

//(2)创建缩略图 sm md lg
//   2.1 小图 54*454 中图 450*450 大图 800*800
mkThumbnail($des,120,82,"../../upload/product/sm/".$filename);
mkThumbnail($des,710,400,"../../upload/product/md/".$filename);
mkThumbnail($des,1400,800,"../../upload/product/lg/".$filename);

//(3)将数据信息添加数据库 re_house_pic
//   3.1:获取商品编号
 $hid = $_REQUEST['hid'];
 //3.2:更新商品图片
 //3.3:查询该商品是否存在图片信息 xz_laptop_pic
 //SELECT * FROM xz_laptop_pic WHERE laptop_id=$lid
 $sm = "upload/product/sm/".$filename;
 $md = "upload/product/md/".$filename;
 $lg = "upload/product/lg/".$filename;
 $img= "upload/product/bs/".$filename;
 //3.4:如果没有添加
 $sql = " INSERT INTO re_house_pic VALUES(null,";
 $sql .= " $hid,'','$img','$sm','$md','$lg')";
 //3.5:如果有更新
 //pid;laptop_id;sm/md/lg
 //img/product/md/57b12a31N8f4f75a3.jpg
 $result = mysqli_query($conn,$sql);
 $row = mysqli_affected_rows($conn);
 if($row >0){
   echo '{"code":1,"msg":"上传成功"}';
 }else{
   echo '{"code":-1,"msg":"上传失败"}';
 }


