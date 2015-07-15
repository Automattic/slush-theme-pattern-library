// Include Gulp
var gulp = require( 'gulp' );

// Include Plugins
var sass = require( 'gulp-ruby-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	rename = require( 'gulp-rename' ),
    gutil = require('gulp-util'),
    del = require('del'),
    vinylPaths = require('vinyl-paths');

// Tasks
// File Organization (moves source files to their proper location - may take several runs)
var switchCase = '<%= themeType %>',
	rootFiles = [],
	incFiles = [],
	rootComponents = [],
	stylesheets = [],
	styleComponents = [],
	styleLayouts = [],
	styleShared = [],
	styleVariables = [],
	scripts = [];

switch ( switchCase ) {
	case 'typePortfolio':
		rootFiles.push(
			'src/types/portfolio/single-jetpack-portfolio.php',
			'src/types/portfolio/header.php',
			'src/types/portfolio/template-front.php'
		);
		incFiles.push( 'src/types/portfolio/inc/**/*.*' );
		rootComponents.push( 'src/types/portfolio/components/**/*.*' );
		styleComponents.push( 'src/types/portfolio/assets/stylesheets/components/*.*' );
		styleShared.push( 'src/types/portfolio/assets/stylesheets/shared/*.*' );
		break;
	case 'typeBlogModern':
		rootFiles.push( 'src/types/blog-modern/header.php' );
		incFiles.push( 'src/types/blog-modern/inc/**/*.*' );
		rootComponents.push( 'src/types/blog-modern/components/**/*.*' );
		stylesheets.push( 'src/types/blog-modern/assets/stylesheets/style.scss' );
		styleComponents.push( 'src/types/blog-modern/assets/stylesheets/components/*.*' );
		styleLayouts.push( 'src/types/blog-modern/assets/stylesheets/layout/*.*' );
		styleShared.push( 'src/types/blog-modern/assets/stylesheets/shared/*.*' );
		scripts.push( 'src/types/blog-modern/assets/js/**/*.*' );
		break;
	case 'typeBlogTraditional':
		rootFiles.push(
			'src/types/blog-traditional/sidebar.php',
			'src/types/blog-traditional/header.php'
		);
		styleShared.push( 'src/types/blog-traditional/assets/stylesheets/shared/*.*' );
		styleVariables.push( 'src/types/blog-traditional/assets/stylesheets/variables/*.*' );
		break;
	case 'typeBusiness':
		rootFiles.push(
			'src/types/business/archive-jetpack-testimonials.php',
			'src/types/business/template-front.php',
			'src/types/business/header.php'
		);
		incFiles.push( 'src/types/business/inc/**/*.*' );
		rootComponents.push( 'src/types/business/components/**/*.*' );
		break;
	case 'typeMag':
		incFiles.push( 'src/types/magazine/inc/**/*.*' );
		rootComponents.push( 'src/types/magazine/components/**/*.*' );
		styleShared.push( 'src/types/magazine/assets/stylesheets/shared/*.*' );
		styleVariables.push( 'src/types/magazine/assets/stylesheets/variables/*.*' );
		break;
	default:
		gutil.log('Base theme selected. Skipping over restructure tasks...');
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
	return gulp.src( stylesheets, { base: process.cwd() } )
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
	return gulp.src( scripts, { base: process.cwd() } )
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
	gutil.log("File restructuring complete. Beginning Sass compile ...")
	return sass( 'assets/stylesheets/style.scss', { style: 'expanded' } )
		.pipe( autoprefixer( { browsers: ['last 2 versions', 'ie >= 9'], cascade: false } ) )
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe( gulp.dest( './' ) );
});


// Cleanup (remove src dir after build)
gulp.task('clean', ['move:root', 'move:inc', 'move:root-styles', 'move:component-styles', 'move:layout-styles', 'move:shared-styles', 'move:variable-styles', 'move:scripts', 'move:components', 'styles'], function() {
	gutil.log("Sass compile complete. Beginning cleanup process ...")
	return gulp.src( './src' )
		.pipe( vinylPaths( del ) );
});


// Default Task
gulp.task( 'default', ['move:root', 'move:inc', 'move:root-styles', 'move:component-styles', 'move:layout-styles', 'move:shared-styles', 'move:variable-styles', 'move:scripts', 'move:components', 'styles', 'clean'] );
//gulp.task( 'default', ['styles', 'scripts', 'clean'] );
