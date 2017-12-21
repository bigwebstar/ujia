$(function(){
    let $slides = $(".silde-container>div>ul");
    let $imgs = $(".silde-container>div>ul>li");

    let WIDTH = 1150;
    let INTERVAL = 1000;
    let timer = null;
    let canmove = true;
    let WAITE = 1000;
    let move = 0;

    function slideMove(dir=0,callback){
        let $spans = $(".silde-container>div>p>span");
        let moves ;
        move += dir;
        move == $imgs.length-1? moves = 0:moves = move;
        $spans.eq(moves).addClass("active").siblings().removeClass("active");
        $slides.stop(true).animate({left:-(move*WIDTH)+"px"},INTERVAL,callback)
    }
    function mover(){
        if(canmove){
            if(move == $imgs.length-1 ){
                move = 0;
                $slides.css({left:0});
            }
            timer = setTimeout(function(){
            move ++;
                slideMove(0,mover);
            },WAITE)
        }
    }
    mover();
    $(".silde-container").hover(function(){
        canmove=false;
        clearTimeout(timer);
        timer=null;
    },function(){
        canmove=true;
        mover();
        }
    )
    $(".silde-container>div>p").html("<span></span>".repeat($imgs.length-1)).children("span:first-child").addClass("active") ;
    $(".silde-container>div>p").on("click","span",function(e){
        let $tar = $(e.target);
        move=$tar.index();
        slideMove();
    });
    $(".silde-prev").click(function(e){
        if(move == 0){
            move =  $imgs.length-1 ;    
            $slides.css({left:-(move * WIDTH)});
        }
        e.preventDefault();
        slideMove(-1);
    })
    $(".silde-next").click(function(e){
        if(move == $imgs.length-1 ){
            move = 0;
            $slides.css({left:0});
        }
        e.preventDefault();
        slideMove(1);
    })
    
    
    
    
    $("#footer .bottom .nav").on("mouseover","span",function(e){
				$tar=$(e.target);
				$tar.addClass("footer-active").siblings().removeClass("footer-active");
			})	
//	楼层点亮
	let $aside = $("#aside");
	let $secondhand = $(".second-hand");
	let $floor2list = $(".floor2-list");
	let $newhouse = $(".new-house");
	let $floors = $("#aside>ul");
	let offset1= $secondhand.offset().top;
	let offset2= $floor2list.offset().top;
	let offset3= $newhouse.offset().top;
	let OFFSET = [offset1,offset2,offset3];
	console.log();
console.log()
	$(window).scroll(function(){
		var y =scrollY;
//		console.log(y);
		if(y>offset1-innerHeight/2){
			$aside.show()
			for(var i in OFFSET){
				var x = OFFSET[i]-innerHeight/2 ;
				if(y> x){
					$floors.children().eq(i).addClass("active").siblings().removeClass("active")
				}
			}
		}else{
			$aside.hide()
		}
	})
		$floors.on("click","li",function(e){
		e.preventDefault();
		let n = $(this).index();
		if(n<=3){
		$('html,body').stop(true).animate({scrollTop:OFFSET[n]+"px"},1000)
		}else{
			$('html,body').stop(true).animate({scrollTop:0},1000)
	
		}}
		)

})