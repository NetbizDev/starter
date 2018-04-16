  $.ajax({
  url: 'cart_ajax.ajaxurl',

  updatecart = function(qty) {
    var currentVal, data, item_hash, request;
    currentVal = void 0;
    data = void 0;
    item_hash = void 0;
    currentVal = parseFloat(qty);
    request = $.ajax({
      url: 'ajax_object.ajax_url',
      method: 'POST',
      data: {
        quantity: currentVal,
        action: 'update_my_cart'
      },
      dataType: 'html'
    });
    request.done(function(msg) {
      alert('cart update ');
    });
    request.fail(function(jqXHR, textStatus) {
      alert('Request failed: ' + textStatus);
    });
  }; 