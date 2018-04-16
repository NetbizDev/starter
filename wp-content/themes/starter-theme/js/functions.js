/**
 * Theme functions file
 */
jQuery( function( $ ) {
    console.log('jquery loaded front');
    $(document).foundation();

    $('input, textarea').placeholder();

    // Handler for Contact Forms
    if( $('.contact-form-section').length > 0 ) {
        new ContactForm();
    }

    if($.browser.msie){
        $('html').addClass('msie-browser');
    }

    // Sticky
    $(window).one('load', function() {
        if ( $( '.header-cover-photo').length > 0 && $('.current-menu-item .sub-menu-container, .active-menu-item .sub-menu-container').length > 0 ) {
            $( '.header-cover-photo' ).ready( function() {
                new Sticky();
            });
        }
    });

    // Copy Url
    $('.icon-url').on('click', function(e) {
        e.preventDefault();

        var text = $(this).data('url');
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    });

    // Back Button
    $('.back-btn').on('click', function(e) {
        e.preventDefault();

        window.history.back();
    });

    // News Slider {
    if ($('.news-slider').length > 0) {
        new NewsSlider( $('.news-slider') );
    }

    // Blog Slider {
    if ($('.blog-slider').length > 0) {
        new BlogSlider( $('.blog-slider') );
    }

    // Mobile Menu Controller
    if ($('.mobile-menu-container').css('display') == 'block') {
        new MobileMenuController();
    }


   // $('.feedback').on('click', function(e) {
     //   $(this).addClass('open');
//    });


    // Newsletter
    new Newsletter();

    // Initialize Active Page Functions and Events
    PageController();
});


/*--------------------------------------------------*\
                    Newsletter
\*--------------------------------------------------*/
function Newsletter() {
    var context = this;

    function init() {
        context.form = $('.mc-form');
        context.sendButton = context.form.find('.send-action-btn');
        context.mcButton = context.form.find('.mc-submit-btn');

        // Mail Chimp AJAX
        context.form.ajaxChimp({
            url: "//expiria.us10.list-manage.com/subscribe/post?u=d52385bf83901dfec0b9c1c0f&amp;id=c5ca8ef1cd"
        });

        attachEvents();
    }

    function attachEvents() {
        context.sendButton.on('click', function(e) {
            e.preventDefault();
            console.log($(this));
            $(this).parent().siblings('.mc-submit-btn').trigger('click');
        });
    }

    init();
}

