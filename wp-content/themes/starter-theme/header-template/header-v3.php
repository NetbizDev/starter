  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav0" aria-controls="navbarNav0" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav0">
	       
	       							<?php 
								   $menu = wp_nav_menu(
        array(
	        'theme_location' => 'second-right-menu',
	        'menu'            => 'second-right-menu',
	        'container'=> 'ul',
	        //'container_class' => 'right-top-menu-container',
	        'menu_class'      => 'navbar-nav mr-auto ml-auto',
	      'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	        
        )
    );   
    $menu = str_replace('class="page-item', 'class="page-item nav-item', $menu );
	echo $menu;
    
     ?>

	       
	                <!-- <ul class="navbar-nav mr-auto ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="https://www.froala.com">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Team</a>
            </li>
          </ul>-->
        </div>
      </nav>
    </div>
  </header>
