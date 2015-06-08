<div class="site-info">
	<a href="<?php echo esc_url( __( 'http://wordpress.org/', '<%= appNameSlug %>' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', '<%= appNameSlug %>' ), 'WordPress' ); ?></a>
	<span class="sep"> | </span>
	<?php printf( esc_html__( 'Theme: %1$s by %2$s.', '<%= appNameSlug %>' ), '<%= appNameSlug %>', '<a href="<%= authorURI %>" rel="designer"><%= authorName %></a>' ); ?>
</div><!-- .site-info -->