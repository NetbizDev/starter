<!DOCTYPE html>

<html <?php //language_attributes(); /* TODO: find a way to set locale */ ?> lang="he" dir="ltr">

	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width initial-scale=1.0, maximum-scale=1.0">

		<title><?php wp_title(); ?></title>
		<meta property="og:title" content="<?php wp_title(); ?>" />
		<meta property="og:site_name" content="Amberjack"/>
		<meta property="og:url" content="<?php echo home_url(); ?>" />
		<meta property="og:description" content="" />
		<meta property="fb:app_id" content="" />
		<meta property="og:image" content="<?php the_post_thumbnail_url(); ?>" />

		<meta name="google-site-verification" content="dk8bwScD6v6x4fS4h35_AFZqQV9gfpj4AZFTDkL-Stc" />


	
		<meta name="twitter:card" content="summary_large_image">
		<?php wp_head(); ?>
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/font-awesome.min.css" />
		
		  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

  <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">

	<!--	<link href="https://fonts.googleapis.com/css?family=Heebo:100,200,300,400,500,600,700,800,900" rel="stylesheet">-->
    <script type='text/javascript'>
        $(document).ready(function() {
            $('.mytooltip').tooltipster({
	            theme: 'tooltipster-light',
	            side : 'bottom'
            });
        });
    </script>
<!--<script>
    function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 300,
                header = document.querySelector("header.desktop_");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
    window.onload = init();
</script>-->


<!--
	For dataLayer needs
	
	<script >
	document.addEventListener( 'wpcf7mailsent', function( event ) {
        dataLayer.push({'event' : 'FormSubmitted'});
    	});

</script>-->

    </head>
	<body <?php body_class(); ?>>
				<div id="ip-container" class="ip-container">

					<div class="ip-header">
	        <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">
				<div class="ip-loader">
					<svg class="ip-inner" width="60px" height="60px" viewBox="0 0 80 80">
						<path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
						<path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
					</svg>
				</div>
			</div>

<?php 
		$version_header = get_field_object('version_of_header','option');
get_template_part( 'header-template/header-'. $version_header['value'] );
	
	
?>

<!--		<div class="md-modal md-effect-6" id="modal-6">
					<button class="md-close"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="md-content">
				<div>
				</div>
			</div>
		</div>-->
<!--<div id="barba-wrapper">
  <div class="barba-container">-->
		<!--
			Maps API connection
			
			<script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBLgSk589-YVVpDT7eckbfy0Tkczj-a7FE" type="text/javascript"></script>-->


