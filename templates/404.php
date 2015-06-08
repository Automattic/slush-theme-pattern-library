<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package <%= appName %>
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<!-- INSERT: error/error.php -->
		@@include( './components/error/error.php', {
			"appNameSlug": "<%= appNameSlug %>"
		} )

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
