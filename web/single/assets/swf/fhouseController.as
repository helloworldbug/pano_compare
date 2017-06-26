package 
{
	import flash.display.MovieClip;
	import flash.text.*;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.display.SimpleButton;
	import flash.system.Security;
	import fl.controls.Slider;
	import com.greensock.TweenMax;
	import com.greensock.easing.Strong;
	import fl.controls.TextInput;
	import flash.external.*;

	public class fhouseController extends MovieClip
	{
		public var panoObject:Object;
		public var tpManager:ToolTipManager;
		public var action:String;

		public var upBtn:SimpleButton;
		public var leftBtn:SimpleButton;
		public var downBtn:SimpleButton;
		public var rightBtn:SimpleButton;
		public var zoomOutBtn:SimpleButton;
		public var zoomInBtn:SimpleButton;
		public var myvalue:Slider;
		public var jhelp:SimpleButton;
		public var jfull:SimpleButton;
		public var jjour:SimpleButton;
		public var zihelp:MovieClip;
		public var mybg:MovieClip;
		public var mytext:TextField;
		public var mytext1:TextField;
		public var ld:SimpleButton;
		/**圆转*/
		public var Wx:Number;
        public var Ox:Number;
        public var weixing:MovieClip;
        public var Oy:Number;
        public var Wy:Number;
		public var zx:Number;
        public var zy:Number;
        public var mouseDownO:Boolean;
        public var mouseDownW:Boolean;
        public var yuanxing:MovieClip;
        public var r:Number;
		public var myjdva:Number;
		public function MainTimeline()
        {
            //addFrameScript(0, frame1);
			frame1();
            return;
        }// end function

        public function mov(event:MouseEvent) : void
        {
            var _loc_2:Number = NaN;
            if (mouseDownO)
            {
                Ox = yuanxing.x;
                Oy = yuanxing.y;
                r = Math.sqrt((Ox - Wx) * (Ox - Wx) + (Oy - Wy) * (Oy - Wy));;
                MyCircle(Ox, Oy, r);
            }
		import flash.display.DisplayObject;
		import flash.events.MouseEvent;
		import flash.display.MovieClip;
		import fl.controls.Button;
		import flash.events.Event;

            if (mouseDownW)
            {
                Wx = weixing.x;
                Wy = weixing.y;
                //_loc_2 = Math.atan2(Oy - event.stageY, Ox - event.stageX+panoObject.getScene()._viewerWidth+5);
				_loc_2 = Math.atan2(Oy - event.stageY, Ox - event.stageX);
                weixing.x = Ox - r * Math.cos(_loc_2);
                weixing.y = Oy - r * Math.sin(_loc_2);
            }
			//mytext.text=weixing.x+"|"+weixing.y+","+Ox+"|"+weixing.y;
			//mytext.text=event.stageX.toString()+"|"+panoObject.getScene()._viewerWidth+"|"+Ox+"|"+Oy;
            return;
        }// end function

        function frame1()
        {
			ExternalInterface.addCallback("SetPanoRadarHand",SetPanoRadarHand);	//通过雷达设置全景角度
			weixing.buttonMode = true;
            mouseDownO = false;
            mouseDownW = false;
            Ox = yuanxing.x;
            Oy = yuanxing.y;
            Wx = weixing.x;
            Wy = weixing.y;
			
            r = Math.sqrt((Ox - Wx) * (Ox - Wx) + (Oy - Wy) * (Oy - Wy));
            MyCircle(Ox, Oy, r);
           // trace(Ox+"|"+Oy);
		// trace(Ox+"|"+Oy+"|"+Wx+"|"+Wy+"|"+r);
            return;
        }// end function
		
		public function SetPanoRadarHand(val:Number):void{
			weixing.x=Math.cos(val*Math.PI/180)*r+39;
			weixing.y=Math.sin(val*Math.PI/180)*r+45;
				this.weixing.rotation=val;
			
		}

        public function yuanxingdown(event:MouseEvent) : void
        {
            //yuanxing.startDrag();
            mouseDownO = false;
			
            return;
        }// end function

        public function up(event:MouseEvent) : void
        {
			
			//var a:cc=event.target as cc;
			//yuanxing.removeEventListener(MouseEvent.MOUSE_MOVE,moveHand);
            yuanxing.stopDrag();
			
            mouseDownO = false;
            mouseDownW = false;
            Ox = yuanxing.x;
            Oy = yuanxing.y;
            Wx = weixing.x;
            Wy = weixing.y;
			//throw new Error("this is the stage: "+stage);
			//trace(Ox+"|"+Oy+"|"+Wx+"|"+Wy+"|"+r);
			
            return;
        }// end function

        public function weixingdown(event:MouseEvent) : void
        {
            mouseDownW = true;
			//var a:MovieClip=event.target as MovieClip;
			//a.addEventListener(MouseEvent.MOUSE_OVER,moveHand);
			
            return;
        }// end function
		
		public function moveHand():void{
			
		    var myjd:Number=Math.atan2(Wy-Oy,Wx-Ox)*180/Math.PI;
			this.weixing.rotation=(Math.atan2(Wy-Oy,Wx-Ox)*180/Math.PI);
			//trace((Math.atan2(Wy-Oy,Wx-Ox)*180/Math.PI));
			if(myjd<0){
				myjd=myjd+360;
			}
			//mytext1.text=(Math.cos(myjd*Math.PI/180)*r+491.04106).toString()+"|"+(Math.sin(myjd*Math.PI/180)*r+45).toString();
			//mytext.text=panoObject.getScene()._viewerWidth;
			//trace(360-myjd);
			//throw new Error("this is the stage: "+stage);
			//throw new Error("this is my parent: "+this.parent);
			if (stage){
				if(this.panoObject){
					//this.panoObject.pan=myjd;
					this.panoObject.SetPanoFromRadar(myjd);//拖动角度
					this.panoObject.paint();
					weixing.x=Math.cos(myjd*Math.PI/180)*r+40;
					weixing.y=Math.sin(myjd*Math.PI/180)*r+45;
					
				}
			}
		}
		public function moveHand1():void{
			if(this.panoObject){//转动角度
					/*weixing.x=Math.cos((360-this.panoObject.pan)*Math.PI/180)*r+39;
					weixing.y=Math.sin((360-this.panoObject.pan)*Math.PI/180)*r+45;
					this.weixing.rotation=360-this.panoObject.pan;*/
					//this.weixing.rotation=panoObject.getRadarAngle();
					weixing.x=Math.cos((panoObject.getRadarAngle())*Math.PI/180)*r+39;
					weixing.y=Math.sin((panoObject.getRadarAngle())*Math.PI/180)*r+45;
					this.weixing.rotation=panoObject.getRadarAngle();
				}
		}

        public function MyCircle(param1:Number, param2:Number, param3:Number) : void
        {
            graphics.clear();
            graphics.lineStyle(1, 16711680);
            graphics.drawCircle(param1, param2, param3);
			//trace(param1+"|"+param2+"|"+param3);
            return;
        }// end function
		/**/

		public function fhouseController()
		{
			init();
			MainTimeline();
			
			//this.addEventListener(Event.ADDED_TO_STAGE, MainTimeline());
		}

		
		public function setPanoInterface(api:Object):void
		{
			this.panoObject = api;
			this.scaleY = 1;
            this.scaleX = 1;
			this.panoObject.getScene().addEventListener("fovChange",refershFovHand);
		}

		private function refershFovHand(e:Event):void{
			tweenHand();
		}

		

		public function init():void
		{
			//Security.allowDomain("*");
			this.rightBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.upBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.downBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.leftBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.zoomInBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.zoomOutBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			 
            
			//
			this.myvalue.addEventListener(Event.CHANGE, onChange)
			//
			this.action = "";
			this.tpManager = new ToolTipManager();
			if (stage)
			{
				
				stage.addEventListener(MouseEvent.MOUSE_DOWN, this.mouseDownHandler);
				
				this.tpManager.initStage(stage);
			}
			else
			{
				this.addEventListener(Event.ADDED_TO_STAGE, this.addToStageHandler);
				 
				
				//this.yuanxing.addEventListener(MouseEvent.MOUSE_DOWN, this.yuanxingdown);
                //this.weixing.addEventListener(MouseEvent.MOUSE_DOWN, this.weixingdown);
			}
			this.tpManager.register(this.zoomOutBtn, "缩小");
			this.tpManager.register(this.zoomInBtn, "放大");
			this.tpManager.register(this.leftBtn, "左转");
			this.tpManager.register(this.rightBtn, "右转");
			this.tpManager.register(this.upBtn, "向上");
			this.tpManager.register(this.downBtn, "向下");
			this.tpManager.register(this.jhelp, "帮助");
			this.tpManager.register(this.jfull, "全屏");
			this.tpManager.register(this.jjour, "漫游");
		}
		public var tempNum:Number=-90;
		
		
		
        //
		public function onChange(e:Event):void {
			//trace(myvalue.value);
			//this.action = "getvalue";
			//fov=myvalue.value;
			//this.panoObject.paint();
			if (this.panoObject){
			panoObject.stopAutoMoveHand();
			}
			var num:Number=Math.abs(myvalue.value);
			if(tempNum==30||tempNum==120) return;
			if(num>Math.abs(tempNum)){
				trace("da");
				if (this.panoObject){
					TweenMax.to(this.panoObject, 1, {fov:num,ease:Strong.easeOut, onUpdate:this.TweenUpdate});
				}
			}else{
				trace("ji");
				if (this.panoObject){
					TweenMax.to(this.panoObject, 1, {fov:num,ease:Strong.easeOut, onUpdate:this.TweenUpdate});
				}
			}
			tempNum=myvalue.value;
		}
		//
		public function addToStageHandler(event:Event):void
		{
			stage.addEventListener(MouseEvent.MOUSE_DOWN, this.mouseDownHandler);
			this.tpManager.initStage(stage);
			 stage.addEventListener(MouseEvent.MOUSE_UP, this.up);
                 stage.addEventListener(MouseEvent.MOUSE_MOVE, this.mov);
		}

		public function mouseUpHandler(event:MouseEvent):void
		{
			this.action = "";
			this.removeEventListener(Event.ENTER_FRAME, this.frameHandler);
		}

		public function TweenUpdate(event:Event = null):void
		{
			if (this.panoObject)
			{
				this.panoObject.paint();
			}
		}

		public function frameHandler(event:Event):void
		{
			//trace(Ox+"|"+Oy+"|"+Wx+"|"+Wy+"|"+r);
			//trace((Math.atan2(Wy-Oy,Wx-Ox)*180/Math.PI)+360);
			//this.weixing.rotation=Math.abs((Math.atan2(Wy-Oy,Wx-Ox)*180/Math.PI));
			
			moveHand1();
			if (this.panoObject)
			{
				
				switch (this.action)
				{
					case "left" :
						TweenMax.to(this.panoObject, 2, {pan:this.panoObject.pan - 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "right" :
						TweenMax.to(this.panoObject, 2, {pan:this.panoObject.pan + 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "zoomIn" :
					    myvalue.value +=10;
						//myvalue.value=this.panoObject.fov - 10;
						TweenMax.to(this.panoObject, 2, {fov:this.panoObject.fov - 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "zoomOut" :
					    myvalue.value -=10;
					   ///myvalue.value=this.panoObject.fov + 10;
						TweenMax.to(this.panoObject, 2, {fov:this.panoObject.fov + 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "up" :
						TweenMax.to(this.panoObject, 2, {tilt:this.panoObject.tilt + 5, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "down" :
						TweenMax.to(this.panoObject, 2, {tilt:this.panoObject.tilt - 5, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					//case "getvalue" :
						//TweenMax.to(this.panoObject, 1, {fov:myvalue.value,ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						//trace(myvalue.value);
						//break;
						case "zhuand" :
						 moveHand();
					default :
						break;
						
				}
			}
		}
		
		public function tweenHand():void{
			myvalue.value=0-this.panoObject.fov;
		}
        public var myset:int= 1;
		public function mouseDownHandler(event:MouseEvent):void
		{
			if (this.panoObject){
			panoObject.stopAutoMoveHand();
			}
			  
			switch (event.target)
			{
				case this.rightBtn :
					this.action = "right";
					break;
				case this.leftBtn :
					this.action = "left";
					break;
				case this.zoomInBtn :
					this.action = "zoomIn";
					//myvalue.value +=10;
					trace(myvalue.value);
					break;
				case this.zoomOutBtn :
					this.action = "zoomOut";
					//myvalue.value -=10;
					trace(myvalue.value);
					break;
				case this.upBtn :
					this.action = "up";
					break;
				case this.downBtn :
					this.action = "down";
					break;
				case this.jhelp :
					this.action = "";
					this.zihelp.gotoAndPlay("help2");
					//trace("g");
					break;
				case this.zihelp :
					this.action = "";
					this.zihelp.gotoAndPlay("help1");
					//trace("g");
					break;
				case this.jfull :
					this.action = "";
					this.panoObject.fullScreenHand();
					break;
				case this.jjour :
					this.action = "";
					this.panoObject.autoMoveHand();
					break;
					case this.weixing :
					  mouseDownW = true;
					  this.action = "zhuand";
					break;
					case this.ld:
					 
					  if(myset== 1){
					 this.panoObject.setFootVisible(false);
					   myset=0;
					 }else{
						 this.panoObject.setFootVisible(true);
						 myset=1;
						 }
					//this.zihelp.gotoAndPlay(109);
					break;
					case this.yuanxing :
					  mouseDownO = false;
					break;
			//this.yuanxing.addEventListener(MouseEvent.MOUSE_DOWN, this.yuanxingdown);
            // this.weixing.addEventListener(MouseEvent.MOUSE_DOWN, this.weixingdown);
			 
				default :
					this.action = "";
					TweenMax.killAll();
					break;
					
			}
			this.addEventListener(Event.ENTER_FRAME, this.frameHandler);
		}
	}
	

}