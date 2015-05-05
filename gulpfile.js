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
    del = require('del');

gulp.task('foundation', function() {
  gulp.src('bower_components/foundation/scss/*.scss')
    .pipe(sass({
      includePaths: ['bower_components/foundation/scss']
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass', function() {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  gulp.src([
    './bower_components/foundation/js/foundation/foundation.clearing.js',
    './bower_components/foundation/js/vendor/fastclick.js',
    './bower_components/foundation/js/vendor/jquery.cookie.js',
    './bower_components/foundation/js/vendor/modernizr.js'
    ])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
