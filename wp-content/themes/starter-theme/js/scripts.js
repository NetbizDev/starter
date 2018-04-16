jQuery(document).ready(function($) {

    "use strict";
	
    $(function(){
        var win_width = $(window).width();
        console.log(win_width);
        //win_width = win_width.replace('px', '');
        //console.log(win_width);

        if( win_width  > 768 ) {
            $('body :not(header)').on('click', this, function(e){
                var parents = $(this).parents('header').length;
                var header = $(this).hasClass('header');
                
                if( !parents && !header ) {
                    $('#navbar').removeClass('in');
                    $('button.navbar-toggle').attr('aria-expanded', 'false');
                }
            });
        }
    });

    /* YouTube Play on Hover (jQuery version) by James Arthur Johnson @jamesarthurjohn */


   // $('.feedback').on('click', function(e) {
     //   $(this).addClass('open');
   // });
    // Top Left (Fixed) Yellow Form
    var is_yellow_form_active = false;
    var is_mouse_on = false;
    var $freeAdviceWrapper = $('#feedback');

    $freeAdviceWrapper
        .mouseenter(function () {
            showYellowForm(this);
            is_mouse_on = true;
        })
        .mouseleave(function () {
            is_mouse_on = false;
            if (is_yellow_form_active)
                return;
            hideYellowForm(this);
        });

    var showYellowForm = function (form) {
        $(form).stop().animate({top: '120px'}, 600);
    };
    var hideYellowForm = function (form) {
        $(form).stop().animate({top: '-115px'}, 600);
    };


    $('#feedback input').focusin(function () {
        is_yellow_form_active = true;
    })
        .focusout(function () {
            var form = $('#feedback');
            is_yellow_form_active = false;

            if (is_mouse_on == false)
                hideYellowForm(form);
        })
        .keydown(function (e) {
            if (e.keyCode == 9) {
                is_mouse_on = true;
            }
        });

    

	try {
			
		var owl = $('.slider-carousel').owlCarousel({
			items: 1,
			navigation : false,
			navigationText: true,
			pagination: false,
			autoPlay: true,
            lazyLoad: true,
			itemsCustom: [[1300,1], [768,1], [600,1],[480,1],[320,1]],
			slideSpeed: 1000,

		});
	}
	catch(e) {
		console.log(e.message);
	}

	try {

	$('.filter-content').mixitup( {
			effects: ['fade', 'blur']
		});
	}
	catch(e) {
		console.log(e.message);
	}

	try {
			
		var owl = $('.testi-carousel').owlCarousel({
			items: 1,
			navigation : true,
			navigationText: false,
			pagination: false,
			autoPlay: true,
			itemsCustom: [[1300,1], [768,1], [600,1],[480,1],[320,1]],
			slideSpeed: 1000,
			vertical:true,
            size: 2 //Change to match total number of rows.

		});
	}
	catch(e) {
		console.log(e.message);
	}

	try {
			
		var owl = $('.client-carousel').owlCarousel({
			items: 6,
			navigation : false,
			navigationText: false,
			pagination: false,
			autoPlay: true,
			itemsCustom: [[1300,6], [768,3], [600,2],[480,2],[320,1]],
			slideSpeed: 1000,

		});
	}
	catch(e) {
		console.log(e.message);
	}


	try {
			
		var owl = $('.service-carousel').owlCarousel({
			items: 1,
			navigation : true,
			navigationText: false,
			pagination: false,
			autoPlay: false,
			itemsCustom: [[1300,1], [768,1], [600,1],[480,1],[320,1]],
			slideSpeed: 1000,

		});
	}
	catch(e) {
		console.log(e.message);
	}

	try {
			
		var owl = $('.project-slider').owlCarousel({
			items: 1,
			navigation : true,
			navigationText: ["PREV","NEXT"],
			pagination: true,
			autoPlay: false,
			itemsCustom: [[1300,1], [768,1], [600,1],[480,1],[320,1]],
			slideSpeed: 1000,

		});
	}
	catch(e) {
		console.log(e.message);
	}


		/*** Play and Pause videos ****/

	$('.vid-trigger').on('click', this, function(){

		var $this = $(this).parents('.video-wrapper'),
		vidtoplay = $this.find('.bg-video');

		if ( $(vidtoplay)[0].paused === false) {
			$(vidtoplay)[0].pause();
		} else 
		{
			$(vidtoplay)[0].play();
		}

		$this.toggleClass('open');

	});

	$('.vid-button').on('click', this, function(e){

		var vidparent = $(this).parents('.video-wrapper'),
			vidToPlay = vidparent.find('.bg-video');

			$(vidToPlay)[0].play()
				vidparent.addClass('open');

		e.preventDefault();
	});



});


try{
        //google-map
        function initialize() {
          "use strict";

            var locations = [
                                ['<div class="infobox">121 King Street, Melbourne Victoria 3000<br />United States of America, CA 90017</div>', 40.5458921,-74.1843522, 2]
                         //['<div class="infobox"><h4>TRANSPORTER<i class="fa fa-star-o"></i></h4><div class="pull-left"><p class="brown">255 Church Cross Street <br>Victoria Australia 3000</p><p class="brown">Transporters.org.Aus</p><p class="brown"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><span>64 reviews</span></p></div><div class="pull-right"><img src="images/69.jpg" alt="#" class="img-responsive"></div><div class="clearfix"></div> <ul class="list-unstyled list-inline"><li><a href="#">Directions</a></li> <li><a href="#">Search nearby</a></li><li><a href="#">Save to map</a></li> <li ><div class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">More<i class="fa fa-caret-down"></i> </a><ul class="dropdown-menu" role="menu"><li><a href="#">More1</a></li> <li><a href="#">More2</a></li><li><a href="#">More3</a></li></ul></div></li></ul></div>', 39.5458921, -75.1843522],
                         // ['<div class="infobox"><h4>TRANSPORTER<i class="fa fa-star-o"></i></h4><div class="pull-left"><p class="brown">255 Church Cross Street <br>Victoria Australia 3000</p><p class="brown">Transporters.org.Aus</p><p class="brown"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><span>64 reviews</span></p></div><div class="pull-right"><img src="images/69.jpg" alt="#" class="img-responsive"></div><div class="clearfix"></div> <ul class="list-unstyled list-inline"><li><a href="#">Directions</a></li> <li><a href="#">Search nearby</a></li><li><a href="#">Save to map</a></li> <li ><div class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">More<i class="fa fa-caret-down"></i> </a><ul class="dropdown-menu" role="menu"><li><a href="#">More1</a></li> <li><a href="#">More2</a></li><li><a href="#">More3</a></li></ul></div></li></ul></div>', 38.5458921, -76.1843522]
                  ];
            var mapCanvas = document.getElementById('map-street');
            var mapOptions = {
              center: new google.maps.LatLng(40.5458921, -74.1843522),
              zoom: 7,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: [
                    {
                        "featureType": "all",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                                     
                            },
                            {
                                "color": "#f3f4f4"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "weight": 0.9
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#83cead"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#fee379"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#fee379"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#7fc8ed"
                            }
                        ]
                    }
              ]
            }
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {  

              marker = new google.maps.Marker({ 
                position: new google.maps.LatLng(locations[i][1], locations[i][2]), 
                map: map ,
                icon: 'images/marker.png'
              });

              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(locations[i][0]);
                  infowindow.open(map, marker);
                }
              })(marker, i));
            }
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    } catch(e) {
        console.log( 'google map error' );
    }