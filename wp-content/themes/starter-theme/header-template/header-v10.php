  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md no-gutters">
        <div class="col-3 text-left">
        <a href="/">
	      <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">

        </a>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-2" aria-controls="navbarNav7" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse navbar-collapse-2 justify-content-center col-md-6" id="navbarNav7">
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

        <div class="collapse navbar-collapse navbar-collapse-2">
          <ul class="navbar-nav ml-auto justify-content-end">
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Log In</a>
            </li>
          </ul>

          <a class="btn ml-md-3" href="https://www.froala.com">Register</a>
        </div>
      </nav>
    </div>
  </header>
