<?php
/*
 *  Author: Resdenis
 *  *  Custom functions, support, custom post types and more.
 */

/*------------------------------------*\
	External Modules/Files
\*------------------------------------*/


class OceanWP_Child_Theme {
 
    /**
     * Main Theme Class Constructor
     */
    public function __construct() {
 
        // Register the video widget
        add_action( 'elementor/widgets/widgets_registered', array( 'OceanWP_Child_Theme', 'widgets_registered' ) );
 
        // Load the video widget script
        add_action( 'elementor/frontend/after_register_scripts', array( 'OceanWP_Child_Theme', 'register_scripts' ) );
 
    } // End constructor
 
    // Register the video widget
    public static function widgets_registered() {
 
        // We check if the Elementor plugin has been installed / activated.
        if ( defined( 'ELEMENTOR_PATH' ) && class_exists( 'Elementor\Widget_Base' ) ) {
            require_once( get_stylesheet_directory() .'/widgets/video.php' );
        }
 
    }
 
    // Load the video widget script
    public static function register_scripts() {
 
        // Register video script
        wp_register_script( 'owp-video', get_stylesheet_directory_uri() .'/js/video.js', [ 'jquery' ], 1.0, true );
 
    }
 
}
new OceanWP_Child_Theme;
# Automatically clear autoptimizeCache if it goes beyond 256MB
if (class_exists('autoptimizeCache')) {
	$myMaxSize = 256000; # You may change this value to lower like 100000 for 100MB if you have limited server space
	$statArr=autoptimizeCache::stats(); 
	$cacheSize=round($statArr[1]/1024);
	
	if ($cacheSize>$myMaxSize){
	   autoptimizeCache::clearall();
	   header("Refresh:0"); # Refresh the page so that autoptimize can create new cache files and it does breaks the page after clearall.
	}
}
add_filter( 'loop_shop_per_page', 'new_loop_shop_per_page', 20 );

function new_loop_shop_per_page( $cols ) {
  // $cols contains the current number of products per page based on the value stored on Options -> Reading
  // Return the number of products you wanna show per page.
  $cols = 24;
  return $cols;
}
/* Display WooCommerce product category description on all category archive pages */
  add_action( 'woocommerce_after_subcategory_title', 'show_cat_description', 12);
  function show_cat_description ($category) {
    $cat_id = $category->term_id;
    $prod_term = get_term($cat_id, 'product_cat');
    $description = $prod_term->description;
    echo '<div class="shop_cat_desc">'.$description.'</div>';
  }/*------------------------------------*\
	General
\*------------------------------------*/
require_once('inc/wp_bootstrap_navwalker.php');
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}
add_theme_support( 'post-thumbnails' );

remove_action('woocommerce_after_single_product_summary','woocommerce_upsell_display', 15);
remove_action('woocommerce_after_single_product_summary','woocommerce_output_product_data_tabs', 10);
remove_action('woocommerce_single_product_summary','woocommerce_template_single_meta', 40);



function extend_admin_scripts(){
    wp_enqueue_media();

//    wp_enqueue_style('admin-style', get_template_directory_uri() . '/stylesheets/admin.css' );
    wp_enqueue_script('utils-admin', get_template_directory_uri()."/js/utils.js", array('jquery'));

    wp_enqueue_script('admin-js', get_template_directory_uri() . '/js/admin.js', array('jquery', 'utils'));

    wp_localize_script('admin-js', 'admin_data', array('ajaxurl' => admin_url( 'admin-ajax.php' )));
    wp_localize_script('admin-js', 'theme_data', array('theme_dir' => get_template_directory_uri()));

    wp_localize_script('admin-js', 'widgetData',
        array(
            'frame_title' => 'Choose images',
            'button_title' => 'Insert'
        )
    );
}
add_action( 'admin_enqueue_scripts',  'extend_admin_scripts' );

