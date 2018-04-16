<?php
	/*
		Template Name: Home Page New
		*/
	
	 get_header();
	 $home_slider = get_field('home_slider');
	 $home_first_row_1 = get_field('left_image');
	 $home_first_row_2 = get_field('right_image');
	 $home_second_row_1 = get_field('left_image_second');
	 $home_second_row_2 = get_field('right_image_second');
	 $home_middle_1 = get_field('image_left_middle');
	 $home_middle_2 = get_field('image_right_middle');
	 $home_first = get_field('image_first');
	 $home_second = get_field('image_second');
	 $home_third = get_field('image_third');
	 $home_fourth = get_field('image_fourth');

	 
	  ?>
<div class="container home-page ">
	<div class="row">
		<div class="col-sm-12 home-img">
			<div class="owl-carousel owl-theme owl-loaded">
				<?php if( $home_slider ): ?>
					<?php foreach( $home_slider as $home_sliders ): ?>
					<img class="item" title="<?php echo $home_sliders['title']; ?>" src="<?php echo $home_sliders['url']; ?>" alt="<?php echo $home_sliders['alt']; ?>" />
			       <?php endforeach; ?>
				<?php endif; ?>
			</div>

		</div>	
	</div>	
	
		<div class="row first desktop_">
			<div class="col-sm-7">
			<a href="<?php echo the_field('link_left');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('left_title');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_left');?></h3>
				</div>
				<?php if( !empty($home_first_row_1) ): ?>
					<img src="<?php echo $home_first_row_1['url']; ?>" alt="<?php echo $home_first_row_1['alt']; ?>" title="<?php echo $home_first_row_1['title'];?>" />
				<?php endif; ?>

				</a>
			</div>	

			<div class="col-sm-5" >
				<a href="<?php echo the_field('link_right');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_right');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_right');?></h3>
				</div>
				<?php if( !empty($home_first_row_2) ): ?>
					<img src="<?php echo $home_first_row_2['url']; ?>" alt="<?php echo $home_first_row_2['alt']; ?>" title="<?php echo $home_first_row_2['title'];?>" />
				<?php endif; ?>
				</a>
			</div>	
	</div>	
		<div class="row first mobile">
						<div class="col-sm-5" >
				<a href="<?php echo the_field('link_right');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_right');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_right');?></h3>
				</div>
				<?php if( !empty($home_first_row_2) ): ?>
					<img src="<?php echo $home_first_row_2['url']; ?>" alt="<?php echo $home_first_row_2['alt']; ?>" title="<?php echo $home_first_row_2['title'];?>" />
				<?php endif; ?>
				</a>
			</div>	

			<div class="col-sm-7">
						    <a href="<?php echo the_field('link_left');?>">

				<div class="link_with_t">
					<h2><?php echo the_field('left_title');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_left');?></h3>
				</div>
				<?php if( !empty($home_first_row_1) ): ?>
					<img src="<?php echo $home_first_row_1['url']; ?>" alt="<?php echo $home_first_row_1['alt']; ?>" title="<?php echo $home_first_row_1['title'];?>" />
				<?php endif; ?>
				</a>
			</div>	

	</div>	
	
	<div class="row second scrollme mobile">
	
	<div class="col-sm-6 animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="60">
		    <a href="<?php echo the_field('link_left_second');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_left_second');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_left_second');?></h3>
				</div>
				<?php if( !empty($home_second_row_1) ): ?>
					<img src="<?php echo $home_second_row_1['url']; ?>" alt="<?php echo $home_second_row_1['alt']; ?>" title="<?php echo $home_second_row_1['title'];?>" />
				<?php endif; ?>
			</a>
		</div>	

		<div class="col-sm-6 animateme" data-when="enter" data-from="0.5" data-to="0" data-opacity="0" data-translatey="60">
		    <a href="<?php echo the_field('link_right_second');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_right_second');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_right_second');?></h3>
				</div>
				<?php if( !empty($home_second_row_2) ): ?>
					<img src="<?php echo $home_second_row_2['url']; ?>" alt="<?php echo $home_second_row_2['alt']; ?>" title="<?php echo $home_second_row_2['title'];?>" />
				<?php endif; ?>
			</a>
		</div>
				
		
	</div>		
	<div class="row second scrollme desktop_">
		
		<div class="col-sm-6 animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="60">
		    <a href="<?php echo the_field('link_left_second');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_left_second');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_left_second');?></h3>
				</div>
				<?php if( !empty($home_second_row_1) ): ?>
					<img src="<?php echo $home_second_row_1['url']; ?>" alt="<?php echo $home_second_row_1['alt']; ?>" title="<?php echo $home_second_row_1['title'];?>" />
				<?php endif; ?>
			</a>
		</div>	
	
		<div class="col-sm-6 animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="60">
		    <a href="<?php echo the_field('link_right_second');?>">
				<div class="link_with_t">
					<h2><?php echo the_field('title_right_second');?></h2>
				<hr/>
				<h3><?php echo the_field('subtitle_right_second');?></h3>
				</div>
				<?php if( !empty($home_second_row_2) ): ?>
					<img src="<?php echo $home_second_row_2['url']; ?>" alt="<?php echo $home_second_row_2['alt']; ?>" title="<?php echo $home_second_row_2['title'];?>" />
				<?php endif; ?>
			</a>
		</div>	

	</div>	
	<div class="row rings">
			<div class="col-sm-9 text_milk">
				<?php the_content(); ?>
			</div>	
			<div class="col-sm-3 ring_big_milk">
				<a href="<?php echo the_field('link_middle');?>">			
				<?php if( !empty($home_middle_2) ): ?>
					<img src="<?php echo $home_middle_2['url']; ?>" alt="<?php echo $home_middle_2['alt']; ?>" title="<?php echo $home_middle_2['title'];?>" />
				<?php endif; ?>
				</a>
			</div>	

	</div>
			<div class="row social">
			<div class="col-sm-12">
				<h4>עיקבו אחרינו בפייסבוק ובאינסטגרם‎</h4>
				<div class="hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5d">
									<a target="_blank" class="hi-icon fa fa-instagram" href="https://www.instagram.com/amberjack_jewelry/"></a>
				<a target="_blank" class="hi-icon fa fa-facebook" href="https://www.facebook.com/amberjack.jewelry/"></a>

				<img class="bottom_logo" src="https://www.amberjack.co.il/wp-content/uploads/2017/07/home-3-logo-social.png">

				</div>
			</div>
		</div>	

		<div class="row second-padding scrollme">
			<div class="col-sm-6 first animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="30">
		    <?php if( !empty($home_first) ): ?>
				<img src="<?php echo $home_first['url']; ?>" alt="<?php echo $home_first['alt']; ?>" title="<?php echo $home_first['title'];?>" />
			<?php endif; ?>

			</div>	
			<div class="col-sm-6 second animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="30">
		    <?php if( !empty($home_second) ): ?>
				<img src="<?php echo $home_second['url']; ?>" alt="<?php echo $home_second['alt']; ?>" title="<?php echo $home_second['title'];?>" />
			<?php endif; ?>
			</div>	
	</div>	
		<div class="row second-padding scrollme">
			<div class="col-sm-6 second-smaller animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="30">
		   <?php if( !empty($home_third) ): ?>
				<img class="logo_made-in" src="<?php echo $home_third['url']; ?>" alt="<?php echo $home_third['alt']; ?>" title="<?php echo $home_third['title'];?>" />
			<?php endif; ?>
			</div>	
			<div class="col-sm-6 first-smaller animateme"         
        data-when="enter"
        data-from="0.5"
        data-to="0"
        data-opacity="0"
	    data-translatey="30">
		    		    		    <?php if( !empty($home_fourth) ): ?>
				<img class="md-trigger on_hovered" data-modal="modal-6" src="<?php echo $home_fourth['url']; ?>" alt="<?php echo $home_fourth['alt']; ?>" title="<?php echo $home_fourth['title'];?>" />
				<img class="md-trigger on_hover" data-modal="modal-6" src="https://www.amberjack.co.il/wp-content/uploads/2017/07/plimage.png" alt="מקצוענים מהשורה הראשונה מייצרים עבורכם תכשיטים באיכות ללא פשרות" title="מקצוענים מהשורה הראשונה מייצרים עבורכם תכשיטים באיכות ללא פשרות">
				
			<?php endif; ?>
			</div>	
	</div>
		<div class="row custom-text">
			<div class="col-md-12">
				&nbsp;<h3>חברת Amberjack הינה יצרנית יהלומים ותכשיטים, הממוקמת בבורסת היהלומים ברמת גן. Amberjack הינה הגורם הבלעדי בכל שלב בדרך לתכשיט המיוחל. החל מקניית חומר הגלם ומיונו מבין אלפי יהלומים, ע"י הגמולוגים המוסמכים והמנוסים שלנו, ליטוש הזהב והברקתו, עיצוב מודל התכשיט הרצוי וכלה בשיבוץ היהלומים בתכשיט, אשר נעשה בעבודת יד מוקפדת ובאמצעות מיקרוסקופ ע"י המומחים ביותר ברמת הליטוש הגבוהה ביותר EXCELLENT.</h3>
			</div>	
		</div>	
		<div class="row blog-posts">
						<?php	 
							$args = array(
											'posts_per_page' => 4
											);
							$loop = new WP_Query($args);
							if($loop->have_posts()) {
							while($loop->have_posts()) : $loop->the_post();     
													?>
			<div class="col-sm-3">

						<div class="mask">
	                    <a  href="<?php the_permalink();?>">
						<img width="100%" height="130px" src="<?php echo the_post_thumbnail_url() ;?>" title="<?php echo the_title(); ?>"/>	
						</a>
                        <h2><?php echo the_title();?></h2>
                        <?php $trimexcerpt = get_the_excerpt();
								$shortexcerpt = mb_strimwidth( $trimexcerpt, 0, 80, '...' ); 
						?>
                        <p class="short_descrip"><span><?php echo $shortexcerpt; ?></span>
                        <a class="has-dropdown button" href="<?php the_permalink();?>" title="<?php echo the_title(); ?>" class="info">
קרא עוד</a>                        
                        </p>

						</div>				
				</div>								
							<?php    endwhile;
							} 	wp_reset_query();
							 ?>
		</div>	
</div>	

<?php get_footer(); ?>
