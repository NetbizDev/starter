  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md no-gutters">
        <div class="col-2 text-left">
        <a href="/">
	        	        <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">

        </a>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-1" aria-controls="navbarNav6" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center col-md-8 navbar-collapse-1">
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

        <div class="collapse navbar-collapse justify-content-end col-md-2 navbar-collapse-1">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Log In &rarr;</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
