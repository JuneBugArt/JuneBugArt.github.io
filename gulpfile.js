var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    watch = require('gulp-watch'),
    fileinclude = require('gulp-file-include'),
    batch = require('gulp-batch');

gulp.task('styles', function() {
  gulp.src([
     'bower_components/foundation/scss/normalize.scss',
     'bower_components/foundation/scss/foundation.scss',
     './src/scss/**/*.scss',
     './src/css/**/*.css'
     ])
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./assets/css/'));
});

//gulp.task('styles', function() {
//  gulp.src('./src/scss/*.scss')
//    .pipe(sass())
//    .pipe(gulp.dest('./assets/css/'));
//});

gulp.task('scripts', function() {
  gulp.src([
    './bower_components/foundation/js/foundation.js',
    './bower_components/foundation/js/foundation.topbar.js',
    './bower_components/foundation/js/foundation/foundation.clearing.js',
    './bower_components/foundation/js/foundation/foundation.placeholder.js',
    './bower_components/foundation/js/vendor/fastclick.js',
    './bower_components/foundation/js/vendor/jquery.cookie.js',
    './bower_components/foundation/js/vendor/modernizr.js',
    './src/js/**.js'
    ])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('fileinclude', function() {
  gulp.src([
     './pages/*.html'
     ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

/*gulp.task('watch', function () {
  var assets = ['scripts', 'styles'];
  var html = ['fileinclude'];
  gulp.watch('./src/**', assets);
  gulp.watch('./bower_components/foundation/scss/*.scss', assets);
  gulp.watch('./pages/*.html', html);
  gulp.watch('./templates/*.html', html);
});*/

gulp.task('watch', function () {
   var assets = ['scripts', 'styles'];
   var html = ['fileinclude'];
    watch('./src/scss/*.scss', function () {
        gulp.start(assets);
    });
    watch('./src/css/*.css', function () {
        gulp.start(assets);
    });
    watch('./src/js/*.js', function () {
        gulp.start(assets);
    });
    watch('./bower_components/foundation/scss/*.scss', function () {
        gulp.start(assets);
    });
    watch('./pages/*.html', function () {
        gulp.start(html);
    });
    watch('./templates/*.html', function () {
        gulp.start(html);
    });
});
