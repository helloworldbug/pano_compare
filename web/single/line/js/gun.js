var page
$(document).ready(function(){
	$(".v_content").css("width",$(document.body).width()-102);
   page = 1;
    var i = 4; //每版放4个图片
	
	var lens = $("div.v_content_list").find("li").length;
	 var v_width = $(".v_content_list ul li").width();
	 $(".v_content_list").css("width",lens*v_width);
    //向后 按钮
    $("span.next").click(function(){    //绑定click事件
	     var $parent = $(this).parents("div.v_show");//根据当前点击元素获取到父元素
		 var $v_show = $parent.find("div.v_content_list"); //寻找到“视频内容展示区域”
		 var $v_content = $parent.find("div.v_content"); //寻找到“视频内容展示区域”外围的DIV元素
		 var len = $v_show.find("li").length;
		 //var v_width = $v_content.width() ;
		 
		 
		 var page_count = Math.ceil(len) ;   //只要不是整数，就往大的方向取最小的整数
		 if( !$v_show.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
			  if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
				$v_show.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
				page = 1;
				}else{
					
				$v_show.animate({ left : '-='+v_width }, "slow");  
				page++;
			 }
		 }
		 //$parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");
		 $v_show.find("li").eq((page-1)).addClass("current1").siblings().removeClass("current1");
	//	 alert(page-1);
   });
    //往前 按钮
    $("span.prev").click(function(){
	     var $parent = $(this).parents("div.v_show");//根据当前点击元素获取到父元素
		 var $v_show = $parent.find("div.v_content_list"); //寻找到“视频内容展示区域”
		 var $v_content = $parent.find("div.v_content"); //寻找到“视频内容展示区域”外围的DIV元素
		 //var v_width = $v_content.width();
		 var len = $v_show.find("li").length;
		 var page_count = Math.ceil(len) ;   //只要不是整数，就往大的方向取最小的整数
		 if( !$v_show.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
		 	 if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
				$v_show.animate({ left : '-='+v_width*(page_count-1) }, "slow");
				page = page_count;
			}else{
				$v_show.animate({ left : '+='+v_width }, "slow");
				page--;
			}
		}
		 $v_show.find("li").eq((page-1)).addClass("current1").siblings().removeClass("current1");
    });
	
	var index = 0;
	   $(".v_content_list ul li").click(function(){
		   //alert(page);
		 var $parli = $(this).parents("div.v_content_list ul");//根据当前点击元素获取到父元素

		  var $parlib = $(this).parents("div.v_content_list");
		 index  =   $parli.find("li").index(this);
		 // alert(index+"|"+page+"|"+(index-page));
        $parli.find(" li").eq((index)).addClass("current1").siblings().removeClass("current1");
		$("div.v_content_list").animate({ left : '-='+$(".v_content_list ul li").width()*(index-page+1) }, "slow");
		page=index+1;
	})
	
	
	
	$("#bfq_ks").toggle(function(){ 
     parent.nextzt();
	 $("#bfq_ks").addClass("bfq_kson").removeClass("bfq_ks");
            },function(){ 
     parent.nextzt(); 
	  $("#bfq_ks").addClass("bfq_ks").removeClass("bfq_kson");       
        }); 		
});

function dq(a){
	//alert(a);
	 $("div.v_content_list li").eq((a)).addClass("current1").siblings().removeClass("current1");
	 $("div.v_content_list").animate({ left : '-='+$(".v_content_list ul li").width()*(a-page+1) }, "slow");
		page=a+1;
		//alert(page);
	}


var mytime;
$(function() {
var select = $( "#masters" );
var slider = $( "<div id='slider'></div>" ).insertAfter(select).slider({
min: 1,
max: 100,
range: "min",
value: 1,
slide: function( event, ui ) {
$("#mastersdd").html( ui.value - 1);
}
});
$( "#mastersdd" ).click(function() {
slider.slider( "value", 40 );
});
setInterval(function(){
		slider.slider( "value",mytime)
	},200);
});

function bfqsj(a){
	//alert("o");
	if(a==null) return;
	mytime=a;
    console.warn(mytime);
	
	//slider.slider( "value", a );
}