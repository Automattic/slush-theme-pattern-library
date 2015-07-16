<?php
/**
 * Jetpack Compatibility File
 * See: https://jetpack.me/
 *
 * @package <%= appName %>
 */

function <%= appNameVar %>_jetpack_setup() {
	/**
	 * Add theme support for Infinite Scroll.
	 * See: https://jetpack.me/support/infinite-scroll/
	 *
	 * @since <%= appName %> 1.0
	 */
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => '<%= appNameVar %>_infinite_scroll_render',
		'footer'    => 'page',
	) );

	/**
	 * Add theme support for Featured Content.
	 * See: https://jetpack.me/support/featured-content/
	 *
	 * @since <%= appName %> 1.0
	 */
	add_theme_support( 'featured-content', array(
		'filter'     => '<%= appNameVar %>_get_featured_posts',
		'description' => __( 'The featured content section displays on the front page above the header.', '<%= appNameVar %>' ),
		'max-posts'  => 5,
	) );
} // end function <%= appNameVar %>_jetpack_setup
add_action( 'after_setup_theme', '<%= appNameVar %>_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 *
 * @since <%= appName %> 1.0
 */
function <%= appNameVar %>_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function <%= appNameVar %>_infinite_scroll_render

/**
 * Add support for the Site Logo
 *
 * @since <%= appName %> 1.0
 */
function <%= appNameVar %>_site_logo_init() {
	add_image_size( '<%= appName %>-logo', 200, 200 );
	add_theme_support( 'site-logo', array( 'size' => '<%= appName %>-logo' ) );
}
add_action( 'after_setup_theme', '<%= appNameVar %>_site_logo_init' );

/**
 * Return early if Site Logo is not available.
 *
 * @since <%= appName %> 1.0
 */
function <%= appNameVar %>_the_site_logo() {
	if ( ! function_exists( 'jetpack_the_site_logo' ) ) {
		return;
	} else {
		jetpack_the_site_logo();
	}
}

/**
* Add theme support for Responsive Videos.
 *
 * @since <%= appName %> 1.0
*/
add_theme_support( 'jetpack-responsive-videos' );

/**
 * Featured Posts
 */
function <%= appNameVar %>_has_multiple_featured_posts() {
	$featured_posts = apply_filters( '<%= appNameVar %>_get_featured_posts', array() );
	if ( is_array( $featured_posts ) && 1 < count( $featured_posts ) ) {
		return true;
	}
	return false;
}
function <%= appNameVar %>_get_featured_posts() {
	return apply_filters( '<%= appNameVar %>_get_featured_posts', false );
}
