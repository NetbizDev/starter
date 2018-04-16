  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="https://www.froala.com">
	    <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav5" aria-controls="navbarNav5" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav5">
          <?php 
		$menu = wp_nav_menu(
        array(
	        'theme_location' => 'second-right-menu',
	        'menu'            => 'second-right-menu',
	        'container'=> 'ul',
	        //'container_class' => 'right-top-menu-container',
	        'menu_class'      => 'navbar-nav mr-auto',
	      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	        
        )
    );   
    $menu = str_replace('class="page-item', 'class="page-item nav-item', $menu );
	echo $menu;
    
     ?>

          

          <ul class="navbar-nav justify-content-end ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Docs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Log In</a>
            </li>
          </ul>

          <a class="btn ml-md-3" href="https://www.froala.com">Button</a>
        </div>
      </nav>
    </div>
  </header>
