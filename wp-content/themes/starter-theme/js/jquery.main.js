/**
 * Issues an ajax request to the server.
 *
 * @param action    {string} action name
 * @param data      {object} the data sent to the server
 * @param callback  {function} a callback function reference
 *        to invoke after the ajax request is completed
 * @param security  {string} a nonce to pass for security measures
 */
 

function ajaxGenericRequest( action, data, callback, security ) {
    $.ajax({
        url: theme_data.ajaxurl,
        type: "post",
        dataType: 'json',
        data: {
            action: action,
            data: data,
            security: security
        }
    }).done(function (response) {
        if (typeof callback === 'function') {
            callback(response);
        }
    });
}


jQuery(document).ready(function($){
	
	var sliderContainers = $('.cd-slider-wrapper');

	if( sliderContainers.length > 0 ) initBlockSlider(sliderContainers);

	function initBlockSlider(sliderContainers) {
		sliderContainers.each(function(){
			var sliderContainer = $(this),
				slides = sliderContainer.children('.cd-slider').children('li'),
				sliderPagination = createSliderPagination(sliderContainer);

			sliderPagination.on('click', function(event){
				event.preventDefault();
				var selected = $(this),
					index = selected.index();
				updateSlider(index, sliderPagination, slides);
			});

			sliderContainer.on('swipeleft', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':last-child') && bool) {updateSlider(visibleSlideIndex + 1, sliderPagination, slides);}
			});

			sliderContainer.on('swiperight', function(){
				var bool = enableSwipe(sliderContainer),
					visibleSlide = sliderContainer.find('.is-visible').last(),
					visibleSlideIndex = visibleSlide.index();
				if(!visibleSlide.is(':first-child') && bool) {updateSlider(visibleSlideIndex - 1, sliderPagination, slides);}
			});
		});
	}

	function createSliderPagination(container){
		var wrapper = $('<ol class="cd-slider-navigation"></ol>');
		container.children('.cd-slider').find('li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			var dotText = ( index+1 < 10 ) ? '0'+ (index+1) : index+1;
			dot.text(dotText);
		});
		wrapper.appendTo(container);
		return wrapper.children('li');
	}

	function updateSlider(n, navigation, slides) {
		navigation.removeClass('selected').eq(n).addClass('selected');
		slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

		//fixes a bug on Firefox with ul.cd-slider-navigation z-index
		navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$(this).removeClass('slider-animating');
		});
	}

	function enableSwipe(container) {
		return ( container.parents('.touch').length > 0 );
	}
	
	
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

	
	function morphDropdown( element ) {
		this.element = element;
		this.mainNavigation = this.element.find('.main-nav');
		this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
		this.dropdownList = this.element.find('.dropdown-list');
		this.dropdownWrappers = this.dropdownList.find('.dropdown');
		this.dropdownItems = this.dropdownList.find('.content');
		this.dropdownBg = this.dropdownList.find('.bg-layer');
		this.mq = this.checkMq();
		this.bindEvents();
	}

	morphDropdown.prototype.checkMq = function() {
		//check screen size
		var self = this;
		return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
	};

	morphDropdown.prototype.bindEvents = function() {
		var self = this;
		//hover over an item in the main navigation
		this.mainNavigationItems.mouseenter(function(event){
			//hover over one of the nav items -> show dropdown
			self.showDropdown($(this));
		}).mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a nav item or a dropdown -> hide dropdown
				if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) self.hideDropdown();
			}, 50);
		});
		
		//hover over the dropdown
		this.dropdownList.mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a dropdown or a nav item -> hide dropdown
				(self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
			}, 50);
		});

		//click on an item in the main navigation -> open a dropdown on a touch device
		this.mainNavigationItems.on('touchstart', function(event){
			var selectedDropdown = self.dropdownList.find('#'+$(this).data('content'));
			if( !self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active') ) {
				event.preventDefault();
				self.showDropdown($(this));
			}
		});

		//on small screens, open navigation clicking on the menu icon
		this.element.on('click', '.nav-trigger', function(event){
			event.preventDefault();
			self.element.toggleClass('nav-open');
		});
	};

	morphDropdown.prototype.showDropdown = function(item) {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			var self = this;
			var selectedDropdown = this.dropdownList.find('#'+item.data('content')),
				selectedDropdownHeight = selectedDropdown.innerHeight(),
				selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
				selectedDropdownLeft = item.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;

			//update dropdown position and size
			this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
			//add active class to the proper dropdown item
			this.element.find('.active').removeClass('active');
			selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
			item.addClass('active');
			//show the dropdown wrapper if not visible yet
			if( !this.element.hasClass('is-dropdown-visible') ) {
				setTimeout(function(){
					self.element.addClass('is-dropdown-visible');
				}, 10);
			}
		}
	};

	morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) {
		this.dropdownList.css({
		    '-moz-transform': 'translateX(' + left + 'px)',
		    '-webkit-transform': 'translateX(' + left + 'px)',
			'-ms-transform': 'translateX(' + left + 'px)',
			'-o-transform': 'translateX(' + left + 'px)',
			'transform': 'translateX(' + left + 'px)',
			'width': width+'px',
			'height': height+'px'
		});

		this.dropdownBg.css({
			'-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
		    '-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
		});
	};

	morphDropdown.prototype.hideDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			this.element.removeClass('is-dropdown-visible').find('.active').removeClass('active').end().find('.move-left').removeClass('move-left').end().find('.move-right').removeClass('move-right');
		}
	};

	morphDropdown.prototype.resetDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'mobile') {
			this.dropdownList.removeAttr('style');
		}
	};

	var morphDropdowns = [];
	if( $('.cd-morph-dropdown').length > 0 ) {
		$('.cd-morph-dropdown').each(function(){
			//create a morphDropdown object for each .cd-morph-dropdown
			morphDropdowns.push(new morphDropdown($(this)));
		});

		var resizing = false;

		//on resize, reset dropdown style property
		updateDropdownPosition();
		$(window).on('resize', function(){
			if( !resizing ) {
				resizing =  true;
				(!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
			}
		});

		function updateDropdownPosition() {
			morphDropdowns.forEach(function(element){
				element.resetDropdown();
			});

			resizing = false;
		};
	}
});
/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};

/*
	@author: Ilyas karim <ilyas.datoo@gmail.com>
	@date: 5/may/2016

*/


