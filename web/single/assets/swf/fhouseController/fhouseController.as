package 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.display.SimpleButton;
	import flash.system.Security;
	import com.greensock.TweenMax;
	import com.greensock.easing.Strong;
	import flash.external.*;

	public class fhouseController extends MovieClip
	{
		private var panoObject:Object;
		private var tpManager:ToolTipManager;
		private var action:String;

		public var upBtn:SimpleButton;
		public var leftBtn:SimpleButton;
		public var downBtn:SimpleButton;
		public var rightBtn:SimpleButton;
		public var zoomOutBtn:SimpleButton;
		public var zoomInBtn:SimpleButton;
		public var fxBtn:SimpleButton;
		

		public function fhouseController()
		{
			init();
		}

		public function setPanoInterface(api:Object):void
		{
			this.panoObject = api;
			this.scaleY = 1;
            this.scaleX = 1;
		}

		private function init():void
		{
			Security.allowDomain("*");
			this.rightBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.upBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.downBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.leftBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.zoomInBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.zoomOutBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandler);
			this.fxBtn.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpHandlerfx);
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
			}
			this.tpManager.register(this.zoomOutBtn, "缩小");
			this.tpManager.register(this.zoomInBtn, "放大");
			this.tpManager.register(this.leftBtn, "左转");
			this.tpManager.register(this.rightBtn, "右转");
			this.tpManager.register(this.upBtn, "向上");
			this.tpManager.register(this.downBtn, "向下");
			this.tpManager.register(this.fxBtn, "反转拖动");
		}

		private function addToStageHandler(event:Event):void
		{
			stage.addEventListener(MouseEvent.MOUSE_DOWN, this.mouseDownHandler);
			this.tpManager.initStage(stage);
		}

		private function mouseUpHandler(event:MouseEvent):void
		{
			this.action = "";
			this.removeEventListener(Event.ENTER_FRAME, this.frameHandler);
		}

		private function TweenUpdate(event:Event = null):void
		{
			if (this.panoObject)
			{
				this.panoObject.paint();
			}
		}
        private function mouseUpHandlerfx(event:Event):void{
			ExternalInterface.call("setMouseConverHand");
			}
		private function frameHandler(event:Event):void
		{
			if (this.panoObject)
			{
				switch (this.action)
				{
					case "left" :
						TweenMax.to(this.panoObject, 1, {pan:this.panoObject.pan - 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate,onComplete:effectHand});
						break;
					case "right" :
						TweenMax.to(this.panoObject, 1, {pan:this.panoObject.pan + 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate,onComplete:effectHand});
						break;
					case "zoomIn" :
						TweenMax.to(this.panoObject, 1, {fov:this.panoObject.fov - 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "zoomOut" :
						TweenMax.to(this.panoObject, 1, {fov:this.panoObject.fov + 10, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "up" :
						TweenMax.to(this.panoObject, 1, {tilt:this.panoObject.tilt + 5, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					case "down" :
						TweenMax.to(this.panoObject, 1, {tilt:this.panoObject.tilt - 5, ease:Strong.easeOut, onUpdate:this.TweenUpdate});
						break;
					//case "fx" :
						//  ExternalInterface.call("setMouseConverHand");
						//break;
					default :
						break;
				}
			}
		}
		
		private function effectHand():void{
			panoObject.scene.tranScene.changeInitPan();
		}

		private function mouseDownHandler(event:MouseEvent):void
		{
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
					break;
				case this.zoomOutBtn :
					this.action = "zoomOut";
					break;
				case this.upBtn :
					this.action = "up";
					break;
				case this.downBtn :
					this.action = "down";
					break;
					
					//case this.fxBtn :
					//this.action = "fx";
					//break;
				default :
					this.action = "";
					TweenMax.killAll();
					break;
			}
			this.addEventListener(Event.ENTER_FRAME, this.frameHandler);
		}
	}
}