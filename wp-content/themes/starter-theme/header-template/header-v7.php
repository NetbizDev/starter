  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md no-gutters">
        <div class="col-2 text-left">
        <a href="/">
	        	        <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">
        </a>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4" aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center col-md-8" id="navbarNav4">
	        <?php 
		$menu = wp_nav_menu(
        array(
	        'theme_location' => 'second-right-menu',
	        'menu'            => 'second-right-menu',
	        'container'=> 'ul',
	        //'container_class' => 'right-top-menu-container',
	        'menu_class'      => 'navbar-nav justify-content-center',
	      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	        
        )
    );   
    $menu = str_replace('class="page-item', 'class="page-item nav-item', $menu );
	echo $menu;
    
     ?>

        </div>

        <ul class="navbar-nav col-2 justify-content-end d-none d-md-flex">
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-facebook"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-twitter"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-github"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.froala.com"><i class="fa fa-google"></i></a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
