            var pano=null;
        	function initFlashOverHand(){
        		pano=document.getElementById("ASProject");
        		pano.setHelpTipHand("assets/swf/panoj.swf");
        		pano.setRoadFlatHand("assets/swf/cs3.swf");
				pano.setSwitchEffectHand(true);
        		pano.showPanoPlace("dangdai25073", "20", 144, 0, 90);//全景，楼层,初始角度
        		var obj=new Object();
        		obj.align="top_left";
        		obj.margin_top="1";
        		pano.addCommonTool("assets/swf/fhouseController.swf",obj);
        		
        	}
        	
        	function jsHand(){
				pano.addMapView("assets/map/108.jpg","1");
        	}
        	
        	function toHand(){		
        		pano.showPanoByPt(0,180,0,220);
				alert("jsonStr");
        	}
        	
			function changefloor(a,b,c,d,e,r){
			
				pano.showPanoPlace(a,b,c,d,e);//全景，楼层,初始角度
				pano.setRoadFlatHand("assets/swf/"+r+".swf");
			}
			
			function chuancangb(type){
				$(".fulldiv").remove();
				$(".fulldivswf").remove();
				}
				
				
				
			function chuancan(a){
				$("body").append("<div class=\"fulldiv\"> <\/div><div class=\"fulldivswf\"> <\/div>");
				switch(a){
					case 1:
					$(".fulldivswf").css({ width: 600, height: 500, top:($(window).height()/2-250),left:($(window).width()/2-300)});
					$(".fulldivswf").html("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=10,0,0,0\" name=\"myFlash\" width=\"100%\" height=\"100%\" align=\"middle\" id=\"myFlash\"><param name=\"allowScriptAccess\" value=\"sameDomain\" \/><param name=\"allowFullScreen\" value=\"true\" \/><param name=\"movie\" value=\"assets\/map\/lc.swf\" \/><param name=\"wmode\" value=\"transparent\"><param name=\"FlashVars\" value=\"lccs=\"+a+\"\" \/><embed  src=\"assets\/map\/lc.swf\" quality=\"high\" WMODE=\"transparent\" width=\"100%\" height=\"100%\" name=\"myFlash\" align=\"middle\" allowScriptAccess=\"sameDomain\" allowFullScreen=\"true\"  aFlashVars=\"lccs=\"+a+\"\" type=\"application\/x-shockwave-flash\" pluginspage=\"http:\/\/www.adobe.com\/go\/getflashplayer_cn\" \/><\/object>");
					break
					case 2:
					$(".fulldivswf").css({ width: 476, height: 368, top:($(window).height()/2-134),left:($(window).width()/2-238)});
					$(".fulldivswf").html("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=10,0,0,0\" name=\"myFlash\" width=\"100%\" height=\"100%\" align=\"middle\" id=\"myFlash\"><param name=\"allowScriptAccess\" value=\"sameDomain\" \/><param name=\"allowFullScreen\" value=\"true\" \/><param name=\"movie\" value=\"assets\/map\/help.swf\" \/><param name=\"wmode\" value=\"transparent\"><param name=\"FlashVars\" value=\"lccs=\"+a+\"\" \/><embed  src=\"assets\/map\/help.swf\" quality=\"high\" WMODE=\"transparent\" width=\"100%\" height=\"100%\" name=\"myFlash\" align=\"middle\" allowScriptAccess=\"sameDomain\" allowFullScreen=\"true\"  aFlashVars=\"lccs=\"+a+\"\" type=\"application\/x-shockwave-flash\" pluginspage=\"http:\/\/www.adobe.com\/go\/getflashplayer_cn\" \/><\/object>");
					break
					}
				}
				
				
				
				function changeDitu()
				{
				}
				
				
				
			//内部楼层
	        function lcchuancan(a){
				chuancangb(1);
				switch(a){
				case 1://"pano1", "1", 144, 0, 90
				var str='[{"x":"250","y":"70","panoid":"dangdai25073"},{"x":"280","y":"250","panoid":"dangdai25074"},{"x":"210","y":"280","panoid":"dangdai25075"}]';
				changefloor('dangdai25073','20','144','1','90','arrow2');
				pano.changeMapViewHand("assets/map/lc01.png",str);
				break
				case 2:
				var str='[{"x":"350","y":"170","panoid":"dangdai27038"},{"x":"180","y":"280","panoid":"dangdai27039"},{"x":"110","y":"310","panoid":"dangdai27040"}]';
				changefloor('dangdai27038','21','10','1','90','arrow1');
				pano.changeMapViewHand("assets/map/lc02.png",str);
				break
				default:
				alert("暂无数据");
				} 
				}
			
        	function popHand(jsonStr){
        		//alert(jsonStr);
        	}
        		
				
			//更换地图
        	function changeMapViewHand(){
        		var pano=document.getElementById("ASProject");
        		pano.changeMapViewHand("map2.jpg");
        	}
        	
        	
        	var fa=true;
        	//全景加载完成
        	function loadPanoComplete(){
        		var pano=document.getElementById("ASProject");
        		if(fa==true){
					var str='[{"x":"250","y":"70","panoid":"dangdai25073"},{"x":"280","y":"250","panoid":"dangdai25074"},{"x":"190","y":"310","panoid":"dangdai25075"}]';
        			pano.addMapView("assets/plugswf/MapView2.swf","assets/map/lc01.png",str)
        			fa=false;
        		}
        		
        	}
			
			
			
			
			var ba=true;
        	function MapViewCompleteHand()
			{
        		var pano=document.getElementById("ASProject");
        		//alert("地图加载完成");
        		var placeStr='[{"label":"楼层一","placeid":"1","url":"assets/map/108.png"},{"label":"楼层二","placeid":"2","url":"assets/map/109.png"}]';
        		if(ba==true)
				{
        			pano.setPlaceDataHand(placeStr);//添加楼层列表
        			ba=false;
        		}
        	}
			
			//大图参数
			function imageHand(jsonStr){
        
				
        	}