SET NAMES UTF8;
DROP DATABASE IF EXISTS ujia;
CREATE DATABASE ujia CHARSET=UTF8;
USE ujia;

#############################################
##########        用户模块       ############
#############################################

#用户表     t_user  [uid/uname/upwd]
CREATE TABLE t_user(
  uid             INT PRIMARY KEY AUTO_INCREMENT,       #主键自增
  uname           VARCHAR(25) NOT NULL DEFAULT '',      #昵称
  upwd            VARCHAR(32) NOT NULL DEFAULT '',      #密码
  phone           VARCHAR(32) NOT NULL DEFAULT '',      #电话号码
  avater          VARCHAR(128) NOT NULL DEFAULT 'img/default.png',  #头像路径
  reg_time        DATETIME NOT NULL DEFAULT '2017-12-01' #注册时间
 );

INSERT INTO `t_user` VALUES(null, 'admin', md5('ujia_admin123'), '12378945645', 'img/default.png', '2017-12-01 00:00:00');
INSERT INTO `t_user` VALUES(null, '韩韩', md5('123456'), '12345678999', 'img/default.png', '2017-12-01 00:00:00');
INSERT INTO `t_user` VALUES(null, '月月', md5('123456'), '12345678999', 'img/default.png', '2017-12-01 00:00:00');
INSERT INTO `t_user` VALUES(null, '康康', md5('123456'), '12345678999', 'img/default.png', '2017-12-01 00:00:00');
INSERT INTO `t_user` VALUES(null, '衎衎', md5('123456'), '12345678999', 'img/default.png', '2017-12-01 00:00:00');
INSERT INTO `t_user` VALUES(null, '菜菜', md5('123456'), '12345678999', 'img/default.png', '2017-12-01 00:00:00');


#用户角色表     t_role  [rid/rname]
CREATE TABLE t_role(
  rid             INT PRIMARY KEY AUTO_INCREMENT,       #主键自增 
  rname           VARCHAR(50) NOT NULL DEFAULT ''       #角色名称:普通用户/经纪人/高级管理员
);																												#          1       2        3

INSERT INTO `t_role` VALUES(null,"普通用户");
INSERT INTO `t_role` VALUES(null,"经纪人");
INSERT INTO `t_role` VALUES(null,"高级管理员");


#用户角色关系表  t_user_role[id/rid/uid]
CREATE TABLE t_user_role(
  urid            INT PRIMARY KEY AUTO_INCREMENT,       #主键自增
  rid             INT NOT NULL DEFAULT 0,               #角色编号
  uid             INT NOT NULL DEFAULT 0                #用户编号
);

INSERT INTO `t_user_role` VALUES(null,1,3);
INSERT INTO `t_user_role` VALUES(null,2,2);
INSERT INTO `t_user_role` VALUES(null,3,2);
INSERT INTO `t_user_role` VALUES(null,4,1);
INSERT INTO `t_user_role` VALUES(null,5,1);
INSERT INTO `t_user_role` VALUES(null,6,1);


#re_module模块表 -- 宁俊 	
CREATE TABLE module(
  mid             INT PRIMARY KEY AUTO_INCREMENT,       #模块编号   
  mname           VARCHAR(64) NOT NULL DEFAULT ''       #模块名称
);

INSERT INTO `module` VALUES(null,"用户模块");
INSERT INTO `module` VALUES(null,"房产模块");

#t_acl权限表 -- 乐乐				
CREATE TABLE acl(
  aid             INT PRIMARY KEY AUTO_INCREMENT,       #权限编号
  mid             INT NOT NULL DEFAULT 0,               #模块编号
  rid             INT NOT NULL DEFAULT 0,               #角色编号
  c               ENUM('1','0') NOT NULL DEFAULT '0',   #增
  r               ENUM('1','0') NOT NULL DEFAULT '0',   #查
  u               ENUM('1','0') NOT NULL DEFAULT '0',   #改
  d               ENUM('1','0') NOT NULL DEFAULT '0'    #删
);

INSERT INTO `acl` VALUES(null,1,1,"1","1","1","1");
INSERT INTO `acl` VALUES(null,2,1,"1","1","1","1");
INSERT INTO `acl` VALUES(null,2,2,"1","1","1","1");
INSERT INTO `acl` VALUES(null,2,3,"1","1","1","1");

#############################################
##########     新房/二手房模块   ############
#############################################

#房源  -- 瑞霆
CREATE TABLE re_house(
      hid                 INT PRIMARY KEY AUTO_INCREMENT,
      title               VARCHAR(128) NOT NULL DEFAULT '',   #标题
      subtitle            VARCHAR(128) NOT NULL DEFAULT '',   #副标题
			area				  VARCHAR(128) NOT NULL DEFAULT '',   #区域
      price               DECIMAL(9,4) NOT NULL DEFAULT 0,    #价格
      space               DECIMAL(9,2) NOT NULL DEFAULT 0,    #空间大小
      shot_time           VARCHAR(64)  NOT NULL DEFAULT '',   #看房时间
      uid                 INT  NOT NULL DEFAULT 0 ,           #经纪人(房东)编号
      house_room          VARCHAR(32) NOT NULL DEFAULT '',    #室
      house_hall          VARCHAR(32) NOT NULL DEFAULT '',    #厅
      house_kitchen       VARCHAR(32) NOT NULL DEFAULT '',    #厨房
      house_toilet        VARCHAR(32) NOT NULL DEFAULT '',    #卫生间
      side                VARCHAR(32) NOT NULL DEFAULT '',    #房屋朝向
      is_lift             ENUM('1','0') NOT NULL DEFAULT '0', #是否有电梯
      decoration          VARCHAR(32) NOT NULL DEFAULT '',    #装修情况
      floor               VARCHAR(64) NOT NULL DEFAULT '',    #所在楼层
      building_type       VARCHAR(64) NOT NULL DEFAULT '',    #建筑类型
      ladder_ratio        VARCHAR(64) NOT NULL DEFAULT '',    #梯户比例
      property_year       INT NOT NULL DEFAULT 0,             #产权年限
      house_type          ENUM('1','0') NOT NULL DEFAULT '0',  #新房1/二手房0
      building_No         INT  NOT NULL DEFAULT 0 ,            #楼栋号
      unit_No             INT  NOT NULL DEFAULT 0 ,            #单元号
      door_No             INT  NOT NULL DEFAULT 0 ,           #门牌号
			address             VARCHAR(64) NOT NULL DEFAULT ''     #地址
);
 
