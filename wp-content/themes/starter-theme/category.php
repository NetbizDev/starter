<?php
  get_header(); ?>
<!-- Page Title Section -->
<div class="page-title-section">		
	<div class="overlay">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="page-title"><h1><?php echo single_cat_title("", false); ?></h1></div>
				</div>
				<div class="col-md-6">
					<ul class="page-breadcrumb">
					</ul>
				</div>
			</div>
		</div>	
	</div>
</div>
<div class="page-builder">
	<div class="container">
		<div class="row">
			<!-- Blog Area -->
			<div class="col-sm-12" >
			   <?php 
				if ( have_posts() ) : ?> 
				<ul class="wpb_wrapper grid effect-6" id="grid">
				<?php
					// Start the Loop.
					while ( have_posts() ) : the_post();
					?>
					<li  id="full_portfolio">
									<!--	 							   	<div class="bg_opacity_color" style="background-color:rgba(<?php echo $Final_Rgb_color; ?>, 0.<?php echo the_field('counter_for_opacity'); ?>);">-->
						  <div class="view view-first">
                    <img src="<?php echo the_post_thumbnail_url() ;?>" width="100%" height="100%" />
                    <div class="mask">
                        <h2><?php echo the_title();?></h2>
                        <p class="short_descrip"><?php the_excerpt();?></p>
                        <p class="author"><?php the_author();?></p><a href="<?php the_permalink();?>" class="info">Read More</a>
                    </div>
                    </div>
					
									<!--</div>-->
										
									</li>
					<?php
					endwhile;
				endif;
				?>
				<div class="blog-pagination">
				<?php
				// Previous/next page navigation.
				?>
				</div>
			<!-- /Blog Pagination -->
			</div>
			<!--Sidebar Area-->
			<!--Sidebar Area-->
		</div>
	</div>
</div>
<script>
			new AnimOnScroll( document.getElementById( 'grid' ), {
				minDuration : 0.4,
				maxDuration : 0.7,
				viewportFactor : 0.6
			} );
			</script>

<?php get_footer(); ?>