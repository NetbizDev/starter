  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md no-gutters">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="col-4 col-md-2 text-right text-md-center order-lg-6">
        <a href="/">
	        	        <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">
        </a>
        </div>

        <div class="collapse navbar-collapse col-12 col-md-5 order-lg-1" id="navbarNav2">
          	<?php 
								   $menu = wp_nav_menu(
        array(
	        'theme_location' => 'second-right-menu',
	        'menu'            => 'second-right-menu',
	        'container'=> 'ul',
	        //'container_class' => 'right-top-menu-container',
	        'menu_class'      => 'navbar-nav col-5',
	      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	        
        )
    );   
    $menu = str_replace('class="page-item', 'class="page-item nav-item', $menu );
	echo $menu;
    
     ?>

        </div>

        <ul class="navbar-nav justify-content-end col-sm-5 order-lg-12 d-none d-md-flex">
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-twitter"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-github"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-slack"></i></a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
