
	'use strict';
	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		if($(el).attr('data-like')=="0"){
			this.checked = false;
		}else{
			this.checked = true;
		}
		
		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked && goodslistapp.$data.userid!="") {
				self.options.onUnCheck();
				$(el).attr('data-like','0');
			}
			else if(!self.checked && goodslistapp.$data.userid!="") {
				self.options.onCheck();
				$(el).attr('data-like','1');
				self.timeline.start();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	}


var init=function(el) {
	/* Icon 14 */
	var el14=el.querySelector('i.fa-heart');
//	console.log(el14);
	var eli=$('li#theli')[0].querySelector('i.fa-heart');
//	console.log(eli);
	var el14i=el14;
	new Animocon(el14, {
		tweens : [
			// ring animation
			new mojs.Transit({
				parent: el14,
				duration: 750,
				type: 'circle',
				radius: {0: 27},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {24:0},
				opacity: 0.2,
				x: '50%',     
				y: '50%',
				isRunLess: true,
				easing: mojs.easing.bezier(0, 1, 0.5, 1)
			}),
			new mojs.Transit({
				parent: el14,
				duration: 500,
				delay: 100,
				type: 'circle',
				radius: {0: 14},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {3.4:0},
				opacity: 0.2,
				x: '50%', 
				y: '50%',
				shiftX : 27, 
				shiftY : -40,
				isRunLess: true,
				easing: mojs.easing.sin.out
			}),
			new mojs.Transit({
				parent: el14,
				duration: 500,
				delay: 180,
				type: 'circle',
				radius: {0: 6.7},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {3.4:0},
				opacity: 0.5,
				x: '50%', 
				y: '50%',
				shiftX : -6.7, 
				shiftY : -53,
				isRunLess: true,
				easing: mojs.easing.sin.out
			}),
			new mojs.Transit({
				parent: el14,
				duration: 800,
				delay: 240,
				type: 'circle',
				radius: {0: 14},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {3.4:0},
				opacity: 0.3,
				x: '50%', 
				y: '50%',
				shiftX : -46, 
				shiftY : -6.7,
				isRunLess: true,
				easing: mojs.easing.sin.out
			}),
			new mojs.Transit({
				parent: el14,
				duration: 800,
				delay: 240,
				type: 'circle',
				radius: {0: 14},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {1.7:0},
				opacity: 0.4,
				x: '50%', 
				y: '50%',
				shiftX : 53, 
				shiftY : 33.5,
				isRunLess: true,
				easing: mojs.easing.sin.out
			}),
			new mojs.Transit({
				parent: el14,
				duration: 1000,
				delay: 300,
				type: 'circle',
				radius: {0: 10},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {3.4:0},
				opacity: 0.2,
				x: '50%', 
				y: '50%',
				shiftX : 14, 
				shiftY : 50.7,
				isRunLess: true,
				easing: mojs.easing.sin.out
			}),
			new mojs.Transit({
				parent: el14,
				duration: 600,
				delay: 330,
				type: 'circle',
				radius: {0: 16.7},
				fill: 'transparent',
				stroke: '#F35186',
				strokeWidth: {6.8:0},
				opacity: 0.4,
				x: '50%', 
				y: '50%',
				shiftX : -26.6, 
				shiftY : -60,
				isRunLess: true,
				easing: mojs.easing.sin.out
			})
		],
		onCheck : function() {
			el14.style.color = '#F35186';		
		},
		onUnCheck : function() {
			el14.style.color = '#C0C1C3';
		}
	});
}

window.onload=function(){
//	init();
}

var el=null;

var addSvg=function(el){
	if(el[0].querySelector('svg')==null){
		console.log(el);
		for(var i=0;i<el.length;i++){
			if(el[i].querySelector('svg')==null){
				init(el[i]);
			}
		}
	}
}