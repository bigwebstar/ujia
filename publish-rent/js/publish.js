$(()=>{
    $(".publish-details").hide();
    $("#btn1").click(function (e) {
        e.preventDefault();
        $(".publish-details").show();
    });
    $("#close").click(function(e){
        e.preventDefault();
        $(".publish-details").hide();
    })
});