function load_scripts_and_styles() {
    // Css
    wp_enqueue_style('app-style', get_bloginfo('template_url') . '/stylesheets/app.css');
    wp_enqueue_style('style', get_bloginfo('template_url') . '/style.css');
    wp_enqueue_style('tooltips', get_bloginfo('template_url') . '/css/tooltipster.bundle.min.css');
//    wp_enqueue_style('noJS', get_bloginfo('template_url') . '/css/noJS.css');
//    wp_enqueue_style('demo', get_bloginfo('template_url') . '/css/demo.css');

  //  wp_enqueue_style('responsive', get_bloginfo('template_url') . '/stylesheets/responsive.css');
    //wp_enqueue_style('car', get_bloginfo('template_url') . '/stylesheets/owl.carousel.css');
   // wp_enqueue_style('owl-car', get_bloginfo('template_url') . '/stylesheets/owl-carousel.css');
    //wp_enqueue_style('flexsl', get_bloginfo('template_url') . '/stylesheets/flexslider.css');
    //wp_enqueue_style('extra', get_bloginfo('template_url') . '/stylesheets/extralayers.css');
    //wp_enqueue_style('icons', get_bloginfo('template_url') . '/stylesheets/et-icons.css');
    //wp_enqueue_style('dark', get_bloginfo('template_url') . '/stylesheets/dark.css');
 //   wp_enqueue_style('bootstrap.min', get_bloginfo('template_url') . '/stylesheets/bootstrap.min.css');
   // wp_enqueue_style('bootstrap', get_bloginfo('template_url') . '/stylesheets/bootstrap.css');
//    wp_enqueue_style('app-style', get_bloginfo('template_url') . '/stylesheets/bootstrap-theme.min.css');
 //   wp_enqueue_style('bootstrap-theme.', get_bloginfo('template_url') . '/stylesheets/bootstrap-theme.css');
   // wp_enqueue_style('animate', get_bloginfo('template_url') . '/stylesheets/animate.min.css');

    // jQuery
    wp_deregister_script('jquery'); // Deregister WordPress jQuery
    wp_enqueue_script( 'jquery', get_bloginfo('template_url') . '/scripts/vendors/jquery-2.1.3.min.js');
    wp_enqueue_script( 'jquery', get_bloginfo('template_url') . '/scripts/vendors/velocity.ui.min.js');


    // Google maps
	// TODO fix after code refactor
   
    // Vendor scripts
    // TODO: use gulp or CDN
     
    $vendor_scripts = array('jquery.flexslider-min.js', 'tooltipster.bundle.min.js', 'headline-main.js','navi-main-min.js', 'bootstrap.min.js', 'jquery.mixitup.min.js', 'owl.carousel.min.js', 'swiper.jquery.min.js', 'hammer.min.js', 'jquery.nicescroll.min.js', 'swiper.jquery.min.js', 'tween-max.min.js', 'fastclick.min.js', 'tipped.js', 'snap.svg-min.js', 'main.js', 'modernizr.js', 'cssParser.js', 'masonry.pkgd.min.js','imagesloaded.js', 'classie.js','jquery.scrollme.min.js', 'menu.js','pathLoader.js');

    foreach ($vendor_scripts as $script) {
        wp_enqueue_script($script, get_bloginfo('template_url') . '/scripts/vendors/' . $script, array('jquery'));
    }

    // User scripts
    wp_enqueue_script('app-js', get_bloginfo('template_url') . '/scripts/app.min.js', $vendor_scripts);

    wp_localize_script('app-js', 'theme_data', array(
	    'theme_dir' => get_template_directory_uri(),
	    'ajaxurl' => admin_url( 'admin-ajax.php' )
    ));
}
add_action('wp_enqueue_scripts', 'load_scripts_and_styles');
//remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );


//add_action( 'woocommerce_single_product_summary', 'woocommerce_template_loop_add_to_cart', 30 );


add_filter('loop_shop_columns', 'loop_columns');
if (!function_exists('loop_columns')) {
function loop_columns() {
return 3; // 3 products per row
}
}
function woo_related_products_limit() {
  global $product;
	
	$args['posts_per_page'] = 4;
	return $args;
}
add_filter( 'woocommerce_output_related_products_args', 'jk_related_products_args' );
  function jk_related_products_args( $args ) {
	$args['posts_per_page'] = 4; // 4 related products
	$args['columns'] = 4; // arranged in 2 columns
	return $args;
}

/**
 * Place a cart icon with number of items and total cost in the menu bar.
 *
 * Source: http://wordpress.org/plugins/woocommerce-menu-bar-cart/
 */
 //add_theme_support( 'wc-product-gallery-zoom' );
 add_theme_support( 'wc-product-gallery-lightbox' );
