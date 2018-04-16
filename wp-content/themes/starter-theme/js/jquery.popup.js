var popup;

$(function(){

    $('.popup').each(function(){
        popup = new Popup($(this));
    });

});

var Popup = function( obj ){
    this.popup = obj;
    this.btnShow =  $('.popup__open');
    this.btnClose = obj.find( '.popup__close, .popup__cancel' );
    this.wrap = obj.find($('.popup__wrap'));
    this.contents = obj.find($('.popup__content'));
    this.window = $( window );
    this.scrollConteiner = $( 'html' );
    this.timer = setTimeout( function(){},1 );

    this.init();
};
Popup.prototype = {
    init: function(){
        var self = this;
        self.core = self.core();
        self.core.build();
    },
    core: function (){
        var self = this;

        return {
            alert: function( text, title ) {

                self.alertTitle = title;
                self.alertText = text;
                self.core.show( 'alert' );

            },
            build: function (){
                self.core.controls();

            },
            centerWrap: function(){
                if ( self.window.height() - 80 - self.wrap.height() > 0 ) {
                    self.wrap.css({top: ( ( self.window.height() -80 )- self.wrap.height())/2});
                } else {
                    self.wrap.css({top: 0});
                }
            },
            controls: function(){
                self.window.on( {
                    resize: function(){
                        self.core.centerWrap();
                    }
                } );
                self.btnShow.on( {
                    click: function(){

                        var curItem = $( this );
                        // TODO: check what the heck is this for?
                        if( curItem.attr( 'data-popup' ) == 'product-gallery' && self.window.width > 992 ){

                        }
                        else {
                            self.core.show( curItem.attr( 'data-popup' ) );
                        }

                        if ( curItem.attr( 'data-popup' ) === 'size-table'){
                            var sizeJSON = curItem.data('size');
                            $('#sizeTableTitle').html(sizeJSON.title);
                            $('#sizeTableContent').html(sizeJSON.content);
                            $('#sizeTableImage').attr('src', sizeJSON.image);
                        }

                        return false;
                    }
                } );
                self.contents.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                self.popup.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
                self.btnClose.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
            },
            hide: function(){
                var scroll = self.popup.find('.popup__scroll') ;

                $(document).find('.order .popup__scroll').getNiceScroll().remove();

                self.popup.css ({
                    'overflow-y': "hidden"
                });

                if( !( $('.site__header').hasClass('menu_opened') ) ) {
                    self.scrollConteiner.css( {
                        "overflow-y": "scroll"
                    } );
                }
                self.scrollConteiner.css( {
                    paddingRight: 0
                } );
                self.popup.removeClass('popup_opened');
                self.popup.addClass('popup_hide');
                location.hash = '';

                setTimeout( function(){
                    self.popup.css ({
                        'overflow-y': "scroll"
                    });
                    self.popup.removeClass('popup_hide');
                    if(scroll.length){
                        scroll.getNiceScroll().resize();
                    }
                }, 300 );

            },
            getScrollWidth: function (){
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "popup__scrollbar-measure";
                document.body.appendChild(scrollDiv);

                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);

                return scrollbarWidth;
            },
            show: function( className ){
                var scroll = self.popup.find('.popup__scroll') ;
                self.core.setPopupContent( className );

                self.scrollConteiner.css( {
                    overflow: "hidden",
                    paddingRight: self.core.getScrollWidth()

                } );
                self.popup.addClass('popup_opened');
                self.core.centerWrap();

                self.popup.css ({
                    'overflow-y': "hidden"
                });

                if(scroll.length){
                    scroll.getNiceScroll().resize();
                }

            },
            setPopupContent: function( className ){
                var curContent = self.contents.filter( '.popup__' + className );

                self.contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );

                if ( className == 'alert' ) {

                    var text = curContent.find( '.popup__alert-text'),
                        headerEn = curContent.find( '.popup__alert-head_en'),
                        headerHe = curContent.find( '.popup__alert-head_he');

                    text.html( self.alertText );

                    if ( self.alertTitle == undefined ){
                        headerHe.addClass( 'hidden' );
                        headerEn.removeClass( 'hidden' );
                    } else {
                        headerHe.html( self.alertTitle );
                        headerEn.addClass( 'hidden' );
                        headerHe.removeClass( 'hidden' );
                    }

                }

            }

        };
    }
};
