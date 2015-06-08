<?php
/**
 * The template for displaying comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package <%= appName =>
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>

		<!-- INSERT: comment-title/comment-title.php -->
		@@include( './components/comment-title/comment-title.php', {
			"appNameSlug": "<%= appNameSlug %>"
		} )

		<!-- INSERT: comment-navigation-above/comment-navigation-above.php -->
		@@include( './components/comment-navigation-above/comment-navigation-above.php', {
			"appNameSlug": "<%= appNameSlug %>"
		} )

		<!-- INSERT: comment-list/comment-list.php -->
		@@include( './components/comment-list/comment-list.php', {
			"appNameSlug": "<%= appNameSlug %>"
		} )

		<!-- INSERT: comment-navigation-below/comment-navigation-below.php -->
		@@include( './components/comment-navigation-below/comment-navigation-below.php', {
			"appNameSlug": "<%= appNameSlug %>"
		} )

	<?php endif; // Check for have_comments(). ?>

	<?php
		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
		<p class="no-comments"><?php esc_html_e( 'Comments are closed.', '<%= appNameSlug =>' ); ?></p>
	<?php endif; ?>

	<?php comment_form(); ?>

</div><!-- #comments -->
