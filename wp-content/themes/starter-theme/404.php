<?php get_header(); ?>

    <div class="site__empty">

        <div class="site__empty-wrap">

            <h1 class="site__empty-title"><span>Oooooops!</span> העמוד המבוקש לא נמצא</h1>

            <a class="btn btn_green" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>"><?php _e( 'To purchase', 'woocommerce' ) ?></a>

        </div>

    </div>
<?php get_footer(); ?>