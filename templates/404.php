<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package <%= appName %>
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		@@include( './src/error/error.php', {
			"appNameVar": "<%= appNameVar %>"
		} )

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
