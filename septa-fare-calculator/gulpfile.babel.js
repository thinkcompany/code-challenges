import gulp from 'gulp';

import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import compass from 'gulp-compass';
import minify from 'gulp-minify';
import notify from 'gulp-notify';
import path from 'path';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

const plumberErrorHandler = { errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};

gulp.task('babel', () =>
  gulp.src('./app/assets/scripts/app.js')
  .pipe(plumber(plumberErrorHandler))
  .pipe(babel({
   // plugins: ['transform-runtime'],
    presets: ['env']
  }))
  .pipe(minify({
    noSource: true,
    exclude: ['tasks'],
    ignoreFiles: ['.combo.js', '-min.js']
  }))
  .pipe(gulp.dest('./app/assets/scripts'))
);

gulp.task('sass', () => {
  gulp.src('./app/assets/styles/**/*.scss')
  .pipe(plumber(plumberErrorHandler))
  .pipe(compass({
      css: './app/assets/styles',
      sass: './app/assets/styles'
  }))
  .pipe(gulp.dest('./app/assets/styles'))
  .pipe(browserSync.stream());
});

  //
  // WATCHERS
  //

    gulp.task('sass-watch', ['sass'], function (done) {
      browserSync.reload();
      done();
    });


    gulp.task('babel-watch', ['babel'], function (done) {
      browserSync.reload();
      done();
    });

  //
  // BROWSERSYNC
  //

    gulp.task('watch', function () {

      browserSync.init({
        server: {
            baseDir: "./app"
        }
      });

     gulp.watch('./app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./app/assets/scripts/app.js', ['babel-watch']);
    });