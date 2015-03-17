#Recipe: Feature Photo

Folder name: types/featurephoto

##Description: A theme with featured image large photos on each post.
Themes like: Ryu, Harmonic, Resonar, Intergalatic.

###Ingredients:
- Template: just first post on front
- Custom header: large front page
- Background cover featured images
- Social menu (genericons)

###Special files to call on top of default:
- content-single.php : types/featurephoto/strucutres/article/article-featurephoto-single.php

###Sass:
- types/featurephoto/views/article/article-featurephoto-single (compiles to article.scss)

Task:
- Replace all instances of atomic_s with the themename someone supplies?
- Add thumbnail large size to the actual function.php:
//add_image_size( 'atomic_s-large', 2000, 1500, true  );