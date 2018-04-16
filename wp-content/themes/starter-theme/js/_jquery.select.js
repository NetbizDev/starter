$(function(){
    $( 'select' ).each( function(){
        new AresSelect( {
            obj: $( this ),
            optionType: 1,
            showType: 2
        } );
    } );
} );

var AresSelect = function( params ){
    this.obj = params.obj;
    this.curParent = this.obj.parents('.search__filter > div');
    this.optionType = params.optionType || 0;
    this.showType = params.showType || 1;
    this.visible = params.visible || 5;

    this.init();
};
AresSelect.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.start();
                self.core.controls();
            },
            calculateOptionLength: function(){

                var i = 0;

                $.each( self.popup.find( 'li' ), function() {
                    if ( !$( this ).hasClass( 'placeholder' ) ){
                        i++;
                    }
                } );

                self.optionLenghth = i;

            },
            start: function(){
                self.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                self.text = $( '<span class="ares-select__item"></span>' );
                self.wrap = $( '<div class="ares-select"></div>' );
                self.window = $( window );
                self.opened = false;

                self.core.addWraper();
                if( !self.optionType || self.device ){
                    self.core.setMobileView();
                } else if( self.optionType == 1 ){
                    self.core.setCustom1();
                }

                self.obj[ 0 ].customSelect = this;

                if (self.obj.attr('data-error')) {
                    self.wrap.attr('data-error', self.obj.attr('data-error'));
                }

            },
            setMobileView: function(){
                self.wrap.addClass( 'ares-select_mobile' );
            },
            setCustom1: function(){
                self.wrap.addClass( 'ares-select_custom' );
                //if ( self.obj.hasClass("size-chart") ){
                //    self.wrap.addClass( 'ares-select_size-chart' );
                //}
            },
            setWidthForSizeSelect: function(){

                if ( self.optionLenghth == 1 ){
                    self.popup.attr( 'data-length', '1' );
                } else if ( self.optionLenghth == 2 ){
                    self.popup.attr( 'data-length', '2' );
                } else if ( self.optionLenghth == 3 ){
                    self.popup.attr( 'data-length', '3' );
                } else {
                    self.popup.attr( 'data-length', '4' );
                }

            },
            destroy: function(){
                self.text.remove();
                self.wrap.unwrap();
            },
            required: function(){
                var duration = 2000;
                i=0;

                if (self.obj.val() == 0) {

                    self.wrap.addClass('error');

                    setTimeout(function(){
                        self.wrap.removeClass('error');
                    }, duration);

                    return true;

                } else {
                    return false;
                }
            },
            update: function(){
                var curText = '';

                self.obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if( curText == '' ){
                    if (self.obj.attr('data-ares-placeholder')) {
                        curText =  self.obj.attr('data-ares-placeholder');
                        self.obj.prepend('<option selected value="0">' + curText + '</option>');
                    }
                    curText =  self.obj.find( 'option').eq( 0 ).text();
                }
                self.text.text( curText );
            },
            addWraper: function(){
                var curText = '';

                self.obj.css( {
                    opacity: 0
                } );

                self.obj.wrap( self.wrap );
                self.wrap = self.obj.parent();
                self.obj.before( self.text );
                self.obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if( curText == '' ){
                    if (self.obj.attr('data-ares-placeholder')) {
                        curText =  self.obj.attr('data-ares-placeholder');
                        self.obj.prepend('<option selected value="0">' + curText + '</option>');
                    }
                    curText =  self.obj.find( 'option').eq( 0 ).text();
                }
                self.text.text( curText );
            },
            showPopup: function(){
                var list = $( '<ul></ul>'),
                    curScroll = self.window.scrollTop(),
                    offset = self.wrap.offset(),
                    maxHeight = 0,
                    curIndex = self.obj.find( 'option:selected' ).index(),
                    id = Math.round( Math.random() * 1000 );

                if( self.opened ){
                    self.popup.remove();
                }
                self.opened = true;

                self.popup = $( '<div class="ares-select__popup" id="ares-select__popup' + id + '"></div>' );

                if ( self.curParent.length ){
                    self.popup.addClass('ares-select__popup_search')
                }

                self.obj.find( 'option' ).each( function(i){
                    var curItem = $( this );

                    if (self.obj.attr('data-ares-placeholder')) {
                        if( i == curIndex ){

                            if(curItem.data( 'text' )){
                                if ( i == 0 ) {
                                    list.append( '<li class="active placeholder">' + curItem.data( 'text' ) + '</li>' );
                                } else {
                                    list.append( '<li class="active">' + curItem.data( 'text' ) + '</li>' );
                                }
                            } else {
                                if ( i == 0 ) {
                                    list.append( '<li class="active placeholder">' + curItem.text() + '</li>' );
                                } else {
                                    list.append( '<li class="active">' + curItem.text() + '</li>' );
                                }
                            }

                        } else {

                            if(curItem.data( 'text' )){
                                if ( i == 0 ) {
                                    list.append( '<li class="placeholder">' + curItem.data( 'text' ) + '</li>' );
                                } else {
                                    list.append( '<li>' + curItem.data( 'text' ) + '</li>' );
                                }
                            } else {
                                if ( i == 0 ) {
                                    list.append( '<li class="placeholder">' + curItem.text() + '</li>' );
                                } else {
                                    list.append( '<li>' + curItem.text() + '</li>' );
                                }

                            }

                        }
                    } else {
                        if( i == curIndex ){

                            if(curItem.data( 'text' )){
                                list.append( '<li class="active">' + curItem.data( 'text' ) + '</li>' );
                            } else {
                                list.append( '<li class="active">' + curItem.text() + '</li>' );
                            }

                        } else {

                            if(curItem.data( 'text' )){
                                list.append( '<li>' + curItem.data( 'text' ) + '</li>' );
                            } else {
                                list.append( '<li>' + curItem.text() + '</li>' );
                            }

                        }
                    }

                } );

                self.popup.append( list );
                self.wrap.append( self.popup );

                self.core.calculateOptionLength();

                self.popup.css( {
                    width: self.wrap.outerWidth(),
                    left: 0,
                    top: self.wrap.outerHeight()
                } );

                maxHeight = self.popup.outerHeight();
                if( maxHeight > self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible ){
                    self.popup.height(self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible);
                    $('#ares-select__popup' + id).niceScroll({
                        cursorcolor:"#ebebeb",
                        cursoropacitymin: "1",
                        cursorborderradius: "5px",
                        cursorborder: "none",
                        cursorwidth: "5px"
                    });
                }

                if ( self.popup.parents( '.ares-select_size-chart' ).length ){

                    self.core.setWidthForSizeSelect();

                }

                if( self.showType == 1 ){
                    self.popup.css( {
                        display: 'none'
                    } );
                    self.popup.slideDown( 300, function(){
                        if( self.scroll ) {
                            self.popup.getNiceScroll().resize();
                        }
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.css( {
                        opacity: 1
                    } );
                    self.popup.animate( { opacity: 1 },300, function(){
                        if( self.scroll ) {
                            self.popup.getNiceScroll().resize();
                        }
                    } );
                }

                self.popup.find( 'li' ).on( {
                    'click': function( event ){
                        var event = event || window.event,
                            index = $( this ).index();

                        if (event.stopPropagation) {
                            event.stopPropagation()
                        } else {
                            event.cancelBubble = true
                        }

                        self.obj.val( self.obj.find( 'option' ).eq( index).attr( 'value' ) );
                        self.obj.trigger( 'change' );
                        self.core.hidePopup();
                        self.wrap.removeClass('active');

                    }
                } );
                self.curParent.addClass('active');

            },
            hidePopup: function(){
                self.opened = false;
                if( !self.showType ){
                    self.popup.css( {
                        display: 'none'
                    } );
                } else if( self.showType == 1 ){
                    self.popup.stop( true, false ).slideUp( 300, function(){
                        self.popup.remove();
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.stop( true, false ).fadeOut( 100, function(){
                        self.popup.remove();
                    } );
                }
                self.curParent.removeClass('active');
            },
            controls: function() {
                self.obj.on( 'change', function() {
                    if($( this ).find( 'option:selected' ).data('text')) {
                        self.text.html( $( this ).find( 'option:selected' ).data('text') );

                    } else {
                        self.text.html( $( this ).find( 'option:selected' ).text() );

                    }
                } );

                if( self.optionType == 1 && !self.device ){
                    self.wrap.on( {
                        'click': function(event){
                            var event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }

                            if( self.wrap.hasClass('active') ){
                                self.wrap.removeClass('active');
                                self.core.hidePopup();
                            } else {
                                $('.ares-select').removeClass('active');
                                $('.ares-select__popup').remove();
                                self.wrap.addClass('active');
                                self.core.showPopup();
                            }

                        }
                    } );
                    $( 'body' ).on( {
                        'click': function(){

                            if( self.opened ){
                                self.wrap.removeClass('active');
                                self.core.hidePopup();
                            }
                        }
                    } );
                }
            }
        };
    }
};