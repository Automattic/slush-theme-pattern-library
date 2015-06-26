// Include Gulp
var gulp = require( 'gulp' );

// Include Plugins
var sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	imagemin = require( 'gulp-imagemin' ),
	pngquant = require('imagemin-pngquant'),
	jshint = require( 'gulp-jshint' ),
	concat = require( 'gulp-concat' ),
	notify = require( 'gulp-notify' ),
	cache = require( 'gulp-cache' ),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// File Paths
var paths = {
	scripts: 'src/scripts/**/*.js',
};

// Tasks
// Styles
gulp.task( 'styles', function() {
	return sass( 'src/styles/style.scss', { style: 'expanded' } )
		.pipe( autoprefixer( { browsers: ['last 2 versions', 'ie >= 9'], cascade: false } ) )
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe( gulp.dest( './' ) )
		.pipe( notify( { message: 'Styles task complete' } ) );
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src( 'src/scripts/**/*.js' )
		.pipe( jshint.reporter( 'default' ) )
		.pipe( concat( 'script.js' ) )
		.pipe( gulp.dest( 'js' ) )
		.pipe( notify( { message: 'Scripts task complete' } ) );
});

// Images
gulp.task('images', function() {
  return gulp.src( 'src/images/*' )
    .pipe( cache( imagemin( {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngquant()]
	} ) ) )
    .pipe( gulp.dest( 'images' ) )
    .pipe( notify( { message: 'Images task complete' } ) );
});

// Clean unneeded templates & files
gulp.task('clean', function() {
	gulp.src('./src')
		.pipe(vinylPaths(del));
});

// Watch files for changes
gulp.task( 'watch', function() {

	// Watch .scss files
	gulp.watch( 'src/styles/**/*.scss', ['styles'] );

	// Watch .js files
	gulp.watch( 'src/scripts/**/*.js', ['scripts'] );

	// Watch image files
	gulp.watch( 'src/images/*', ['images'] );
});

// Default Task
//gulp.task( 'default', ['styles', 'scripts', 'images', 'watch'] );
//gulp.task( 'default', ['styles', 'scripts', 'images', 'clean'] );
gulp.task( 'default', ['clean'] );