/*--------------------------------------------------*\
            Mobile Menu Container
\*--------------------------------------------------*/
function MobileMenuController() {
    var context = this;

    // Constructor
    function init() {
        attachEvents();
    }

    function attachEvents() {

        $('.hamburger, .dimmer').on('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Handle sub menu item click
        $('.mobile-sub-menu-container').on('click', function(e) {
            e.stopPropagation();
        });

        // Handle main menu item click
        $('.mobile-menu .menu-item-has-children').on('click', function(e) {
            e.preventDefault();

            MainMenuItemClickListener( $(this) );
        });
    }

    function toggleMenu() {

        if ( $('body').hasClass('toggle') ) {
            // Close all
            $('.dimmer').fadeOut();
            $('body, .hamburger, .mobile-menu-container, .site-header').removeClass('toggle');
            $('html').removeClass('no-scroll');
        }
        else {
            // Open All
            $('.mobile-sub-menu-container').removeClass('is-open');
            $('.active-menu-item .mobile-sub-menu-container').css('display', 'block').addClass('is-open');
            $('.dimmer').fadeIn();
            $('body, .hamburger, .mobile-menu-container, .site-header').addClass('toggle');
            $('html').addClass('no-scroll');
        }
    }

    function MainMenuItemClickListener( $clickedItem ) {
        var subMenuContainer = $clickedItem.find('.mobile-sub-menu-container');

        if (subMenuContainer.hasClass('is-open')) {
            subMenuContainer.slideToggle().removeClass('is-open');

            return;
        }

        $('.mobile-sub-menu-container.is-open').slideToggle().removeClass('is-open');
        subMenuContainer.slideToggle().addClass('is-open');
    }

    init();
}

/*--------------------------------------------------*\
            News Slider
\*--------------------------------------------------*/
function NewsSlider( container ) {
    var $context = $(this);

    // Constructor
    function init() {
        $context.container = container;

        // Cycle Slideshow
        $context.container.cycle({
            slides: '> div.slide',
            fx: 'scrollHorz',
            easing: 'easeOutCubic',
            pauseOnHover: true,
            timeout: 5000,
            speed: 1000,
            log: false,
            swipe: true,
            pager: '+ .cycle-pager'

        }).on('cycle-update-view', function(event, optionHash, slideOptionsHash, currentSlideEl) {
            $context.container.parent().find('.post-link').attr('href', $(currentSlideEl).data('post-link'));
        });
    }

    init();
}

/*--------------------------------------------------*\
                Blog Slider
\*--------------------------------------------------*/
function BlogSlider( container ) {
    var $context = $(this);

    // Constructor
    function init() {
        $context.container = container;

        // Cycle Slideshow
        $context.container.cycle({
            slides: '> a.slide',
            fx: 'carousel',
            carouselVertical: true,
            easing: 'easeOutCubic',
            pauseOnHover: true,
            timeout: 3000,
            speed: 1000,
            log: false,
            swipe: true,
            next: '> .interaction-strip .cycle-next',
            prev: '> .interaction-strip .cycle-prev'
        });
    }

    init();
}

/*--------------------------------------------------*\
         Sticky
\*--------------------------------------------------*/
function Sticky() {
    var context = this;

    // Constructor
    function init() {
        // Get the menus containers
        context.subMenuContainer = $('.active-menu-item .sub-menu-container');
        context.mainMenuContainer = $('.main-menu-container');
        //context.subMenuLogo = $('.sub-menu-logo');
        context.flags = {};

        // Set the site header height
        setSiteHeaderHeight();
        initFlags();
        attachEvents();
    }

    function initFlags() {

        var scrollTop = $(window).scrollTop();
        context.flags.isScrolled = ( scrollTop > 0 );
        context.flags.belowClashPoint = ( scrollTop >= context.clashPoint );
        context.flags.pulledUp = false;
        context.flags.pulledDown = false;
    }

    function setSiteHeaderHeight() {
        var mainMenuBorderWidth = parseInt( context.mainMenuContainer.css('border-top-width') );
        context.siteHeaderHeight = $('.site-header').outerHeight() - mainMenuBorderWidth;
        context.clashPoint = context.siteHeaderHeight - context.mainMenuContainer.height() - mainMenuBorderWidth;
        context.subMenuTopLimit = context.siteHeaderHeight - context.mainMenuContainer.height();
    }

    function attachEvents() {
        // Callback for when pace.js is finished
        Pace.on('done', function() {
            setSubMenuPosition();
        });

        // Listen to window resize to re-set sub menu position
        $(window).resize(function() {
            setSiteHeaderHeight();

            if ( !context.flags.belowClashPoint ) {
                setSubMenuPosition();
            }
        });
    }

    function setSubMenuPosition() {

        // Were in the top of the page
        if ( !context.flags.isScrolled ) {
            setTranslateY(context.subMenuContainer, context.clashPoint);
        }
        // Were not in the top of the page, but didn't pass the clash point
        else if ( !context.flags.belowClashPoint ) {
            setTranslateY(context.subMenuContainer, context.clashPoint - $(window).scrollTop());
        }

        // Were not in the top of the page, and we did pass the clash point
        else {
            pullUp();
        }

        context.subMenuContainer.slideDown();

        stickyMenusController();
    }

    function stickyMenusController() {

        var lastScrollTop = 0

        // Listen to window scroll
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();

            /*
            * SCROLLING DOWN
            * */
            if (scrollTop > lastScrollTop) {
                // scrolling down until reaching the clash point
                if (scrollTop <= context.clashPoint) {
                    setTranslateY(context.subMenuContainer, context.clashPoint - scrollTop);
                }
                // scrolling down and reached/passed the sub menu container
                else {
                    // did not pull up yet
                    if (!context.flags.pulledUp) {
                        context.flags.belowClashPoint = true;
                        pullUp();
                    }
                }
            }

            /*
             * SCROLLING UP
             * */
            else {
                // didn't reach the sub menu top limit yet
                if (scrollTop >= context.subMenuTopLimit) {
                    if (!context.flags.pulledDown) {
                        pullDown();
                    }
                }
                // reached the clash point and didn't update classes yet
                else {
                    if (context.flags.belowClashPoint) {
                        aboveClashPoint();
                    }
                    setTranslateY(context.subMenuContainer, context.clashPoint-scrollTop);
                }
            }

            // save the last scrollTop value to determine scrolling direction ( up/down )
            lastScrollTop = scrollTop;
        });
    }

    function aboveClashPoint() {
        context.flags.belowClashPoint = false;
        context.mainMenuContainer.removeClass('pull-up');
        context.subMenuContainer.removeClass('pull-down sticked');
        //context.subMenuLogo.fadeOut();
    }

    function setTranslateY(element, value) {
        element.css('transform', 'translateY(' + value + 'px)');
    }

    function pullUp() {
        context.flags.pulledDown = false;
        context.flags.pulledUp = true;
        context.mainMenuContainer.addClass('pull-up');
        context.subMenuContainer.css('transform', '').removeClass('pull-down').addClass('sticked');
        //context.subMenuLogo.fadeIn();
    }

    function pullDown() {
        context.flags.pulledUp = false;
        context.flags.pulledDown = true;
        context.mainMenuContainer.removeClass('pull-up');
        context.subMenuContainer.addClass('pull-down');
    }

    init();
}

