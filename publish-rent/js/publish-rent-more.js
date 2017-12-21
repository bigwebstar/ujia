$(()=>{
    $("#detailsSubmit").click(function(e){
        e.preventDefault();
        var title = $("#title").val();
        var area = $("#area").val();
        var district = $("#district").val();
        var metro = $("#metro").val();
        var buildingNo = $("#buildingNo").val();
        var price = $("#price").val();
        var size = $("#size").val();
        var house_room = $("#house_room").find("option:selected").text();
        var house_hall = $("#house_hall").find("option:selected").text();
        var house_kitchen = $("#house_kitchen").find("option:selected").text();
        var house_toilet = $("#house_toilet").find("option:selected").text();
        var side = $("#side").find("option:selected").text();
        var floor = $("#floor").find("option:selected").text();
        var floorNum = $("#floorNum").val();

        floor = floor + "(共"+floorNum+"层)";
        $.ajax({
            url:"data/zufang_publish.php",
            type:"POST",
            data:{title:title,area:area,district:district,metro:metro,building_No:buildingNo,price:price,size:size,
                house_room:house_room,house_hall:house_hall,house_kitchen:house_kitchen,house_toilet:house_toilet,
            side:side,floor:floor,},
            success:function(data){
                console.log(data);
            },
            error:function(){
                alert("网络故障 请检查!");
            }
        });
    });
});
