<?php
require('init.php');
@$pno = $_REQUEST["pno"];
@$pageSize  = $_REQUEST["pageSize"];
if(!$pno) $pno=1;
if(!$pageSize) $pageSize=8;


@$price = $_REQUEST["price"];
    if(!$price){
        $minPrice = 0;
        $maxPrice = 99999.99;
    }else{
			//echo var_dump($price);
       
//			$price=explode(',', $price);
//			$price[0] = intval(ltrim($price[0],"["));
//			if($price[1]){
//				$price[1] = intval(rtrim($price[1],"]"));
//			}else{
//				$price[0] = intval(rtrim($price[0],"]"));
//			}
        if(count($price)>1){
            $maxPrice = intval($price[1]);
			$minPrice = intval($price[0]);
        }else{
			$maxPrice =	intval($price[0]);
			$minPrice = 0;
		}
        
		
    }
@$space = $_REQUEST["space"];
    if(!$space){
        $minSpace = 0;
        $maxSpace = 99999.99;
    }else{
//    		$space=explode(',', $space);
//			$space[0] = intval(ltrim($space[0],"["));
//			if($space[1]){
//				$space[1] = intval(rtrim($space[1],"]"));
//			}else{
//				$space[0] = intval(rtrim($space[0],"]"));
//			}
        if(count($space)>1){
            $maxSpace = intval($space[1]);
			$minSpace =intval($space[0]);
        }else{
			$maxSpace = intval($space[0]);
			$minSpace =0;
		}
        
		
    }
@$house_room = $_REQUEST["house_room"];

@$floor = $_REQUEST["floor"];
@$side = $_REQUEST["side"];
@$house_type = $_REQUEST["house_type"];
@$is_lift = $_REQUEST["is_lift"];
@$decoration = $_REQUEST["decoration"];


$sql="SELECT * FROM re_house WHERE house_type='0' ";
$sql .= " and  $minPrice<price  AND $maxPrice>price  " ;
$sql .= " and  $minSpace<space  AND $maxSpace>space  " ;
if(@$house_room){$sql .= " AND  house_room like '%$house_room%'  ";}
if($floor){$sql .= " AND  floor like '%$floor%'  ";}
if($side){$sql .= " AND  side like '%$side%'  ";}
if($house_type){$sql .= " AND  house_type like '%$house_type%'  ";}
if($is_lift){$sql .= " AND  is_lift = '$is_lift'  ";}
if($decoration){$sql .= " AND  decoration like '%$decoration%'  ";}



//echo $sql;
//查找全部数据
$result = mysqli_query($conn,$sql);
$users = mysqli_fetch_all($result,1);
//echo var_dump($users);
$count = count($users);
// 总共多少页
$pageCount = ceil($count/$pageSize);
$ppno = ($pno-1)*$pageSize;

$sql.="  LIMIT $ppno , $pageSize ";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//echo print_r($rows);
//echo json_encode($rows);
$labels=array();
for($i=0;$i<count($rows);$i++){
	$hid=$rows[$i]['hid'];
	$sql1="SELECT label FROM re_house_feature WHERE hid=$hid";
	$result=mysqli_query($conn,$sql1);
	$label=mysqli_fetch_all($result,MYSQLI_ASSOC);
	@$labels[$i]=$label[0]["label"];
}

for($l=0;$l<count($rows);$l++){
	$hid=$rows[$l]['hid'];
	$sql="SELECT img FROM re_house_pic WHERE hid=$hid LIMIT 1";
	$result=mysqli_query($conn,$sql);
	$img=mysqli_fetch_all($result,MYSQLI_ASSOC);
	@$imgs[$l]=$img[0]["img"];
}
//echo print_r($labels);
$all=array();
$all["data"]=[];
for($j=0;$j<count($rows);$j++){
        $price=ceil($rows[$j]['price']);
        $title=mb_substr($rows[$j]['title'],0,12,"UTF-8");
        $output=[
            "title"=>$title,//标题
            "price"=>$price,//价格
            "house_hall"=>$rows[$j]['house_hall'],//室
           "house_room"=>$rows[$j]['house_room'],//厅
            "space"=>$rows[$j]['space'],//面积
            "label"=>$labels[$j],//小标题
            "img"=>$imgs[$j],//图片
			"is_lift"=>$rows[$j]['is_lift'],
			"side"=>$rows[$j]['side'],
			"decoration"=>$rows[$j]['decoration'],
			"floor"=>$rows[$j]['floor'],
			"building_type"=>$rows[$j]['building_type'],
			"ladder_ratio"=>$rows[$j]['ladder_ratio'],
			"property_year"=>$rows[$j]['property_year'],
			"address"=>$rows[$j]['address'],
			"shot_time"=>$rows[$j]['shot_time'],
			"area"=>$rows[$j]['area']

       ];
       $all["data"][$j]=$output;
}//echo print_r($all);
        $all["pageSize"]=$pageSize;
        $all["pno"]=$pno;
        $all["count"]=$count;
        $all["pageCount"]=$pageCount;
	echo json_encode($all);
//var_dump($rows);
?>