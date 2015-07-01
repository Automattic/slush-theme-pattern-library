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
 *
 * @since <%= appName %> 1.0
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
 *
 * @since <%= appName %> 1.0
 */
function <%= appNameSlug %>_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function <%= appNameSlug %>_infinite_scroll_render

/**
 * Add support for the Site Logo
 *
 * @since <%= appName %> 1.0
 */
function component_s_site_logo_init() {
	add_image_size( 'component-s-logo', 200, 200 );
	add_theme_support( 'site-logo', array( 'size' => 'component-s-logo' ) );
}
add_action( 'after_setup_theme', 'component_s__site_logo_init' );

/**
 * Return early if Site Logo is not available.
 *
 * @since <%= appName %> 1.0
 */
function component_s_the_site_logo() {
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

@@if ( '<%= themeType %>' === 'typeBusiness' ) {
/**
* Add theme support for Testimonial CPT.
 *
 * @since <%= appName %> 1.0
*/
add_theme_support( 'jetpack-testimonial' );
}
