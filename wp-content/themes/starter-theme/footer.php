  <?php 
	  		$version_footer = get_field_object('version_of_footer','option');
	  		$version_contacts = get_field_object('contact_view','option');
get_template_part( 'template-parts/contacts/contact-part-'. $version_contacts['value'] );

get_template_part( 'footer-template/footer-'. $version_footer['value'] );


  ?>
<!--<nav id="c-menu--push-right" class="c-menu c-menu--push-right">
   <button class="c-menu__close"><strong>x</strong></button>
 
  <?php 
		wp_nav_menu(
        array(
	        'theme_location' => 'primary',
	        'menu'            => 'primary',
	        'container'       => 'ul',
	        'container_class' => 'c-menu__items',
	       //	'menu_class'      => 'dropdown-menu',
	       	'menu_id'		=> 'c-menu__item'	

        )
    ); ?>

</nav>
-->

<!-- /c-menu slide-right -->

<?php wp_footer(); ?>


<!--<div id="feedback" class="feedback">

    
    <div class="section">
        <?php echo do_shortcode('[contact-form-7 id="290" title="Widget"]');?>
        <h6>
        <span class="arrow up"><i class="fa fa-chevron-up" aria-hidden="true"></i></span> 
לקביעת פגישה </h6>
    </div>
</div>-->


<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/scripts/vendors/modalEffects.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/scripts/vendors/menu.js"></script>
		

<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/scripts/vendors/main-prel.js"></script>



<?php if(wp_is_mobile()) { ?>

<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/scripts/vendors/menu.js"></script>

<script >
	  var pushRight = new Menu({
    wrapper: '#o-wrapper',
    type: 'push-right',
    menuOpenerClass: '.c-button',
    maskId: '#c-mask'
  });

  var pushRightBtn = document.querySelector('#c-button--push-right');
  
  pushRightBtn.addEventListener('click', function(e) {
    e.preventDefault;
    pushRight.open();
  });
	

  </script>
<?php } ?>
<!--<script src="<?php echo get_template_directory_uri(); ?>/js/instantclick.min.js" data-no-instant></script>-->
<script type="text/javascript">    
	    var attachFastClick = Origami.fastclick;
        attachFastClick(document.body);
</script>

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

</div>
</body>

</html>