/*--------------------------------------------------*\
                Pages Controller
\*--------------------------------------------------*/
function PageController() {
    var pages = [
        'front-page',
        'contact-child-page',
        'post-type-archive-news',
        'blog-page',
        'platform-page',
        'join-us',
        'post-type-archive-product'
    ];

    console.log('s');

    $(pages).each(function(i, v) {
        
        if ( $('body').hasClass(v) ) {
            switch (i) {
                case 0: 
                    HomePage();
                    break;
                case 1:
                    ContactPage();
                    break;
                case 2:
                    NewsPage();
                    break;
                case 3:
                    BlogArchive();
                    break;
                case 4:
                    PlatformPage();
                    break;
                case 5:
                    JoinUsPage();
                    break;
                case 6:
                    StorePage();
                    break;
            }
        }
    });
}

/*--------------------------------------------------*\
                    Front Page
\*--------------------------------------------------*/
function HomePage() {
    
    var $context = $(this);

    // constructor
    function init () {

        $context.isSmallMenu = false;
        $context.menuElements = $('.site-header, .main-menu-container, .main-menu');

        if ( $('.revealer').length > 0 ) {
            $context.revealer = new Revealer($context);
            $context.revealer.initialize();
            $context.revealer.enable();
        }
        attachEvents();
        scrollListener();
    }

    function attachEvents() {

        // Cycle Slideshow
        $('.home-slider').cycle({
            slides: '> div.slide',
            fx: 'scrollHorz',
            easing: 'easeOutCubic',
            pauseOnHover: true,
            timeout: 7000,
            speed: 1000,
            log: false,
            swipe: true,
            next: '.interaction-strip .cycle-next',
            prev: '.interaction-strip .cycle-prev',
            pager: '.interaction-strip .cycle-pager'
        });

        $('.hash-link').on('click', function() {
            // Store hash value in local storage
            localStorage.setItem("hashValue", $(this).data('hash'));
        });
    }

    function scrollListener() {

        var scrollTop = $(window).scrollTop();

        toggleHomeMenuSize( scrollTop );

        $(window).scroll(function() {
            toggleHomeMenuSize( $(this).scrollTop() );
        });
    }

    function toggleHomeMenuSize( scrollTop ) {

        if (scrollTop < 200 && !$context.isSmallMenu) {
            $context.isSmallMenu = true;
            $context.menuElements.addClass('home-design');
        }
        else if (scrollTop > 200 && $context.isSmallMenu) {
            $context.isSmallMenu = false;
            $context.menuElements.removeClass('home-design');
        }
    }

    init();
}

