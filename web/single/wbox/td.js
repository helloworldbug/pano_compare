$(document).ready(function()  
    {  

    var img = new Image();
    img.onload = function () {
        var imgsr="url("+$("#myimg").attr("src")+")";  
	var winwidth=$(window).width();
	var winheight=$(window).height();
	var mywidth=$("#myimg").width();
	var myheight=$("#myimg").height();
	var dwleft=(winwidth-mywidth)/2;
	var dwtop=(winheight-myheight)/2;
	  //alert(winwidth+"|"+winheight);
	  $(".menu").css({"background-image":imgsr,"top":dwtop,"left":dwleft,"width":mywidth,"height":myheight});
	  
	  $(".menu").mousedown(function(e)//e鼠标事件  
        {  
            $(this).css("cursor","move");//改变鼠标指针的形状  
            var winw=$(".menubg").width()-mywidth;
			var winh=$(".menubg").height()-myheight;
            var offset = $(this).offset();//DIV在页面的位置  
            var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离  
            var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离  
            $(document).bind("mousemove",function(ev)//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
            {  
                $(".menu").stop();//加上这个之后  
                  
                var _x = ev.pageX - x;//获得X轴方向移动的值  
                var _y = ev.pageY - y;//获得Y轴方向移动的值  
                /*if(_x<1){
				$(".menu").animate({left:0+"px"},10);
				}
				else if(_x>winw){
						  $(".menu").animate({left:winw+"px"},10);
                }
				else if(_y<1){
						  $(".menu").animate({top:0+"px"},10);
                }
				else if(_y>winh){
						  $(".menu").animate({top:winh+"px"},10);
                }
				else{
					$(".menu").animate({left:_x+"px",top:_y+"px"},10);}*/
				
				$(".menu").animate({left:_x+"px",top:_y+"px"},10);
				
				
            });  
              
        });  
          
        $(document).mouseup(function()  
        {  
            $(".menu").css("cursor","default");  
            $(this).unbind("mousemove");  
        })  
	  
	  
    };
    img.src = url;
	
        
    })  