(function(){
    'use strict';

    var allowAdd = true,
        productGallery = null;

    /**
     * Fires ajax request to add product to the cart.
     *
     * @param elemColor
     * @param sizeKey
     * @param callback Function to invoke when ajax request is done.
     *        The response is passed to the callback function.
     */
    function ajaxCreateNewGallery(elemColor, sizeKey, callback) {

        var data = {
            variationID: elemColor.attr('id'),
            sizeKey: sizeKey
        };

        ajaxGenericRequest('ajax_populate_variation_details', data, callback);
    }

 
    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    /**
     * Fires ajax request to add product to the cart.
     *
     * @param addToCartBtn The add to cart button element (jQuery Object).
     * @param callback Function to invoke when ajax request is done.
     *        The response is passed to the callback function.
     */
    function ajaxAddToCart(addToCartBtn, callback) {
        var productID = addToCartBtn.data('product-id');

        ajaxGenericRequest( 'add_to_cart', { productID: productID }, callback );
    }

    /**
     * Fires ajax request to remove product from the cart.
     *
     * @param removeFromCartBtn The remove from cart button element (jQuery Object).
     * @param callback Function to invoke when ajax request is done.
     *        The response is passed to the callback function.
     */
    function ajaxRemoveFromCart(removeFromCartBtn, callback) {
        var cartItemKey = removeFromCartBtn.data('cart-item-key');

        ajaxGenericRequest( 'remove_from_cart', { cartItemKey: cartItemKey }, callback );
    }

    /**
     * Fires ajax request to add a new customer.
     *
     * @param formData Serialized form data.
     * @param callback Function to invoke when ajax request is done.
     *        The response is passed to the callback function.
     */
    function ajaxCreateNewCustomer(formData, callback) {

        ajaxGenericRequest('create_new_customer', formData, callback);
    }

    $(function(){

        // FastClick support
        var attachFastClick = Origami.fastclick;
        attachFastClick(document.body);

        createBuyInfo();

        $('.product__color input:checked').parent().find('img').addClass('add-to-cart-pic');

        if ( $('.login-error').length ) {
            setTimeout(function() {
                $('.login-actions').click();
                $('.popup__login .input-text').addClass('empty');
            }, 0);
        }

        $( '.site' ).each( function(){
            new Page( $( this ) );
        } );

        // TODO move to relevant place in file
        $('.register-form').submit(function (e) {
            e.preventDefault();

            var form = $(this);
            var formData = form.serialize();

            if (form[0].formRequired.checkItems()) {
                ajaxCreateNewCustomer(formData, createNewCustomerCB);
            }

            return false;
        });

        $('.member').submit(function (e) {
            e.preventDefault();
            var $membershipButton = $('#checkMembership');
            var $errorMessage = $('.error-message');
            var form = $(this);
            $errorMessage.text('');

            if (form[0].formRequired.checkItems()) {
                $membershipButton.addClass('loaded');
                ajaxGenericRequest('check_membership_status',
                    {
                        data: $('#membershipID').val()
                    },
                    function (response) {
                        $membershipButton.removeClass('loaded');

                        if (response.success) {
                            $('#membershipUpdateSuccess').show();
                            $membershipButton.hide();
                            $('#closeMembership').show();
                        }
                        else {
                            $errorMessage.text(response.error_message);
                        }
                    },
                    $('#_wpnonce_membership').val()
                );
            }
            return false;
        });

        $('#checkMembership').click(function(e){
            $('.member').trigger('submit');
            e.preventDefault();
        });


        function createBuyInfo(){
            $('.site__header').append(
                '<div class="product-buy">' +
                '<div class="product-buy__info">' +
                '<h4 class="product-buy__head">פריט נוסף לסל</h4>' +
                '<div class="product-buy__title product-title"></div>' +
                '<div class="product-buy__price-wrap">' +
                '<span class="product-buy__qty">x&nbsp;<span class="qty-value"></span></span>' +
                '<span class="product-buy__price"></span>' +
                '</div>' +
                '</div>' +
                '<div class="product-buy__pic"><img src="" alt=""></div>' +
                '</div>');
        }
        // TODO: implement
        function createNewCustomerCB(response) {

            if (response.success) {
                // Add new customer succeeded...
                location.href = response.redirect;
            }
            else {
                // Add new customer failed...
                popup.core.alert(response.error);
            }
        }

        // TODO validate all fields and display error messages
        function validateRegisterForm(form) {
            var fields = {};

            $.each(form.serializeArray(), function (index, field) {
                fields[field.name] = field.value;
            });

            return validatePassword(fields.password, fields.password_auth);
        }

        function validatePassword(password, passwordAuth) {
            return password === passwordAuth;
        }

        function validateDate(m, d, y) {

            return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
                    .getDate();
        }

        $('.menu__submenu-btn').on({
            'click':function(){
                var curElem = $(this).next('.menu__submenu');

                if (curElem.hasClass('active')) {
                    curElem.removeClass('active');
                } else {
                    curElem.addClass('active');
                }

                if ($(window).width() < 992) {
                    return false;
                }
            }
        });

        $('.menu__submenu-back').on({
            'click':function(){
                var curElem = $(this).parent();

                curElem.removeClass('active');
            }
        });

        $.each( $('.product-gallery'), function(){
            productGallery = new ProductGalleryPopup( $( this ) );
        } );

        $.each( $('.category-menu'), function() {
            new CategoryMenu( $(this) );
        });

        $.each( $('.product-form'), function(){
            new ProductFunctional ( $(this) )
        } );

        $.each( $('.comming-soon'), function(){
            new SendMail ( $(this) )
        } );

        $.each( $( '.sub-menus-container' ), function(){
            new SubMenu ( $(this) )
        } );

        $.each( $('.menu__catalog'), function(){
            new SubMenu ( $(this) )
        } );

        $.each( $('.brands-slider .swiper-container'), function(){
            new SWSlider ( $(this) )
        } );

        $.each($('.main-menu-container'), function () {
            new Menu( $( this ) );
        });

        $.each($('.tabs'), function () {
            new Tabs( $( this ) );
        });

        $('.accord').each(function () {
            new Accord($(this));
        });

        $.each( $('.gallery'), function(){
            new Gallery ( $(this) );
        } );

        $.each( $('.products-gallery'), function(){
            new Products_Gallery ( $(this) );
        } );

        $.each( $('.cart-menu'), function(){
            new CartMenu ( $(this) );
        } );

        $.each( $('.goods__item-colors'), function(){
            new ColorGallery ( $(this) );
        } );

        $.each( $('.user-cart'), function(){
            new UserCart ( $(this) );
        } );

        $.each( $('.size-table__tabs'), function(){
            new TableTabs ( $(this) );
        } );

        $.each( $(".product__info-tooltip_no-size"), function(){
            new TooltipNoSize ( $(this) );
        } );

        $.each( $(".product-search-form"), function(){
            new SearchShow($(this));
            new AutoComplete($(this));
        } );

        $.each( $('.personal-area'), function(){
            new PersonalAreaPage ( $(this) );
        } );

        $.each( $('.extended-check'), function(){
            new ExtendedCheckbox ( $(this) )
        } );

        $.each( $('.form-required'), function(){
            new FormRequired ( $(this) )
        } );

        $.each( $( '.subscribe-form' ), function(){
            new SubscribeForm ( $( this ) )
        } );

        if ($('.shopping-cart__wrap').length) {
            $('.shopping-cart__wrap').niceScroll({
                cursorcolor:"#e8e8ed",
                railalign: 'right',
                cursorwidth: 5,
                cursorborder: 0,
                autohidemode: false,
                railpadding: { top: 20, right: 0, left: 0, bottom: 20 }
            });
        }

        if ($('.locator__wrap').length) {
            $('.locator__wrap').niceScroll({
                cursorcolor:"#2ad219",
                railalign: 'left',
                cursorborder: 0,
                railpadding: { top: 10, right: 0, left: 5, bottom: 10 }
            });
        }

        if ($('.header-user-section').length) {
            new UserMenu( $('.header-user-section') );
        }

        $('.locator__wrap').on({
            'click': function(){
                $(this).getNiceScroll().resize();
            }
        });

        $.each( $('.locator'), function(){
            new Locator ( $(this) )
        } );

        $.each( $('.characteristics_content'), function(){
            new CharacteristicsPopup ( $(this) )
        } );

        $.each( $('.product-buy'), function(){
            new ProductBuyPosition( $(this) )
        } );

        $('.select-all').on({
            'click': function(){
                $(this).select();
            }
        });

        $.each( $( '.goods__filters' ), function(){
            new GoodsFilter ( $( this ) )
        } );

        $(document).on('woof_ajax_done', function() {

            $( '.goods__filters' )[0].goodsFilter.calculateCounter();

            $.each( $('.goods__item-colors'), function(){
                new ColorGallery ( $(this) );
            } );

            $( 'select' ).each( function(){
                new AresSelect( {
                    obj: $( this ),
                    optionType: 1,
                    showType: 2
                } );
            } );
        });

        /**
         * Twitter SDK
         */
      /*  window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));
*/
        /**
         * Facebook related code
         */
        // Load the SDK asynchronously
       /* (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            FB.init({
                appId: theme_data.facebook_app_id,
                cookie: true,
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5', // use version 2.5
                status: true
            });

            FB.getLoginStatus(function (response) {
                new Facebook(response);
            });
        };
		*/
        Tipped.create('.product-icon', function(element) {
            var content = $(element).data('content');
            return content.length ? "<div class='product-icon-tooltip'>" + content + "</div>" : "";
        },{
            size: 'x-large',
            radius: false,
            position: 'bottomright',
            // hideOn: false, // uncomment for debugging purposes
            detach: false,
            // hideOnClickOutside: true, // uncomment for debugging purposes
            hideOthers: true
        });

    });
/*
    var Facebook = function(response) {

        var context = this;
        var currentAction;
        var actions;
        var fbLoginStatus;

        function init() {
            // Init facebook login status
            fbLoginStatus = response.status;

            // Init actions
            currentAction = null;
            actions = {
                register: {
                    fields: 'gender,first_name,last_name,email,picture',
                    action: 'facebook_register',
                    clickHandler: facebookRegister
                },
                connect: {
                    fields: 'picture',
                    action: 'facebook_connect',
                    clickHandler: facebookConnect
                },
                login: {
                    fields: 'picture',
                    action: 'facebook_login',
                    clickHandler: facebookLogin
                }
            };

            attachEvents();
        }

        function attachEvents() {

            $('.btn-facebook').on('click', function(e) {
                e.preventDefault();

                currentAction = $(this).data('action');
                actions[currentAction].clickHandler();

            });

            $('.follow-us__fb').on('click', function(e) {
                e.preventDefault();

                var productForm = $('.product-form');

                FB.ui({
                    app_id: theme_data.facebook_app_id,
                    method: 'feed',
                    link: location.href,
                    name: productForm.find('.product-title').text(),
                    caption: 'An example caption',
                    description: productForm.find('.short-description').text(),
                    picture: productForm.find('.product__gallery-pic').css('background-image').slice(5, -2)
                }, function(response) {

                });
            });
        }

        function fbLoginCallback(response) {
            // Update the login status
            fbLoginStatus = response.status;

            // Connection approved
            if (response.authResponse && response.status === 'connected') {
                FB.api('/me?fields=' + actions[currentAction].fields, fbAPICallback);
            }
            // Connection NOT approved
            else {
                popup.core.alert('המשתמש לא אישר את החיבור עם פייסבוק');
            }
        }

        function fbAPICallback(response) {
            if (response && !response.error) {
                ajaxGenericRequest(actions[currentAction].action, response, facebookGeneralCallback);
            }
        }

        function facebookRegister() {

            if ( fbLoginStatus === 'connected' ) {
                popup.core.alert('משתמש זה כבר רשום עם פייסבוק, אנא התחבר.');
                return;
            }

            FB.login(fbLoginCallback, {scope: 'email'});

        }

        function facebookConnect() {

            FB.login(fbLoginCallback);

        }

        function facebookLogin() {

            // The person is logged into Facebook and to the app
            if (fbLoginStatus === 'connected') {
                FB.api('/me?fields=' + actions[currentAction].fields, fbAPICallback);
            }
            // The person is logged into Facebook, but not the app.
            else if (fbLoginStatus == 'not_authorized') {
                popup.core.alert('חשבון הפייסבוק שלך אינו מחובר לחשבון Outsiders!');
            }
            // The person is not logged into Facebook
            else {
                popup.core.alert('אנא התחבר לפייסבוק');
            }
        }

        function facebookGeneralCallback(response) {
            if ( response.success ) {
                if ( response.redirect ) {
                    location.href = response.redirect;
                }
                else {
                    location.reload();
                }
            }
            else {
                popup.core.alert(response.error);
            }
        }

        init();

    };
*/
    var ProductBuyPosition = function ( obj ) {

        var _obj = obj,
            _window = $( window );

        var _addEvents = function () {

                _window.on( {
                    scroll: function(){

                        _setTopPosition();

                    }
                } );

            },
            _setTopPosition = function() {

                var windowScroll = _window.scrollTop(),
                    headerHeight = $( '.site__header' ).height();

                if ( windowScroll > headerHeight ) {
                    _obj.css( {
                        'position': 'fixed',
                        'top': 10
                    } )
                }else{
                    _obj.css( {
                        'position': 'absolute',
                        'top': 'auto'
                    } )
                }

            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var CharacteristicsPopup = function ( obj ) {

        var _obj = obj,
            _indexMenu = $( '.index-menu' ),
            _indexMenuBtn,
            _characteristicsItems = _obj.find( '.characteristics__section' ),
            _curPopupWrap = $( '.popup__characteristics .characteristics__popup-wrap' );

        var _addBtns = function() {

                _characteristicsItems.each(function() {

                    var curItem = $( this ),
                        curItemTitle = curItem.find( $( '.characteristics__title' ) ).text(),
                        addElems = $( '<div><a href="#"  class="popup__open" data-popup="characteristics">'+curItemTitle+'</a></div>' );

                    _indexMenu.append( addElems );

                } );

                $( '.popup' ).each( function() {
                    new Popup( $( this ) );
                });

                _indexMenuBtn = _indexMenu.find( 'a' );

            },

            _addContent = function ( curBtn ) {

                var curBtnIndex = curBtn.parent().index(),
                    curItem = _characteristicsItems.eq(curBtnIndex);

                _curPopupWrap.empty();

                _curPopupWrap.append( curItem.html() );

            },

            _onEvents = function() {

                _indexMenuBtn.on({
                    click: function( ){

                        var curBtn = $( this );

                        _addContent( curBtn );
                    }
                } );

            },

            _init = function (){
                _addBtns();
                _onEvents();
            };

        _init();
    };

    var CategoryMenu = function( menu ) {

        var DURATION = 300;
        var $context = $(this);

        function init() {
            $context.menu = menu;
            $context.togglers = $context.menu.find('.menu-item-has-children');
            $context.subMenus = $context.menu.find('.sub-menu');
            $context.togglers.eq(0).addClass( 'active' );
            $context.togglers.eq(0).find( '.sub-menu').css( {
                display: 'block'
            } );

            addEvents();
        }

        function addEvents() {

            // Menu Togglers
            $context.togglers.on('click', function (e) {
                e.preventDefault();

                var $toggler = $(this);
                var $subMenu = $toggler.children('.sub-menu');

                if ( $toggler.hasClass('active') ) {
                    $toggler.removeClass('active');
                    $subMenu.slideUp(DURATION);
                    return;
                }

                $context.togglers.removeClass('active');
                $context.subMenus.slideUp(DURATION);

                $toggler.addClass('active');
                $subMenu.slideDown(DURATION);
            });

            // Submenus Items
            $context.subMenus.children('.menu-item').on('click', function (e) {
                e.stopPropagation();
            });
        }

        init();
    };

    var ColorGallery = function (obj) {

        var _obj = obj,
            _items = _obj.find( '.swiper-slide' ),
            _slider = _obj.find('.swiper-container'),
            _btnNext = _obj.parent().find( '.swiper-button-next' ),
            _btnPrev = _obj.parent().find( '.swiper-button-prev' ),
            _swiper = null;

        var addEvents = function () {
                $(window).on({
                    resize: function () {

                    }
                });

            },
            createSwiper = function () {
                var perView = 3,
                    space = 0;

                _swiper = new Swiper(_obj, {
                    slidesPerView: perView,
                    nextButton: _btnNext,
                    prevButton: _btnPrev,
                    speed: 700,
                    spaceBetween: space,
                    autoplayDisableOnInteraction:false
                });

                if ( _items.length <= 3 ) {
                    _btnNext.css( { display: 'none' } );
                    _btnPrev.css( { display: 'none' } );
                }

            },
            init = function () {
                createSwiper();
                addEvents();
            };

        init();

    };

    var AddToCartAnimation = function (obj, quantity) {

        var _obj = obj,
            _body = $('body'),
            _productBuy = $('.product-buy'),
            _pic = $('img.add-to-cart-pic'),
            _startWidthPic = _pic.width(),
            _startHeightPic = _pic.height(),
            _koef,
            _addToCartDuration = 1000,
            _productBuyInfoDuration = 5000,
            _window = $( window );

        var _addEvents = function () {

                _window.on( {
                    scroll: function(){

                        _setTopPosition();

                    }
                } );

            },
            _animateBuyInfo = function(){
                var curToX = $('.product-buy__pic img').offset().left,
                    curToY = $('.product-buy__pic img').offset().top;

                $('.product__pic-clone').css({
                    top: curToY,
                    left: curToX,
                    width: _startWidthPic * _koef,
                    height: _startHeightPic * _koef
                });

                setTimeout(function(){
                    $('.product__pic-clone').remove();
                }, _addToCartDuration);

            },
            _createAnimateClone = function(){
                var curClone = _pic.clone(),
                    curX = _pic.offset().left,
                    curY = _pic.offset().top,
                    endWidth = $('.product-buy__pic').width(),
                    endHeight = $('.product-buy__pic').height();

                if (endWidth/_startWidthPic < endHeight/_startHeightPic) {
                    _koef = endWidth/_startWidthPic;
                } else {
                    _koef = endHeight/_startHeightPic;
                }

                curClone.prependTo(_body);

                curClone.addClass('product__pic-clone');

                $('.product-buy__pic img').css({
                    width: _startWidthPic * _koef,
                    height: _startHeightPic * _koef
                });

                curClone.css({
                    top: curY,
                    left: curX
                });

            },
            _productTitle = function(){
                var curTitle = $('.product-buy__title'),
                    curPrice = $('.product-buy__price-wrap'),
                    curPic = $('.product-buy__pic img'),
                    curQty = $('.product-buy__qty .qty-value');

                curTitle.html(_obj.attr('data-product-name'));
                curPic.attr('src', _pic.attr('src'));
                curQty.text(quantity);
                curPrice.find('.product-buy__price').html(_obj.data('product-price'));

                curPic.css({
                    opacity: 0
                });
                setTimeout(function(){
                    curPic.css({
                        opacity: 1
                    });
                }, _addToCartDuration);
            },
            _sendInfo = function(){

                _setTopPosition();

                _productBuy.addClass( 'active' );

                setTimeout(function(){
                    _productBuy.removeClass( 'active' );
                    allowAdd = true;
                }, _productBuyInfoDuration );
            },
            _setTopPosition = function() {

                var windowScroll = _window.scrollTop(),
                    headerHeight = $( '.site__header' ).height();

                if ( windowScroll > headerHeight ) {
                    _productBuy.css( {
                        'top': 10
                    } )
                }else{
                    _productBuy.css( {
                        'top': 'auto'
                    } )
                }

            },
            _init = function () {
                _addEvents();
                _sendInfo();
                _createAnimateClone();
                _productTitle();
                _animateBuyInfo();
            };

        _init();
    };

    var Page = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _obj = obj,
            _siteContent = _obj.find( '.site__content'),
            _siteContentBack = _siteContent.data( 'back' );

        //private methods
        var _addEvents = function () {
                _window.on( {
                    resize: function(){
                        _setSiteContentBack();
                    }
                } );
            },
            _init = function () {
                _addEvents();
                _setSiteContentBack();

                _obj[0].page = _self;
            },
            _setSiteContentBack = function(){

                if( _siteContentBack ){

                    if( _window.width() < 768 ){

                        _siteContent.css( {
                            backgroundImage: 'none'
                        } );

                    } else {

                        _siteContent.css( {
                            backgroundImage: 'url(' + _siteContentBack + ')'
                        } );

                    }
                }



            };

        //public properties

        //public methods


        _init();
    };

    var SendMail = function (obj) {

        var _obj = obj,
            _way = _obj.attr('data-way'),
            _input = _obj.find('input').val(),
            _objForm = _obj.find('.comming-soon__wrap'),
            _readyMsg = _obj.find('.comming-soon__ready');

        var _addEvents = function () {

                _obj.on({
                    'submit': function(){
                        $.ajax({
                            url: _way,
                            data: {
                                userMail: _input
                            },
                            dataType: 'json',
                            type: "get",
                            success: function (msg) {
                                _objForm.slideUp();
                                _readyMsg.css({ opacity: 1 });
                            },
                            error: function (XMLHttpRequest) {
                                if (XMLHttpRequest.statusText != "abort") {
                                    alert("ERROR!!!");
                                }
                            }
                        });
                        return false;
                    }
                });

            },

            _init = function () {
                _addEvents();
            };

        _init();
    };

    var SearchShow = function (obj) {

        var _self = this,
            _obj = obj,
            _input = _obj.find('.search-field'),
            _close = _obj.find('.search-close'),
            _window = $( window),
            _posX,
            _posY;

        var _addEvents = function () {

                _window.on({
                    load: function() {

                        _getPos();

                    },
                    resize: function() {

                        _getPos();

                        if( _window.width() >= 992 ) {
                            _hide();
                        }

                    }
                });
                _obj.on( {
                    'click': function() {

                        if( !_obj.hasClass( 'opened' ) ){

                            _obj.addClass( 'opened' );
                            _input.focus();
                            _setPos();

                        }

                    }
                } );
                _close.on( {
                    'click': function() {

                        _hide();

                        return false;
                    }
                } );
                _input.on( {
                    'focusout': function(){

                        //_hide();

                    }
                } );

                if( _window.width() >= 992 ) {

                    $( document ).on(
                        "click",
                        ".product-search-form",
                        function( event ) {

                            event = event || window.event;

                            if ( event.stopPropagation ) {
                                event.stopPropagation();
                            } else {
                                event.cancelBubble = true;
                            }

                        }
                    );

                    $( document ).on(
                        "click",
                        "body",
                        function() {

                            _hide();

                        }
                    );

                }

            },
            _setPos = function () {

                _obj.css( {
                    position: 'absolute',
                    right: _posX - 2,
                    top: _posY
                } );

                if( _window.width() >=992 ) {

                    $('.main-menu-container').css( {
                        'padding-left': _obj.outerWidth() + 4
                    } );

                }


            },
            _getPos = function () {

                _posX = _window.width() - ( _obj.position().left + _obj.width() );
                _posY = _obj.position().top;

            },
            _resetPos = function() {

                _obj.attr('style', '');

                $('.main-menu-container').css( {
                    'padding-left': 0
                } );

            },
            _hide = function() {

                if( _obj.hasClass( 'opened' ) ) {

                    _obj.removeClass( 'opened' );
                    _obj.removeClass( 'has-results' );
                    _input.val( '' );
                    $( '.search-results' ).remove();

                    setTimeout( function() {
                        _resetPos();
                    }, 300 );

                }

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();

            };

        _self.hide = function() {

            if( _obj.hasClass( 'opened' ) ) {

                _obj.removeClass( 'opened' );
                _obj.removeClass( 'has-results' );
                _input.val( '' );
                $( '.search-results' ).remove();

                setTimeout( function() {
                    _resetPos();
                }, 300 );

            }

        };

        _init();
    };

    var ProductFunctional = function (obj) {

        var _obj = obj,
            _elemColor = _obj.find('.product__color input'),
            _elemSize = _obj.find('.size-chart'),
            _elemGallery = _obj.find('.product__gallery'),
            _elemSubmit = _obj.find('.add-to-cart-btn'),
            _body = $('body'),
            _request = new XMLHttpRequest();

        var _addEvents = function () {

                _elemColor.on({
                    // TODO: cache templates to optimize server requests
                    change: function(){
                        var curElem = $(this),
                            parentElem = curElem.parents('.product__color'),
                            curPic = curElem.next().find('img');

                        parentElem.find('img').removeClass('add-to-cart-pic');
                        curPic.addClass('add-to-cart-pic');

                        _elemGallery.addClass('hide');

                        _elemGallery.find('.swiper-wrapper').remove();
                        _elemGallery.find('.product__pagination').remove();

                        _request.abort();

                        var sizeKey = $('.product__info-size').data('size-key');
                        ajaxCreateNewGallery(curElem, sizeKey, _addNewGallery);
                    }
                });

                _elemSubmit.on({
                    click: function(event){

                    }
                });

                _elemSize.on({
                    change: function(event) {
                        event.preventDefault();
                        _setAddToCartBtnID( _getSelectedProductID() );
                    }
                });

                _body.on('click', '.product__preview .swiper-slide', function(){
                    _previewClick($(this));
                });
                _body.on('click', '.product__pagination span', function(){

                    var curItem = $(this),
                        curItemIndex = curItem.index();

                    $('.product__preview .product__pagination span').removeClass('active');
                    curItem.addClass('active');
                    $('.product__preview').find('.swiper-slide').eq(curItemIndex).trigger('click');
                });

            },
            _setAddToCartBtnID = function(id) {
                // Update DOM
                _elemSubmit.attr('data-product-id', id);
                // Update the actual data value
                _elemSubmit.data('product-id', id);
            },
            _addBullet = function(){
                var wrapBullet = _obj.find('.product__pagination'),
                    countItems = $('.product__preview .swiper-slide').length;

                for(var i=1; i<=countItems;i++){
                    wrapBullet.append('<span>'+i+'</span>');
                }

            },
            _addNewGallery = function(response){
                _obj.find('.product__preview').append(response.gallery_html);
                new ProductGallery ( $('.product__preview') );
                _addBullet();

                if ( response.sizes_html ) {
                    _elemSize.html(response.sizes_html);
                    _elemSize[0].customSelect.update();
                }

                _setAddToCartBtnID( response.variation_id );

                setTimeout(function(){
                    _previewClick($('.product__preview .swiper-slide').eq(0));
                    _elemGallery.removeClass('hide');
                    productGallery.loadPhotos();
                }, 600);

            },
            _previewClick = function(curElem){
                var bigPic = _elemGallery.find('.product__gallery-pic'),
                    curHref = curElem.attr('data-href'),
                    curItemIndex = curElem.index();

                $('.product__preview .swiper-slide').removeClass('active');
                $('.product__preview .product__pagination span').removeClass('active');
                $('.product__preview').find('.product__pagination span').eq(curItemIndex).addClass('active');
                curElem.addClass('active');
                bigPic.css({'background-image': 'url(' + curHref + ')' });
            },
            _gelleryPreviewCreate = function(){

                $.each( _obj.find('.product__preview'), function(){
                    new ProductGallery ( $(this) );
                } );

                _addBullet();

            },
            _getSelectedProductID = function () {
                return parseInt( _elemSize.find('option:selected').val() );
            },
            _init = function () {
                _addEvents();
                _gelleryPreviewCreate();
                _previewClick(_obj.find('.product__preview .swiper-slide').eq(0));
            };

        _init();
    };

    var TableTabs = function (obj) {

        var _obj = obj,
            _radioBtn = $('.size-table__choice input:radio'),
            _tabsParent = $('.size-table__tabs '),
            _window = $(window);

        var _addEvents = function () {

                _radioBtn.on({
                    click: function(){

                        var curBtn = $(this),
                            curVal = curBtn.attr('id'),
                            curTab = _tabsParent.find('.'+curVal+'');

                        curTab.next('div').removeClass('active');
                        curTab.prev('div').removeClass('active');

                        curTab.addClass('active');
                    }
                });
            },

            _setActive = function () {

                var checkedRadio = $('.size-table__choice input:radio:checked'),
                    checkedVal = checkedRadio.attr('id'),
                    activeTab = _tabsParent.find('.'+checkedVal+'');

                activeTab.addClass('active');

            },

            _init = function () {
                _addEvents();
                _setActive();
            };

        _init();
    };

    var SubMenu = function (obj) {

        var _obj = obj,
            _objParent = _obj.parent(),
            _menuItem = $( '.menu-item' ),
            _window = $(window);

        var _addEvents = function () {

                _objParent.on({
                    mouseenter: function(){
                        if (_window.width()>992-17) {

                            _menuItem.removeClass( 'active' );

                            $('.sub-bg').addClass( 'active' );

                            $(this).addClass( 'active' );

                        }
                    }
                });

                _objParent.on({
                    mouseleave: function(){

                        if ( _window.width()>992-17 ) {

                            $( '.sub-bg' ).removeClass( 'active' );
                            _objParent.removeClass( 'active' );

                        }
                    }
                });

                _window.on({
                    resize: function(){

                        if (_window.width()>=992-17) {
                            _addBgElem();
                        }
                        //_displayObj();
                    }
                });

            },

            _addBgElem = function () {

                if(!$('.sub-bg').length){
                    $('.site').append('<span class="sub-bg"></span>');
                }

                var subBg = $('.sub-bg');

                if (_window.width()>=992-17) {
                    var docHeight = $(document).height();

                    subBg.css({
                        'height': docHeight
                    });

                }else{
                    subBg.css({
                        'height': 'auto'
                    })
                }
            },

            _displayObj = function (){

                //if (_window.width()>=992-17) {
                //
                //    setTimeout(function (){
                //        _obj.css({
                //            'display': 'block'
                //        })
                //    },300)
                //
                //}else{
                //
                //    _obj.css({
                //        'display': 'none'
                //    })
                //
                //}
            },

            _init = function () {
                _addEvents();
                _addBgElem();
                //_displayObj();
            };

        _init();
    };

    var UserMenu = function (obj) {

        var $context = obj;
        var userToggle;
        var dropdownList;

        function init() {
            userToggle = $context.find('.user-toggle');
            dropdownList = $context.find('.dropdown-list');

            addEvents();
        }

        function addEvents() {
            userToggle.on('click', function(e) {
                e.stopPropagation();

                userToggleClickHandler();
            });
        }

        function userToggleClickHandler() {
            location.href = userToggle.data('href');
        }

        init();
    };

    var SWSlider = function (obj) {

        var _obj = obj,
            _btnNext = _obj.parent().find(".swiper-button-next"),
            _btnPrev = _obj.parent().find(".swiper-button-prev"),
            _sw = null;

        var addEvents = function () {
                $(window).on({
                    resize: function () {
                        updateSwiper();
                    }
                });

                _btnNext.on({
                    click: function(){
                        if (document.all && !window.atob) {
                            var activeBullet = $(_obj).find(".swiper-pagination-bullet-active"),
                                activeBulletFirst = $(_obj).find(".swiper-pagination-bullet").eq(0);
                            if ( activeBullet.next().length ){
                                activeBullet.next().trigger("click");
                            } else {
                                activeBulletFirst.trigger("click");
                            }
                        }
                    }
                });

                _btnPrev.on({
                    click: function(){
                        if (document.all && !window.atob) {
                            var activeBullet = $(_obj).find(".swiper-pagination-bullet-active"),
                                activeBulletLast = $(_obj).find(".swiper-pagination-bullet").eq(-1);
                            if ( activeBullet.prev().length ){
                                activeBullet.prev().trigger("click");
                            } else {
                                activeBulletLast.trigger("click");
                            }
                        }
                    }
                });

            },
            createSwiper = function () {

                var perView = 5,
                    centeredSlides = false;

                if ($(window).width() < 1300 && $(window).width() > 768) {
                    perView = 4;
                } else if ($(window).width() <= 768 && $(window).width() > 480) {
                    perView = 3;
                    centeredSlides = true;
                } else if ($(window).width() < 480){
                    perView = 2;
                    centeredSlides = true;
                }

                var loopedSlides = perView*2;

                _sw = new Swiper(_obj, {
                    slidesPerView: perView,
                    centeredSlides: centeredSlides,
                    loop: true,
                    spaceBetween: 0,
                    autoplay:5000,
                    watchSlidesVisibility: true,
                    speed: 700,
                    paginationClickable: true,
                    nextButton: _btnNext,
                    prevButton: _btnPrev,
                    autoplayDisableOnInteraction:false,
                    loopedSlides: loopedSlides
                });
            },
            updateSwiper = function () {
                _sw.params.slidesPerView = 5;
                _sw.params.centeredSlides = false;
                if ($(window).width() < 1300 && $(window).width() > 768) {
                    _sw.params.slidesPerView = 4;
                } else if ($(window).width() <= 768 && $(window).width() > 480) {
                    _sw.params.slidesPerView = 3;
                    _sw.params.centeredSlides = true;
                } else if ($(window).width() < 480){
                    _sw.params.slidesPerView = 2;
                    _sw.params.centeredSlides = true;
                }

                _sw.params.loopedSlides = _sw.params.slidesPerView*2;
            },
            init = function () {
                addEvents();
                createSwiper();
                updateSwiper();
            };

        init();
    };

    var Menu = function (obj) {

        var MENU_OPENED_CLASS = 'menu_opened';

        var _obj = obj,
            _body = $('body'),
            _html = $('html'),
            _window = $(window),
            _site = $('.site'),
            _elementsToMove = $('.site > *'),
            _hamburger = $('.hamburger'),
            _isMove = false,
            _panRight = false,
            _panLeft = false,
            _menuHammer = null,
            _opened = false,
            _scroll;

        var _addEvents = function () {
                _hamburger.on({
                    click: function(){
                        if(_opened){
                            _hide();
                        } else {
                            _show();
                            new  SearchShow( $( ".product-search-form" ) ).hide();
                        }
                        return false;
                    }
                });
                $('.main-menu .menu-item').on('click', function (e) {
                    if ( _window.width() < 992 ) {
                        _menuItemClickHandler(e, $(this));
                    }
                });
                _body.click(function(e){
                    var elem = $(e.target);

                    if( !elem.hasClass('menu') && !elem.parents('.menu').length ) {

                        if(_opened) {
                            _hide();
                        }
                    }
                });
                _window.on({
                    resize: function(){
                        _setSubMenuHeight();
                        _setMenuHeight();
                        if (_window.width()>=992) {
                            _hide();
                        }
                    }
                });
                _menuHammer.on("panstart", function(e){
                    if(e.pointerType == 'touch') {
                        _moveMenu(e.pointers[0].pageX,e.deltaX, e.type);
                    }
                });
                _menuHammer.on("panend", function(e){
                    if(e.pointerType == 'touch') {
                        _moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _menuHammer.on("panright", function(e){
                    if(e.pointerType == 'touch') {
                        _moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _menuHammer.on("panleft", function(e){
                    if(e.pointerType == 'touch') {
                        _moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
            },
            _wrap = function() {
                var wrapBlock = $( '<div class="wrap-menu-items"></div>');

                _obj.wrapInner( wrapBlock );
            },
            _addBgElem = function () {

                if(!$('.menu-bg').length){
                    $('.site').append('<span class="menu-bg"></span>');
                }

                var menuBg = $('.menu-bg');

                if (_window.width()<=992-17) {
                    var docHeight = $(document).height();

                    menuBg.css({
                        'height': docHeight
                    });

                }else{
                    menuBg.css({
                        'height': 'auto'
                    })
                }
            },
            _menuItemClickHandler = function( event, clickedMenuItem ) {
                event.stopPropagation();

                if (clickedMenuItem.hasClass('menu-item-has-children')) {
                    event.preventDefault();

                    clickedMenuItem.toggleClass('active');
                    clickedMenuItem
                        .find('.sub-menu')
                        .first()
                        .toggleClass('active');
                }


                if( $( '.main-menu' ).find('.menu-item.active').length ) {

                    $( '.header-user-section' ).addClass( 'hide' );

                } else {
                    $( '.header-user-section' ).removeClass( 'hide' );
                }
            },
            _moveMenu = function( touchPosX, deltaX, type ){

                if( type == 'panstart' && (touchPosX < 50 || _opened)){
                    _isMove = true;
                } else if ( type == 'panright' && _isMove){
                    _panRight = true;
                } else if ( type == 'panleft' && _isMove){
                    _panLeft = true;
                } else if( type == 'panend'){
                    if(_isMove && _panRight && !_opened){
                        _show();
                    } else if(_isMove && _panLeft && _opened){
                        _hide();
                    }
                    _isMove = false;
                    _panRight = false;
                    _panLeft = false;
                }

            },
            _hide = function(){
                _opened = false;
                _elementsToMove.removeClass(MENU_OPENED_CLASS);
                //$('.menu__item-sub').removeClass('active');
                //$('.menu__item-sub').find('.menu__sub').slideUp();
                $('.menu-bg').removeClass('active');
                _html.css( {
                    'overflow-y': 'scroll'
                } );
                _body.css( {
                    'overflow-y': 'visible'
                } );
            },
            _show = function(){
                _opened = true;
                _elementsToMove.addClass(MENU_OPENED_CLASS);
                $('.menu-bg').addClass('active');
                _html.css( {
                    'overflow-y': 'hidden'
                } );
                _body.css( {
                    'overflow-y': 'hidden'
                } );
            },
            _setMenuHeight = function () {
                var menuHeight = _window.height() - parseInt( _obj.css( 'top') );

                if ( _window.width() < 975 ) {
                    _obj.css( {
                        'height': menuHeight
                    } );
                } else {
                    _obj.css( {
                        'height': 'auto'
                    } );
                }
            },
            _setSubMenuHeight = function () {
                var subMenuHeight = $( '.wrap-menu-items' ).innerHeight();

                if ( _window.width() < 975 ) {

                    _obj.find('.sub-menu').css( {
                        'height': subMenuHeight
                    } );

                } else {
                    _obj.find('.sub-menu').css( {
                        'height': 'auto'
                    } );
                }
            },
            _initHammer = function(){
                _menuHammer = new Hammer.Manager($('body')[0]);
                _menuHammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }) );
            },
            _init = function () {
                _addBgElem();
                _initHammer();
                _wrap();
                _addEvents();
                _setSubMenuHeight();
                _setMenuHeight();
            };

        //public properties

        //public methods
        _init();
    };

    var Tabs = function (obj) {

        var _obj = obj,
            _window = $(window),
            _body = $("body"),
            _head = _obj.find('.tabs__controls-main'),
            _tabBtn = _obj.find('.tabs__controls-line'),
            _tabBtnInner = _tabBtn.find('.tabs__controls-item'),
            _tabContent = _obj.find('.tabs__wrapper'),
            _controls = _obj.find('.tabs__controls-wrap'),
            _tabContentItem = _tabContent.find('.tabs__layout');

        var _addEvents = function () {

                _window.on({
                    'load': function(){
                        _showContentWhenLoading();
                    }
                });

                _tabBtnInner.on({
                    mousedown: function(){
                        _tabContent.css({
                            'height': _tabContent.innerHeight()
                        }, 300);
                    },
                    mouseup: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        var activeContent = _tabContentItem.eq(index),
                            activeContentHeight = activeContent.innerHeight();
                        _tabContent.animate({
                            'height': activeContentHeight
                        }, 300);
                        setTimeout(function(){
                            _tabContent.css({
                                "height": ""
                            });
                        },400)
                    },
                    click: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        _tabBtn.removeClass("active");
                        _tabBtn.eq(index).addClass("active");
                        _showContent(index);
                        _changeText(curItem);
                        _controls.removeClass("active");
                    }
                });

                _head.on({
                    click: function(event){
                        _showControls();
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                _body.on({
                    click: function(){
                        _controls.removeClass("active");
                    }
                });

            },
            _showContentWhenLoading = function(){
                var index = _tabBtn.filter('.active').index();
                if ( index == "-1" ){
                    index = 0;
                    _tabBtn.eq(index).addClass("active");
                }
                _showContent(index);
                var curElem = _tabBtn.eq(index).find(".tabs__controls-item");
                _changeText(curElem);
            },
            _showContent = function(i){
                var activeContent = _tabContentItem.eq(i);
                _tabContentItem.css({
                    "display": "none"
                });
                activeContent.css({
                    "display": "block"
                });
            },
            _showControls = function(){
                if ( _controls.hasClass("active") ){
                    _controls.removeClass("active");
                    return false;
                } else {
                    _controls.addClass("active");
                }
            },
            _changeText = function(curItem){
                var txt = curItem.text();
                _head.html("");
                _head.text(txt);
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var Accord = function (obj) {

        var _obj = obj,
            _header = _obj.find(".accord__header");

        var _addEvents = function () {

                _header.on({
                    click: function(){
                        var parentBlock = $(this).closest('.accord__item');
                        if( $(this).next().css('display') == 'none'){
                            $(this).next().slideDown(300);
                            parentBlock.addClass('active');
                        }
                        else{$(this).next().slideUp(300);
                            parentBlock.removeClass('active');
                        }
                    }
                });

            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var Gallery = function (obj) {

        var _obj = obj,
            _btnNextParent = $(_obj).parents(".products-gallery"),
            _btnNext = _btnNextParent.find(".swiper-button-next"),
            _btnPrevParent = $(_obj).parents(".products-gallery"),
            _btnPrev = _btnPrevParent.find(".swiper-button-prev"),
            _sw = null,
            _loopedSlides = null;

        var addEvents = function () {
                $(window).on({
                    resize: function () {
                        updateSwiper();
                    }
                });

                //_btnNext.on({
                //    click: function(){
                //        if (document.all && !window.atob) {
                //            var activeBullet = $(_obj).find(".swiper-pagination-bullet-active"),
                //                activeBulletFirst = $(_obj).find(".swiper-pagination-bullet").eq(0);
                //            if ( activeBullet.next().length ){
                //                activeBullet.next().trigger("click");
                //            } else {
                //                activeBulletFirst.trigger("click");
                //            }
                //        }
                //    }
                //});
                //
                //_btnPrev.on({
                //    click: function(){
                //        if (document.all && !window.atob) {
                //            var activeBullet = $(_obj).find(".swiper-pagination-bullet-active"),
                //                activeBulletLast = $(_obj).find(".swiper-pagination-bullet").eq(-1);
                //            if ( activeBullet.prev().length ){
                //                activeBullet.prev().trigger("click");
                //            } else {
                //                activeBulletLast.trigger("click");
                //            }
                //        }
                //    }
                //});

            },
            createSwiper = function () {
                if ( _obj.parents(".products-gallery_1").length ) {
                    var perView = 3;
                    if ($(window).width() < 991) {
                        perView = 2;
                    }
                } else  if ( _obj.parents(".activities-gallery") ){
                    var perView = 4,
                        centerSlides = true;
                    if ($(window).width() < 991) {
                        perView = "auto";
                        centerSlides = false;
                    }
                } else {
                    var perView = 4,
                        space = 60;
                    if ($(window).width()  < 991 && $(window).width() > 768) {
                        perView = 3;
                        space = 0;
                    } else if ($(window).width() <= 768) {
                        perView = 2;
                        space = 0;
                    }
                }

                if ( _obj.parents(".activities-gallery") ){
                    _sw = new Swiper(_obj, {
                        slidesPerView: perView,
                        spaceBetween: 5,
                        autoplay:5000,
                        loop:true,
                        watchSlidesVisibility: true,
                        speed: 700,
                        paginationClickable: true,
                        nextButton: ".activities-gallery-next",
                        prevButton: ".activities-gallery-prev",
                        centeredSlides: centerSlides,
                        loopedSlides: _loopedSlides,
                        autoplayDisableOnInteraction:false
                    });
                } else  {
                    _sw = new Swiper(_obj, {
                        slidesPerView: perView,
                        autoplay:5000,
                        loop:true,
                        watchSlidesVisibility: true,
                        speed: 700,
                        paginationClickable: true,
                        nextButton: _btnNext,
                        prevButton: _btnPrev,
                        spaceBetween: space,
                        autoplayDisableOnInteraction:false
                    });
                }

            },
            calculateLoopedSlides = function(){
                if ( _obj.parents(".activities-gallery") ){
                    _loopedSlides = (_obj.find(".swiper-slide").length)*2;
                }
            },
            updateSwiper = function () {
                if ( _obj.parents(".products-gallery_1").length ) {
                    _sw.params.slidesPerView = 3;
                    if ($(window).width() < 991) {
                        _sw.params.slidesPerView = 2;
                    }
                    return false;
                } else  if ( _obj.parents(".activities-gallery") ){
                    _sw.params.slidesPerView = 4;
                    _sw.params.centeredSlides = true;
                    if ($(window).width() < 991) {
                        _sw.params.slidesPerView = "auto";
                        _sw.params.centeredSlides = false;
                    }
                } else {
                    _sw.params.slidesPerView = 4;
                    _sw.params.spaceBetween = 60;
                    if ($(window).width() < 991 && $(window).width() > 768) {
                        _sw.params.slidesPerView = 3;
                        _sw.params.spaceBetween = 0;
                    } else if ($(window).width() <= 768) {
                        _sw.params.slidesPerView = 2;
                        _sw.params.spaceBetween = 0;
                    }
                }

            },
            init = function () {
                createSwiper();
                calculateLoopedSlides();
                addEvents();
            };

        init();

    };

    var Products_Gallery = function (obj) {

        var _obj = obj,
            _slider = _obj.find('.swiper-container'),
            _kolSlides = _obj.find(".swiper-slide").length,
            _btnNext = _obj.find(".swiper-button-next"),
            _btnPrev = _obj.find(".swiper-button-prev"),
            _sw = null;

        var addEvents = function () {
                $(window).on({
                    resize: function () {
                        if (_kolSlides > 2) {
                            updateSwiper();
                        }
                    }
                });

            },
            createSwiper = function () {
                var perView = 4,
                    space = 60;

                if (_obj.hasClass('with-side-title')) {
                    perView = 3;
                }

                if ($(window).width()  < 991 && $(window).width() > 768) {
                    perView = 3;
                    space = 0;
                } else if ($(window).width() <= 768 && $(window).width() > 480) {
                    perView = 2;
                    space = 0;
                } else if ($(window).width() <= 480) {
                    perView = 1;
                    space = 0;
                }

                if (_kolSlides <= 2) {

                    if (_kolSlides < perView) {
                        perView = _kolSlides;
                    }
                    _sw = new Swiper(_slider, {
                        slidesPerView: perView,
                        spaceBetween: space
                    });
                    _btnPrev.css({ display: 'none'});
                    _btnNext.css({ display: 'none'});
                } else {
                    _sw = new Swiper(_slider, {
                        slidesPerView: perView,
                        autoplay:5000,
                        loop:true,
                        watchSlidesVisibility: true,
                        speed: 700,
                        paginationClickable: true,
                        nextButton: _btnNext,
                        prevButton: _btnPrev,
                        spaceBetween: space,
                        autoplayDisableOnInteraction:false
                    });
                }

            },
            updateSwiper = function () {
                _sw.params.slidesPerView = 4;
                _sw.params.spaceBetween = 60;

                if (_obj.hasClass('with-side-title')) {
                    _sw.params.slidesPerView = 3;
                }

                if ($(window).width() < 991 && $(window).width() > 768) {
                    _sw.params.slidesPerView = 3;
                    _sw.params.spaceBetween = 0;
                } else if ($(window).width() <= 768 && $(window).width() > 480) {
                    _sw.params.slidesPerView = 2;
                    _sw.params.spaceBetween = 0;
                } else if ($(window).width() <= 480) {
                    _sw.params.slidesPerView = 1;
                    _sw.params.spaceBetween = 0;
                }

            },
            init = function () {
                createSwiper();
                addEvents();
            };

        init();

    };

    var ProductGallery = function (obj) {

        var _obj = obj;

        var addEvents = function () {

            },
            create = function () {

                var swiper = new Swiper(_obj, {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    mousewheelControl: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    updateOnImagesReady:true
                });

            },
            init = function () {
                addEvents();
                create();
            };

        init();
    };

    var ProductGalleryPopup = function (obj) {

        //private properties
        var _self = this,
            _showBtn = $('.product__gallery-pic'),
            _imagesContainer = $('.product__preview'),
            _filterContainer = $('.product__color'),
            _obj = obj,
            _photos = [],
            _previews = [],
            _photosCount = 0,
            _perviewElemCount = _filterContainer.find('.product__color-elem').length,
            _duration = 0.5,
            _visible = 4,
            _activeIndex = 0,
            _tl = null,
            _filterIndex = 0,
            _previewContainers = null,
            _photoContainers = null,
            _arrData = [
                {
                    x: -73,
                    scale: 1.1,
                    opacity: 0,
                    z: 5
                },
                {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    z: 4
                },
                {
                    x: 73,
                    scale: 0.9,
                    opacity: 1,
                    z: 3
                },
                {
                    x: 142,
                    scale: 0.8,
                    opacity: 1,
                    z: 2
                },
                {
                    x: 207,
                    scale: 0.7,
                    opacity: 0,
                    z: 1
                }
            ],
            _btnPrev = null,
            _btnNext = null;

        //private methods
        var _addControls = function(){
                var wrapper = $('.product-gallery__photos');

                _btnPrev = $('<div class="product-gallery__arrow product-gallery__arrow_prev">');
                _btnNext = $('<div class="product-gallery__arrow product-gallery__arrow_next">');

                wrapper.append( _btnNext );
                wrapper.append( _btnPrev );
            },
            _addEvents = function () {
                _showBtn.on({
                    click: function(){
                        _buildGallery();
                    }
                });
            },
            _addGalleryEvents = function(){
                _photoContainers.on( {
                    click: function (){
                        var index = $( this ).index() - _photosCount;

                        _slideTo( index );
                    }
                } );
                _btnPrev.on({
                    click: function(){
                        _slideTo( _activeIndex - 1 );
                    }
                });
                _btnNext.on({
                    click: function(){
                        _slideTo( _activeIndex + 1 );
                    }
                });
            },
            _buildGallery = function(){
                _clearGallery();
                _findImages();
                _createPreviews();
                _createPhotos();
                _createTimeLine();
                _addControls();
                _addGalleryEvents();
            },
            _clearGallery = function(){
                _obj.html('');
            },
            _createPhotos = function(){
                $('.product-gallery__photos').remove();

                var stringHtml = '<div class="product-gallery__photos">',
                    clone = null,
                    wraper = null,
                    i = 0,
                    counter = 0;

                for( i; i < _photosCount; i++ ){
                    stringHtml += '<div class="product-gallery__photo"><span></span></div>';
                }

                stringHtml += '</div>';

                _obj.prepend( stringHtml );

                wraper = _obj.find( '.product-gallery__photos' );

                _photoContainers = _obj.find( '.product-gallery__photo' );

                clone = _photoContainers.clone();

                clone.addClass('product-gallery__photo_cloned');
                wraper.append( clone.clone() );
                wraper.append( clone.clone() );
                wraper.prepend( clone.clone() );

                _photoContainers = _obj.find( '.product-gallery__photo' );

                _photoContainers.each( function(){
                    if (counter == _photosCount ){
                        counter = 0;
                    }

                    _loadImage( $( this ).find( 'span' ), _photos[ counter++ ] );
                } );

            },
            _createPreviews = function(){

                var stringHtml = '<div class="product-gallery__previews"><ul>',
                    i = 0;

                for( i; i < _perviewElemCount; i++ ){
                    stringHtml += '<li class="product-gallery__preview"><span></span></li>';
                }

                stringHtml += '</ul></div>';

                _obj.append( stringHtml );

                _previewContainers = _obj.find( '.product-gallery__preview' );

                _previewContainers.each( function( i ){
                    _loadImage( $( this ).find( 'span' ), _previews[ i ] );
                } );

                _previewContainers.eq( _filterIndex ).addClass( 'active' );

                $( '.product-gallery__previews').getNiceScroll().resize();

                _previewContainers.on({
                    click: function(){
                        var curPreview = $( this ),
                            container = $('.product-gallery__photos'),
                            index = 0,
                            inputs = _filterContainer.find( 'input' );

                        if( !curPreview.hasClass( 'active' ) ){
                            _previewContainers.removeClass( 'active' );
                            curPreview.addClass( 'active' );
                            index = _previewContainers.index( curPreview );

                            inputs.each( function( i ){
                                if( i == index ){
                                    this.checked = true;
                                } else {
                                    this.checked = false;
                                }
                            } );
                            inputs.eq( index ).trigger( 'change' );
                            container.addClass('loading');
                        }
                    }
                });

            },
            _createTimeLine = function(){
                var curItem = null,
                    j = 0;

                _activeIndex = 0;

                _tl = new TimelineMax({ paused: true });

                _photoContainers.each( function(i){
                    curItem = $( this );

                    var from = i - _visible + 1,
                        to = i,
                        curDuration = 0;

                    if(from<0){
                        from = 0
                    }

                    curDuration = to - from + 1;

                    _tl.insert( new TweenMax.fromTo( curItem[ 0 ], from * _duration, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 0,
                        ease: Linear.easeNone
                    } ),0 );

                    _tl.insert( new TweenMax.fromTo( curItem[ 0 ], _duration, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Linear.easeNone
                    } ),from * _duration );

                    _tl.insert( new TweenMax.fromTo( curItem[ 0 ], _duration, {
                        autoAlpha: 1
                    }, {
                        autoAlpha: 0,
                        ease: Linear.easeNone
                    } ),to * _duration );


                    _tl.insert( new TweenMax.fromTo( curItem[ 0 ], curDuration * _duration, {
                        scale: _arrData[ curDuration ].scale,
                        transformOrigin:"center center"
                    }, {
                        scale: _arrData[ 0 ].scale,
                        ease: Linear.easeNone
                    } ),from * _duration );


                    _tl.insert( new TweenMax.fromTo( curItem, curDuration * _duration, {
                        css: {
                            x: _arrData[ curDuration ].x,
                            zIndex: _photoContainers.length - i
                        }
                    }, {
                        css: {
                            x: _arrData[ 0 ].x,
                            zIndex: _photoContainers.length - i
                        },
                        ease: Linear.easeNone
                    } ), from * _duration);


                } );

                var t = (_photosCount + _activeIndex) * _duration;

                _photoContainers.eq( _photosCount + _activeIndex ).addClass('active');

                _tl.time(t-0.01);
                _tl.tweenTo(t);
            },
            _findImages = function(){
                var containers = _imagesContainer.find( '.swiper-slide' ),
                    currentContainer = null;

                _photosCount = containers.length;

                _filterContainer.find( 'img').each( function(){
                    _previews[ _previews.length ] = $( this ).attr( 'src' );
                } );

                _filterIndex = _filterContainer.find( 'input' ).index( _filterContainer.find( 'input:checked' ) );

                containers.each( function(){
                    currentContainer = $(this);

                    _photos[ _photos.length ] = currentContainer.data( 'href' );



                } );
            },
            _init = function () {
                _addEvents();
                _obj[0].productGallery = _self;
            },
            _loadImage = function( block, src ){
                var image = $( new Image() );

                image.on( {
                    load: function(){
                        block.css( {
                            backgroundImage: 'url(' + src + ')',
                            backgroundSize: 'contain'
                        } );
                    }
                } );

                image.attr({
                    src: src
                });
            },
            _loadPhotos = function(){
                _photos = [];
                _findImages();
                _createPhotos();
                _createTimeLine();
                _addControls();
                _addGalleryEvents();
            },
            _slideTo = function( index ){
                var newIndex =  index;

                if( newIndex < 0 ){
                    newIndex = _photosCount - 1;
                }
                if ( newIndex >= _photosCount ){
                    newIndex = newIndex - _photosCount;
                }

                _tl.tweenTo( ( (index + _photosCount) * _duration ),{
                    onComplete: function(){
                        _tl.time( ( _photosCount + newIndex ) * _duration );
                        _photoContainers.removeClass('active');
                        _photoContainers.eq( _photosCount + newIndex ).addClass('active');
                        _activeIndex = newIndex;
                    }
                } );
            };

        //public properties

        //public methods
        _self.loadPhotos = function(){
            _loadPhotos();
        };


        _init();
    };

    var Locator = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _dropDown = _obj.find('.locator__dropdown'),
            _branches = _dropDown.find('.locator__branch'),
            _nextElem = _branches.next(),
            _styles = [
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {color: '#ffffff'}
                ]
            }, {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [
                    {color: '#9cd8e7'}
                ]
            },{
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [
                    {color: '#e9e9e9'}
                ]
            },{
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [
                    {color: '#e9e9e9'}
                ]
            },{
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                    {color: '#a8a8a8'}
                ]
            }, {
                featureType: 'poi',
                elementType: 'geometry.fill',
                stylers: [
                    {color: '#b8d7c2'}
                ]
            }
            ],
            _styledMap = new google.maps.StyledMapType(_styles, {name: "Styled Map"}),
            _map,
            _markers = [],
            _coord = [],
            _center = _branches.eq(0).attr('data-coord').split(', '),
            _delta = 0.5,
            _startZoom = 9,
            _markerZoom = 15,
            _image = new google.maps.MarkerImage(theme_data.theme_dir + '/img/locator_pin.png'),
            _window = $( window );

        //private methods
        var _addEvents = function () {
                _branches.on({
                    'click':function(){
                        var curElem = $(this);

                        if (curElem.hasClass('active')) {
                            _hide(curElem);
                            _showAllMarkers();
                        } else {
                            _show(curElem);
                            _clearAllMarkers();
                            _showMarkers(_branches.index(curElem));
                        }

                    }
                })

            },
             _addMarker = function(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: _map,
                    icon: _image
                });

                _markers.push(marker);
             },

             _setMapOnAll = function(map) {
                for (var i = 0; i < _markers.length; i++) {
                    _markers[i].setMap(map);
                }
             },

            _showAllMarkers = function() {
                _setMapOnAll(_map);
                _map.panTo({lat: parseFloat(_center[0]), lng: parseFloat(_center[1]) + _delta});
                _map.setZoom(_startZoom);
            },

            _showMarkers = function(i) {
                _markers[i].setMap(_map);

                if ( _window.width() < 1024 ){
                    _map.panTo({lat: _markers[i].getPosition().lat(), lng: _markers[i].getPosition().lng()});
                } else {
                    _map.panTo({lat: _markers[i].getPosition().lat(), lng: _markers[i].getPosition().lng() + 0.01});
                }

                _map.setZoom(_markerZoom);
            },

            _clearAllMarkers = function() {
                _setMapOnAll(null);
            },
            _initMap = function() {

                _map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: parseFloat(_center[0]), lng: parseFloat(_center[1]) + _delta},
                    zoom: _startZoom,
                    disableDefaultUI: true,
                    zoomControl: true,
                    scrollwheel: false
                });

                _map.mapTypes.set('map_style', _styledMap);
                _map.setMapTypeId('map_style');

                $.each(_branches, function (i) {
                    _coord[i] = $(this).attr('data-coord').split(', ');
                    _addMarker({lat: parseFloat(_coord[i][0]), lng: parseFloat(_coord[i][1])});
                });

            },
            _checkInit = function(){
                $.each(_branches, function(){
                    var curElem = $(this),
                        curElemNext = curElem.next();

                    if (!curElem.hasClass('active')) {
                        curElemNext.css({ display: 'none' });
                    }
                })
            },
            _init = function () {
                obj[0].shablon = self;
                _addEvents();
                _checkInit();
                _initMap();

            },
            _hide = function(elem){
                elem.removeClass('active');
                elem.next().slideUp();
            },
            _show = function(elem){
                _branches.removeClass('active');
                _nextElem.slideUp();
                elem.addClass('active');
                elem.next().slideDown();
            };

        _init();
    };

    var CartMenu = function (obj) {

        var _self = this,
            _obj = obj,
            _btn = $(".site__header-cart"),
            _body = $("body"),
            _slider = _obj.find('.swiper-container'),
            _btnNext = _obj.find(".swiper-button-next"),
            _btnPrev = _obj.find(".swiper-button-prev"),
            _btnAddElem = $('.add-to-cart-btn'),
            _cartAmount = $('.site__header-cart-amount, .cart-contents-count .count'),
            _sw = null,
            _removeCartMenuElem,
            _kolElemRemove,
            _cartSubTotal = _obj.find('.cart-menu__total .amount');


        var _addEvents = function () {
                $(window).on({
                    resize: function () {
                        updateSwiper();
                    }
                });

                _btn.on({
                    click: function(){

                        _obj.toggleClass("active");
                        return false;
                    }
                });

                _obj.on({
                    click: function(event){
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                _body.on({
                    click: function(){
                        _obj.removeClass("active");
                    }
                });

                _btnAddElem.on({
                    click: function(e){
                        e.preventDefault();

                        var curElem = $(this),
                            curParent = curElem.parents('.product');

                        if (curParent.length) {
                            var sizeElem = curParent.find('.size-chart');

                            if (sizeElem.length && sizeElem[0].customSelect.required()) {
                                return false;
                            }
                        }

                        if (allowAdd) {
                            allowAdd = false;
                            curElem.addClass('loaded');
                            ajaxAddToCart(curElem, addToCartCB);

                            _obj.removeClass('cart-menu_empty');
                        }
                    }
                });

                _obj.on('click', '.cart-menu__del', function(e){
                    var curElem = $(this);
                    _kolElemRemove = curElem.parent().find('.quantity-value').text();

                    e.preventDefault();
                    _removeCartMenuElem = curElem.parents('.swiper-slide');

                    ajaxRemoveFromCart($(this), removeFromCartCB);
                });

            },
            addToCartCB = function (response) {

                if (response.success) {
                    // Add to cart succeeded...
                    AddToCartAnimation(_btnAddElem, response.cartItem.quantity);
                    _btnAddElem.removeClass('loaded');

                    updateCartContentsCount( getCartContentsCount() + 1 );

                    _cartSubTotal.html(response.cartSubtotal);

                    var cartItem,
                        cartItemFlag = false;

                    $.each($('.cart-menu__del'), function(){
                        var curElem = $(this);
                        if (response.cartItemKey == curElem.attr('data-cart-item-key')) {
                            cartItem = curElem.parents('.swiper-slide');
                            cartItemFlag = true;
                        }
                    });

                    if (cartItemFlag) {
                        cartItem.find('.quantity-value').text( response.cartItem.quantity );

                    } else {
                        _sw.prependSlide('<div class="swiper-slide">' +
                        '<button class="cart-menu__del" data-cart-item-key="' + response.cartItemKey + '">הסרה</button>' +
                        '<a href="#" class="cart-menu__pic">' + response.productInfo.image + '</a>' +
                        '<div class="cart-menu__info">' +
                        '<div class="cart-menu__info-column column-title">' +
                        response.productInfo.name +
                        response.productInfo.attrs + '</div>' +
                        '<div class="cart-menu__info-column column-price quanty-price">' +
                        response.productInfo.quantity +
                        response.productInfo.price +
                        '</div></div></div>');
                    }
                }
                else if (response.notice.error) {
                    popup.core.alert(response.notice.error);
                }

                allowAdd = true;
                _btnAddElem.removeClass('loaded');
            },
            removeFromCartCB = function (response) {

                if (response.success) {
                    // Remove from cart succeeded...
                    updateCartContentsCount( getCartContentsCount() - _kolElemRemove );

                    _cartSubTotal.html(response.cartSubtotal);

                    if (getCartContentsCount() < 1) {
                        _obj.addClass('cart-menu_empty');
                    }
                    _removeCartMenuElem.addClass('delete-product');

                    setTimeout(function(){
                        _sw.removeSlide(_removeCartMenuElem.index());
                    }, 300);

                    allowAdd = true;
                }
                else {
                    // Remove from cart failed...
                    popup.core.alert(response.error);
                }

            },
            getCartContentsCount = function() {
                return parseInt(_cartAmount.eq(0).text());
            },
            updateCartContentsCount = function( count ) {
                _cartAmount.each(function(index, element) {
                    $(element).text(count);
                });
            },
            createSwiper = function () {

                var perView = 5;
                if ($(window).width() < 1500 && $(window).width() > 1299) {
                    perView = 4;
                } else if ($(window).width() < 1300 && $(window).width() > 1099) {
                    perView = 3;
                } else if ($(window).width() <1100 && $(window).width() > 480) {
                    perView = 2;
                }else if ($(window).width() < 480){
                    perView = 1;
                }

                _sw = new Swiper(_slider, {
                    slidesPerView: perView,
                    nextButton: _btnNext,
                    prevButton: _btnPrev,
                    spaceBetween: 0
                });

            },
            updateSwiper = function () {
                _sw.params.slidesPerView = 5;
                if ($(window).width() < 1500 && $(window).width() > 1299) {
                    _sw.params.slidesPerView = 4;
                } else if ($(window).width() < 1300 && $(window).width() > 1099) {
                    _sw.params.slidesPerView = 3;
                } else if ($(window).width() < 1100 && $(window).width() > 480) {
                    _sw.params.slidesPerView = 2;
                }else if ($(window).width() < 480) {
                    _sw.params.slidesPerView = 1;
                }

            },
            _init = function () {

                _obj[0].cartMenu = _self;

                if (getCartContentsCount() < 1) {
                    _obj.addClass('cart-menu_empty');
                }

                createSwiper();
                _addEvents();
            };

        _self.text = function(elem) {
            console.log(elem)
        };

        _init();
    };

    var UserCart = function (obj) {

        var _self = this,
            _obj = obj,
            _btnDel = _obj.find('.remove-product-btn'),
            _removeCartElem,
            _processingAside = $('.processing__aside'),
            _couponInput = _processingAside.find('#coupon_code'),
            _sendCouponBtn  = _processingAside.find('.coupon-submit');

        var _addEvents = function () {

                _obj.on({
                    click: function(event){
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                _btnDel.on({
                    click: function(e){
                        var curElem = $(this);

                        $('.cart-menu')[0].cartMenu.text('remove element');

                        e.preventDefault();
                        _removeCartElem = curElem.parents('.product-item');

                        ajaxRemoveFromCart(curElem, removeFromCartCB);
                    }
                });

                _couponInput.on({
                    keypress: function(e){
                        if(e.keyCode == 13) {
                            e.preventDefault(); // prevent cart remove events
                            _sendCouponBtn.trigger('click');
                        }
                    }
                });

            },
            removeFromCartCB = function (response) {

                if (response.success) {
                    // Remove from cart succeeded...

                    _processingAside.html(response.totalBox);

                    _removeCartElem.addClass('delete-product');

                    setTimeout(function(){
                        _removeCartElem.remove();
                        if (!_obj.find('.product-item').length) window.location.reload();
                    }, 400);
                    window.location.reload();
                }
                else {
                    // Remove from cart failed...
                    popup.core.alert(response.error);
                }

            },
            _init = function () {

                _obj[0].userCart = _self;

                _addEvents();
            };

        _self.text = function(elem) {
            console.log(elem)
        };

        _init();
    };

    var TooltipNoSize = function (obj) {

        var _obj = obj,
            _tooltipNoSize = $(".product__info-tooltip_no-size"),
            _body = $("body");

        var _addEvents = function () {

                _tooltipNoSize.on({
                    click: function(event){
                        $(this).toggleClass("active");
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                _body.on({
                    click: function(){
                        _tooltipNoSize.removeClass("active");
                    }
                });

            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var OrderPopup = function (obj) {

        var _obj = obj,
            _popupOrder = $('.order'),
            _scroll,
            _request = new XMLHttpRequest();


        var _addEvents = function () {

                _obj.on({
                    'click': function(){
                        _popupOrder.css({display:'none'});
                        _popupOrder.find('.popup__order-content').remove();


                        _request.abort();

                        _request = $.ajax({
                            url: _popupOrder.attr('data-action'),
                            data: {
                                popupId: _obj.attr('data-id-popup')
                            },
                            dataType: 'json',
                            type: "get",
                            success: function (m) {

                                _popupOrder.append(m.html);

                                setTimeout(function(){
                                    _addScroll();
                                },200);

                                setTimeout(function(){
                                    _popupOrder.css({display:'block'});
                                    _centerWrap();
                                },500);

                                setTimeout(function(){
                                    $('.popup').getNiceScroll().resize();
                                    $(document).find('.order .popup__scroll').getNiceScroll().resize();
                                },1000);

                            },
                            error: function (XMLHttpRequest) {
                                if (XMLHttpRequest.statusText != "abort") {
                                    alert("ERROR!!!");
                                }
                            }
                        });
                    }
                });

            },
            _addScroll = function(){

                $(document).find('.order .popup__scroll').niceScroll( {
                    cursorcolor:"#e8e8ed",
                    cursoropacitymin: "1",
                    cursorborderradius: "6px",
                    cursorwidth: "5px",
                    cursorborder: false,
                    horizrailenabled:false,
                    railpadding: {
                        top:0,
                        right: 7,
                        left:0,
                        bottom:0
                    }
                } );
            },
            _centerWrap = function(){
                if ( $(window).height() - 80 - $('.popup__wrap').height() > 0 ) {
                    $('.popup__wrap').css({top: ( ( $(window).height() -80 )- $('.popup__wrap').height())/2});
                } else {
                    $('.popup__wrap').css({top: 0});
                }
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var PersonalAreaPage = function(obj) {

        var DURATION = 500;
        var ACTIVE_CLASS = 'active';

        var $context = obj;

        function init() {
            $context.navItems = $context.find('.nav-item:not(.nav-logout)');
            $context.tabs = $context.find('.tab');
            $context.viewOrdersButtons = $context.find('.order-actions .view');
            $context.orderPopup = $('.order');

            addEvents();
            setActiveTab();
        }

        function addEvents() {
            // Nav items
            $context.navItems.on('click', function(e) {
                e.preventDefault();
                navItemClickHandler( $(this) );
            });

            // Orders popup
            $context.viewOrdersButtons.on('click', function(e) {
                e.preventDefault();
                viewOrderClickHandler( $(this) );
            });
        }

        function navItemClickHandler( clickedItem ) {

            if ( clickedItem.hasClass(ACTIVE_CLASS) ) {
                return;
            }

            $context.navItems.removeClass(ACTIVE_CLASS);
            clickedItem.addClass(ACTIVE_CLASS);

            $context.tabs.slideUp(DURATION);

            setTimeout(function() {
                getTabToDisplay(clickedItem).slideDown(DURATION);
            }, DURATION);
        }

        function getTabToDisplay( clickedItem ) {
            return $('.' + clickedItem.data('tab'));
        }

        function setActiveTab() {
            var selectedTab;

            if ( selectedTab = getQueryString('tab') ) {
                $context.navItems
                    .filter('[data-tab="' + selectedTab + '"]')
                    .click();
            }
            else {
                $context.navItems.eq(0).addClass('active');
            }
        }

        function viewOrderClickHandler( clickedOrder ) {
            var orderID = clickedOrder.parent('.order-actions').data('order-id');

            destroyOrderPopup();
            ajaxGenericRequest('render_order_popup', { orderID: orderID }, renderOrderPopupCB);
        }

        function destroyOrderPopup() {
            $context.orderPopup
                .css({display: 'none'})
                .find('.popup__order-content').remove();
        }

        function renderOrderPopupCB(response) {

            if ( response ) {
                $context.orderPopup.append(response.html);

                addScroll();

                $context.orderPopup.css({display: 'block'});
                centerWrap();

                $('.popup').getNiceScroll().resize();
                $(document).find('.order .popup__scroll').getNiceScroll().resize();
            }
            else {
                popup.core.alert('Order popup failed!');
            }
        }

         function addScroll() {

            $(document).find('.order .popup__scroll').niceScroll( {
                cursorcolor:"#e8e8ed",
                cursoropacitymin: "1",
                cursorborderradius: "6px",
                cursorwidth: "5px",
                cursorborder: false,
                horizrailenabled:false,
                railpadding: {
                    top:0,
                    right: 7,
                    left:0,
                    bottom:0
                }
            } );
        }

        function centerWrap() {
            var popupWrap = $('.popup__wrap');
            if ( $(window).height() - 80 - popupWrap.height() > 0 ) {
                popupWrap.css({top: ( ( $(window).height() -80 )- popupWrap.height())/2});
            }
            else {
                popupWrap.css({top: 0});
            }
        }

        init();
    };

    var ExtendedCheckbox = function (obj) {

        var _obj = obj,
            _checkboxControl = obj.find($('.extended-check-control')),
            _checkbox = obj.find($('.extended-check-control input[type=checkbox]')),
            _checkboxPassive = obj.find($('.extended-check-passive'));

        var _addEvents = function () {

            _checkbox.on({
                change: _onCheckedHandler
            });

            _checkboxPassive.on({
                click: _onPassiveHandler
            });

        },
        _onCheckedHandler = function() {
            var isChecked = $(this).prop('checked');
            if (isChecked){
                _checkboxPassive.hide();
            } else {
                _showPassiveContainer();
            }
        },
        _onPassiveHandler = function() {
            _checkbox.prop('checked', true);
            _showCheckboxControl();
        },
        _showPassiveContainer = function() {
            _checkboxControl.hide();
            _checkboxPassive.show();
        },
        _showCheckboxControl = function() {
            _checkboxControl.show();
            _checkboxPassive.hide();
        },
        _init = function() {
            if(!_checkbox.prop('checked')) {
                _showPassiveContainer();
            }
            _addEvents();
        };

        _init();
    };

    var FormRequired = function (obj) {

        var _self = this,
            _obj = obj,
            _formSelect = _obj.find('select').filter('[required]'),
            _formItem = _obj.find('input, textarea').filter('[required]');

        var _addEvents = function () {

                //_obj.on({
                //    submit: function(){
                //        if (_checkItems()) {
                //            return false;
                //        }
                //    }
                //});

                _formItem.on( {
                    focus: function() {
                        $( this ).removeClass('empty');
                    }
                } );

            },
            _checkItems = function () {

                _obj.attr('data-validate', 'true');

                $.each(_formItem, function(i){
                    var curElem = _formItem.eq(i);

                    if (curElem.attr('type') == 'email') {
                        if (_isValidEmailAddress(curElem.val())) {
                            curElem.removeClass('empty');
                        } else {
                            curElem.addClass('empty');
                            _obj.attr('data-validate', 'false');
                        }
                    }
                    else if (curElem.data('number-id') === true ) {
                        if (_isValidNumberID(curElem.val())) {
                            curElem.removeClass('empty');
                        } else {
                            curElem.addClass('empty');
                            _obj.attr('data-validate', 'false');
                        }
                    }
                    else {
                        if (curElem.val().length < 1) {
                            curElem.addClass('empty');
                            _obj.attr('data-validate', 'false');
                        } else {

                            if ( curElem.attr( 'name' ) == 'password_auth' ){

                                var password = _obj.find( '[name = password]'),
                                    passwordValue = password.val(),
                                    password_authValue = curElem.val();

                                if ( passwordValue != password_authValue ){
                                    password.addClass( 'empty' );
                                    curElem.addClass( 'empty' );
                                    _obj.attr('data-validate', 'false');
                                } else {
                                    password.removeClass('empty');
                                    curElem.removeClass('empty');
                                }

                            } else {
                                curElem.removeClass('empty');
                            }

                        }
                    }
                });

                $.each(_formSelect, function(i){

                    var curElem = $(this);

                    if (curElem.attr('data-error') && curElem[0].customSelect.required()) {
                        _obj.attr('data-validate', 'false');
                    }

                });

                return _obj.attr('data-validate') == 'true';

            },
            _isValidEmailAddress = function (emailAddress) {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                return pattern.test(emailAddress);
            },
            _isValidNumberID = function (id) {
                var pattern = new RegExp("^\\d{9}$");
                return pattern.test(id);
            },
            _init = function () {
                _obj[0].formRequired = _self;
                _obj.attr('data-validate', 'false');
                _addEvents();
            };

        _self.checkItems = function () {
            return _checkItems();
        };

        _init();
    };

    var GoodsFilter = function ( obj ) {

        var _self = this,
            _obj = obj,
            _body = $( 'body' ),
            _site = $( '.site' ),
            _html = $( 'html' ),
            _window = $( window ),
            _closeBtn = $( '.goods__filters-close' ),
            _closeBtn_2 = $( '.filters-close-btn' ),
            _opened = false,
            _isMove = false,
            _panRight = false,
            _panLeft = false,
            _filterHammer = null;

        var _addEvents = function () {

                _body.on( 'click', '.goods__head-val', function() {

                    if( _opened ){
                        _hide();
                    } else {
                        _show();
                    }
                    return false;

                });
                _closeBtn.on( {
                    click: function() {
                        _hide();
                        return false
                    }
                } );
                _closeBtn_2.on( {
                    click: function() {
                        _hide();
                        return false
                    }
                } );
                _filterHammer.on("panstart", function(e){
                    console.log('right')
                    if(e.pointerType == 'touch') {
                        _moveFilter(e.pointers[0].pageX,e.deltaX, e.type);
                    }
                });
                _filterHammer.on("panend", function(e){
                    console.log('right')
                    if(e.pointerType == 'touch') {
                        _moveFilter(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _filterHammer.on("panright", function(e){
                    console.log('right')
                    if(e.pointerType == 'touch') {
                        _moveFilter(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _filterHammer.on("panleft", function(e){
                    console.log('left')
                    if(e.pointerType == 'touch') {
                        _moveFilter(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });

                _obj.on( 'click', 'h4', function() {

                    var curElem = $( this );

                    if( curElem.next().css( 'display' ) == 'none' ) {
                        curElem.next().slideDown( 300 );
                        curElem.removeClass( 'close' );
                    }
                    else {
                        curElem.next().slideUp( 300 );
                        curElem.addClass( 'close' );
                    }

                } );


                _body.click( function( e ) {
                    var elem = $( e.target );

                    if( !elem.hasClass( 'goods__filters' ) && !elem.parents( '.goods__filters' ).length ) {
                        if( _opened ) {
                            _hide();
                        }
                    }
                } );

                _window.on( {
                    resize: function() {
                        if ( _window.width() + _getScrollWidth() > 768 ) {
                            _hide();
                        }
                        _addBgElem();
                    }
                } );

            },
            _moveFilter = function( touchPosX, deltaX, type ){

                if( type == 'panstart' && (touchPosX < 50 || _opened)){
                    _isMove = true;
                } else if ( type == 'panright' && _isMove){
                    _panRight = true;
                } else if ( type == 'panleft' && _isMove){
                    _panLeft = true;
                } else if( type == 'panend'){
                    if(_isMove && _panRight && !_opened){
                        _show();
                    } else if(_isMove && _panLeft && _opened){
                        _hide();
                    }
                    _isMove = false;
                    _panRight = false;
                    _panLeft = false;
                }

            },
            _addBgElem = function () {

                if( !$( '.filter-bg' ).length ) {
                    $( '.goods__aside' ).append( '<span class="filter-bg"></span>' );
                }

                var subBg = $( '.filter-bg' );

                if ( _window.width() + _getScrollWidth() < 768  ) {

                    var docHeight = $( document ).height();

                    subBg.css({
                        'height': docHeight
                    });

                } else {
                    subBg.css({
                        'height': 'auto'
                    })
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div' ),
                    scrollbarWidth = null;
                document.body.appendChild( scrollDiv );
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild( scrollDiv );
                return scrollbarWidth;
            },
            _calculateCounter = function () {

                var _filterWrap = $( '.goods__filters' ),
                    _filterSection = _filterWrap.find( '.woof_container:not(.woof_container_product_cat)' ),
                    _totalCounterWrap = _filterWrap.find( '.goods__filters-title' ),
                    _totalCounter = 0;

                $.each( _filterSection, function() {

                    var curSection = $( this ),
                        count = curSection.find( 'input:checked').length,
                        countHead = curSection.find( 'h4' ),
                        filterCounter = countHead.find( '.goods__filters-counter' );

                    if ( filterCounter.length ) {

                        if ( count == 0 ) {
                            filterCounter.remove();
                        } else {
                            filterCounter.text( count );
                        }

                    } else {

                        if ( count != 0 ) {
                            countHead.append( '<span class="goods__filters-counter">(' + count + ')</span>' );
                        }

                    }

                    _totalCounter = _totalCounter + count;

                } );

                if ( _totalCounterWrap.find( 'span' ).length ){

                    if ( _totalCounter == 0 ){
                        _totalCounterWrap.find( 'span' ).remove();
                    }  else {
                        _totalCounterWrap.find( 'span' ).text( _totalCounter );
                    }

                } else {

                    if ( _totalCounter != 0 ){
                        _totalCounterWrap.append( '<span>(' + _totalCounter + ')</span>' );
                    }

                }

            },
            _hide = function() {
                _opened = false;
                _obj.removeClass( 'goods__filters_opened' );
                $( '.filter-bg' ).removeClass('active');
                _html.css( {
                    'overflow-y': 'auto'
                } );
                $( '.site__content').attr( 'style', '' );

            },
            _show = function() {
                _opened = true;
                _obj.addClass( 'goods__filters_opened ' );
                $('.filter-bg').addClass('active');
                _html.css( {
                    'overflow-y': 'hidden'
                } );
                $( '.site__content' ).css( {
                    'z-index':6
                } );
            },
            _initHammer = function(){
                _filterHammer = new Hammer.Manager($('body')[0]);
                _filterHammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }) );
            },
            _init = function() {
                _initHammer();
                _calculateCounter();
                _addEvents();
                _addBgElem();
                _obj[0].goodsFilter = _self;
            };

        _self.calculateCounter = function() {
            _calculateCounter();
        };

        _init();

    };

    var AutoComplete = function(obj) {

        var _self = this,
            _obj = obj,
            _searchInput = _obj.find('input[type=search]'),
            _endPoint = obj.data('autocomplete'),
            _suggestSelected = -1,
            _ajaxFn = ajaxGenericRequest,
            _items = [];


        // Private methods
        var addEvents = function () {

            _searchInput.on({

                'keyup': function(I) {
                    switch(I.keyCode) {
                        // enter
                        case 13:
                            if (_self.inputValue && _suggestSelected > -1 ) {
                                location.href = $(_items[_suggestSelected]).attr('href');
                            }
                            break;
                        // space
                        case 32:
                        // esc
                        case 27:
                        // up arrow
                        case 38:
                        // down arrow
                        case 40:
                            break;
                        default:

                            _self.inputValue = $(this).val();

                            if (_self.inputValue.length > 2) {
                                _obj.addClass( 'finding' );
                                _ajaxFn(_endPoint, { query: _self.inputValue }, _self.ajaxCallback);
                            }
                            else if (_self.inputValue == '') {
                                $('.search-results').remove();
                                _obj.removeClass('has-results');
                                _suggestSelected = -1;
                            }
                            break;
                    }

                },

                'keydown': function(I) {
                    switch (I.keyCode) {
                        // esc
                        case 27:
                            $('.search-results').remove();
                            _obj.removeClass('has-results opened');
                            _suggestSelected = -1;
                            _searchInput.val('');
                            return false;
                            break;
                        // up arrow
                        case 38:
                        // down arrow
                        case 40:
                            I.preventDefault();
                            if(_self.countItems > 0){
                                keyActivate(I.keyCode);

                            }
                            break;
                    }
                }
        });

            $('html').click(function(){
                $('.search-results').remove();
                _obj.removeClass('has-results');
                _suggestSelected = -1;
            });

        },

        renderResults = function(terms) {

            $('.search-results').remove();

            var resultStr = '<div class="search-results">';

            for (var i in terms) {
                if(terms.hasOwnProperty(i)) {
                    resultStr += '<a class="results-item" tabindex="' + i + '" href="'+ terms[i].link + '">' + terms[i].name;
                    if (terms[i].parents && terms[i].parents.length) {
                        resultStr += ' - <span>' + terms[i].parents.join(' - ') + '</span>';
                    }
                    resultStr += '</a>';
                }
            }

            if(!_obj.find('.search-results').length == 1){
                _obj.append(resultStr);
                _obj.addClass('has-results');
            }

            _self.countItems = $('.results-item').length;

            _obj.removeClass( 'finding' );
        },

        keyActivate = function(n) {
            _items = $('.results-item');
            $(_items).removeClass('active');

            // down arrow
            if (n == 40) {
                _suggestSelected++;
                if (_suggestSelected == _self.countItems) {
                    _suggestSelected = -1
                }
            }
            // up
            else if (n == 38) {
                _suggestSelected--;
                if (_suggestSelected < -1) {
                    _suggestSelected = _self.countItems - 1;
                }
            }

            if (_suggestSelected == -1) {
                _searchInput.val(_self.inputValue);
            }
            else {
                _searchInput.val($(_items[_suggestSelected]).text());
                $(_items[_suggestSelected]).addClass('active');
            }

        },

        init = function () {
            addEvents();
        };

        // Prototype
        _self.ajaxCallback = function (response) {
            var result = Object.keys(response);
            if (result.length) {
                renderResults(response)
            }
            else {
            //    TODO: handle empty (no results found)
                _obj.removeClass( 'finding' );
            }

        };

        init();

    };

    var SubscribeForm = function ( obj ) {

        var _obj = obj,
            _way = _obj.attr( 'action' ),
            _inputs = _obj.find( '[required]' ),
            _chkBox = _obj.find( '[type=checkbox]' ),
            _inputValue = _obj.find( 'input' ).val(),
            _cross = _obj.find( '.subscribe-form__cross' ),
            _niceCheck = _obj.find( '.nice-check' ),
            _objForm = _obj.find( '.subscribe-form__wrap' ),
            _readyMsg = _obj.find( '.subscribe-form__ready'),
            _hiddenFormContainer = $('#_atPopupSU'),
            _hiddenForm = {
                cta: _hiddenFormContainer.find('.bl-block-button-content-item-wrapper'),
                chkBox: _hiddenFormContainer.find('input[type=checkbox]'),
                txtInpt: _hiddenFormContainer.find('input[type=text]')
            };
            // _request = new XMLHttpRequest();

        var _addEvents = function () {

                _obj.on({
                    'submit': function(){

                        $.each( _inputs, function(){

                            var curItem = $( this ),
                                curAttr = curItem.attr( 'type' );

                            if ( curItem.val() == '' ) {
                                curItem.parent().addClass( 'subscribe-form_error' );
                            }

                            if ( curAttr == 'email' ){
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if ( pattern.test( curItem.val() ) == false ){
                                    curItem.parent().addClass( 'subscribe-form_error' );
                                }
                            }

                            if ( curAttr == "checkbox" ){
                                var curCheck = this.checked;
                                if ( !curCheck ){
                                    curItem.parents( '.nice-check' ).addClass( 'nice-check_error' );
                                }

                            }

                        } );

                        if ( _obj.find( '.subscribe-form_error' ).length ){
                            return false;
                        } else {

                            //  Submit active trail's form after validation passed
                            _inputValue = _inputs.val();
                            _hiddenForm.txtInpt.val(_inputValue);
                            _hiddenForm.chkBox.prop('checked', true);
                            _hiddenForm.cta.trigger('click');
                            _objForm.addClass( 'hide' );
                            _niceCheck.addClass( 'hide' );
                            _readyMsg.css({ opacity: 1 });
                        }

                        return false;
                    }
                });

                _inputs.on({

                    'focus': function(){

                        var curItemParent = $( this ).parent();

                        if( curItemParent.hasClass( 'subscribe-form_error' )){
                            curItemParent.removeClass( 'subscribe-form_error' );
                        }

                    }

                });

                _chkBox.on( {

                    change: function() {
                        $( this ).parents( '.nice-check' ).removeClass( 'nice-check_error' );
                    }

                } );

                _cross.on( {
                    click: function() {
                        var parent = _inputs.parent();
                        parent.removeClass( 'subscribe-form_error' );
                    }
                } )

            },

            // _sendMessage = function() {

            //     _request.abort();
            //     _request = $.ajax({
            //         url: _way,
            //         data: {
            //             userMail: _inputValue
            //         },
            //         dataType: 'html',
            //         type: 'get',
            //         success: function ( msg ) {
            //             _objForm.addClass( 'hide' );
            //             _niceCheck.addClass( 'hide' );
            //             _readyMsg.css({ opacity: 1 });
            //         },
            //         error: function (XMLHttpRequest) {
            //             if (XMLHttpRequest.statusText != 'abort' ) {
            //                 alert( 'ERROR!!!' );
            //             }
            //         }
            //     });

            // },

            _init = function () {
                _addEvents();
            };

        _init();

    };


})();

