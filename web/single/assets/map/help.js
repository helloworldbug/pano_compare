(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.help = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.closed1();
	this.instance.setTransform(456.5,20,1,1,0,0,0,16,16);

	this.instance_1 = new lib._7_2();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,476,368);


// symbols:
(lib._7_2 = function() {
	this.initialize(img._7_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,476,368);


(lib.gb1 = function() {
	this.initialize(img.gb1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,32);


(lib.gb2 = function() {
	this.initialize(img.gb2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,32);


(lib.closemap1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.gb1();

	this.instance_1 = new lib.gb2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,32,32);


(lib.closed1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.closemap1();
	this.instance.setTransform(16,16,1,1,0,0,0,16,16);
	new cjs.ButtonHelper(this.instance, 0, 1, 2);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,32,32);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;