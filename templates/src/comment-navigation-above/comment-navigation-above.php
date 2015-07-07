<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>
	<nav id="comment-nav-above" class="navigation comment-navigation" role="navigation">
		<h2 class="screen-reader-text"><?php esc_html_e( 'Comment navigation', '@@appNameVar' ); ?></h2>
		<div class="nav-links">

			<div class="nav-previous"><?php previous_comments_link( esc_html__( 'Older Comments', '@@appNameVar' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( esc_html__( 'Newer Comments', '@@appNameVar' ) ); ?></div>

		</div><!-- .nav-links -->
	</nav><!-- #comment-nav-above -->
<?php endif; // Check for comment navigation. ?>