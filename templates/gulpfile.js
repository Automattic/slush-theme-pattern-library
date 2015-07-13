// Include Gulp
var gulp = require( 'gulp' );

// Include Plugins
var sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	jshint = require( 'gulp-jshint' ),
	concat = require( 'gulp-concat' ),
	notify = require( 'gulp-notify' ),
	rename = require( 'gulp-rename' ),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// Tasks
// File Organization (moves source files to their proper location - may take several runs)
var typeFiles = [];

@@if ( '<%= themeType %>' === 'typeBlogModern' ) {
	typeFiles.push( 'src/types/blog-modern/functions.php', 'src/types/blog-modern/header.php' );
}

@@if ( '<%= themeType %>' !== 'typeBase' ) {
gulp.task( 'rename', function() {
	return gulp.src( typeFiles )
		.pipe( rename() )
		.pipe( gulp.dest( './' ) )
		.pipe( notify( { message: 'Base restructure task complete' } ) );
});
}

// Styles
gulp.task( 'styles', function() {
	return sass( 'assets/stylesheets/style.scss', { style: 'expanded' } )
		.pipe( autoprefixer( { browsers: ['last 2 versions', 'ie >= 9'], cascade: false } ) )
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe( gulp.dest( './' ) )
		.pipe( notify( { message: 'Styles task complete' } ) );
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src( 'assets/js/**/*.js' )
		.pipe( jshint.reporter( 'default' ) )
		.pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( 'assets/js' ) )
		.pipe( notify( { message: 'Scripts task complete' } ) );
});

// Cleanup (remove unneeded templates & files)
var buildPaths = ['./src'];

@@if ( '<%= themeType %>' !== 'typeBlogTraditional' ) {
	buildPaths.push(
			'./assets/stylesheets/components/blog-traditional'
	);
}
@@if ( '<%= themeType %>' !== 'typeBusiness' ) {
	buildPaths.push(
			'./archive-jetpack-testimonials.php',
			'./components/content-hero',
			'./components/content-testimonial',
			'./components/testimonials'
	);
}
@@if ( ( '<%= themeType %>' !== 'typeMag' ) || ( '<%= themeType %>' !== 'typePortfolio' ) ) {
	buildPaths.push(
			'./template-front.php'
	);
}

gulp.task('clean', function() {
	return gulp.src( buildPaths )
		.pipe( vinylPaths( del ) );
});

// Default Task
//gulp.task( 'default', ['styles', 'scripts', 'images', 'clean'] );
gulp.task( 'default', ['styles', 'scripts', 'clean'] );
