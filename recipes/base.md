#Recipe: Overall template bulder

##Description: This contains all the templating that needs to be stuck back together.

##Notes: Each file that needs to have content pulled in has that content's path in a php comment.


###Ingredients
- inc/
- js/
- languages/
- styles (depends on Sass if one or more files : some Sass is also conditional)
- 404.php
- archive.php
- comments.php
- content-none.php
- conent-page.php
- content-search.php
- content-single.php
- content.php
- footer.php
- functions.php
- header.php
- index.php
- LICENSE
- page.php
- README.md
- rtl.css
- screenshot.png
- search-form.php
- search.php
- sidebar.php
- single.php
- style.css

###Compiling:
- single.php : elements/views/view-single.php
- sidebar.php : elements/strucutres/sidebar.php
- search.php : elements/views/view-search.php
- search-form.php : elements/buildings/search-form.php
- page.php : elements/views/view-page.php
- index.php : elements/views/view-index.php
- header.php : elements/structures/global/header.php
- elements/structures/global/header.php : elements/structures/global/branding.php and elements/buildings/navigation/nav-primary.php
- footer.php : elements/structures/global/footer.php
- elements/structures/global/footer.php : elements/structures/global/site-info.php
- content.php : elements/structures/article/article.php
- content-single.php : elements/structures/article/article-single.php
- content-search.php : elements/structures/article/article-search.php
- content-page.php : elements/structures/article/article-page.php
- content-none.php : elements/structures/article/article-noresults.php
- comments.php : elements/structures/comments/comments-title.php and elements/structures/nav-comment-top.php elements/structures/comments/comments-list.php and elements/structures/nav-comment-below.php
- archive.php : elements/views/view-archive.php
- elements/views/view-archive.php : elements/structures/sections/not-found.php


###Sass compiling for default:
- _utilities/mixins: accessibility, alignments, clearings, global, normalize
- bricks: buttons/buttons, forms/forms, lists/definition, ordered, unordered
- media: captions, galleries, images, media
- tables: tables
- text: blockquote, headings, hr, paragraph, preformatted
- variables: colors, fonts, typography