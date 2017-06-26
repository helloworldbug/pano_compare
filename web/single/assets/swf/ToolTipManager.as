package 
{
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import flash.utils.*;

    public class ToolTipManager extends Object
    {
        private var _curObject:Object;
        private var _tipDic:Dictionary;
        private var _showTime:Timer;
        private var _triggTime:Timer;
        private var _tip:TextField;
        private var _stage:Stage;

        public function ToolTipManager()
        {
            this._tipDic = new Dictionary();
            this._triggTime = new Timer(500, 1);
            this._showTime = new Timer(3000, 1);
            this._triggTime.addEventListener(TimerEvent.TIMER_COMPLETE, this.triggTip);
            this._showTime.addEventListener(TimerEvent.TIMER_COMPLETE, this.hideTip);
            this._tip = new TextField();
            this._tip.autoSize = TextFieldAutoSize.LEFT;
            this._tip.background = true;
            this._tip.backgroundColor = 16777185;
            var _loc_1:* = new TextFormat("微软雅黑", 12);
            this._tip.defaultTextFormat = _loc_1;
            return;
        }// end function

        public function register(param1:DisplayObject, param2:String) : void
        {
            this._tipDic[param1] = param2;
            param1.addEventListener(MouseEvent.MOUSE_OVER, this.ddMouseOverHandler);
            param1.addEventListener(MouseEvent.MOUSE_OUT, this.ddMouseOutHandler);
            param1.addEventListener(MouseEvent.MOUSE_DOWN, this.ddMouseDownhandler);
            return;
        }// end function

        private function hideTip(event:Event = null) : void
        {
            if (this._stage && this._stage.contains(this._tip))
            {
                this._stage.removeChild(this._tip);
            }
            return;
        }// end function

        private function ddMouseDownhandler(event:Event) : void
        {
            this._triggTime.reset();
            this._triggTime.start();
            this._curObject = event.currentTarget;
            return;
        }// end function

        public function initStage(param1:Stage)
        {
            this._stage = param1;
            return;
        }// end function

        private function triggTip(event:Event) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            if (this._curObject && this._tipDic[this._curObject])
            {
                this._tip.text = this._tipDic[this._curObject];
                _loc_2 = this._stage.mouseX + 10;
                _loc_3 = this._stage.mouseY + 10;
                if (this._tip.width + _loc_2 > this._stage.stageWidth)
                {
                    _loc_2 = this._stage.stageWidth - this._tip.width - 10;
                }
                if (this._tip.height + _loc_3 > this._stage.stageHeight)
                {
                    _loc_3 = _loc_3 - this._tip.height - 10;
                }
                this._tip.x = _loc_2;
                this._tip.y = _loc_3;
                this._stage.addChild(this._tip);
                this._showTime.reset();
                this._showTime.start();
            }
            return;
        }// end function

        private function ddMouseOverHandler(event:Event) : void
        {
            this._triggTime.reset();
            this._triggTime.start();
            this._curObject = event.currentTarget;
            return;
        }// end function

        private function ddMouseOutHandler(event:MouseEvent) : void
        {
            this._triggTime.reset();
            this.hideTip();
            this._curObject = null;
            return;
        }// end function

    }
}
