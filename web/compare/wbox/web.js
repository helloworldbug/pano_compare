						//victor added begin
						var isRelease = true;
            var leftPanoId="",rightPanoId="";
            var leftPlaceId = "14",rightPlaceId="";
            var panoContainerName = "Main";
            var viewState = 0;
            var panoP=0,panoT=0,panoFov=90;
            var placeData;
            var serverIP=location.hostname;
            var serverPort = location.port;
            if(serverPort =="")
            	serverPort = "80";
            
            var placeServerIP = isRelease ? serverIP : "192.168.0.100";
            var placeServerPort = isRelease ? serverPort : "8088";
            var placeIndex=0;
            var placeDataUrl= "http://"+placeServerIP+":"+placeServerPort+"/public/getplacemapdata.aspx?placeid=";
            var proxyHead = "http://"+serverIP+":"+serverPort+"/HttpProxy.aspx?url=";
            var startSliderValue=1;
            var leftValue=startSliderValue,rightValue=startSliderValue;
            var actType="compare";
            var changeState=0;
            //victor added end.
						
						
            var swfVersionStr = "10.2.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {};
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowScriptAccess = "sameDomain";
            params.allowFullScreen = "false";
						params.wmode = "transparent";
            var attributes = {};
            attributes.id = panoContainerName;
            attributes.name = panoContainerName;
            attributes.align = "middle";
            attributes.allowFullscreen = "false";
            attributes.allowScriptAccess = "sameDomain";
						attributes.wmode = "transparent";
            swfobject.embedSWF(
                "Main.swf", "flashContent", 
                "100%", "100%", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
          
            function modeChange(val){
            	
            	pano.modeChangeHand(val);
            }
            
            
            
            function synchroHand(){
            	var pano=document.getElementById(panoContainerName);
            	pano.synchroHand();
            }
            
            function rectifyHand(){
            	var pano=document.getElementById(panoContainerName);
            	pano.rectifyHand();            
            }
            
           
            
            function initCompleteHand(){
            	/*var pano=document.getElementById(panoContainerName);
            	pano.showPanoHand(1,leftPanoId,"14");
            	if(rightPanoId!="")
            		pano.showPanoHand(2,rightPanoId,"14"); 
							synchroHand();
							*/
							//showComparePano(); 
							if(actType=="single")
							showSinglePano();    	
							else{
								showComparePano();
								}
            }
            
            function setFovHand(str){
            	var pano=document.getElementById(panoContainerName);
            	pano.setFovHand(str);
            }
            
            function setPTHand(str){
            	var pano=document.getElementById(panoContainerName);
            	pano.setPTHand(str);            	
            }
            
            function screenHand(){
            	var pano=document.getElementById(panoContainerName);
            	pano.screenHand();
            }
            //victor added begin
            function showPanoAtLeft(){
            	if(leftPanoId != ""){
            		var pano=document.getElementById(panoContainerName);
            		pano.showPanoHand(1,leftPanoId,leftPlaceId,panoP,panoT,panoFov);
            	}
            }
            function showPanoAtRight(){
            	if(rightPanoId != ""){
            		
            		var pano=document.getElementById(panoContainerName);
            		pano.showPanoHand(2,rightPanoId,rightPlaceId,panoP,panoT,panoFov);
            	}
            }
            
            function showSinglePano(){
            	
            		
            		showPanoAtLeft();
            		//setTimeout(hideUI,1000);
            		
            		/*if(rightPanoId=="")
            			rightPanoId = leftPanoId;
            		if(rightPlaceId=="")
            			rightPlaceId = leftPlaceId;
            			*/
            			showPanoAtRight();	
            			hideRightUI();
            		hideExtendButtons();
            		viewState =3;
            		
            }
            
            function showComparePano(){
            	 
            		if(viewState == 3){
            				var selfUrl = window.location.href;
            				var iEnd = selfUrl.indexOf("?");
            				if(iEnd > 0)
            					selfUrl = selfUrl.substring(0,iEnd);
            				var newUrl = selfUrl+"?actType=compare&placeid="+leftPlaceId+"&panoid="+leftPanoId;
            				//alert(newUrl);
            				window.location.href = newUrl;
            				return;
            			}
            		showExtendButtons();
            		showCompareUI();
                    synchroHand();
            		showPanoAtLeft();
            		if(rightPanoId=="")
            			rightPanoId = leftPanoId;
            		if(rightPlaceId=="")
            		  rightPlaceId = leftPlaceId;
            		
            		showPanoAtRight();	
            		
            		viewState =0;
            }
            
            function pullLeft(){
            	
            	if(viewState == 0){
            	  setcons(2);	
            	}
            	else{
            		setcons(0);
            		}
            	}
            	function pullRight(){
            		
            		if(viewState == 0){
            	  setcons(1);	
            	}
            	else{
            		setcons(0);
            		}
            		
            		}
            
            function hideExtendButtons(){
            	  $(".centool_l").css("display","none");
            	  $(".centool_r").css("display","none");
            }
            function showExtendButtons(){
            	  $(".centool_l").css("display","block");
            	  $(".centool_r").css("display","block");
            }
            function showCompareUI(){
            	var mainh=$(document.body).width()/2;
            	$(".flashbox").css({"width":"100%", "left":0,});
							$("#slider").css("display","block");
							$("#slider2").css("display","block");
							if($(".data1"))
 										$(".data1").css("display","block");
 							if($(".data2"))
 										$(".data2").css("display","block");
 							$(".centool_l").css("left",mainh-13);
							$(".centool_r").css("left",mainh+2);
            	}
            
            function hideRightUI(){
            	var mainh=$(document.body).width()/2;
            	$(".flashbox").css({"width":"200%", "left":0,});
  						$("#slider").css("display","block");
  						$("#slider2").css("display","none");
  						$(".data2").css("display","none");
  						$(".data1").css("display","block");
  						$(".centool_l").css("left",mainh*2-16);
							 $(".centool_r").css("left",mainh*2+16);	
            }
            function hideLeftUI(){
            	var mainh=$(document.body).width()/2;
            	$(".flashbox").css({"width":"200%", "left":-$(document.body).width(),});
							 $("#slider").css("display","none");
							 $("#slider2").css("display","block");
							 $(".data1").css("display","none");
							 $(".data2").css("display","block");
							 $(".centool_r").css("left",0);
  						$(".centool_l").css("left",-100);
							 
            }
            function init(){
            		 var mainh=$(document.body).width()/2;
								 var mainhg=$(document.body).height()/2;
								$(function() {
								
								$( "#slider" ).slider({
								min: startSliderValue,
								max: placeData.length,
								value:  placeData.length,
								stop:function( event, ui ) {
									var pano=document.getElementById(panoContainerName);
									var newLeftPanoId=placeData[ui.value-startSliderValue].panoid;
								   if(newLeftPanoId !="" && newLeftPanoId != leftPanoId){
								   	leftPanoId = newLeftPanoId;								   	
								   
                                    changeState = 1;
								   	var ptfObj = eval("("+pano.getPTFHand()+")");
                                    rectifyHand();
                                    $("#panoMask").removeClass("panoShow");
                                    $("#panoMask").addClass("panoHide");
								   	pano.showPanoHand(1,leftPanoId,leftPlaceId,ptfObj.p1,ptfObj.t1,ptfObj.f1);
								  }
									},
								slide: function( event, ui ) {		
                                    leftDateStr = formatDateStr(placeData[ui.value-startSliderValue].panotime);	 
									$( "#amount" ).val(leftDateStr );
                                    $("#leftDateLabel").html(dateDesc+leftDateStr);
								}
								});
                                var degreeIndex = placeData.length < 2 ? 0 : placeData.length-2;
                                $("#sli").css("background-image","url(../common/images/kd/"+degreeIndex+".png)");
                                leftDateStr = formatDateStr(placeData[placeData.length-1].panotime);
								$( "#amount" ).val(leftDateStr );
                                $("#leftDateLabel").html(dateDesc+leftDateStr);
								$("#slider>a").css("backgroundImage","url(../common/images/time_left.png)");
							
								
								});
								
								$(function() {
								
								$( "#slider2" ).slider({
								min: startSliderValue,
								max: placeData.length,
								value:  0,
								stop:function( event, ui ) {
									var pano=document.getElementById(panoContainerName);
									var newRightPanoId=placeData[ui.value-startSliderValue].panoid;
								   if(newRightPanoId !="" && newRightPanoId != rightPanoId){
								   	rightPanoId = newRightPanoId;		
                                    changeState = 2;						   	
								   	var ptfObj = eval("("+pano.getPTFHand()+")");
                                    rectifyHand();
                                    $("#panoMask").removeClass("panoShow");
                                    $("#panoMask").addClass("panoHide");
								   	pano.showPanoHand(2,rightPanoId,leftPlaceId,ptfObj.p2,ptfObj.t2,ptfObj.f2);
								  }
									},
								slide: function( event, ui ) {			 
                                    rightDateStr = formatDateStr(placeData[ui.value-startSliderValue].panotime);	 
									$( "#amount2" ).val(rightDateStr );
                                    $("#rightDateLabel").html(dateDesc+rightDateStr);
									
								}
								});
                                rightDateStr = formatDateStr(placeData[0].panotime);
								$( "#amount2" ).val(rightDateStr );
                                $("#rightDateLabel").html(dateDesc+rightDateStr);
								$("#slider2>a").css("backgroundImage","url(../common/images/time_right.png)");
								
								});
							
								
								
								
								$(".centool_l").css("left",mainh-13);
								$(".centool_l").css("top",mainhg-20);
								$(".centool_r").css("left",mainh+2);
								$(".centool_r").css("top",mainhg-20);
								$(".mytool").css("left",mainh-271);
								

            }

            function compareDateStr(a,b){
                    var date1Str = formatDateStr(a.panotime);
                    var date1Strs = date1Str.split('-');
                    var  date1 = new Date(date1Strs[0],parseInt(date1Strs[1])-1,date1Strs[2]);  
                    var date2Str = formatDateStr(b.panotime);
                    var date2Strs = date2Str.split('-');
                     var  date2 = new Date(date2Strs[0],parseInt(date2Strs[1])-1,date2Strs[2]);  
                     
                    return date1.getTime() > date2.getTime();
                }
            function sortPlaceData(){
                
                for(var i=0;i<placeData.length;i++){
                    for(var j=i+1;j<placeData.length;j++){
                        if(!compareDateStr(placeData[i],placeData[j])){
                            var temp = placeData[i];
                            placeData[i] = placeData[j];
                            placeData[j] = temp; 
                        }
                    }
                }
            }
            function loadPlaceData(){
            	
            	var requestUrl = ((placeServerIP==serverIP&&placeServerPort==serverPort) ? "" : proxyHead)+placeDataUrl + leftPlaceId;
            	$.ajax({
            		url:requestUrl,
            		type:"GET",
            		dataType: "text",
            		async:false,
            		success:function(txt){
            			if(txt == "")
            				return;
            			placeData = eval('('+txt+')');
            			if(placeData== "undefined" || placeData.length == 0)
            				return;
                        sortPlaceData();
                        
                        
            			
            				leftPanoId = placeData[placeData.length-1].panoid;
                         
                         
                            rightPanoId = placeData[0].panoid;
                         
                         

            			
            			init();
            			}
            		});
            	
            	
            }
function getHtmlParam(param)
{
 var query  = window.location.search.substring(1); 
 var iLen = param.length+1;
 var iStart = query.indexOf(param+"=");
 if (iStart == -1) return "";
 var iEnd = query.indexOf("&", iStart+iLen);
 if (iEnd == -1) return query.substring(iStart+iLen);
 return query.substring(iStart+iLen, iEnd);
}	 

function formatDateStr(dateStr){
		var iEnd = dateStr.indexOf(" ");
		if (iEnd == -1)
			return dateStr;
		return dateStr.substring(0,iEnd);
	}
            //victor added end.
//main自适应高度
$(document).ready(function(){

 var tmp =	getHtmlParam("placeid");
 if(tmp!="")
 		leftPlaceId = tmp; 
 tmp =	getHtmlParam("actType");
 if(tmp!="")
 	actType=tmp;
 tmp =	getHtmlParam("panoid");
 if(tmp!="")
 	leftPanoId = tmp;
 	
 	tmp =	getHtmlParam("p");
 if(tmp!="")
 	panoP = parseFloat(tmp);
 	
 	tmp =	getHtmlParam("t");
 if(tmp!="")
 	panoT = parseFloat(tmp);
 	
 	tmp =	getHtmlParam("f");
 if(tmp!="")
 	panoFov = parseFloat(tmp);
 	
 	tmp =	getHtmlParam("index");
 if(tmp!="")
 	placeIndex = parseFloat(tmp);
 	
 loadPlaceData();	

});

function getInnerNumber(number,min,max){
    var range = max-min;
    var result = number;
    while(result > max){
        result -= range;
    }
    while(result < min){
        result += range;
    }
    return result;
}

function getInner360Number(number){
    return getInnerNumber(number,0,360);
}
function loadCompleteHand() {
	var pano=document.getElementById(panoContainerName);	
	var ptfObj = eval("("+pano.getPTFHand()+")");
	var directDiff = ptfObj.north2-ptfObj.north1;	
    
    var p1,p2;	
    
	switch(changeState){
        
        case 1: //left changed
            p2 = getInner360Number( ptfObj.p2);
            p1 = getInner360Number(p2-directDiff);
            panoT = ptfObj.t2;
            panoFov = ptfObj.f2;
            pano.setPTFHand("1",parseFloat(p1),panoT,panoFov);
            
            break;
        case 0: // entrance
            p1 = getInner360Number ( ptfObj.p1);
            p2 = getInner360Number(p1+directDiff);
            panoT = ptfObj.t1;
            panoFov = ptfObj.f1;
            pano.setPTFHand("1",parseFloat(p1),panoT,panoFov);
            pano.setPTFHand("2",parseFloat(p2),panoT,panoFov);		
            
            break;
        case 2: //right changed
            p1 = getInner360Number ( ptfObj.p1);
            p2 = getInner360Number(p1+directDiff);
            panoT = ptfObj.t1;
            panoFov = ptfObj.f1;
            pano.setPTFHand("2",parseFloat(p2),panoT,panoFov);
            break;

    }		
    synchroHand();
    $("#panoMask").removeClass("panoHide");
    $("#panoMask").addClass("panoShow");
    console.debug(p1+","+p2+"--"+directDiff);
   					
    
	//loadPlaceMap();
}            
function loadPlaceMap(){
    var str =  '[{"x":"' + placeData[0].x + '","y":"' + placeData[0].y + '","panoid":"' + leftPanoId + '"}]';
    var serverpath ="../common/images/"+leftPlaceId+".jpg";
    var	pano=document.getElementById(panoContainerName);
		pano.addMapView("../common/swf/MapView2.swf", serverpath, str, null, false, "../common/images/mapopen.png", "../common/images/mapclose.png")
}
$(window).resize(function(){  
var mainh=$(document.body).width()/2;
var mainhg=$(document.body).height()/2;
$(".centool_l").css("left",mainh-16);
$(".centool_l").css("top",mainhg-20);
$(".centool_r").css("left",mainh+2);
$(".centool_r").css("top",mainhg-20);
$(".mytool").css("left",mainh-271);

}); 
//firefox鼠标滚轮
function handleLoad(){
	if (!(document.attachEvent)) {
              window.addEventListener("DOMMouseScroll", handleWheel, false);
          }
	}
    
function handleWheel(event) {
          var app = window.document["ASProject"];
          if (app) {
              var o = {
                  x: event.screenX, y: event.screenY,
                  delta: event.detail,
                  ctrlKey: event.ctrlKey, altKey: event.altKey,
                  shiftKey: event.shiftKey
              }
              app.handleWheel(o);
          }
} 

var leftDateStr,rightDateStr;
var dateDesc = "";
function setcons(a){
	var mainh=$(document.body).width()/2;
	viewState = a;
    
	switch(a)
		{
		case 1:
		 $("#rightDateLabel").hide();	
          $("#leftDateLabel").show();
          $("#leftDateLable").html(dateDesc+leftDateStr);
		hideRightUI();
		  break;
		case 2:
        $("#rightDateLabel").hide();
         $("#leftDateLabel").show();
         $("#leftDateLabel").html(dateDesc+rightDateStr);
		hideLeftUI();
		  break;
		default:
          $("#rightDateLabel").show();
         $("#leftDateLabel").show();
         $("#leftDateLabel").html(dateDesc+leftDateStr);
         $("#rightDateLabel").html(dateDesc+rightDateStr);
			showCompareUI();
		}
	
	}