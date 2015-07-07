# Dev Instructions/Docs

The project structure is pretty simple. Most of the work lives between the slushfile.js and templates folder.

The templates folder is what is being used to scaffold the actual output in the CLI. This is based on the Theme Pattern Library but it is modified to reflect what the theme should look like after the generator has run.

There are a few things to note with regards to the conditional includes you will see in some of the template files. Slush uses the `gulp-template` and gulp-include` modules to allow you to include template parts and variables throughout your project. These will be updated based on the prompts the user will receive when running the generator.

For example:
`<%= appName %>` will be replaced with the user answer to the question "What is the name of your theme?".

Additionally, you will see some conditionals wrapped around `include` calls to templates. This gets a little bit strange with the syntax between the two modules. See below:

```
@@include( './src/site-info/site-info.php', {
	"appName": "<%= appName %>",
	"appNameVar": "<%= appNameVar %>",
	"authorName": "<%= authorName %>",
	"authorURI": "<%= authorURI %>"
} )
```

A couple things are happening here. We are including the tempalate found in `src/site-info/site-info.php` and passing it an object of variables to use as new variables within that template. So inside this file, you will see `@@appName` instead of `<%= appName %>`. It seems a little awkward but it appears that `gulp-template` looses track of the variables when they are dynamically included like this.

You may also notice that you can include templates, as shown above, based on conditions. For example:

```
@@if ( '<%= themeType %>' !== 'typeBlogTraditional' ) {
	@import "layout/content";
}
```

Lastly, there is a `gulpfile.js` and `package.json` in the `templates` directory. This is to run a small handfull of one-off tasks at the end of the build process and then these files get removed. Basically these clean up the unneeded files, compile the Sass, and hint the JS. If needed, we can also add image optimization.
