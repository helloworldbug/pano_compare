//victor added begin
					
            var panoid="",placeid="14";
            var panoContainerName = "Main";
            var panoP=0,panoT=0,panoFov=90;
            var placeData;
            var serverIP=location.hostname;
            var serverPort = location.port;
            if(serverPort =="")
            	serverPort = "80";
            
            var placeServerIP = serverIP ;
            var placeServerPort =  serverPort ;
            var placeIndex=0;
            var placeDataUrl= "http://"+placeServerIP+":"+placeServerPort+"/public/getplacemapdata.aspx?placeid=";
            var proxyHead = "http://"+serverIP+":"+serverPort+"/HttpProxy.aspx?url=";
            var startSliderValue=1;
            var sliderValue=startSliderValue;
            var swfVersionStr = "10.2.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {};
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
						params.wmode = "transparent";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "ASProject";
            attributes.name = "ASProject";
            attributes.align = "middle";
						attributes.wmode = "transparent";
            swfobject.embedSWF(
                "ASProject.swf", "flashContent",
                "100%", "100%", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
            
            function init(){
            	var mainh=$(document.body).width()/2;
							var mainhg=$(document.body).height()/2;
							$(".centool_l").css("left",mainh-16);
							$(".centool_l").css("top",mainhg-20);
							$(".centool_r").css("left",mainh+2);
							$(".centool_r").css("top",mainhg-20);
							$(".mytool").css("left",mainh-271);
							$("#slider").slider({
							    min: startSliderValue,
							    max: placeData.length,
							    values: startSliderValue,
							    stop: function (event, ui) {
							        placeIndex = ui.value - startSliderValue;
							        var newPanoid = placeData[ui.value - startSliderValue].panoid;
							        if (newPanoid != "" && newPanoid != panoid) {
							            panoid = newPanoid;
							            //initFlashOverHand();
							            showPano();
							        }
							    },
							    slide: function (event, ui) {
							        var dateStr = formatDateStr(placeData[ui.value - startSliderValue].panotime);
							        $("#amount").val(dateStr);
							        $("#dateLabel").html( dateStr);
							    }
							});
							    var dateStr = formatDateStr(placeData[0].panotime);
							    $("#amount").val(dateStr);
							    $("#dateLabel").html( dateStr);
								$("#slider>a").css("backgroundImage","url(../common/images/time_left.png)");
								
								showPano();
							}
			  function showPano(){
			  	var	pano=document.getElementById("ASProject");
        			pano.setHelpTipHand("assets/swf/panoj.swf");
        			pano.setRoadFlatHand("assets/swf/arrow2.swf");
							pano.setSwitchEffectHand(false);
							pano.showPanoPlace(panoid, placeid, panoP, panoT, panoFov);
			  	}
function formatDateStr(dateStr){
		var iEnd = dateStr.indexOf(" ");
		if (iEnd == -1)
			return dateStr;
		return dateStr.substring(0,iEnd);
	}
				function initFlashOverHand(){
        		var pano=document.getElementById("ASProject");
        		pano.setHelpTipHand("assets/swf/panoj.swf");
        		pano.setRoadFlatHand("assets/swf/arrow2.swf");
				pano.setSwitchEffectHand(false);
        		//全景，楼层,初始角度
				pano.showPanoPlace(panoid, placeid, 250, 0, 110);

}

function compareDateStr(a, b) {
    var date1Str = formatDateStr(a.panotime);
    var date1Strs = date1Str.split('-');
    var date1 = new Date(date1Strs[0], parseInt(date1Strs[1]) - 1, date1Strs[2]);
    var date2Str = formatDateStr(b.panotime);
    var date2Strs = date2Str.split('-');
    var date2 = new Date(date2Strs[0], parseInt(date2Strs[1]) - 1, date2Strs[2]);

    return date1.getTime() > date2.getTime();
}
function sortPlaceData() {

    for (var i = 0; i < placeData.length; i++) {
        for (var j = i + 1; j < placeData.length; j++) {
            if (!compareDateStr(placeData[i], placeData[j])) {
                var temp = placeData[i];
                placeData[i] = placeData[j];
                placeData[j] = temp;
            }
        }
    }
}
				function loadPlaceData(){
            	
            	var requestUrl = ((placeServerIP==serverIP&&placeServerPort==serverPort) ? "" : proxyHead)+placeDataUrl + placeid;
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
            			if(panoid=="")
            				panoid = placeData[0].panoid;
            			
            			init();
            			}
            		});
            	
            	
            }			
function loadPanoComplete() {
	//loadPlaceMap();
}            
function loadPlaceMap(){
    var str =  '[{"x":"' + placeData[0].x + '","y":"' + placeData[0].y + '","panoid":"' + panoid + '"}]';
    var serverpath ="../common/images/"+placeid+".jpg";
    var	pano=document.getElementById("ASProject");
		pano.addMapView("../common/swf/MapView2.swf", serverpath, str, null, false, "../common/images/mapopen.png", "../common/images/mapclose.png")
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

$(document).ready(function(){
 var tmp =	getHtmlParam("placeid");
 if(tmp!="")
 		placeid = tmp; 
 
 tmp =	getHtmlParam("panoid");
 if(tmp!="")
 	panoid = tmp;
 	
 loadPlaceData();	
 

});
//victor added end.
 

//main自适应高度

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
function compare(){
	var pano=document.getElementById("ASProject");
	var ptfInfo = pano.getPTFHand();
	var ptfObj = eval("("+ptfInfo+")");	
	window.location.href = "../compare/index.html?placeid="+placeid+"&panoid="+panoid+"&p="+ptfObj.p+"&t="+ptfObj.t+"&f="+ptfObj.f+"&index="+placeIndex;	
}


function setEasePTFHand(str){
       var pano=document.getElementById("ASProject");
       pano.setEasePTFHand(str);

}
            


 

