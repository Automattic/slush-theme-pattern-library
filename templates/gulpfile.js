// Include Gulp
var gulp = require( 'gulp' );

// Include Plugins
var sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	notify = require( 'gulp-notify' ),
	rename = require( 'gulp-rename' ),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// Tasks
// File Organization (moves source files to their proper location - may take several runs)
var rootFiles = [],
	incFiles = [],
	rootComponents = [],
	styleComponents = [],
	styleLayouts = [],
	styleShared = [],
	styleVariables = [];

@@if ( '<%= themeType %>' === 'typePortfolio' ) {
	rootFiles.push(
		'src/types/portfolio/single-jetpack-portfolio.php',
		'src/types/portfolio/header.php',
		'src/types/portfolio/template-front.php'
	);
	incFiles.push( 'src/types/portfolio/inc/**/*.*' );
	rootComponents.push( 'src/types/portfolio/components/**/*.*' );
	styleComponents.push( './src/types/portfolio/assets/stylesheets/components/*.*' );
	styleShared.push( './src/types/portfolio/assets/stylesheets/shared/*.*' );
}

@@if ( '<%= themeType %>' === 'typeBlogModern' ) {
	rootFiles.push( 'src/types/blog-modern/header.php' );
	incFiles.push( 'src/types/blog-modern/inc/**/*.*' );
	rootComponents.push( 'src/types/blog-modern/components/**/*.*' );
	styleComponents.push( './src/types/blog-modern/assets/stylesheets/components/*.*' );
	styleLayouts.push( './src/types/blog-modern/assets/stylesheets/layout/*.*' );
	styleShared.push( './src/types/blog-modern/assets/stylesheets/shared/*.*' );
}

@@if ( '<%= themeType %>' === 'typeBlogTraditional' ) {
	rootFiles.push(
		'src/types/blog-traditional/sidebar.php',
		'src/types/blog-traditional/header.php'
	);
	styleLayouts.push( './src/types/blog-traditional/assets/stylesheets/layout/*.*' );
	styleVariables.push( './src/types/blog-traditional/assets/stylesheets/variables/*.*' );
}

@@if ( '<%= themeType %>' === 'typeBusiness' ) {
	rootFiles.push(
		'src/types/business/archive-jetpack-testimonials.php',
		'src/types/business/template-front.php',
		'src/types/business/header.php'
	);
	incFiles.push( 'src/types/business/inc/**/*.*' );
	rootComponents.push( 'src/types/business/components/**/*.*' );
}

@@if ( '<%= themeType %>' === 'typeMag' ) {
	incFiles.push( 'src/types/magazine/inc/**/*.*' );
	rootComponents.push( 'src/types/magazine/components/**/*.*' );
}


gulp.task( 'move:root', function() {
	return gulp.src( rootFiles, { base: process.cwd() } )
		.pipe( rename( { dirname: '' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:inc', function() {
	return gulp.src( incFiles, { base: process.cwd() } )
		.pipe( rename( { dirname: 'inc' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:root-styles', function() {
	return gulp.src( 'src/types/blog-modern/assets/stylesheets/style.scss', { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/stylesheets' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:component-styles', function() {
	return gulp.src( styleComponents, { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/stylesheets/components' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:layout-styles', function() {
	return gulp.src( styleLayouts, { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/stylesheets/layout' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:shared-styles', function() {
	return gulp.src( styleShared, { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/stylesheets/shared' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:variable-styles', function() {
	return gulp.src( styleVariables, { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/stylesheets/variables' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:scripts', function() {
	return gulp.src( 'src/types/blog-modern/assets/js/**/*.*', { base: process.cwd() } )
		.pipe( rename( { dirname: 'assets/js' } ) )
		.pipe( gulp.dest( './' ) )
});

gulp.task( 'move:components', function() {
	return gulp.src( rootComponents, { base: process.cwd() } )
		.pipe( rename( { dirname: 'components' } ) )
		.pipe( gulp.dest( './' ) )
});


// Styles - Compile Sass
gulp.task( 'styles', ['move:root', 'move:inc', 'move:root-styles', 'move:component-styles', 'move:layout-styles', 'move:shared-styles', 'move:variable-styles', 'move:scripts', 'move:components'], function() {
	return sass( 'assets/stylesheets/style.scss', { style: 'expanded' } )
		.pipe( autoprefixer( { browsers: ['last 2 versions', 'ie >= 9'], cascade: false } ) )
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe( gulp.dest( './' ) )
		.pipe( notify( { message: 'Styles task complete' } ) );
});


// Cleanup (remove src dir after build)
var buildPaths = ['./src'];

gulp.task('clean', ['move:root', 'move:inc', 'move:root-styles', 'move:component-styles', 'move:layout-styles', 'move:shared-styles', 'move:variable-styles', 'move:scripts', 'move:components', 'styles'], function() {
	return gulp.src( buildPaths )
		.pipe( notify( { message: 'Type files moved into place. Beginning cleanup task ...' } ) )
		.pipe( vinylPaths( del ) )
		.pipe( notify( { message: 'Cleanup task complete' } ) );
});

// Default Task
gulp.task( 'default', ['move:root', 'move:inc', 'move:root-styles', 'move:component-styles', 'move:layout-styles', 'move:shared-styles', 'move:variable-styles', 'move:scripts', 'move:components', 'styles', 'clean'] );
//gulp.task( 'default', ['styles', 'scripts', 'clean'] );
