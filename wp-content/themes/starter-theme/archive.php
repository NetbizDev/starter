<?php get_header();?>
<?php 
	global $wp_query;
$modifications = array();
if( !empty( $_GET['catname'] ) ) {
	$modifications['category_name'] = $_GET['catname'];
}

$args = array_merge( 
	$wp_query->query_vars, 
	$modifications 
);

query_posts( $args );
?>
<?php
	get_footer();
?>