add_theme_support( 'wc-product-gallery-slider' );

add_filter('wp_nav_menu_items','sk_wcmenucart', 10, 2);
function sk_wcmenucart($menu, $args) {

	// Check if WooCommerce is active and add a new item to a menu assigned to Primary Navigation Menu location
	if ( !in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) || 'primary' !== $args->theme_location )
		return $menu;

	ob_start();
		global $woocommerce;
		$viewing_cart = __('View your shopping cart', 'your-theme-slug');
		$start_shopping = __('Start shopping', 'your-theme-slug');
		$cart_url = $woocommerce->cart->get_cart_url();
		$shop_page_url = get_permalink( woocommerce_get_page_id( 'shop' ) );
		$cart_contents_count = $woocommerce->cart->cart_contents_count;
		$cart_contents = sprintf(_n('%d item', '%d items', $cart_contents_count, 'your-theme-slug'), $cart_contents_count);
		$cart_total = $woocommerce->cart->get_cart_total();
		// Uncomment the line below to hide nav menu cart item when there are no items in the cart
		// if ( $cart_contents_count > 0 ) {
			if ($cart_contents_count == 0) {
				$menu_item = '<li class="right"><a class="wcmenucart-contents" href="'. $shop_page_url .'" title="'. $start_shopping .'">';
			} else {
				$menu_item = '<li class="right"><a class="wcmenucart-contents" href="'. $cart_url .'" title="'. $viewing_cart .'">';
			}

			$menu_item .= '<i class="fa fa-shopping-cart"></i> ';

			$menu_item .= $cart_contents.' - '. $cart_total;
			$menu_item .= '</a></li>';
		// Uncomment the line below to hide nav menu cart item when there are no items in the cart
		// }
		echo $menu_item;
	$social = ob_get_clean();
	return $menu . $social;

}
function theme_widgets_init() {
	register_sidebar( array(
		'name'          => 'Widget Area',
		'id'            => 'sidebar-1',
		'description'   => 'Add widgets here to appear in your sidebar.',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'theme_widgets_init' );
 
//add_action('wp_head', 'efs_script');
function dequeue_irrelevant_styles() {
	// Dequeue woocommerce rtl plugin front-end styles
	wp_dequeue_style( 'woocommerce-layout-rtl' );
	wp_dequeue_style( 'woocommerce-smallscreen-rtl' );
	wp_dequeue_style( 'woocommerce-general-rtl' );
	wp_dequeue_style( 'wcrtl-general' );

	// Dequeue pelecard styles
	wp_dequeue_style( 'pelecard' );
}
add_action('wp_enqueue_scripts', 'dequeue_irrelevant_styles', 20);

function remove_hover_rules() {
	get_template_part('partials/hover-fix-script');
}
add_action('wp_footer', 'remove_hover_rules');

// Add image size for the Technology attribute logos
add_image_size('tech_logo', 9999, 50, false);

/*------------------------------------*\
	Menus
\*------------------------------------*/
function the_left_menu() {
    wp_nav_menu(
        array(
	        'menu'            => 'left-menu',
	        'container'       => 'nav',
	        'container_class' => 'left-top-menu-container',
	        'menu_class'      => 'left-top-menu'
        )
    );
}
function the_right_menu() {
    wp_nav_menu(
        array(
	        'menu'            => 'right-menu',
	        'container'       => 'nav',
	        'container_class' => 'right-top-menu-container',
	        'menu_class'      => 'right-top-menu'
        )
    );
}
function the_primary_menu() {
    wp_nav_menu(
        array(
	        'menu'            => 'primary',
	        'container'       => 'nav',
	        'container_class' => 'mobile-menu-container',
	        'menu_class'      => 'mobile-top-menu'
        )
    );
}
function register_my_menus() {

register_nav_menus( array(
    'primary' => __( 'primary', 'Netbiz-theme' ),
    'left-menu' => __('Left-menu', 'Netbiz-theme'),
    'second-right-menu' => __('Right-menu', 'Netbiz-theme')

) );
}
add_action( 'init', 'register_my_menus' );

/*
	function the_main_menu() {
	wp_nav_menu(
		array(
			'menu'            => 'Main',
			'container'       => 'nav',
			'container_class' => 'main-menu-container',
			'menu_class'      => 'main-menu',
			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>' . get_activities_menu( false, true ),
			'walker'          => new MainMenuWalker
		)
	);
}

*/
function the_hp_mobile_menu() {
	wp_nav_menu(
		array(
			'menu'            => 'Home Page Mobile Menu',
			'container'       => 'nav',
			'container_class' => 'mobile-index-menu-container',
			'menu_class'      => 'hp-mobile-menu mobile-index-menu',
		)
	);
}

function the_footer_mobile_menu() {
	wp_nav_menu(
		array(
			'menu'       => 'Footer Mobile Menu',
			'menu_class' => 'footer-menu footer-mobile-menu',
			'container'  => false
		)
	);
}

function the_footer_categories_menu() {
	wp_nav_menu(
		array(
			'menu'       => 'Footer Categories Menu',
			'menu_class' => 'footer-menu footer-categories-menu',
			'container'  => false,
		)
	);
}

function the_footer_general_menu() {
	wp_nav_menu(
		array(
			'menu'       => 'Footer General Menu',
			'menu_class' => 'footer-menu footer-general-menu',
			'container'  => false,
		)
	);
}





// Allows to upload SVG images to the media library
function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

/**
* Show all product attributes on the product page
*/
function isa_woocommerce_all_pa(){
    $i_count=0;
    global $product;
    $attributes = $product->get_attributes();
    if ( ! $attributes ) {
        return;
    }
    
    $out = '<hr class="clear-line"/>
   <h2 class="title_table">פרטי המוצר</h2>
     <table class="attrs">';
    
    foreach ( $attributes as $attribute ) {
	$i_count++;
            // skip variations
            if ( $attribute->get_variation() ) {
                continue;
            }
        $name = $attribute->get_name();
        if ( $attribute->is_taxonomy() ) {
  
            $terms = wp_get_post_terms( $product->get_id(), $name, 'all' );
            // get the taxonomy
            $tax = $terms[0]->taxonomy;
            // get the tax object
            $tax_object = get_taxonomy($tax);
            // get tax label
            if ( isset ($tax_object->labels->singular_name) ) {
                $tax_label = $tax_object->labels->singular_name;
            } elseif ( isset( $tax_object->label ) ) {
                $tax_label = $tax_object->label;
                // Trim label prefix since WC 3.0
                if ( 0 === strpos( $tax_label, 'Product ' ) ) {
                   $tax_label = substr( $tax_label, 8 );
                }                
            }
            if($i_count === 4){
	            	        $out .= '<tr class="mytooltip" data-tooltip-content="#tooltip_1"><td><span >'.$tax_label . ' <i class="fa fa-question-circle" aria-hidden="true"></i></span></td>';

            }elseif($i_count === 5){
	            	        $out .= '<tr class="mytooltip" data-tooltip-content="#tooltip_2"><td><span >'.$tax_label . ' <i class="fa fa-question-circle" aria-hidden="true"></i></span></td>';

            } elseif($i_count === 6){
	            	            	 $out .= '<tr class="mytooltip" data-tooltip-content="#tooltip_3"><td><span >' . $tax_label . ' <i class="fa fa-question-circle" aria-hidden="true"></i></span></td>';
	             }else{
	            	            	        $out .= '<tr><td>' .$tax_label . '</td>';

            }
            $tax_terms = array();
            foreach ( $terms as $term ) {
                $single_term = esc_html( $term->name );
                array_push( $tax_terms, $single_term );
            }
            $out .= '<td>'. implode(', ', $tax_terms) .  '</td></tr>';
                
        } else {
            $out .= $name . ': ';
            $out .= esc_html( implode( ', ', $attribute->get_options() ) ) . '<br />';
        }
    }
     $out .="</table>";
    echo $out;
}
     
add_action('woocommerce_single_product_summary', 'isa_woocommerce_all_pa', 40);

/*========================*\
    Logo functions
\*========================*/
function the_logo($file_name, $wrapper_class = 'logo', $img_classes = 'logo-image') {
    printf('<a href="%s" class="%s">
                <img class="%s" src="%s" alt="Outsiders logo">
            </a>', get_home_url(), $wrapper_class, $img_classes, get_image_url($file_name));
}

add_action( 'wp_ajax_nopriv_load-filter', 'prefix_load_cat_posts' );
add_action( 'wp_ajax_load-filter', 'prefix_load_cat_posts' );



add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}



function remove_default_woo_checkout_actions() {
	// By default, woo commerce will print coupon code notice on checkout page
	// Since we want to control where it shows, we remove it
	remove_action('woocommerce_before_checkout_form', 'woocommerce_checkout_login_form', 10);
	remove_action('woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10);
}
add_action('woocommerce_init', 'remove_default_woo_checkout_actions');

add_filter('wp_get_attachment_image_attributes', 'change_attachement_image_attributes', 20, 2);
function change_attachement_image_attributes($attr, $attachment) {
    global $post;
    if ($post->post_type == 'product') {
        $title = $post->post_title;
        $attr['alt'] = $title;
        $attr['title'] = $title;
    }
    return $attr;
}   

//Product Cat Create page
function wh_taxonomy_add_new_meta_field() {
    ?>

    <div class="form-field">
        <label for="wh_meta_title"><?php _e('Meta Title', 'wh'); ?></label>
        <input type="text" name="wh_meta_title" id="wh_meta_title">
        <p class="description"><?php _e('Enter a meta title, <= 60 character', 'wh'); ?></p>
    </div>
    <div class="form-field">
        <label for="wh_meta_desc"><?php _e('Meta Description', 'wh'); ?></label>
        <input type="text" name="wh_title_for_page" id="wh_title_for_page">
        <p class="description"><?php _e('Enter a meta description, <= 60 character', 'wh'); ?></p>
    </div>
    <?php
}

//Product Cat Edit page
function wh_taxonomy_edit_meta_field($term) {

    //getting term ID
    $term_id = $term->term_id;

    // retrieve the existing value(s) for this meta field.
    $wh_meta_title = get_term_meta($term_id, 'wh_meta_title', true);
    $wh_title_for_page = get_term_meta($term_id, 'wh_title_for_page', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="wh_meta_title"><?php _e('Meta Title', 'wh'); ?></label></th>
        <td>
        <input type="text" name="wh_meta_title" id="wh_meta_title" value="<?php echo esc_attr($wh_meta_title) ? esc_attr($wh_meta_title) : ''; ?>">
            <p class="description"><?php _e('Enter a meta title, <= 60 character', 'wh'); ?></p>
        </td>
    </tr>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="wh_title_for_page"><?php _e('Title page (H1)', 'wh'); ?></label></th>
        <td>
      <input type="text" name="wh_title_for_page"  id="wh_title_for_page" value="<?php echo esc_attr($wh_title_for_page) ? esc_attr($wh_title_for_page) : ''; ?>" >
            <p class="description"><?php _e('Enter a meta title page, <= 60 character ', 'wh'); ?></p>
        </td>
    </tr>
    <?php
}

add_action('product_cat_add_form_fields', 'wh_taxonomy_add_new_meta_field', 10, 1);
add_action('product_cat_edit_form_fields', 'wh_taxonomy_edit_meta_field', 10, 1);

// Save extra taxonomy fields callback function.
function wh_save_taxonomy_custom_meta($term_id) {

    $wh_meta_title = filter_input(INPUT_POST, 'wh_meta_title');
    $wh_title_for_page = filter_input(INPUT_POST, 'wh_title_for_page');

    update_term_meta($term_id, 'wh_meta_title', $wh_meta_title);
    update_term_meta($term_id, 'wh_title_for_page', $wh_title_for_page);
}

add_action('edited_product_cat', 'wh_save_taxonomy_custom_meta', 10, 1);
add_action('create_product_cat', 'wh_save_taxonomy_custom_meta', 10, 1);

//add_action('admin_init', 'my_remove_menu_elements', 102);

function my_remove_menu_elements()
{
	remove_submenu_page( 'themes.php', 'theme-editor.php' );
	remove_submenu_page( 'plugins.php','plugin-editor.php' );
}


add_filter( 'nav_menu_css_class', 'add_my_class_to_nav_menu', 10, 2 );
function add_my_class_to_nav_menu( $classes, $item ){
	/* $classes содержит
	Array(
		[1] => menu-item
		[2] => menu-item-type-post_type
		[3] => menu-item-object-page
		[4] => menu-item-284
	)
	*/
	$classes[] = 'nav-item';

	return $classes;
}

