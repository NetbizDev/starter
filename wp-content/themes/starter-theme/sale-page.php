<?php
	/*
		Template Name: Sale Page
		*/
	
	 get_header(); 
	 $image_header=get_field('sale_image');
	 ?>
<div class="container">
	<div class="row">
		<div class="col-md-12 image">
		<?php	if( !empty($image_header) ): ?>
			<img src="<?php echo $image_header['url']; ?>" alt="<?php echo $image_header['alt']; ?>" />
	<?php endif; ?>
		</div>
	</div>	
	<div class="row">
		<div class="col-md-12 text">
			<h1 class="header_title"><?php the_title();?></h1>
			<?php echo the_content(); ?>
		</div>	
	</div>
		<div class="row sale-posts scrollme">
									<?php
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $args = array(
	    'posts_per_page' => -1,
		'orderby' => 'rand',
        'post_type' => 'product',
		'meta_query'     => array(
        	  'relation' => 'OR',
			  				array( // Simple products type
				            'key'           => '_sale_price',
				            'value'         => 0,
				            'compare'       => '>',
				            'type'          => 'numeric'
				        ),
				        array( // Variable products type
				            'key'           => '_min_variation_sale_price',
				            'value'         => 0,
				            'compare'       => '>',
				            'type'          => 'numeric'
				        )
			  )   
     );
    $wp_query = new WP_Query($args);
    if (have_posts()) :
    	while (have_posts()) : the_post(); 
    	$price_r = get_post_meta($post->ID,'_regular_price', true);    	
    	$price = get_post_meta($post->ID,'_sale_price', true);
    	 ?>
    	<div class="col-md-3">
	    	<a class="product_sa hvr-sweep-to-top" href="<?php the_permalink();?>">
				<div class="onsale_product">
					<img src="<?php the_post_thumbnail_url('medium');?>">
					<div class="details">
					<?php the_title();?>
					<br/>
						
					<del><span class="woocommerce-Price-amount amount">
					<span class="woocommerce-Price-currencySymbol">₪</span><?php echo $price_r;?></span></del>
					<ins><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₪</span><?php echo $price; ?></span></ins>
					
					</div>
				</div>	
			</a>	
		</div>		
    	<?php
    	endwhile;
    	endif;
    	wp_reset_query();
    ?>
		
		</div>	
</div>	


			
<?php get_footer(); ?>
