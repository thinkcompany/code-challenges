var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('gulp-bower'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch');

//Initialize project
gulp.task('init', function() {
  return bower();
});

//Update bower components
gulp.task('update', function() {
  return bower({ cmd: 'update'});
});

// spin up a server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    },
  });
});

//Lint and minify scripts
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(include())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js/min'))
    .on('error', gutil.log)
    .pipe(browserSync.reload({ stream: true }));
});

//Compile and minify stlyes
gulp.task('styles', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream: true }));
});

//Generic LiveReload task
gulp.task('reload', function() {
  return gulp.src('*.html')
    .pipe(browserSync.reload({ stream: true }));
});

//Watch for changes
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('*.html', ['reload'] );
});

//Default gulp function
gulp.task('default', ['watch'], function() {

});