INSERT INTO `re_house` (`hid`, `title`, `subtitle`,`area` , `price`, `space`, `shot_time`, `uid`, `house_room`, `house_hall`, `house_kitchen`, `house_toilet`, `side`, `is_lift`, `decoration`, `floor`, `building_type`, `ladder_ratio`, `property_year`, `house_type`,`building_No`,`unit_No`,`door_No`,`address`) VALUES
(1, '天润城九街区 南北通透两房 交通方便 配套齐全', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利','天润城九街区', '190.0000', '81.76', '提前预约随时可看', 2, '2', '2', '1', '1', '南 北', '1', '简装', '中楼层 (共11层)', '板楼', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(2, '南北通透 位置好环境美 配套完善 交通便利', '此房南北通透 采光充足 配套完善 交通便利 小区物业好环境优','天润城九街区','181.0000', '80.75', '提前预约随时可看', 2, '2', '2', '1', '1', '南 北', '1', '精装', '低楼层 (共6层)', '板楼', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(3, '托乐嘉友邻居 30万精装 拎包入住 满五唯一 地铁口', '此房满五年唯一，采光很好，30万精装修，拎包入住，好楼层','托乐嘉友邻居', '378.0000', '142.35', '提前预约随时可看', 3, '4', '2', '1', '2', '南 北', '1', '其他', '中楼层 (共10层)', '塔楼', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(4, '三开间朝南 新城双本 税费低 业主诚心出售 看房方便', '三开间朝南 新城双本 税费低 业主诚心出售 看房方便','天润城九街区', '675.0000', '131.95', '提前预约随时可看', 3, '3', '2', '1', '2', '南 北', '1', '精装', '低楼层 (共11层)', '板楼', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(5, '婚房 精装修 有阳台 南北通透 2居 有电梯', '南北通透 视野宽阔 交通便利 拎包入住两居室 电梯房 婚装保养好','天润城九街区', '230.0000', '87.05', '提前预约随时可看', 2, '2', '2', '1', '1', '南 北', '1', '精装', '中楼层 (共11层)', '板塔结构', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(6, '满五年无个税 户型好大三房 1号线胜太路3号线胜太西路', '南北通透 得房率高 交通方便 配套齐全 不临街','胜太西路', '245.0000', '94.20', '提前预约随时可看', 2, '2', '2', '1', '1', '南 北', '0', '简装', '低楼层 (共6层)', '板塔结构', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(7, '天润城第十一街区 品字户型 三开朝南', '此房品字户型，三开朝南，交通便利，出行方便','天润城第十一街区', '172.0000', '68.22', '提前预约随时可看', 3, '2', '2', '1', '1', '南', '1', '精装', '中楼层 (共11层)', '板塔结构', '一梯三户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(8, '十街区 弘阳物业 三面朝南小三房 采光充', '此房南北通透 多层无浪费面积 中上楼视野开阔','十街区', '209.0000', '90.78', '提前预约随时可看', 3, '3', '2', '1', '1', '南 北', '1', '毛坯', '中楼层 (共6层)', '板楼', '一梯两户', 70, '0',10,5,301,'鼓楼-鼓楼区中央北路河路道1号'),
(9, '万科金域东方', '两卧朝南 户型方正 南北通透','万科金域东方', '211.0000', '90.00', '提前预约随时可看', 3, '2', '2', '1', '1', '南 北', '1', '精装', '中楼层 (共11层)', '板楼', '一梯两户', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号'),
(10, '滟紫台', '主卧带卫 多卫 两卧朝南 户型方正','滟紫台', '957.0000', '290.00', '提前预约随时可看', 3, '4', '3', '3', '2', '南 北', '0', '毛坯', '联排别墅', '别墅', '别墅', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号'),
(11, '融侨观邸', '南北通透、客厅朝南、主卧朝南、明厨、明卫、厨卫不对门','融侨观邸', '280.0000', '106.00', '提前预约随时可看', 2, '3', '1', '1', '1', '南 北', '1', '毛坯', '中楼层 (共11层)', '板楼', '一梯两户', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号'),
(12, '恒辉假日广场', '两卧朝南、主卧朝南、明厨、明卫、厨卫不对门', '恒辉假日广场','250.0000', '106.00', '提前预约随时可看', 3, '3', '2', '1', '1', '南 北', '1', '毛坯', '中楼层 (共11层)', '板楼', '一梯两户', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号'),
(13, '恒大翡翠华庭', '多阳台、主卧带卫、两卧朝南、客厅朝南、厨卫不对门','恒大翡翠华庭', '736.0000', '230.00', '提前预约随时可看', 2, '5', '1', '1', '2', '南 北', '1', '毛坯', '中高楼层 (共25层)', '板楼', '一梯两户', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号'),
(14, '中建国熙台', '厨卫不对门、户型方正、客厅朝南、两卧朝南、主卧朝南、主卧带卫、餐客', '中建国熙台','498.0000', '166.00', '提前预约随时可看', 2, '5', '2', '1', '3', '南 北', '1', '毛坯', '中高楼层 (共18层)', '板楼', '一梯两户', 70, '1',0,0,0,'鼓楼-鼓楼区中央北路河路道1号');


#二手房/新房 图片 -- 海浪
CREATE TABLE re_house_pic(															   #买卖房 图片
  hpid                INT PRIMARY KEY AUTO_INCREMENT,      #编号
  hid                 INT NOT NULL DEFAULT 0 ,             #房源编号
  title               VARCHAR(64) NOT NULL DEFAULT '',     #房间名称 
	img									VARCHAR(64) NOT NULL DEFAULT '',     #房间图片: 原图
  sm                  VARCHAR(128) NOT NULL DEFAULT '',    #房间小图
  md                  VARCHAR(128) NOT NULL DEFAULT '',    #房间中图
  lg                  VARCHAR(128) NOT NULL DEFAULT ''     #房间大图
);
 
INSERT INTO `re_house_pic` (`hpid`, `hid`, `title`, `img`, `sm`, `md`, `lg`) VALUES
(1, 1, '客厅1', 'img/new_house/img/15123709848153.jpg', 'img/new_house/sm/15123709848153.jpg', 'img/new_house/md/15123709848153.jpg', 'img/new_house/lg/15123709848153.jpg'),
(2, 1, '客厅2', 'img/old_house/img/15123711716768.jpg', 'img/old_house/sm/15123711716768.jpg', 'img/old_house/md/15123711716768.jpg', 'img/old_house/lg/15123711716768.jpg'),
(3, 1, '厨房', 'img/old_house/img/15123713524571.jpg', 'img/old_house/sm/15123713524571.jpg', 'img/old_house/md/15123713524571.jpg', 'img/old_house/lg/15123713524571.jpg'),
(4, 1, '卧室', 'img/old_house/img/15123713804570.jpg', 'img/old_house/sm/15123713804570.jpg', 'img/old_house/md/15123713804570.jpg', 'img/old_house/lg/15123713804570.jpg'),
(5, 1, '卧室2', 'img/old_house/img/15123713959677.jpg', 'img/old_house/sm/15123713959677.jpg', 'img/old_house/md/15123713959677.jpg', 'img/old_house/lg/15123713959677.jpg'),
(6, 1, '卫生间', 'img/old_house/img/15123714057513.jpg', 'img/old_house/sm/15123714057513.jpg', 'img/old_house/md/15123714057513.jpg', 'img/old_house/lg/15123714057513.jpg'),
(7, 1, '户型图', 'img/old_house/img/1512371415856.jpg', 'img/old_house/sm/1512371415856.jpg', 'img/old_house/md/1512371415856.jpg', 'img/old_house/lg/1512371415856.jpg'),
(8, 2, '客厅1', 'img/old_house/img/151237143243.jpg', 'img/old_house/sm/151237143243.jpg', 'img/old_house/md/151237143243.jpg', 'img/old_house/lg/151237143243.jpg'),
(9, 2, '客厅2', 'img/old_house/img/15123714379295.jpg', 'img/old_house/sm/15123714379295.jpg', 'img/old_house/md/15123714379295.jpg', 'img/old_house/lg/15123714379295.jpg'),
(10, 2, '客厅3', 'img/old_house/img/15123714426492.jpg', 'img/old_house/sm/15123714426492.jpg', 'img/old_house/md/15123714426492.jpg', 'img/old_house/lg/15123714426492.jpg'),
(11, 2, '厨房', 'img/old_house/img/15123714507612.jpg', 'img/old_house/sm/15123714507612.jpg', 'img/old_house/md/15123714507612.jpg', 'img/old_house/lg/15123714507612.jpg'),
(12, 2, '卧室', 'img/old_house/img/15123714562136.jpg', 'img/old_house/sm/15123714562136.jpg', 'img/old_house/md/15123714562136.jpg', 'img/old_house/lg/15123714562136.jpg'),
(13, 2, '卫生间', 'img/old_house/img/15123714621547.jpg', 'img/old_house/sm/15123714621547.jpg', 'img/old_house/md/15123714621547.jpg', 'img/old_house/lg/15123714621547.jpg'),
(14, 2, '户型图', 'img/old_house/img/15123714695475.jpg', 'img/old_house/sm/15123714695475.jpg', 'img/old_house/md/15123714695475.jpg', 'img/old_house/lg/15123714695475.jpg'),
(15, 3, '卧室1', 'img/old_house/img/15123714919580.jpg', 'img/old_house/sm/15123714919580.jpg', 'img/old_house/md/15123714919580.jpg', 'img/old_house/lg/15123714919580.jpg'),
(16, 3, '卧室2', 'img/old_house/img/15123714955250.jpg', 'img/old_house/sm/15123714955250.jpg', 'img/old_house/md/15123714955250.jpg', 'img/old_house/lg/15123714955250.jpg'),
(17, 3, '厨房', 'img/old_house/img/15123715016792.jpg', 'img/old_house/sm/15123715016792.jpg', 'img/old_house/md/15123715016792.jpg', 'img/old_house/lg/15123715016792.jpg'),
(18, 3, '卧室1', 'img/old_house/img/15123715086594.jpg', 'img/old_house/sm/15123715086594.jpg', 'img/old_house/md/15123715086594.jpg', 'img/old_house/lg/15123715086594.jpg'),
(19, 3, '卧室2', 'img/old_house/img/15123715122417.jpg', 'img/old_house/sm/15123715122417.jpg', 'img/old_house/md/15123715122417.jpg', 'img/old_house/lg/15123715122417.jpg'),
(20, 3, '卫生间', 'img/old_house/img/15123715207465.jpg', 'img/old_house/sm/15123715207465.jpg', 'img/old_house/md/15123715207465.jpg', 'img/old_house/lg/15123715207465.jpg'),
(21, 3, '户型图', 'img/old_house/img/15123715268914.jpg', 'img/old_house/sm/15123715268914.jpg', 'img/old_house/md/15123715268914.jpg', 'img/old_house/lg/15123715268914.jpg'),
(22, 4, '客厅', 'img/old_house/img/15123715456105.jpg', 'img/old_house/sm/15123715456105.jpg', 'img/old_house/md/15123715456105.jpg', 'img/old_house/lg/15123715456105.jpg'),
(23, 4, '客厅2', 'img/old_house/img/15123715524686.jpg', 'img/old_house/sm/15123715524686.jpg', 'img/old_house/md/15123715524686.jpg', 'img/old_house/lg/15123715524686.jpg'),
(24, 4, '厨房', 'img/old_house/img/15123715597943.jpg', 'img/old_house/sm/15123715597943.jpg', 'img/old_house/md/15123715597943.jpg', 'img/old_house/lg/15123715597943.jpg'),
(25, 4, '卧室1', 'img/old_house/img/15123715661565.jpg', 'img/old_house/sm/15123715661565.jpg', 'img/old_house/md/15123715661565.jpg', 'img/old_house/lg/15123715661565.jpg'),
(26, 4, '卧室2', 'img/old_house/img/15123715713096.jpg', 'img/old_house/sm/15123715713096.jpg', 'img/old_house/md/15123715713096.jpg', 'img/old_house/lg/15123715713096.jpg'),
(27, 4, '卫生间', 'img/old_house/img/15123715782326.jpg', 'img/old_house/sm/15123715782326.jpg', 'img/old_house/md/15123715782326.jpg', 'img/old_house/lg/15123715782326.jpg'),
(28, 4, '户型图', 'img/old_house/img/15123715843869.jpg', 'img/old_house/sm/15123715843869.jpg', 'img/old_house/md/15123715843869.jpg', 'img/old_house/lg/15123715843869.jpg'),
(29, 5, '客厅1', 'img/old_house/img/15123716008180.jpg', 'img/old_house/sm/15123716008180.jpg', 'img/old_house/md/15123716008180.jpg', 'img/old_house/lg/15123716008180.jpg'),
(30, 5, '客厅2', 'img/old_house/img/15123716042255.jpg', 'img/old_house/sm/15123716042255.jpg', 'img/old_house/md/15123716042255.jpg', 'img/old_house/lg/15123716042255.jpg'),
(31, 5, '厨房', 'img/old_house/img/15123716116275.jpg', 'img/old_house/sm/15123716116275.jpg', 'img/old_house/md/15123716116275.jpg', 'img/old_house/lg/15123716116275.jpg'),
(32, 5, '卧室1', 'img/old_house/img/15123716187432.jpg', 'img/old_house/sm/15123716187432.jpg', 'img/old_house/md/15123716187432.jpg', 'img/old_house/lg/15123716187432.jpg'),
(33, 5, '卧室2', 'img/old_house/img/15123716227197.jpg', 'img/old_house/sm/15123716227197.jpg', 'img/old_house/md/15123716227197.jpg', 'img/old_house/lg/15123716227197.jpg'),
(34, 5, '卫生间', 'img/old_house/img/15123716303270.jpg', 'img/old_house/sm/15123716303270.jpg', 'img/old_house/md/15123716303270.jpg', 'img/old_house/lg/15123716303270.jpg'),
(35, 5, '户型图', 'img/old_house/img/15123716362470.jpg', 'img/old_house/sm/15123716362470.jpg', 'img/old_house/md/15123716362470.jpg', 'img/old_house/lg/15123716362470.jpg'),
(36, 6, '客厅1', 'img/old_house/img/15123716505820.jpg', 'img/old_house/sm/15123716505820.jpg', 'img/old_house/md/15123716505820.jpg', 'img/old_house/lg/15123716505820.jpg'),
(37, 6, '客厅2', 'img/old_house/img/15123716542055.jpg', 'img/old_house/sm/15123716542055.jpg', 'img/old_house/md/15123716542055.jpg', 'img/old_house/lg/15123716542055.jpg'),
(38, 6, '厨房', 'img/old_house/img/1512371670827.jpg', 'img/old_house/sm/1512371670827.jpg', 'img/old_house/md/1512371670827.jpg', 'img/old_house/lg/1512371670827.jpg'),
(39, 6, '卧室1', 'img/old_house/img/15123716761849.jpg', 'img/old_house/sm/15123716761849.jpg', 'img/old_house/md/15123716761849.jpg', 'img/old_house/lg/15123716761849.jpg'),
(40, 6, '卧室2', 'img/old_house/img/15123716801220.jpg', 'img/old_house/sm/15123716801220.jpg', 'img/old_house/md/15123716801220.jpg', 'img/old_house/lg/15123716801220.jpg'),
(41, 6, '卫生间', 'img/old_house/img/15123716861189.jpg', 'img/old_house/sm/15123716861189.jpg', 'img/old_house/md/15123716861189.jpg', 'img/old_house/lg/15123716861189.jpg'),
(42, 6, '户型图', 'img/old_house/img/15123716924615.jpg', 'img/old_house/sm/15123716924615.jpg', 'img/old_house/md/15123716924615.jpg', 'img/old_house/lg/15123716924615.jpg'),
(43, 7, '客厅1', 'img/old_house/img/1512371706349.jpg', 'img/old_house/sm/1512371706349.jpg', 'img/old_house/md/1512371706349.jpg', 'img/old_house/lg/1512371706349.jpg'),
(44, 7, '客厅2', 'img/old_house/img/1512371710818.jpg', 'img/old_house/sm/1512371710818.jpg', 'img/old_house/md/1512371710818.jpg', 'img/old_house/lg/1512371710818.jpg'),
(45, 7, '厨房', 'img/old_house/img/15123717188038.jpg', 'img/old_house/sm/15123717188038.jpg', 'img/old_house/md/15123717188038.jpg', 'img/old_house/lg/15123717188038.jpg'),
(46, 7, '卧室1', 'img/old_house/img/15123717279320.jpg', 'img/old_house/sm/15123717279320.jpg', 'img/old_house/md/15123717279320.jpg', 'img/old_house/lg/15123717279320.jpg'),
(47, 7, '卧室2', 'img/old_house/img/15123717318906.jpg', 'img/old_house/sm/15123717318906.jpg', 'img/old_house/md/15123717318906.jpg', 'img/old_house/lg/15123717318906.jpg'),
(48, 7, '卧室3', 'img/old_house/img/15123717356802.jpg', 'img/old_house/sm/15123717356802.jpg', 'img/old_house/md/15123717356802.jpg', 'img/old_house/lg/15123717356802.jpg'),
(49, 7, '卧室4', 'img/old_house/img/15123717451040.jpg', 'img/old_house/sm/15123717451040.jpg', 'img/old_house/md/15123717451040.jpg', 'img/old_house/lg/15123717451040.jpg'),
(50, 7, '卫生间1', 'img/old_house/img/15123717574632.jpg', 'img/old_house/sm/15123717574632.jpg', 'img/old_house/md/15123717574632.jpg', 'img/old_house/lg/15123717574632.jpg'),
(51, 7, '卫生间2', 'img/old_house/img/15123717613461.jpg', 'img/old_house/sm/15123717613461.jpg', 'img/old_house/md/15123717613461.jpg', 'img/old_house/lg/15123717613461.jpg'),
(52, 7, '户型图', 'img/old_house/img/15123717706362.jpg', 'img/old_house/sm/15123717706362.jpg', 'img/old_house/md/15123717706362.jpg', 'img/old_house/lg/15123717706362.jpg'),
(53, 8, '客厅1', 'img/old_house/img/15123717853632.jpg', 'img/old_house/sm/15123717853632.jpg', 'img/old_house/md/15123717853632.jpg', 'img/old_house/lg/15123717853632.jpg'),
(54, 8, '客厅2', 'img/old_house/img/15123717895236.jpg', 'img/old_house/sm/15123717895236.jpg', 'img/old_house/md/15123717895236.jpg', 'img/old_house/lg/15123717895236.jpg'),
(55, 8, '厨房', 'img/old_house/img/15123717974949.jpg', 'img/old_house/sm/15123717974949.jpg', 'img/old_house/md/15123717974949.jpg', 'img/old_house/lg/15123717974949.jpg'),
(56, 8, '卧室1', 'img/old_house/img/15123718031683.jpg', 'img/old_house/sm/15123718031683.jpg', 'img/old_house/md/15123718031683.jpg', 'img/old_house/lg/15123718031683.jpg'),
(57, 8, '卧室2', 'img/old_house/img/15123718064251.jpg', 'img/old_house/sm/15123718064251.jpg', 'img/old_house/md/15123718064251.jpg', 'img/old_house/lg/15123718064251.jpg'),
(58, 8, '卧室3', 'img/old_house/img/1512371809821.jpg', 'img/old_house/sm/1512371809821.jpg', 'img/old_house/md/1512371809821.jpg', 'img/old_house/lg/1512371809821.jpg'),
(59, 8, '卫生间1', 'img/old_house/img/15123718189308.jpg', 'img/old_house/sm/15123718189308.jpg', 'img/old_house/md/15123718189308.jpg', 'img/old_house/lg/15123718189308.jpg'),
(60, 8, '卫生间2', 'img/old_house/img/15123718229953.jpg', 'img/old_house/sm/15123718229953.jpg', 'img/old_house/md/15123718229953.jpg', 'img/old_house/lg/15123718229953.jpg'),
(61, 8, '户型图', 'img/old_house/img/15123718276334.jpg', 'img/old_house/sm/15123718276334.jpg', 'img/old_house/md/15123718276334.jpg', 'img/old_house/lg/15123718276334.jpg'),
(62, 9, '效果图', 'img/new_house/img/15123739554936.jpg', 'img/new_house/sm/15123739554936.jpg', 'img/new_house/md/15123739554936.jpg', 'img/new_house/lg/15123739554936.jpg'),
(63, 9, '实景图', 'img/new_house/img/15123739922095.jpg', 'img/new_house/sm/15123739922095.jpg', 'img/new_house/md/15123739922095.jpg', 'img/new_house/lg/15123739922095.jpg'),
(64, 9, '样板间1', 'img/new_house/img/15123739983466.jpg', 'img/new_house/sm/15123739983466.jpg', 'img/new_house/md/15123739983466.jpg', 'img/new_house/lg/15123739983466.jpg'),
(65, 9, '样板间2', 'img/new_house/img/15123740012140.jpg', 'img/new_house/sm/15123740012140.jpg', 'img/new_house/md/15123740012140.jpg', 'img/new_house/lg/15123740012140.jpg'),
(66, 9, '样板间3', 'img/new_house/img/15123740082518.jpg', 'img/new_house/sm/15123740082518.jpg', 'img/new_house/md/15123740082518.jpg', 'img/new_house/lg/15123740082518.jpg'),
(67, 9, '样板间4', 'img/new_house/img/15123740131635.jpg', 'img/new_house/sm/15123740131635.jpg', 'img/new_house/md/15123740131635.jpg', 'img/new_house/lg/15123740131635.jpg'),
(68, 10, '实景图', 'img/new_house/img/15123740293928.jpg', 'img/new_house/sm/15123740293928.jpg', 'img/new_house/md/15123740293928.jpg', 'img/new_house/lg/15123740293928.jpg'),
(69, 10, '效果图', 'img/new_house/img/1512374035694.jpg', 'img/new_house/sm/1512374035694.jpg', 'img/new_house/md/1512374035694.jpg', 'img/new_house/lg/1512374035694.jpg'),
(70, 10, '样板间', 'img/new_house/img/1512374042471.jpg', 'img/new_house/sm/1512374042471.jpg', 'img/new_house/md/1512374042471.jpg', 'img/new_house/lg/1512374042471.jpg'),
(71, 10, '样板间2', 'img/new_house/img/15123740451624.jpg', 'img/new_house/sm/15123740451624.jpg', 'img/new_house/md/15123740451624.jpg', 'img/new_house/lg/15123740451624.jpg'),
(72, 10, '样板间3', 'img/new_house/img/15123740493356.jpg', 'img/new_house/sm/15123740493356.jpg', 'img/new_house/md/15123740493356.jpg', 'img/new_house/lg/15123740493356.jpg'),
(73, 10, '样板间4', 'img/new_house/img/15123740526415.jpg', 'img/new_house/sm/15123740526415.jpg', 'img/new_house/md/15123740526415.jpg', 'img/new_house/lg/15123740526415.jpg'),
(74, 11, '实景图', 'img/new_house/img/15123740739732.jpg', 'img/new_house/sm/15123740739732.jpg', 'img/new_house/md/15123740739732.jpg', 'img/new_house/lg/15123740739732.jpg'),
(75, 11, '效果图', 'img/new_house/img/15123740784249.jpg', 'img/new_house/sm/15123740784249.jpg', 'img/new_house/md/15123740784249.jpg', 'img/new_house/lg/15123740784249.jpg'),
(76, 11, '样板间1', 'img/new_house/img/1512374087186.jpg', 'img/new_house/sm/1512374087186.jpg', 'img/new_house/md/1512374087186.jpg', 'img/new_house/lg/1512374087186.jpg'),
(77, 11, '样板间2', 'img/new_house/img/15123740918992.jpg', 'img/new_house/sm/15123740918992.jpg', 'img/new_house/md/15123740918992.jpg', 'img/new_house/lg/15123740918992.jpg'),
(78, 11, '样板间3', 'img/new_house/img/15123740946240.jpg', 'img/new_house/sm/15123740946240.jpg', 'img/new_house/md/15123740946240.jpg', 'img/new_house/lg/15123740946240.jpg'),
(79, 11, '样板间4', 'img/new_house/img/15123740976699.jpg', 'img/new_house/sm/15123740976699.jpg', 'img/new_house/md/15123740976699.jpg', 'img/new_house/lg/15123740976699.jpg'),
(80, 12, '实景图', 'img/new_house/img/15123741137855.jpg', 'img/new_house/sm/15123741137855.jpg', 'img/new_house/md/15123741137855.jpg', 'img/new_house/lg/15123741137855.jpg'),
(81, 12, '效果图', 'img/new_house/img/15123741183112.jpg', 'img/new_house/sm/15123741183112.jpg', 'img/new_house/md/15123741183112.jpg', 'img/new_house/lg/15123741183112.jpg'),
(82, 12, '样板间1', 'img/new_house/img/1512374123931.jpg', 'img/new_house/sm/1512374123931.jpg', 'img/new_house/md/1512374123931.jpg', 'img/new_house/lg/1512374123931.jpg'),
(83, 12, '样板间2', 'img/new_house/img/15123741261161.jpg', 'img/new_house/sm/15123741261161.jpg', 'img/new_house/md/15123741261161.jpg', 'img/new_house/lg/15123741261161.jpg'),
(84, 12, '样板间3', 'img/new_house/img/15123741294802.jpg', 'img/new_house/sm/15123741294802.jpg', 'img/new_house/md/15123741294802.jpg', 'img/new_house/lg/15123741294802.jpg'),
(85, 12, '样板间4', 'img/new_house/img/15123741338462.jpg', 'img/new_house/sm/15123741338462.jpg', 'img/new_house/md/15123741338462.jpg', 'img/new_house/lg/15123741338462.jpg'),
(86, 12, '实景图', 'img/new_house/img/15123741449743.jpg', 'img/new_house/sm/15123741449743.jpg', 'img/new_house/md/15123741449743.jpg', 'img/new_house/lg/15123741449743.jpg'),
(87, 12, '效果图', 'img/new_house/img/15123741494821.jpg', 'img/new_house/sm/15123741494821.jpg', 'img/new_house/md/15123741494821.jpg', 'img/new_house/lg/15123741494821.jpg'),
(88, 12, '样板间1', 'img/new_house/img/15123741554464.jpg', 'img/new_house/sm/15123741554464.jpg', 'img/new_house/md/15123741554464.jpg', 'img/new_house/lg/15123741554464.jpg'),
(89, 12, '样板间2', 'img/new_house/img/15123741599730.jpg', 'img/new_house/sm/15123741599730.jpg', 'img/new_house/md/15123741599730.jpg', 'img/new_house/lg/15123741599730.jpg'),
(90, 12, '样板间3', 'img/new_house/img/15123741643614.jpg', 'img/new_house/sm/15123741643614.jpg', 'img/new_house/md/15123741643614.jpg', 'img/new_house/lg/15123741643614.jpg'),
(91, 12, '样板间4', 'img/new_house/img/15123741689869.jpg', 'img/new_house/sm/15123741689869.jpg', 'img/new_house/md/15123741689869.jpg', 'img/new_house/lg/15123741689869.jpg'),
(92, 12, '实景图', 'img/new_house/img/15123741795278.jpg', 'img/new_house/sm/15123741795278.jpg', 'img/new_house/md/15123741795278.jpg', 'img/new_house/lg/15123741795278.jpg'),
(93, 12, '效果图', 'img/new_house/img/15123741886604.jpg', 'img/new_house/sm/15123741886604.jpg', 'img/new_house/md/15123741886604.jpg', 'img/new_house/lg/15123741886604.jpg'),
(94, 12, '样板间1', 'img/new_house/img/15123741938480.jpg', 'img/new_house/sm/15123741938480.jpg', 'img/new_house/md/15123741938480.jpg', 'img/new_house/lg/15123741938480.jpg'),
(95, 12, '样板间2', 'img/new_house/img/15123741973491.jpg', 'img/new_house/sm/15123741973491.jpg', 'img/new_house/md/15123741973491.jpg', 'img/new_house/lg/15123741973491.jpg'),
(96, 12, '样板间3', 'img/new_house/img/1512374200683.jpg', 'img/new_house/sm/1512374200683.jpg', 'img/new_house/md/1512374200683.jpg', 'img/new_house/lg/1512374200683.jpg'),
(97, 12, '样板间4', 'img/new_house/img/15123742033771.jpg', 'img/new_house/sm/15123742033771.jpg', 'img/new_house/md/15123742033771.jpg', 'img/new_house/lg/15123742033771.jpg'),
(98, 13, '实景图', 'img/new_house/img/1512374339727.jpg', 'img/new_house/sm/1512374339727.jpg', 'img/new_house/md/1512374339727.jpg', 'img/new_house/lg/1512374339727.jpg'),
(99, 13, '效果图', 'img/new_house/img/15123743456061.jpg', 'img/new_house/sm/15123743456061.jpg', 'img/new_house/md/15123743456061.jpg', 'img/new_house/lg/15123743456061.jpg'),
(100, 13, '样板间1', 'img/new_house/img/15123743512396.jpg', 'img/new_house/sm/15123743512396.jpg', 'img/new_house/md/15123743512396.jpg', 'img/new_house/lg/15123743512396.jpg'),
(101, 13, '样板间2', 'img/new_house/img/1512374354829.jpg', 'img/new_house/sm/1512374354829.jpg', 'img/new_house/md/1512374354829.jpg', 'img/new_house/lg/1512374354829.jpg'),
(102, 13, '样板间3', 'img/new_house/img/15123743578610.jpg', 'img/new_house/sm/15123743578610.jpg', 'img/new_house/md/15123743578610.jpg', 'img/new_house/lg/15123743578610.jpg'),
(103, 13, '样板间4', 'img/new_house/img/15123743603599.jpg', 'img/new_house/sm/15123743603599.jpg', 'img/new_house/md/15123743603599.jpg', 'img/new_house/lg/15123743603599.jpg'),
(104, 14, '实景图', 'img/new_house/img/15123743779645.jpg', 'img/new_house/sm/15123743779645.jpg', 'img/new_house/md/15123743779645.jpg', 'img/new_house/lg/15123743779645.jpg'),
(105, 14, '效果图', 'img/new_house/img/15123743854177.jpg', 'img/new_house/sm/15123743854177.jpg', 'img/new_house/md/15123743854177.jpg', 'img/new_house/lg/15123743854177.jpg'),
(106, 14, '样板间1', 'img/new_house/img/15123743914210.jpg', 'img/new_house/sm/15123743914210.jpg', 'img/new_house/md/15123743914210.jpg', 'img/new_house/lg/15123743914210.jpg'),
(107, 14, '样板间2', 'img/new_house/img/15123743942055.jpg', 'img/new_house/sm/15123743942055.jpg', 'img/new_house/md/15123743942055.jpg', 'img/new_house/lg/15123743942055.jpg'),
(108, 14, '样板间3', 'img/new_house/img/15123743976954.jpg', 'img/new_house/sm/15123743976954.jpg', 'img/new_house/md/15123743976954.jpg', 'img/new_house/lg/15123743976954.jpg'),
(109, 14, '样板间4', 'img/new_house/img/15123744003912.jpg', 'img/new_house/sm/15123744003912.jpg', 'img/new_house/md/15123744003912.jpg', 'img/new_house/lg/15123744003912.jpg');


#二手房/新房 特色 -- 瑞霆
CREATE TABLE re_house_feature(             
  hfid                INT PRIMARY KEY AUTO_INCREMENT,      #特色编号            
  hid                 INT NOT NULL DEFAULT 0 ,             #房源编号
  label               VARCHAR(64) NOT NULL DEFAULT '',     #房源标签
  point               VARCHAR(256) NOT NULL DEFAULT '',    #核心卖点
  traffic             VARCHAR(256) NOT NULL DEFAULT '',    #交通出行
  perimeter           VARCHAR(256) NOT NULL DEFAULT '',    #周边配套
  introduce           VARCHAR(256) NOT NULL DEFAULT ''     #小区介绍
);

INSERT INTO `re_house_feature` (`hfid`, `hid`, `label`, `point`, `traffic`, `perimeter`, `introduce`) VALUES
(1, 1, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(2, 2, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '此小区可以乘坐地铁三号线天润城站，还有众多公交线路，如555.533.665.656等，出行便利。', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区09年新建的房子，共计56栋。区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 物业好，绿化好'),
(3, 3, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(4, 4, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(5, 5, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(6, 6, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(7, 7, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(8, 8, '地铁 房本满五年 随时看房', '此房电梯房，1楼有架空，南北通透，配套齐全，地铁口交通便利', '距离地铁站仅420米，小区门口有多路公交车站，不管是去市区还是高新区、六合区、江浦都很的方便，为您的出行节省大量的时间.', '购物、娱乐设施完善，小区一公里处有大型苏果超市、大型沃尔玛超市、大洋、新一城、弘阳等大型购物广场，弘阳儿童欢乐世界、弘阳美食街等', '小区中间有条主干道，干道两边由多层到高层;小区前面是多层，往后是高层。布局合理，每栋楼采光都很好。小区人车分流 ; 封闭式管理 ; 绿化好。这里是您居家的理想选择'),
(9, 9, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '可乘坐808 831 832 836 837多路公交车', '配套设施完善,邻近淳化中学,北边邻近商业街', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好'),
(10, 10, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '邻近地铁S1号线', '配套设施完善 邻近河海大学和南京航空航天大学 环境优美', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好'),
(11, 11, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '邻近江浦客运站', '配套设施完善 周边有浦口区中医院以及浦口高级中学', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好'),
(12, 12, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '可乘坐502 512 551 555 569等多路公交车', '邻近南京市浦口区万江幼儿园 南京市浦口区浦厂医院', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好'),
(13, 13, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '可乘坐地铁1 3 4号线 交通便利', '邻近江苏省中医院结合医院 南京林业大学南京林业大学', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好'),
(14, 14, '地铁 随时看房', '南北通透 采光充足 配套完善 交通便利', '邻近地铁10号线', '附近有江苏省江浦高级中学 南京工业大学江浦校区 南京市浦口区中心医院', '小区布局合理,每栋楼采光都很好;小区物业管理合理,绿化好');


#二手房/新房 交易属性 -- 朝伟
CREATE TABLE re_house_transaction(
  htid               INT PRIMARY KEY AUTO_INCREMENT,       #二手房/新房 交易编号  
  hid                INT NOT NULL DEFAULT 0 ,              #房源编号
  time_tone          DATETIME NOT NULL DEFAULT '2017-12-01',   #挂牌时间
  last_transaction   DATETIME NOT NULL DEFAULT '2017-12-01',   #上次交易
  house_year         VARCHAR(32) NOT NULL DEFAULT '',      #房屋年限
  mortgage_info      VARCHAR(64) NOT NULL DEFAULT '',      #抵押信息
  transaction_ownership VARCHAR(64) NOT NULL DEFAULT '',   #交易权属
  house_user         VARCHAR(32) NOT NULL DEFAULT '',      #房屋用户
  property_ownership VARCHAR(32) NOT NULL DEFAULT '',      #产权所属
  fangben            VARCHAR(64) NOT NULL DEFAULT ''       #房本备件
);

INSERT INTO `re_house_transaction` (`htid`, `hid`, `time_tone`, `last_transaction`, `house_year`, `mortgage_info`, `transaction_ownership`, `house_user`, `property_ownership`, `fangben`) VALUES
(1, 1, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(2, 2, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(3, 3, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(4, 4, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(5, 5, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(6, 6, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(7, 7, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(8, 8, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '满五年', '无抵押', '商品房', '普通住宅', '共有', '已上传房本照片'),
(9, 9, '2017-10-14 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', ''),
(10, 10, '2013-08-31 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', ''),
(11, 11, '2016-11-05 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', ''),
(12, 12, '2017-01-19 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', ''),
(13, 13, '2016-10-19 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', ''),
(14, 14, '2016-07-31 00:00:00', '2013-08-31 00:00:00', '', '', '商品房', '普通住房', '共有', '');


#############################################
##########          租房         ############
#############################################

#租房基本信息 -- 康康
CREATE TABLE re_zufang(
  zid                 INT PRIMARY KEY AUTO_INCREMENT,       #编号
  uid                 INT NOT NULL DEFAULT 0,               #经纪人 
  title               VARCHAR(64) NOT NULL DEFAULT '',      #标题
  area                VARCHAR(64) NOT NULL DEFAULT '',      #区
  size                FLOAT NOT NULL DEFAULT 0, 	            #面积
  floor               VARCHAR(32) NOT NULL DEFAULT '',      #楼层
  metro               VARCHAR(32) NOT NULL DEFAULT '',      #地铁
  district            VARCHAR(32) NOT NULL DEFAULT '',      #小区
  house_room          INT NOT NULL DEFAULT 0,               #室
  house_hall          INT NOT NULL DEFAULT 0,               #厅
  house_kitchen       INT NOT NULL DEFAULT 0,               #厨房
  house_toilet        INT NOT NULL DEFAULT 0,               #卫生间
  publish_time        DATETIME NOT NULL DEFAULT '2017-12-01',  #发布时间
  price               DECIMAL(8,2) NOT NULL DEFAULT 0 ,     #价格
  side                VARCHAR(32) NOT NULL DEFAULT '',      #房屋朝向
  people              INT NOT NULL DEFAULT 0,                #几人看过房
  building_No         VARCHAR(64)  NOT NULL DEFAULT ''      #楼栋号 单元号 门牌号
);

INSERT INTO `re_zufang` (`zid`, `uid`, `title`, `area`, `size`, `floor`, `metro`, `district`, `house_room`, `house_hall`, `house_kitchen`, `house_toilet`, `publish_time`, `price`, `side`, `people`,`building_No`) VALUES
(1, 2, '环境优美 随时看房 紧凑单室套 温馨入住', '江宁区', 49, '低楼层(共11层)', '距离S1机场线翠屏山站303米', '托乐嘉单身公寓', 1, 1, 1,1, '2017-12-02 00:00:00', '2300.00', '南', 18,'10栋2单元403'),
(2, 3, '一楼带院子 品牌家具 看房方便', '江宁区', 131, '低楼层(共6层)', '江宁 麒麟镇', '锦绣花园',3,2,1,2, '2017-12-03 00:00:00', '3500.00', '南 北', 3,'10栋2单元403'),
(3, 2, '王府园小区 2室1厅 2800元', '秦淮区', 82, '低楼层(共11层)', '距离1号线张府园站768米', '王府园小区',2,1,1,1, '2017-12-02 00:00:00', '2800.00', '南 北', 3,'10栋2单元403'),
(4, 3, '东郊小镇第八街区 2室1厅 1800元', '江宁区', 45, '低楼层(共9层)', '江宁 麒麟镇', '东郊小镇第八街区',2,1,1,1, '2017-12-04 00:00:00', '1800.00', '东南', 1,'10栋2单元403'),
(5, 2, '丹佛单身公寓，拎包入住', '江宁区', 34, '中楼层(共9层)', '江宁 将军大道', '丹佛单身公寓',1,1,1,1, '2017-10-02 00:00:00', '2200.00', '北', 8,'10栋2单元403'),
(6, 3, '文枢苑居家大三房 采光好 视野开阔 环境好 人文素质', '江宁区', 138, '低楼层(共11层)', '距地铁S1机场线河海大学.佛城西路813米', '江南文枢苑云泊居',2,1,1,1, '2017-12-02 00:00:00', '4500.00', '南 北', 2,'10栋2单元403');

#租房特色 -- 威威
CREATE TABLE re_zufang_feature(
  zfid                INT PRIMARY KEY AUTO_INCREMENT,       #编号
  zid                 INT NOT NULL DEFAULT 0,               #房源编号
  clothespress        ENUM('1','0') NOT NULL DEFAULT '0',   #衣柜  1是有 0是没有
  tables              ENUM('1','0') NOT NULL DEFAULT '0',   #桌椅
  tv                  ENUM('1','0') NOT NULL DEFAULT '0',   #电视
  refrigerator        ENUM('1','0') NOT NULL DEFAULT '0',   #冰箱
  washing_machine     ENUM('1','0') NOT NULL DEFAULT '0',   #洗衣机
  air_conditioner     ENUM('1','0') NOT NULL DEFAULT '0',   #空调
  heater              ENUM('1','0') NOT NULL DEFAULT '0',   #热水器
  radiator            ENUM('1','0') NOT NULL DEFAULT '0',   #暖气
  microwave_oven      ENUM('1','0') NOT NULL DEFAULT '0',   #微波炉
  wifi                ENUM('1','0') NOT NULL DEFAULT '0',   #宽带
  natural_gas         ENUM('1','0') NOT NULL DEFAULT '0',   #天然气
  traffic             VARCHAR(128) NOT NULL DEFAULT '',     #交通出行
  around              VARCHAR(128) NOT NULL DEFAULT '',     #周边配套
  district_info       VARCHAR(256) NOT NULL DEFAULT ''      #小区介绍
);

INSERT INTO `re_zufang_feature` (`zfid`, `zid`, `clothespress`, `tables`, `tv`, `refrigerator`, `washing_machine`, `air_conditioner`, `heater`, `radiator`, `microwave_oven`, `wifi`, `natural_gas`, `traffic`, `around`, `district_info`) VALUES
(1, 1, '1', '1', '1', '1', '1', '1', '1', '', '1', '', '', '小区所在位置处于将军大道9号，出行方便，南门有768,719,820等多条公交路线，可去江宁万达，金鹰和瑞都购物广场；门口就有地铁线，去机场直达；西门有711,154,705等多条公交路线，去软件大道和新街口也很方便', '	此区所在位置繁华，楼下有大型苏果超市，托乐嘉小吃一条街，菜市场，电影院，社区医院，有多家银行，有交通银行，华夏银行，招商银行，民生银行，生活方便', '托乐嘉小区环境清幽，共计分五个邻居和一个单身公寓。托乐嘉友邻居，睦邻居，贵邻居，吉邻居，旺邻居。小区占地面积654亩，70万平方米的总建筑面积'),
(2, 2, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '小区门口有多条的公交线路，有55路，路过马群2号地铁，开往南京主城区，还有121路，179路，205路等等开往南京的各个地方，出行方便', '配套完善，小区里面有社区医院，大门口有大型的苏果社区店，距离小区400米有大型的农贸市场，还有饭店，菜馆，农业银行，建设银行，公交站等等的一些生活配套，生活便利', '小区住宅区220多栋，别墅区280多栋，自带天然锦湖可以夜间散步，游玩。小区内有网球场，篮球场，可以运动健身。门口有大型苏果超市、五星电器方便生活'),
(3, 3, '1', '1', '1', '1', '1', '1', '1', '', '', '', '', '小区门口有多条公交线路，有29路，44路，65路，95路等多条公交路线，有地铁1号线', '此区所在位置繁华，楼下有大型苏果超市，菜市场，娱乐设施', '小区环境清幽，小区内有网球场，篮球场，可以运动健身。'),
(4, 4, '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '', '小区门口有多条公交线路,有55路，121路，179路，205路等多条公交线路', '此区所在位置繁华，楼下有大型苏果超市，菜市场，娱乐设施', '小区环境清幽，小区内有网球场，篮球场，可以运动健身。'),
(5, 5, '1', '1', '1', '1', '1', '1', '1', '', '', '1', '', '机场高速公路、宁丹路、将军路、佛城路、利源路，路线四通八达。出门就是820公交站台，交通便利', '楼下有大型苏果超市，菜市场，娱乐设施', '丹佛小镇又名诚基花园，小区环境舒适，小区内建有幼儿园，物业是合和物业，小区楼间距大，采光好，东面是江南青年城，南靠科嘉花园，北面是楚襄园'),
(6, 6, '1', '1', '1', '1', '1', '1', '1', '1', '', '', '', '小区门口有多条公交线路,有719路，820路，711路，716路等多条公交线路', '此区所在位置繁华，楼下有大型苏果超市，托乐嘉小吃一条街，菜市场，电影院，社区医院', '小区环境清幽，小区内有网球场，篮球场，可以运动健身');


#租房房源图片 -- 二广
CREATE TABLE re_zufang_pic(													        
  zpid                INT PRIMARY KEY AUTO_INCREMENT,       #编号
  zid                 INT NOT NULL DEFAULT 0,               #房源编号
  title               VARCHAR(64) NOT NULL DEFAULT '',      #图片标题：A厅，B厅，房间A，房间B......
  img									VARCHAR(64) NOT NULL DEFAULT '',      #房间图片: 原图
  sm                  VARCHAR(64) NOT NULL DEFAULT '',      #房间图片：小图
  md                  VARCHAR(64) NOT NULL DEFAULT '',      #房间图片：中图
  lg                  VARCHAR(64) NOT NULL DEFAULT ''       #房间图片：大图
);

INSERT INTO `re_zufang_pic` (`zpid`, `zid`, `title`, `img`, `sm`, `md`, `lg`) VALUES
(1, 1, '户型图', 'img/re_house/img/1512375792919.jpg', 'img/re_house/sm/1512375792919.jpg', 'img/re_house/md/1512375792919.jpg', 'img/re_house/lg/1512375792919.jpg'),
(2, 1, '厨房', 'img/re_house/img/15123758251080.jpg', 'img/re_house/sm/15123758251080.jpg', 'img/re_house/md/15123758251080.jpg', 'img/re_house/lg/15123758251080.jpg'),
(3, 1, '客厅', 'img/re_house/img/15123758335016.jpg', 'img/re_house/sm/15123758335016.jpg', 'img/re_house/md/15123758335016.jpg', 'img/re_house/lg/15123758335016.jpg'),
(4, 1, '卫生间', 'img/re_house/img/15123758419626.jpg', 'img/re_house/sm/15123758419626.jpg', 'img/re_house/md/15123758419626.jpg', 'img/re_house/lg/15123758419626.jpg'),
(5, 1, '卧室', 'img/re_house/img/15123758488175.jpg', 'img/re_house/sm/15123758488175.jpg', 'img/re_house/md/15123758488175.jpg', 'img/re_house/lg/15123758488175.jpg'),
(6, 1, '其他', 'img/re_house/img/15123758534223.jpg', 'img/re_house/sm/15123758534223.jpg', 'img/re_house/md/15123758534223.jpg', 'img/re_house/lg/15123758534223.jpg'),
(7, 2, '户型图', 'img/re_house/img/15123758663263.jpg', 'img/re_house/sm/15123758663263.jpg', 'img/re_house/md/15123758663263.jpg', 'img/re_house/lg/15123758663263.jpg'),
(8, 2, '客厅1', 'img/re_house/img/15123758791549.jpg', 'img/re_house/sm/15123758791549.jpg', 'img/re_house/md/15123758791549.jpg', 'img/re_house/lg/15123758791549.jpg'),
(9, 2, '客厅2', 'img/re_house/img/15123758888364.jpg', 'img/re_house/sm/15123758888364.jpg', 'img/re_house/md/15123758888364.jpg', 'img/re_house/lg/15123758888364.jpg'),
(10, 2, '客厅3', 'img/re_house/img/15123758922972.jpg', 'img/re_house/sm/15123758922972.jpg', 'img/re_house/md/15123758922972.jpg', 'img/re_house/lg/15123758922972.jpg'),
(11, 2, '卫生间1', 'img/re_house/img/15123758992505.jpg', 'img/re_house/sm/15123758992505.jpg', 'img/re_house/md/15123758992505.jpg', 'img/re_house/lg/15123758992505.jpg'),
(12, 2, '卫生间2', 'img/re_house/img/15123759022046.jpg', 'img/re_house/sm/15123759022046.jpg', 'img/re_house/md/15123759022046.jpg', 'img/re_house/lg/15123759022046.jpg'),
(13, 2, '卧室', 'img/re_house/img/15123759083143.jpg', 'img/re_house/sm/15123759083143.jpg', 'img/re_house/md/15123759083143.jpg', 'img/re_house/lg/15123759083143.jpg'),
(14, 2, '卧室2', 'img/re_house/img/15123759102014.jpg', 'img/re_house/sm/15123759102014.jpg', 'img/re_house/md/15123759102014.jpg', 'img/re_house/lg/15123759102014.jpg'),
(15, 2, '卧室3', 'img/re_house/img/15123759143680.jpg', 'img/re_house/sm/15123759143680.jpg', 'img/re_house/md/15123759143680.jpg', 'img/re_house/lg/15123759143680.jpg'),
(16, 2, '厨房', 'img/re_house/img/15123759193304.jpg', 'img/re_house/sm/15123759193304.jpg', 'img/re_house/md/15123759193304.jpg', 'img/re_house/lg/15123759193304.jpg'),
(17, 2, '其他', 'img/re_house/img/1512375924950.jpg', 'img/re_house/sm/1512375924950.jpg', 'img/re_house/md/1512375924950.jpg', 'img/re_house/lg/1512375924950.jpg'),
(18, 3, '户型图', 'img/re_house/img/15123759411036.jpg', 'img/re_house/sm/15123759411036.jpg', 'img/re_house/md/15123759411036.jpg', 'img/re_house/lg/15123759411036.jpg'),
(19, 3, '客厅', 'img/re_house/img/15123759482727.jpg', 'img/re_house/sm/15123759482727.jpg', 'img/re_house/md/15123759482727.jpg', 'img/re_house/lg/15123759482727.jpg'),
(20, 3, '卫生间', 'img/re_house/img/15123759662512.jpg', 'img/re_house/sm/15123759662512.jpg', 'img/re_house/md/15123759662512.jpg', 'img/re_house/lg/15123759662512.jpg'),
(21, 3, '卧室1', 'img/re_house/img/15123759735221.jpg', 'img/re_house/sm/15123759735221.jpg', 'img/re_house/md/15123759735221.jpg', 'img/re_house/lg/15123759735221.jpg'),
(22, 3, '卧室2', 'img/re_house/img/15123759774726.jpg', 'img/re_house/sm/15123759774726.jpg', 'img/re_house/md/15123759774726.jpg', 'img/re_house/lg/15123759774726.jpg'),
(23, 3, '厨房', 'img/re_house/img/1512375985582.jpg', 'img/re_house/sm/1512375985582.jpg', 'img/re_house/md/1512375985582.jpg', 'img/re_house/lg/1512375985582.jpg'),
(24, 3, '其他', 'img/re_house/img/15123759891857.jpg', 'img/re_house/sm/15123759891857.jpg', 'img/re_house/md/15123759891857.jpg', 'img/re_house/lg/15123759891857.jpg'),
(25, 4, '户型图', 'img/re_house/img/15123759994395.jpg', 'img/re_house/sm/15123759994395.jpg', 'img/re_house/md/15123759994395.jpg', 'img/re_house/lg/15123759994395.jpg'),
(26, 4, '厨房', 'img/re_house/img/15123760052772.jpg', 'img/re_house/sm/15123760052772.jpg', 'img/re_house/md/15123760052772.jpg', 'img/re_house/lg/15123760052772.jpg'),
(27, 4, '客厅', 'img/re_house/img/15123760113183.jpg', 'img/re_house/sm/15123760113183.jpg', 'img/re_house/md/15123760113183.jpg', 'img/re_house/lg/15123760113183.jpg'),
(28, 4, '客厅2', 'img/re_house/img/15123760188525.jpg', 'img/re_house/sm/15123760188525.jpg', 'img/re_house/md/15123760188525.jpg', 'img/re_house/lg/15123760188525.jpg'),
(29, 4, '卫生间1', 'img/re_house/img/15123760251908.jpg', 'img/re_house/sm/15123760251908.jpg', 'img/re_house/md/15123760251908.jpg', 'img/re_house/lg/15123760251908.jpg'),
(30, 4, '卫生间2', 'img/re_house/img/15123760289859.jpg', 'img/re_house/sm/15123760289859.jpg', 'img/re_house/md/15123760289859.jpg', 'img/re_house/lg/15123760289859.jpg'),
(31, 4, '卧室1', 'img/re_house/img/15123760331468.jpg', 'img/re_house/sm/15123760331468.jpg', 'img/re_house/md/15123760331468.jpg', 'img/re_house/lg/15123760331468.jpg'),
(32, 4, '卧室2', 'img/re_house/img/15123760364706.jpg', 'img/re_house/sm/15123760364706.jpg', 'img/re_house/md/15123760364706.jpg', 'img/re_house/lg/15123760364706.jpg'),
(33, 4, '其他', 'img/re_house/img/15123760426199.jpg', 'img/re_house/sm/15123760426199.jpg', 'img/re_house/md/15123760426199.jpg', 'img/re_house/lg/15123760426199.jpg'),
(34, 5, '户型图', 'img/re_house/img/15123760555679.jpg', 'img/re_house/sm/15123760555679.jpg', 'img/re_house/md/15123760555679.jpg', 'img/re_house/lg/15123760555679.jpg'),
(35, 5, '卧室1', 'img/re_house/img/15123760631374.jpg', 'img/re_house/sm/15123760631374.jpg', 'img/re_house/md/15123760631374.jpg', 'img/re_house/lg/15123760631374.jpg'),
(36, 5, '卧室2', 'img/re_house/img/15123760657585.jpg', 'img/re_house/sm/15123760657585.jpg', 'img/re_house/md/15123760657585.jpg', 'img/re_house/lg/15123760657585.jpg'),
(37, 5, '卫生间', 'img/re_house/img/1512376071705.jpg', 'img/re_house/sm/1512376071705.jpg', 'img/re_house/md/1512376071705.jpg', 'img/re_house/lg/1512376071705.jpg'),
(38, 5, '厨房', 'img/re_house/img/15123760754916.jpg', 'img/re_house/sm/15123760754916.jpg', 'img/re_house/md/15123760754916.jpg', 'img/re_house/lg/15123760754916.jpg'),
(39, 6, '户型图', 'img/re_house/img/15123760843839.jpg', 'img/re_house/sm/15123760843839.jpg', 'img/re_house/md/15123760843839.jpg', 'img/re_house/lg/15123760843839.jpg'),
(40, 6, '客厅1', 'img/re_house/img/15123760959351.jpg', 'img/re_house/sm/15123760959351.jpg', 'img/re_house/md/15123760959351.jpg', 'img/re_house/lg/15123760959351.jpg'),
(41, 6, '客厅2', 'img/re_house/img/15123760983862.jpg', 'img/re_house/sm/15123760983862.jpg', 'img/re_house/md/15123760983862.jpg', 'img/re_house/lg/15123760983862.jpg'),
(42, 6, '卫生间1', 'img/re_house/img/15123761077258.jpg', 'img/re_house/sm/15123761077258.jpg', 'img/re_house/md/15123761077258.jpg', 'img/re_house/lg/15123761077258.jpg'),
(43, 6, '卫生间2', 'img/re_house/img/15123761104799.jpg', 'img/re_house/sm/15123761104799.jpg', 'img/re_house/md/15123761104799.jpg', 'img/re_house/lg/15123761104799.jpg'),
(44, 6, '卧室1', 'img/re_house/img/15123761157192.jpg', 'img/re_house/sm/15123761157192.jpg', 'img/re_house/md/15123761157192.jpg', 'img/re_house/lg/15123761157192.jpg'),
(45, 6, '卧室2', 'img/re_house/img/15123761189110.jpg', 'img/re_house/sm/15123761189110.jpg', 'img/re_house/md/15123761189110.jpg', 'img/re_house/lg/15123761189110.jpg'),
(46, 6, '卧室3', 'img/re_house/img/15123761217394.jpg', 'img/re_house/sm/15123761217394.jpg', 'img/re_house/md/15123761217394.jpg', 'img/re_house/lg/15123761217394.jpg'),
(47, 6, '卧室4', 'img/re_house/img/15123761255193.jpg', 'img/re_house/sm/15123761255193.jpg', 'img/re_house/md/15123761255193.jpg', 'img/re_house/lg/15123761255193.jpg'),
(48, 6, '厨房', 'img/re_house/img/15123761303295.jpg', 'img/re_house/sm/15123761303295.jpg', 'img/re_house/md/15123761303295.jpg', 'img/re_house/lg/15123761303295.jpg'),
(49, 6, '其他', 'img/re_house/img/15123761334885.jpg', 'img/re_house/sm/15123761334885.jpg', 'img/re_house/md/15123761334885.jpg', 'img/re_house/lg/15123761334885.jpg');


#租房 交易属性 -- 洪波
CREATE TABLE re_zufang_transaction (												
  ztid                INT PRIMARY KEY AUTO_INCREMENT,       #编号
  zid                 INT NOT NULL DEFAULT 0,               #房源
  house_type          VARCHAR(32) NOT NULL DEFAULT '',      #房屋户型
  area                DECIMAL(9,2) NOT NULL DEFAULT 0,      #面积
  contract_time       DATETIME NOT NULL DEFAULT '2017-12-01',  #签约时间
  price               DECIMAL(10,2) NOT NULL DEFAULT 0,     #成交价
  `source`            VARCHAR(128) NOT NULL DEFAULT 'yjia', #数据来源
  expire              enum('0','1') NOT NULL DEFAULT '0'    #数据是否失效
);

INSERT INTO `re_zufang_transaction` (`ztid`, `zid`, `house_type`, `area`, `contract_time`, `price`, `source`, `expire`) VALUES
(1, 1, '西北', '55.60', '2017-11-12 00:00:00', '2200.00', '链家网', '1'),
(2, 2, '南北', '131.85', '2017-10-08 00:00:00', '3300.00', '链家网', '1'),
(3, 3, '南', '60.23', '2017-09-17 00:00:00', '3000.00', '链家网', '1'),
(4, 4, '东南', '45.52', '2017-10-29 00:00:00', '1600.00', '链家网', '1'),
(5, 5, '西', '43.99', '2017-11-13 00:00:00', '2000.00', '链家网', '1'),
(6, 6, '西北', '202.54', '2017-04-24 00:00:00', '5300.00', '链家网', '1');

#首页轮播图表
CREATE TABLE index_carousel (												
  cid               INT PRIMARY KEY AUTO_INCREMENT,         #编号
  pic_src           VARCHAR(128) NOT NULL DEFAULT '',       #src
  pic_href          VARCHAR(128) NOT NULL DEFAULT '',       #URL
  des               VARCHAR(64) NOT NULL DEFAULT ''         #描述
);




#用户评论表 -- 仅针对新房
CREATE TABLE re_house_comment (												
  hcid             INT PRIMARY KEY AUTO_INCREMENT,          #编号
  uid              INT NOT NULL DEFAULT 0,                  #用户编号
  uname            VARCHAR(32) NOT NULL DEFAULT 'ujia用户',  #用户名
  hid              INT NOT NULL DEFAULT 0,                  #房源编号(新房)
  comment          VARCHAR(256) NOT NULL DEFAULT '',        #评论主体
  publish_time     DATETIME NOT NULL DEFAULT '2017-12-01',  #发表时间
  score_sup        INT NOT NULL DEFAULT 0,                  #配套设施评分
  score_traffic    INT NOT NULL DEFAULT 0,                  #交通评分
  score_environment  INT NOT NULL DEFAULT 0,                #环境评分
  up_count         INT NOT NULL DEFAULT 0                   #点赞数
);