/*--------------------------------------------------*\
             Revealer Class
\*--------------------------------------------------*/
function Revealer(context) {
    //==================================================
    // API
    //==================================================
    var api    = {},

    //==================================================
    // DOM SELECTIONS
    //==================================================
        $context   = context,
        $slider    = $('.revealer'),
        $drag      = $slider.find('.drag'),
        $divider   = $slider.find('.divider'),
        $handle    = $slider.find('.handle'),
        $layers    = $slider.find('.layer'),
        $layer1    = $layers.eq(0),
        $layer2    = $layers.eq(1),
        $hotspot   = null,

    //==================================================
    // CONSTANTS
    //==================================================
        PADDING    = parseInt($slider.css('padding-left'), 10),
        CENTER     = parseInt($handle.css('top'), 10),
        FRICTION   = 0.15,

    //==================================================
    // INSTANCE VARIABLES
    //==================================================
        request    = null,
        over       = false,

    //==================================================
    // STATES
    //==================================================
        dimensions = {
            width  : $slider.outerWidth(),
            height : $slider.outerHeight()
        },

        offset     = {
            x      : $slider.offset().left,
            y      : $slider.offset().top
        },

        limits     = {
            left   : 10,
            right  : 10,
            top    : 0,
            bottom : 0
        },

        target     = {
            x      : limits.left,
            y      : CENTER
        },

        chase      = {
            x      : limits.left,
            y      : CENTER
        },

    //==================================================
    // CALLBACKS
    //==================================================
        callbacks = {

            onMouseEnter: function(event) {

                over = true;

                offset.x = $slider.offset().left;
                offset.y = $slider.offset().top - 14;

                $drag.addClass('hide');
                //$drag.fadeOut('fast');
                $handle.stop(true);

                $hotspot.on('mouseleave', callbacks.onMouseLeave);
                $(window).on('mousemove', callbacks.onMouseMove);
            },

            onMouseLeave: function(event) {

                over = false;

                $drag.removeClass('hide');
                //$drag.fadeIn('fast');

                $handle.stop(true).animate({
                    top: CENTER
                },{
                    duration: 500,
                    easing: 'easeInOutQuint'
                });

                $hotspot.off('mouseleave', callbacks.onMouseLeave);
                $(window).off('mousemove', callbacks.onMouseMove);
            },

            onMouseMove: function(event) {

                var mouseX = event.pageX - offset.x;
                var mouseY = event.pageY - offset.y;
                var clampX = Math.max(mouseX, limits.left);
                var clampY = Math.max(mouseY, limits.top);

                clampX = Math.min(clampX, dimensions.width - limits.right);
                clampY = Math.min(clampY, dimensions.height - limits.bottom);

                target.x = clampX;
                target.y = clampY;
            },

            onRequestAnimationFrame: function() {

                request = requestAnimationFrame(callbacks.onRequestAnimationFrame);

                update();
            }
        };

    function initialize() {
        $slider.append('<div class="hotspot">');
        $hotspot = $slider.find('.hotspot');
        $hotspot.css({
            width    : '260px',
            height   : '180px',
            position : 'absolute'
        });
    }

    function enable() {
        enableUpdate(true);
        $hotspot.on('mouseenter', callbacks.onMouseEnter);
    }

    function disable() {
        enableUpdate(false);
        $hotspot.off('mouseenter', callbacks.onMouseEnter);
    }

    function enableUpdate(value) {

        if (value) {

            request = requestAnimationFrame(callbacks.onRequestAnimationFrame);

        } else {

            cancelAnimationFrame(request);
        }
    }

    function update() {

        chase.x += (target.x - chase.x) * FRICTION;
        chase.y += (target.y - chase.y) * FRICTION;

        $divider.css({
            left: chase.x
        });

        //$layer1.css({
        //    width: dimensions.width - chase.x - PADDING
        //});

        $layer2.css({
            width: chase.x - PADDING
        });

        if (over) {
            $handle.css({
                top: chase.y
            });
        }
    }

    // API
    api.initialize = initialize;
    api.enable     = enable;
    api.disable    = disable;

    return api;
}

function PlatformPage() {
    var context = this;

    function init() {
        // Rerieve hashValue from local storage
        var hashValue = localStorage.getItem('hashValue');
        var mobileSiteHeader = $('.mobile-site-header');

        var mobileSiteHeaderHeight = ( mobileSiteHeader.css('display') == 'block' ) ? mobileSiteHeader.height() : 0;

        if (hashValue) {

            $('html, body').animate({
                scrollTop: $(hashValue).offset().top - mobileSiteHeaderHeight
            }, 3000);

            localStorage.removeItem('hashValue');
        }
    }

    init();
}

