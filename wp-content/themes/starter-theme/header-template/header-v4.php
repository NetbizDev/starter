  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md">
        <a href="/">
	        	        <?php $logo = get_field('logo','option');?>
          <img src="<?php echo $logo; ?>" height="30" alt="image">

        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav1">
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


          <ul class="navbar-nav justify-content-end d-none d-lg-flex ml-md-auto">
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com"><i class="fa fa-slack"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com"><i class="fa fa-twitter"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com"><i class="fa fa-github"></i></a>
            </li>
          </ul>

          <a class="btn btn-empty ml-md-3" href="https://www.froala.com">Button</a>
        </div>
      </nav>
    </div>
  </header>
