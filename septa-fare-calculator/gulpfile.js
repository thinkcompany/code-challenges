var gulp 			= require('gulp');
var autoprefixer 	= require('gulp-autoprefixer');
var browserSync 	= require('browser-sync');
var sass 			= require('gulp-sass');
var reload 			= browserSync.reload;

var reloadOptions = {
	stream: true,
};

//compile scss
gulp.task('sass', function() {
	var autoprefixerOptions = {
		browsers: ['last 2 versions'],
		cascade: false
	};
	return gulp.src('app/src/styles/**/*.scss')
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest('app/dist/styles/'))
	.pipe(reload(reloadOptions));
});

//compile html to dist
gulp.task('html', function(){
	return gulp.src('app/src/*.html')
	.pipe(gulp.dest('app/dist/'))
	.pipe(reload(reloadOptions));
});

//compile HTML to dist
gulp.task('js', function(){
	return gulp.src('app/src/scripts/**/*.js')
	.pipe(gulp.dest('app/dist/scripts/'))
	.pipe(reload(reloadOptions));

})

//watch for changes in SASS, JS, and HTML
gulp.task('watch', function(){
	gulp.watch('app/src/styles/*.scss', ['sass']);
	gulp.watch('app/src/scripts/*.js', ['js']);
	gulp.watch('app/src/*.html', ['html']);
}); 

//start server
gulp.task('serve', ['sass', 'html', 'js', 'watch'], function() {
	browserSync({
		server: {
			baseDir: 'app/dist'
		}
	});
});

//default task - serve, compile to dist, watch for changes
gulp.task('default', ['serve']);
