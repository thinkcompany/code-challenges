// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require( 'gulp-sass' );
var imagemin = require( 'gulp-imagemin' );
var pngquant = require( 'imagemin-pngquant' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var sourcemaps = require( 'gulp-sourcemaps' );

// Imagemin Task
gulp.task( 'imagemin', function() {
	return gulp.src( ['images/**/*.jpg', 'images/**/*.png', 'images/**/*.gif', '!images/min/**/*'] )
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe( gulp.dest( './images/min' ) );
});

// Compile Sass
gulp.task( 'sass', function() {
	return gulp.src('scss/**/*.scss')
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( sass.sync({ outputStyle : 'compressed' }).on('error', sass.logError) )
		.pipe( sourcemaps.write( '../css' ) )
		.pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src( ['js/modules/*.js' ])
		.pipe( concat('theme.js') )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( rename('theme.min.js') )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '../js' ) )
		.pipe( gulp.dest('js') );
});

// Watch Files For Changes
gulp.task( 'watch', function() {
	gulp.watch( ['js/modules/**/*.js'], [ 'scripts'] );
	gulp.watch( ['scss/**/*.scss'], ['sass'] );
	gulp.watch( ['images/**/*', '!images/min/**/*'], ['imagemin'] );
});

// Default Task
gulp.task( 'default', [ 'imagemin', 'sass', 'scripts', 'watch'] );