<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>

<?php
	/**
	 * woocommerce_before_single_product hook.
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }
?>
<div class="container">
<div class="row">
	<div class="col-md-9">
		<p class="product_title entry-title mobile_"><?php the_title(); ?></p>
	<?php
		/**
		 * woocommerce_before_single_product_summary hook.
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		do_action( 'woocommerce_before_single_product_summary' );
		echo '<div class="single-product--form">' . do_shortcode('[contact-form-7 id="991" title="Single Product"]') . '</div>';
	?>
	<div class="desktop_">
	<?php
		/**
		 * woocommerce_after_single_product_summary hook.
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
		do_action( 'woocommerce_after_single_product_summary' );
		
	?>
	</div>
	</div>
	<div class="col-md-3 goods__filters">
			
		<?php wc_get_template('single-product/meta.php'); ?>
 		<div class="arrows">
			<?php previous_post_link(' %link' , '<i class="fa fa-angle-right" title="previous" aria-hidden="true"></i>'); ?>     
			<?php next_post_link('%link', '<i class="fa fa-angle-left" title="next" aria-hidden="true"></i>'); ?>  
		</div>
						<?php
			//do_action( 'woocommerce_single_product_summary' );



				//	wc_get_template('single-product/add-to-cart/variable.php');
				//	wc_get_template('single-product/add-to-cart/grouped.php');
				//	wc_get_template('loop/add-to-cart.php');
				//	wc_get_template('single-product/add-to-cart/simple.php');

				?>
				<h1 class="product_title entry-title"><?php the_title(); ?></h1>
				<div class="woocommerce-product-details__short-description"><p><?php echo the_excerpt(); ?></p></div>
				
					<h2 class="title_table">פרטי המוצר</h2>
					    <div class="tooltip_templates">

    <div id="tooltip_1"></div>  
    <div id="tooltip_2"></div>
	<div id="tooltip_3"></div>
    </div>

				<table class="attrs"><tbody><tr><td>סוג המתכת</td><td><?php echo the_field('attr_3');?></td></tr><tr><td>משקל היהלום המרכזי</td><td><?php echo the_field('attr_1');?></td></tr><tr><td>משקל אבני צד</td><td><?php echo the_field('attr_5');?></td></tr><tr class="mytooltip tooltipstered" data-tooltip-content="#tooltip_1"><td><span>צבע היהלום <i class="fa fa-question-circle" aria-hidden="true"></i></span></td><td><?php echo the_field('attr_4');?></td></tr><tr class="mytooltip tooltipstered" data-tooltip-content="#tooltip_2"><td><span>נקיון היהלום <i class="fa fa-question-circle" aria-hidden="true"></i></span></td><td><?php echo the_field('attr_2');?></td></tr><tr class="mytooltip tooltipstered" data-tooltip-content="#tooltip_3"><td><span>איכות הליטוש <i class="fa fa-question-circle" aria-hidden="true"></i></span></td><td><?php echo the_field('attr_6');?></td></tr></tbody></table>	
				<?php
					global $post;
					//echo $post->ID;
					$price = get_post_meta($post->ID, '_regular_price', true);
					$price = number_format($price);
					if (empty($price)){ } else {
				?>
				<p class="price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₪</span><?php 					echo $price; ?></span></p>
			<?php 			
					wc_get_template('single-product/product-attributes.php'); ?>

				<?php
					do_action( 'woocommerce_single_product_summary' );
					 }
					 ?>
				<h3 class="title_icons">בכל קנייה מקבלים</h3>
		<div class="row icons">

			<div class="col-xs-10 col-sm-10">
				<p>תעודה גמולוגית</p>
			</div>
						<div class="col-xs-2 col-sm-2">
			<img src="https://www.amberjack.co.il/wp-content/uploads/2017/06/1_Productring.png"/>
			</div>	
		</div>	
		<div class="row icons">

			<div class="col-xs-10 col-sm-10">
				<p>הערכת תכשיט לביטוח</p>
			</div>
			<div class="col-xs-2 col-sm-2">
			<img src="https://www.amberjack.co.il/wp-content/uploads/2017/06/1_Produccasht.png"/>
			</div>	
		</div>			
		<div class="row icons">

			<div class="col-xs-10 col-sm-10">
				<p>   אחריות על התכשיט</p>
			</div>
						<div class="col-xs-2 col-sm-2">
			<img src="https://www.amberjack.co.il/wp-content/uploads/2017/06/1_Productpresent.png"/>
			</div>	
		</div>			
		<div class="row icons">

			<div class="col-xs-10 col-sm-10">
				<p>אריזה מהודרת</p>
			</div>
						<div class="col-xs-2 col-sm-2">
			<img src="https://www.amberjack.co.il/wp-content/uploads/2017/06/1_Productgarant.png"/>
			</div>	
		</div>			
	    <div class="form">
	<?php  //echo do_shortcode('[contact-form-7 id="290" title="Widget"]'); ?>
	</div>			
	</div>	
		<?php 
		echo '<div class="col-xs-12">';
echo '<div class="mobile_">';
		do_action( 'woocommerce_after_single_product_summary' );
echo '</div>';
		echo '</div>'; ?>	
</div>
</div>