/*--------------------------------------------------*\
                Contact Page
\*--------------------------------------------------*/
function ContactPage() {

    var _this = this;

    // constructor
    function init () {
        // Init all components
        //ContactForm();
        attachEvents();
    }

    function attachEvents(){

    }

    init();
}


/*--------------------------------------------------*\
                    Contact Form
\*--------------------------------------------------*/
function ContactForm() {
    var _this = this;
    var error_msgs;
    var html;


    // constructor
    function init () {
        // Init all components

        // Build error messages
        buildErrorMessages();

        bindEvents();
    }

    /**
     * Builds the error messages related to the form fileds according to the form's language.
     */
    function buildErrorMessages() {

        error_msgs = [
            { 'single': 'Required Field', 'multi': 'Required Fields' },
            { 'single': 'Invalid Value', 'multi': 'Invalid Values' }
        ];
    }

    /**
     * Creates the success message returned to the
     * user after the form was successfully sent.
     * @returns {string} the message as HTML.
     */
    function createResultSuccess() {
        // success message
        return '<div class="texts-wrapper"><p class="result-title">Thank You!</p>' +
        '<p class="result-message">We will contact you shortly</p></div>';
    }


    function createResultError() {
        // Error message
        return '<div class="texts-wrapper"><p class="result-title">Sorry...</p>' +
        '<p class="result-message">There was an error sending the email, please try again later</p></div>';
    }

    /**
     * First fading put the form and the '.text-container' , when finished, fading in the
     * correct result box according to the value of the success parameter.
     * If success is <code>true</code>, the resultBoxSuccess will fade in, otherwise the
     * resultBoxError will fade in.
     * @param form the contact form object.
     * @param success boolean to determine which message to show.
     */
    function setMessage ( form, success ) {

        $('.contact-form-section').children(':not(.result-box)').css('visibility', 'hidden')
            .promise().done(function () {
                if (success) {
                    html = createResultSuccess();
                }
                else {
                    html = createResultError();
                }
                $('.contact-form-section').css('max-height', '200px');
                $('.result-box').append(html).fadeIn();
            });
    }

    function bindEvents(){

        // Contact form submit button event
        $('.submit').on('click', function(e) {
            e.preventDefault();

            var form = $('.form');
            var contactData = form.serialize();

            if (validateForm(form)) {
                $.ajax({
                    type: 'POST',
                    url: admin_data.ajaxurl,
                    data: { action: 'send_form' , data: contactData },
                    dataType: 'json'
                }).done( function(response) {
                    setMessage(form, response.success);
                });
            }
        });
    }

    function validateForm(form) {
        // Loop through all input children of given Form

        var errors = [];
        var index = 0;
        var $errorMessage = $('.error-message');

        var min_len = 2;

        // Reset errors (if any)
        $errorMessage.empty();

        $('input[type="text"], input[type=email], textarea', form).each(function(i, v) {
            var msg = '';
            var errorCode = -1;
            var val = $(this).val();

            if ($(this).hasClass('error')) {
                $(this)
                    .removeClass('error')
                    .parent().removeClass('error')
                    .unbind('keyup');
            }

            // If field is either required or not empty, validate input
            if (required(this) || !empty(val)) {

                if (empty(val)) {
                    // Field is empty

                    errorCode = 0;
                } else if (!minimumLength(val, min_len)) {
                    // Field value is too short

                    errorCode = 1;
                } else if (email(this) && !validateEmail(val)) {
                    // Email Validation Did Not Pass
                    errorCode = 1;
                }
                if (errorCode >= 0) {
                    $(this)
                        .addClass('error')
                        .parent().addClass('error')
                        .bind('keyup', function() { validateForm(form); })
                    // Add msg to errors array with a reference to field's index

                    errors.push({ 'index': i, 'code': errorCode });
                    index = i;
                }
            }
        });


        if (errors.length > 0) {
            if (errors.length >= 2) {
                $errorMessage.text(error_msgs[errors[0].code].multi);

            }else if (errors.length == 1){
                $errorMessage.text(error_msgs[errors[0].code].single);
            }
            // Incase there is an error -> show the error message
            $errorMessage.fadeIn();

            return false;
        }
        // Incase there isn't any error -> hide the error message
        $errorMessage.fadeOut();
        return true;
    }

    /**
     * Checks if el has class "required".
     * @param el element to check it's class.
     * @returns <code>true</code> if el has class "required", <code>false</code> otherwise.
     */
    function required(el) {
        return $(el).hasClass('required');
    }

    /**
     * Checks if el has class "email".
     * @param el element to check it's class.
     * @returns <code>true</code> if el has class "email", <code>false</code> otherwise.
     */
    function email(el) {
        return $(el).attr('type') == 'email';
    }

    /**
     * Checks if val is empty.
     * @param val the value to check.
     * @returns <code>true</code> if val is empty, <code>false</code> otherwise.
     */
    function empty(val) {
        return val.length == 0;
    }

    /**
     * Checks if val's length is equal or greater than num.
     * @param val the value to check it's length.
     * @param num the minimum legth.
     * @returns {boolean}
     */
    function minimumLength(val, num) {
        return val.length >= num;
    }

    /**
     * Using a regex expression to check if val is a well formed email address.
     * @param val the value to check.
     * @returns {boolean} dsfsdf
     */
    function validateEmail(val){

        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(val);
    }

    // initialize this class
    init();
}


