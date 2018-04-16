jQuery(document).ready(function(){
	
	
	var feedback = $('#feedback');




var  string_1 = '<p>צבע ובהירות היהלום נקבעים לפי אותיות באנגלית כאשר הצבע בהיר ביותר הוא צבע –D  והצבע הנמוך ביותר הוא צבע Z צבעי היהלום מחולקים ל 4  קבוצות עיקריות.<br/> קבוצה 1. צבעי ה-COLLECTION COLOR אלו יהלומים הבהירים והלבנים ביותר האותיות בקבוצה זאת נקראים D-E-F-G (האותיות  A-B-C לא נכללים בהערכת הצבע אלא מתחילים באות(D <br/> קבוצה 2.צבעי ה- WHITE COLOR אלו יהלומים בהירים לבנים והם נכללים בקבוצת אותיות הנקראות H-I-J <br/>קבוצה 3. צבעי ה- COMERCIAL COLOR אלו יהלומים קצת צהבהבים המתחילים להצהיב יותר עם ירידת האותיות לרמת K-L-M <br/>קבוצה 4. צבעי ה- CAPE הם יהלומים צהובים\חומים המתחילים בצבע  N ועד האות Z</p>';

var  string_2 = '<p>FLAWLESS- FL  יהלום ללא שום פגם פנימי גם בהגדלה של פי 30 במיקרוסקופ <br/>VVS1,2- very very slight  יהלומים עדיין נקיים בהגדלה של פי 20 במיקרוסקופ<br/>VS1  פגם זעיר מאוד שניתן לראותו בהגדלה של פי 15<br/>VS2  פגם כראש של סיכת תפירה שניתן לראותו בהגדלה של פי 10<br/>SI1  פגם שהוא כפול בגודלו מפגם של VS2 אך עדיין ניתן לראותו רק בהגדלה של פי 10 <br/>SI2,3 פגמים שבזויות מסוימות ניתן לראותם מתחת לאור בוהק גם ללא הגדלה.<br/>I1,2  פגמים שללא ספק ניתן לראותם בעין בלתי מזויינת גם ללא אור חזק שמקרין על היהלום.</p>';

var string_3 = '<p>EXCELLENT-EX  צורת הליטוש האופטימלית והמנצנצת ביותר כאשר כל זויות הליטוש מקבילות זאת לזו ברמת דיוק מיקרו מילימטר וגורם ליהלום לנצנץ ברמה הגבוהה ביותר שקיימת. <br/>VERY GOOD -VG  צורת ליטוש מעולה הדומה מאוד לליטוש הEXCELLENT אך עם סטייה של חצי מעלה בזויות. <br/>GOOD-G צורת ליטוש לא מדוייקת, כלומר שיש סטייה בזויות הליטוש המקבילות זו לזו. <br/>FAIR-F  צורת ליטוש עם סטיות גדולות בין הליטושים בחלק העליון של היהלום לחלק התחתון שלו וכך גורם לירידה של 50% בנצנוץ היהלום.</p>';
	$('#tooltip_1').html(string_1);
	$('#tooltip_2').append(string_2);
	$('#tooltip_3').append(string_3);

 $('h2.widget-title.mobile_').click(function(){
        $('.product-categories').slideToggle('slow');
    });

	$('#feedback h6').click(function(){

		// We are storing the values of the animated
		// properties in a separate object:
		var anim	= {		
			//mb : 0,			// Margin Bottom
			//pt : 25			// Padding Top
		};
			
				
		
		var el = $(this).find('.arrow');
	//	var el = $(this).find('input');

		if(el.hasClass('down') ){
			anim = {
				mb : -210,
				//pt : 10
			};
		}

		// The first animation moves the form up or down, and the second one 
		// moves the "Feedback heading" so it fits in the minimized version
		
		feedback.stop().animate({marginBottom: anim.mb});
		
		feedback.find('.section').stop().animate({paddingTop:anim.pt},function(){
			el.toggleClass('down up');
		});

		$('#feedback').toggleClass('open');


	});
	
	if( $('.cd-stretchy-nav').length > 0 ) {
		var stretchyNavs = $('.cd-stretchy-nav');
		
		stretchyNavs.each(function(){
			var stretchyNav = $(this),
				stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');
			
			stretchyNavTrigger.on('click', function(event){
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function(event){
			( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
		});
	}

	
	var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
		coverLayer = $('.cd-cover-layer');
		
	$('.material-button-toggle').click(function () {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });
	
	/*
		convert a cubic bezier value to a custom mina easing
		http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
	*/
	var duration = 600,
		epsilon = (1000 / 60 / duration) / 4,
		firstCustomMinaAnimation = bezier(.63,.35,.48,.92, epsilon);

	modalTriggerBts.each(function(){
		initModal($(this));
	});

	function initModal(modalTrigger) {
		var modalTriggerId =  modalTrigger.attr('id'),
			modal = $('.cd-modal[data-modal="'+ modalTriggerId +'"]'),
			svgCoverLayer = modal.children('.cd-svg-bg'),
			paths = svgCoverLayer.find('path'),
			pathsArray = [];
		//store Snap objects
		pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
		pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
		pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

		//store path 'd' attribute values	
		var pathSteps = [];
		pathSteps[0] = svgCoverLayer.data('step1');
		pathSteps[1] = svgCoverLayer.data('step2');
		pathSteps[2] = svgCoverLayer.data('step3');
		pathSteps[3] = svgCoverLayer.data('step4');
		pathSteps[4] = svgCoverLayer.data('step5');
		pathSteps[5] = svgCoverLayer.data('step6');
		
		//open modal window
		modalTrigger.on('click', function(event){
			event.preventDefault();
			modal.addClass('modal-is-visible');
			coverLayer.addClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'open');
		});

		//close modal window
		modal.on('click', '.modal-close', function(event){
			event.preventDefault();
			modal.removeClass('modal-is-visible');
			coverLayer.removeClass('modal-is-visible');
			animateModal(pathsArray, pathSteps, duration, 'close');
		});
	}

	function animateModal(paths, pathSteps, duration, animationType) {
		var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
			path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
			path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
		paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
		paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
		paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);
	}

	function bezier(x1, y1, x2, y2, epsilon){
		//https://github.com/arian/cubic-bezier
		var curveX = function(t){
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};

		var curveY = function(t){
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};

		var derivativeCurveX = function(t){
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
		};

		return function(t){

			var x = t, t0, t1, t2, x2, d2, i;

			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++){
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}

			t0 = 0, t1 = 1, t2 = x;

			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);

			// Fallback to the bisection method for reliability.
			while (t0 < t1){
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}

			// Failure
			return curveY(t2);

		};
	};
});
//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
;(function(window) {

	'use strict';

	// Helper vars and functions.
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * Line obj.
	 */
	function Line(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	Line.prototype.options = {
		// top, left, width, height: numerical for pixels or string for % and viewport units. Examples: 2 || '20%' || '50vw'.
		// color: the (bg)color of the line.
		// hidden: defines if the line is rendered initially or hidden by default.
		// animation: animation properties for the line
		// 		duration: animation speed.
		// 		easing: animation easing (animejs easing. To see all possible values console animejs.easings).
		// 		delay: animation delay.
		// 		direction: line animation direction. Possible values: TopBottom || BottomTop || LeftRight || RightLeft || CenterV || CenterH.
		width: 1,
		height: '100%',
		left: '50%',
		top: '0%',
		color: '#000',
		hidden: false,
		animation: {
			duration: 500,
			easing: 'linear',
			delay: 0,
			direction: 'TopBottom'
		}
	};

	/**
	 * Set style.
	 */
	Line.prototype._init = function() {
		this.el = document.createElement('div');
		this.el.className = 'decoline';
		var opts = this.options;
		this.el.style.width = typeof opts.width === 'number' ? opts.width + 'px' : opts.width;
		this.el.style.height = typeof opts.height === 'number' ? opts.height + 'px' : opts.height;
		this.el.style.left = typeof opts.left === 'number' ? opts.left + 'px' : opts.left;
		this.el.style.top = typeof opts.top === 'number' ? opts.top + 'px' : opts.top;
		this.el.style.background = opts.color || opts.color;
		this.el.style.opacity = opts.hidden ? 0 : 1;
		this._setOrigin();
		this.rendered = !opts.hidden;
	};

	/**
	 * Transform origin is set according to the animation direction.
	 */
	Line.prototype._setOrigin = function() {
		var opts = this.options, tOrigin = '50% 50%';

		if( opts.animation.direction === 'TopBottom' ) {
			tOrigin = '50% 0%';
		}
		else if( opts.animation.direction === 'BottomTop' ) {
			tOrigin = '50% 100%';
		}
		else if( opts.animation.direction === 'LeftRight' ) {
			tOrigin = '0% 50%';
		}
		else if( opts.animation.direction === 'RightLeft' ) {
			tOrigin = '100% 50%';
		}
		
		this.el.style.WebkitTransformOrigin = this.el.style.transformOrigin = tOrigin;
	};

	/**
	 * Animates the line.
	 */
	Line.prototype.animate = function(settings) {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;

		var animeProps = {
			targets: this.el,
			duration: settings && settings.duration != undefined ? settings.duration : this.options.animation.duration,
			easing: settings && settings.easing != undefined ? settings.easing : this.options.animation.easing,
			delay: settings && settings.delay != undefined ? settings.delay : this.options.animation.delay
		};

		if( settings && settings.direction ) {
			this.options.animation.direction = settings.direction;
		}

		// Sets origin again. Settings might contain a different animation direction?
		this._setOrigin();

		if( this.options.animation.direction === 'TopBottom' || this.options.animation.direction === 'BottomTop' || this.options.animation.direction === 'CenterV' ) {
			animeProps.scaleY = this.rendered ? [1, 0] : [0, 1];
		}
		else {
			animeProps.scaleX = this.rendered ? [1, 0] : [0, 1];
		}

		if( !this.rendered ) {
			this.el.style.opacity = 1;
		}

		var self = this;
		animeProps.complete = function() {
			self.rendered = !self.rendered;
			if( settings && settings.complete ) {
				settings.complete();
			}
			self.isAnimating = false;
		}

		anime(animeProps);
	};

	/**
	 * Show the line.
	 */
	Line.prototype.show = function() {
		this.el.style.opacity = 1;
		this.el.style.WebkitTransform = this.el.style.transform = 'scale3d(1,1,1)';
		this.rendered = true;
	};

	/**
	 * Hide the line.
	 */
	Line.prototype.hide = function() {
		this.el.style.opacity = 0;
		this.rendered = false;
	};

	/**
	 * LineMaker obj.
	 */
	function LineMaker(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	/**
	 * LineMaker options.
	 */
	LineMaker.prototype.options = {
		// Where to insert the lines container.
		// element: the DOM element or a string to specify the selector, e.g. '#id' or '.classname'.
		// position: Whether to prepend or append to the parent.element
		parent: {element: document.body, position: 'prepend'},
		// position: if fixed the lines container will have fixed position.
		position: 'absolute',
		// The lines settings.
		lines: []
	};

	/**
	 * Create the lines and its structure.
	 */
	LineMaker.prototype._init = function() {
		this.lines = [];

		this.decolines = document.createElement('div');
		this.decolines.className = 'decolines';
		if( this.options.position === 'fixed' ) {
			this.decolines.className += ' decolines--fixed';
		}

		for(var i = 0, len = this.options.lines.length; i < len; ++i) {
			var lineconfig = this.options.lines[i],
				line = new Line(lineconfig);

			this.decolines.appendChild(line.el);
			this.lines.push(line);
		}

		var p = this.options.parent, 
			pEl = typeof p.element === 'string' ? document.querySelector(p.element) : p.element;

		if( p.position === 'prepend' ) {
			pEl.insertBefore(this.decolines, pEl.firstChild);
		}
		else {
			pEl.appendChild(this.decolines);
		}
	};

	/**
	 * Shows/Hides one line with an animation.
	 */
	LineMaker.prototype._animateLine = function(lineIdx, dir, settings) {
		var line = this.lines[lineIdx];
		if( line && dir === 'in' && !line.rendered || dir === 'out' && line.rendered ) {
			line.animate(settings);
		}
	};

	/**
	 * Shows/Hides all lines with an animation.
	 */
	LineMaker.prototype._animateLines = function(dir, callback) {
		var completed = 0, totalLines = this.lines.length;

		if( totalLines === 0 ) {
			callback();
			return;
		}

		var checkCompleted = function() {
			completed++;
			if( completed === totalLines && typeof callback === 'function' ) {
				callback();
			}
		};

		for(var i = 0; i < totalLines; ++i) {
			var line = this.lines[i];
			if( dir === 'in' && !line.rendered || dir === 'out' && line.rendered ) {
				line.animate({
					complete: function() {
						checkCompleted();
					}
				});
			}
			else {
				checkCompleted();
			}
		}
	};

	/**
	 * Shows/Hides one line.
	 */
	LineMaker.prototype._toggleLine = function(lineIdx, action) {
		var line = this.lines[lineIdx];
		if( !line ) { return; }
		
		if( action === 'show' && !line.rendered ) {
			line.show();
		}
		else if( action === 'hide' && line.rendered ) {
			line.hide();
		}
	};

	/**
	 * Shows/Hides all lines.
	 */
	LineMaker.prototype._toggleLines = function(action) {
		for(var i = 0, len = this.lines.length; i < len; ++i) {
			this._toggleLine(i, action);
		}
	};

	/**
	 * Shows one line with an animation.
	 * lineIndex: index/position of the line in the LineMaker.options.lines array.
	 * animationSettings is optional: if not passed, the animation settings defined in LineMaker.options.lines for each line will be used.
	 */
	LineMaker.prototype.animateLineIn = function(lineIdx, settings) {
		this._animateLine(lineIdx, 'in', settings);
	};

	/**
	 * Hides one line with an animation.
	 * lineIndex: index/position of the line in the LineMaker.options.lines array.
	 * animationSettings is optional: if not passed, the animation settings defined in LineMaker.options.lines for each line will be used.
	 */
	LineMaker.prototype.animateLineOut = function(lineIdx, settings) {
		this._animateLine(lineIdx, 'out', settings);
	};

	/**
	 * Shows all lines with an animation.
	 */
	LineMaker.prototype.animateLinesIn = function(callback) {
		this._animateLines('in', callback);
	};

	/**
	 * Hides all lines with an animation.
	 */
	LineMaker.prototype.animateLinesOut = function(callback) {
		this._animateLines('out', callback);
	};

	/**
	 * Shows one line.
	 * lineIndex: index/position of the line in the LineMaker.options.lines array.
	 */
	LineMaker.prototype.showLine = function(lineIdx) {
		this._toggleLine(lineIdx, 'show');
	};
	
	/**
	 * Hides one line.
	 * lineIndex: index/position of the line in the LineMaker.options.lines array.
	 */
	LineMaker.prototype.hideLine = function(lineIdx) {
		this._toggleLine(lineIdx, 'hide');
	};

	/**
	 * Shows all lines.
	 */
	LineMaker.prototype.showLines = function() {
		this._toggleLines('show');
	};

	/**
	 * Hides all lines.
	 */
	LineMaker.prototype.hideLines = function() {
		this._toggleLines('hide');
	};

	/**
	 * Removes a line.
	 * lineIndex: index/position of the line in the LineMaker.options.lines array.
	 */
	LineMaker.prototype.removeLine = function(lineIdx) {
		var line = this.lines[lineIdx];
		if( line ) {
			this.lines.splice(lineIdx, 1);
			this.decolines.removeChild(this.decolines.children[lineIdx]);
		}
	};

	/**
	 * Removes all lines.
	 */
	LineMaker.prototype.removeLines = function() {
		this.lines = [];
		this.decolines.innerHTML = '';
	};

	/**
	 * Creates a line.
	 * settings is optional: same settings passed in LineMaker.options.lines for one line.
	 */
	LineMaker.prototype.createLine = function(settings) {
		var line = new Line(settings);
		this.decolines.appendChild(line.el);
		this.lines.push(line);
	};

	/**
	 * Returns the total number of lines.
	 */
	LineMaker.prototype.getTotalLines = function() {
		return this.lines.length;
	}

	window.LineMaker = LineMaker;

})(window);
