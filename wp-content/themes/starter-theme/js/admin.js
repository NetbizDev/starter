/**
 * Theme admin functions file
 *
 * Dependencies: Jquery TMPL
 *
 */

jQuery( function( $ ) {

    /*--------------------------------------------------*\
                    Multi Image Widget Box
    \*--------------------------------------------------*/
    var MultiImageWidget = function(button, multiple, inputNameAttr) {

        var _this = this;

        function init () {

            if(multiple) {
                _this.field_name = $(button).find('.gallery-data').data('key');
            }

            _this.container = $(button).parent().find('.image-preview');
            _this.frame = wp.media({
                title : widgetData.frame_title,
                multiple : multiple,
                library : { type : 'image' },
                button : { text : widgetData.button_title }
            });

            // Set the input name attribute for single mode
            if(!multiple) {
                _this.inputNameAttr = inputNameAttr;
            }

            attachEvents();
            initAdminGalleryArea();
        }

        function attachEvents(){
            // Upload Button
            $(button).find('.button').on('click', function(){
                uploader( multiple );
            });

            // Remove Image
            $('body').on('click', '.del-prev', function(e) {
                e.preventDefault();

                $(this).parent('.attchment-preview').fadeOut(function() {
                    $(this).remove();
                    setIndices();
                });
            });

            // Remove single image in featured media box
            $('body').on('click', '.featured-media-del-btn', function(e) {
                e.preventDefault();

                $(this).siblings().remove();
                $(this).remove();
            });

            // Handle results from media manager.
            _this.frame.on('close',function( ) {
                var attachments = _this.frame.state().get('selection').toJSON();

                if( attachments.length > 0 ){
                    render( attachments );
                }
            });
        }

        // Call this from the upload button to initiate the upload frame.
        function uploader( multiple ) {
            _this.frame.open();
            return false;
        }

        // Output Image preview and populate widget form.
        function render ( attachments ) {

            // Views
            var single_view =
                '<span class="featured-media-del-btn del-btn"></span>' +
                '<img src="${url}" class="category-cover-thumbnail">' +
                '<input class="data" type="hidden" id="${id}" name="'+_this.inputNameAttr+'" value="${id}"/>';

            var multiple_view =
                '<li class="attchment-preview" style="background-image: url(${url})">' +
                '<input class="data" type="hidden" id="${id}" name="" value="${id}"/>' +
                '<span class="del-prev"></span>' +
                '</li>';

            $(attachments).each( function ( index, value ) {
                if (multiple) {
                    // Append
                    _this.container.append( imgHTML( multiple_view, value, index) );
                } else {
                    // Replace
                    _this.container.html( imgHTML( single_view, value, index) );
                }
            });

            initAdminGalleryArea();
        }

        // Render html for the image.
        function imgHTML ( view, attachment, index ) {

            return $.tmpl( 
                view,
                attachment
            );
        }

        function setIndices ( event, ui ) {
            var items = _this.container.find('.attchment-preview');

            $(items).each( function ( index, value ){
                var new_index = _this.field_name+'[{0}]'.format(index);
                $(this).find('.data').attr('name', new_index);
            });
        }

        function initAdminGalleryArea () {
            if( _this.container.children('.attchment-preview').length > 0 ){
                setIndices();

                if (multiple) {
                    _this.container.sortable({
                        stop: setIndices
                    });
                }
            }
        }

        init();

    };

    /*--------------------------------------------------*\
             List Posts Metabox Search Field
    \*--------------------------------------------------*/
    var SearchBox = function( container ){
        var _this = this;

        _this.container = container;

        $.each(['change','keyup','paste','input paste','propertychange'],function(i,v){
            $('.search-box').bind(v,function(){
                var value = $(this).val();

                if(value.length){
                    _this.container.find('.item .label').each(function(){
                        if($(this).text().search(new RegExp(value, "i")) > -1) {
                            $(this).parent('li').show();
                        }else{
                            $(this).parent('li').hide();
                        }
                    });
                }else{
                    _this.container.find('.item').show();
                }
            });
        });
    }

    /*--------------------------------------------------*\
                    Link Buttom Box
    \*--------------------------------------------------*/
    var LinkButtonBox = function( container ) {
        var _this = this;

        function init() {
            _this.container = container;
            _this.button = $(_this.container.find('.link-btn'));

            attachEvents();
        }

        function attachEvents() {
            _this.button.on('click', function(e) {
                e.preventDefault();

                wpActiveEditor = true; //we need to override this var as the link dialog is expecting an actual wp_editor instance
                wpLink.open(); //open the link popup
                return false;
            });

            $('#wp-link-submit').on('click', function(event) {
                //the links attributes (href, target) are stored in an object, which can be access via  wpLink.getAttrs()
                var linkAttrs = wpLink.getAttrs();
                
                //get the href attribute and add to a textfield, or use as you see fit
                $('.result-field').val(linkAttrs.href);
                
                /* to close the link dialog, it is again expecting an wp_editor instance, so you need to give 
                *  it something to set focus back to. In this case, I'm using body, but the textfield with the URL would be fine */
                wpLink.textarea = $('body');

                //close the dialog
                wpLink.close();
                
                //trap any events
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                event.stopPropagation();
                return false;
            });

            $('#wp-link-cancel, #wp-link-close').on('click', function(event) {
                wpLink.textarea = $('body');
                wpLink.close();
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                event.stopPropagation();
                return false;
            });
        }

        init();
    }

    /*--------------------------------------------------*\
                    Affiliates Box
    \*--------------------------------------------------*/
    var AffiliatesBox = function( container ) {
        var _this = this;

        // Constructor
        function init() {
            _this.container = container;
            _this.list = $('.affiliates-list');
            _this.template = $('.module').html();
            _this.data = $('#listData').val();
            _this.jsonData = JSON.parse(_this.data);
            _this.key = _this.jsonData.key;
            _this.countListItems = 0;

            _this.frame = wp.media({
                title : "Choose Profile Picture",
                multiple : false,
                library : { type : 'image' },
                button : { text : "Done" }
            });

            $(_this.list).sortable( {
                stop: setIndices
            });

            renderList();
            attachEvents();
        }

        function createEmptyListItem() {
            return {
                key: _this.key,
                index: _this.countListItems + 1,
                data: {
                    img: {
                        id: -1,
                        src: setImageSrc('')
                    }
                },
                checked: '',
                hasImage: 'hidden'
            };
        }

        function renderList() {
            var output = '';
            var listItem = {};
            // optional, speeds up future uses
            Mustache.parse(_this.template);

            listItem.key = _this.key;

            $.each(_this.jsonData, function(index, value) {
                if(index != 'key') {

                    listItem.index = index;
                    listItem.data = value;
                    listItem.checked = checked( value.checkbox );
                    listItem.hasImage = function() {
                        return (value.img.id != -1) ? 'block' : 'hidden';
                    };
                    output += Mustache.render(_this.template, listItem);

                    // Update the number of list items
                    _this.countListItems = parseInt(index);
                }
            });

            $(_this.list).append(output);
        }

        function setImageSrc(src) {
            if(src == '') {
                return theme_data.theme_dir + '/images/affiliate-placeholder.png';
            }
        }

        function attachEvents() {

            // Add new affiliate item
            $('.add-affiliate-btn').on('click', function(e) {
                e.preventDefault();

                var emptyListItem = createEmptyListItem();
                var output = Mustache.render(_this.template, emptyListItem);
                $(_this.list).append(output);
                _this.countListItems++;
            });

            // Remove affiliate item
            $(_this.list).on('click', '.delete-affiliate', function(e) {
                e.preventDefault();

                $(this).parent().remove();
                _this.countListItems--;
                setIndices();
            });

            // Image Uploader
            $(_this.list).on('click', '.upload-button', function(e) {
                e.preventDefault();

                _this.lastClickedUploader = $(this);
                _this.frame.open();
                return false;
            });

            // Delete image
            _this.list.on('click', '.photo-del-btn', function(e) {
                e.preventDefault();

                var $this = $(this);

                $this.siblings('img').attr('src', setImageSrc(''));

                $this.siblings('input.data')
                    .attr({
                        id: -1,
                        value: -1
                    });
                $this.fadeOut();
            });

            // Handle results from media manager.
            _this.frame.on('close',function() {
                var selectedImage = _this.frame.state().get('selection').toJSON();

                if( selectedImage.length > 0 ) {
                    var listItem = _this.lastClickedUploader.parent();

                    listItem.find('input.data[type=hidden]').attr({
                        id: selectedImage[0].id,
                        value: selectedImage[0].id
                    });

                    listItem.find('img').attr('src', selectedImage[0].url).fadeIn();
                    listItem.find('.del-btn').fadeIn();
                }
            });
        }


        function setIndices () {
            var items = $(_this.list).find('.affiliate-item');
            //console.log(items);;
            $(items).each( function ( index, value ) {
                var $value = $(value);

                // Delete Button
                var $currentElement = $value.find('.delete-affiliate');
                $currentElement.attr('data-index', index);

                // Image hidden input
                $currentElement = $value.find('input.data');
                $currentElement.attr('name', _this.key+'[{0}][img_id]'.format(index));

                // Name
                $currentElement = $value.find('.affiliate-name');
                $currentElement.attr('name', _this.key+'[{0}][name]'.format(index));

                // Position
                $currentElement = $value.find('.affiliate-position');
                $currentElement.attr('name', _this.key+'[{0}][position]'.format(index));

                // Checkbox
                $currentElement = $value.find('input[type=checkbox]');
                $currentElement.attr('name', _this.key+'[{0}][checkbox]'.format(index));
            });
        }

        function checked( value ) {
            return (value == 'on') ? 'checked' : '';
        }

        init();
    }


    // List Posts
    if( $('.list-posts-box').length > 0 ) {
        new SearchBox( $('.list-posts-box') );
    }

    // WP Link Button
    if( $('.link-button-metabox').length > 0 ) {
        new LinkButtonBox( $('.link-button-metabox') );
    }

    // Affiliates Box
    if( $('.affiliates-metabox').length > 0 ) {
        new AffiliatesBox( $('.affiliates-metabox') );
    }

    // Multi Image Widget
    if( $('.uploader').length > 0 ) {

        $('.uploader').each(function(i, button) {

            if ( $(button).hasClass('multiple') ) {
                new MultiImageWidget(button, true);
            } else {
                var inputNameAttr = $(button).prev().children('input.data[type=hidden]').attr('name');
                new MultiImageWidget(button, false, inputNameAttr);
            }
        });
    }
});






