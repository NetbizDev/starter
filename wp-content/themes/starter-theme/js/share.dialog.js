$(function(){

    $('.product-share-dialog').each(function(){
        new ShareDialog($(this));
    });

});

var ShareDialog = function( obj ){

    // Private members
    var _self = this,
        _dialog = obj,
        _id = obj[0].id,
        _twitter = twttr,
        _showCTA = $('.dialog-open'),
        _hideCTA = $('.dialog-close');

    // Private methods
    var attachEvents = function() {

        _showCTA.on({ click: _self.show });

        _hideCTA.on({ click: _self.hide });

        _dialog.on({
            click: function(e) {
                if (e.target.id == _id) _self.hide();
            }
        });

        _twitter.ready(function() {
            _twitter.events.bind('tweet', _self.hide);
        });
    },

    init = function() {
        attachEvents();
    };

    // Prototype
    _self.show = function() {

        var parentWrapper = _showCTA.parents( '.product-form' ),
            addToCartBtn = parentWrapper.find('.add-to-cart-btn'),
            productPriceHTML = addToCartBtn.data('product-price'),
            productNameHTML = addToCartBtn.data('product-name'),
            picUrl = parentWrapper.find( '.product__gallery-pic').css( 'background-image' ),
            popupInput = _dialog.find('.link-input'),
            popupPic = _dialog.find( '.share-image'),
            popupName = _dialog.find('.product-title'),
            popupPrice = _dialog.find('.share-price');

        popupInput.val( decodeURI(location.href) );
        popupPic.css({ 'background-image': picUrl });
        popupName.html(productNameHTML);
        popupPrice.html(productPriceHTML);

        _dialog.addClass('active');
    };

    _self.hide = function() {
        _dialog.removeClass('active');
    };

    init();

};