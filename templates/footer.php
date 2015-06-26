<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package <%= appName %>
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">

		<!-- INSERT: site-info/site-info.php -->
		@@include( './src/site-info/site-info.php', {
			"appNameSlug": "<%= appNameSlug %>",
			"authorName": "<%= authorName %>",
			"authorURI": "<%= authorURI %>"
		} )

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
