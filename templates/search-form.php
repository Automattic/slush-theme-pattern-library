<?php
/**
 * The template for displaying search forms in Madre
 *
 * @package <%= appName %>
 */
?>

<!-- INSERT: search-form/search-form.php -->
@@include( './src/search-form/search-form.php', {
	"appNameSlug": "<%= appNameSlug %>"
} )