<?php
/**
 * Jetpack Compatibility File
 * See: https://jetpack.me/
 *
 * @package <%= appName %>
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function <%= appNameSlug %>_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => '<%= appNameSlug %>_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function <%= appNameSlug %>_jetpack_setup
add_action( 'after_setup_theme', '<%= appNameSlug %>_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function <%= appNameSlug %>_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function <%= appNameSlug %>_infinite_scroll_render