/*--------------------------------------------------*\
                    News Page
\*--------------------------------------------------*/

function NewsPage() {
    var _this = this;

    // constructor
    function init () {
        // Init all components
        attachEvents();
    }

    function attachEvents(){
        ShowMoreLoader();
    }

    init();
}

/*--------------------------------------------------*\
                    Join Us / Careers
\*--------------------------------------------------*/
function JoinUsPage() {

    // constructor
    function init () {
        // Init all components
        initFilters();
        initSelects();

        attachEvents();
    }

    function attachEvents(){
        $('tr').on('click', function(e) {

            var link = $(this).find('a').attr('href');
            window.location.href = link;
        });
    }

    function initFilters() {
        $('[data-col]').multifilter();
    }

    function initSelects() {
        if ( document.body.clientWidth > 640 ) {

            $('[data-col]').selectmenu({
                width: "70%",
                change: function( event, ui ) {
                    // Trigger change, so other plugins are aware of the change
                    $(this).change();

                    $(event.toElement).parent().find('.ui-selected').removeClass('ui-selected');
                    $(event.toElement).addClass('ui-selected');

                },
                create: function (event, ui) {
                    $('.ui-selectmenu-button').addClass('placeholder');
                }
            })
            .on("selectmenuselect", function(event, ui) {

                var menuID = $(event.toElement).parent()[0].id;
                var selectButton = $('.ui-selectmenu-button[aria-owns=' + menuID + ']');

                if (ui.item.index === 0) {
                    selectButton.addClass('placeholder');
                }
                else selectButton.removeClass('placeholder');
            });
        }

    }

    init();
}

/*--------------------------------------------------*\
                    Blog Archive
\*--------------------------------------------------*/

function BlogArchive() {
    var _this = this;

    // constructor
    function init () {
        // Init all components
        attachEvents();
    }

    function attachEvents(){
        ShowMoreLoader();
    }

    init();
}

/*--------------------------------------------------*\
                    Show More Loader
\*--------------------------------------------------*/
function ShowMoreLoader() {

    function init() {
        $('.show-more').on('click', function(e){
            e.preventDefault();
            
            var postsList = $('.posts-list');
            var link = $(this).attr('href');
            var newPosts = $('<div></div>');
            
            $(this).fadeOut(function(){
                $('.loader').fadeIn();

                newPosts.css('display','none').load(link + ' .posts' , function() {
                    var _data = this;
                    
                    $('.loader').fadeOut();
                    
                    $(this).fadeIn(function(){
                        $('.posts').append(_data);
                        $(this).find('.posts').unwrap();
                    });
                });
            });
        }); 
    }

    init();
}

/*--------------------------------------------------*\
                    Store Page
\*--------------------------------------------------*/

function StorePage() {
    var _this = this;

    // constructor
    function init () {
        // Init all components
        console.log('e');
        expend_woof_lists_for_child_categories();
    }

    function expend_woof_lists_for_child_categories() {
        var selectedCategories = $('input[type=checkbox]:checked,input[type=radio]:checked');
        
        selectedCategories.siblings('ul').show();
        selectedCategories.siblings('.woof_childs_list_opener').find('span').removeClass('woof_is_closed').addClass('woof_is_opened');
    }

    init();
}