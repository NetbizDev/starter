<?php
get_header();
$header_img = get_field('image_header');
$icon_right = get_field('icon_left');
 ?>
<!-- Blog Section Right Sidebar -->
<div class="page-builder">
	<div class="container">
		<div class="row header">
			<div class="col-sm-12 image">
			<?php	if( !empty($header_img) ): ?>
				<img src="<?php echo $header_img['url']; ?>" alt="<?php echo $header_img['alt']; ?>" />
			<?php endif; ?>


			</div>	
		</div>	
		<div class="row content-post">
			<div class="col-sm-1 side-post">
			<?php	if( !empty($icon_right) ): ?>
				<img src="<?php echo $icon_right['url']; ?>" alt="<?php echo $icon_right['alt']; ?>" />
			<?php endif; ?>

			</div>
		
			<!-- Blog Area -->
			<div class="col-sm-11 post">
				<div class="cont-padding">
					<h1><?php the_title(); ?> </h1>
			<?php the_content(); ?>
			</div>
			</div>
			<!-- /Blog Area -->			
			<!--Sidebar Area-->
			<!--Sidebar Area-->
		</div>
	</div>
</div>
<!-- /Blog Section Right Sidebar -->
<?php get_footer(); ?>