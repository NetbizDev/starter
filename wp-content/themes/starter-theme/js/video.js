document.addEventListener( 'DOMContentLoaded', function() {
    var i,
        video = document.getElementsByClassName( 'owp-youtube-player' );
         
    for (i = 0; i < video.length; i++) {
 
        // We get the thumbnail image from the YouTube ID
        video[i].style.backgroundImage = 'url(//i.ytimg.com/vi/' + video[i].dataset.id + '/maxresdefault.jpg)';
 
        video[i].onclick = function() {
            var iframe  = document.createElement( 'iframe' ),
                embed   = 'https://www.youtube.com/embed/ID?autoplay=1&rel=0&controls=0&showinfo=0&mute=0&wmode=opaque';
            iframe.setAttribute( 'src', embed.replace( 'ID', this.dataset.id ) );
            iframe.setAttribute( 'frameborder', '0' );
            iframe.setAttribute( 'allowfullscreen', '1' );
            this.parentNode.replaceChild( iframe, this );
        }
 
    }
 
} );