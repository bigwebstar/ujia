$(()=>{
    $("#detailsSubmit").click(function(e){
        e.preventDefault();
        var title = $("#title").val();
        console.log(title);

        var area = $("#area").val();
        console.log(area);

        var district = $("#district").val();
        console.log(district);

        var metro = $("#metro").val();
        console.log(metro);

        var buildingNo = $("#buildingNo").val();
        console.log(buildingNo);

        var price = $("#price").val();
        console.log(price);

        var size = $("#size").val();
        console.log(size);

        var house_room = $("#house_room").find("option:selected").text();
        console.log(house_room);

        var house_hall = $("#house_hall").find("option:selected").text();
        console.log(house_hall);

        var house_kitchen = $("#house_kitchen").find("option:selected").text();
        console.log(house_kitchen);

        var house_toilet = $("#house_toilet").find("option:selected").text();
        console.log(house_toilet);

        var side = $("#side").find("option:selected").text();
        console.log(side);

        var floor = $("#floor").find("option:selected").text();
        var floorNum = $("#floorNum").val();

        floor = floor + "(共"+floorNum+"层)";
        console.log(floor);

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
