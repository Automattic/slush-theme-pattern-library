<?php
/**
 * <%= appName %> functions and definitions
 *
 * @package <%= appName %>
 */

if ( ! function_exists( '<%= appNameVar %>_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function <%= appNameVar %>_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on <%= appName %>, use a find and replace
	 * to change '<%= appNameVar %>' to the name of your theme in all the template files
	 */
	load_theme_textdomain( '<%= appNameVar %>', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	@@if ( '<%= themeType %>' === 'typeBusiness' ) {
	// Adds Business Theme image sizes.
	add_image_size( '<%= appNameSlug %>-hero', 1280, 1000, true );
	add_image_size( '<%= appNameSlug %>-thumbnail-avatar', 100, 100, true );
	}
	@@if ( '<%= themeType %>' === 'typeBlogModern' ) {
	// Adds Modern Blog Theme image sizes.
	add_image_size( '<%= appNameSlug %>-large', 2000, 1500, true );
	}
	@@if ( '<%= themeType %>' === 'typePortfolio' ) {
	// Adds Portfolio Theme image sizes.
	add_image_size( '<%= appNameSlug %>-portfolio-featured-image', 800, 9999 );
	}

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'top' => esc_html__( 'Top Menu', '<%= appNameVar %>' ),
		'social'  => esc_html__( 'Social Links Menu', '<%= appNameVar %>' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( '<%= appNameVar %>_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // <%= appNameVar %>_setup
add_action( 'after_setup_theme', '<%= appNameVar %>_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function <%= appNameVar %>_content_width() {
	$GLOBALS['content_width'] = apply_filters( '<%= appNameVar %>_content_width', 640 );
}
add_action( 'after_setup_theme', '<%= appNameVar %>_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function <%= appNameVar %>_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', '<%= appNameVar %>' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', '<%= appNameVar %>_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function <%= appNameVar %>_scripts() {
	wp_enqueue_style( '<%= appNameSlug %>-style', get_stylesheet_uri() );

	wp_enqueue_script( '<%= appNameSlug %>', get_template_directory_uri() . '/assets/js/main.js', array(), '20120206', true );

	wp_enqueue_script( '<%= appNameSlug %>-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( '<%= appNameSlug %>-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( wp_style_is( 'genericons', 'registered' ) ) {
		wp_enqueue_style( 'genericons' );
	} else {
		wp_enqueue_style( 'genericons', get_template_directory_uri() . '/fonts/genericons.css', array(), null );
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', '<%= appNameVar %>_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
