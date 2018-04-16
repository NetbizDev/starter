'use strict';

var gulp            = require('gulp');
var run             = require('run-sequence').use(gulp);
var sourcemaps      = require('gulp-sourcemaps');
var sass            = require('gulp-sass');
var imagemin        = require('gulp-imagemin');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var cleanCSS        = require('gulp-clean-css');
var autoprefixer    = require('gulp-autoprefixer');
var replace         = require('gulp-replace');
var del             = require('del');
var util            = require('gulp-util');

var paths = {
    styles: 'sass/**/*.scss',
    scripts: ['js/**/*.js', '!js/vendors/**/*.js', '!js/functions.js'],
    vendorScripts: 'js/vendors/**/*.js',
    images: 'img/**/*'
};


gulp.task('clean', function (cb) {
    return del(['stylesheets', 'scripts', 'images'], cb);
});

gulp.task('vendorScripts', function () {
    return gulp.src(paths.vendorScripts, {
        base: 'js/vendors'
    }).pipe(gulp.dest('scripts/vendors'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe((sourcemaps.init()))
        .pipe(uglify().on('error', util.log))
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('scripts'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(replace('../img', '../images'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('stylesheets'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('images'));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles,    ['styles']);
    gulp.watch(paths.scripts,   ['scripts']);
    gulp.watch(paths.images,    ['images']);
});

gulp.task('build:styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(replace('../img', '../images'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('stylesheets'));
});

gulp.task('build:scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('scripts'));
});

gulp.task('default', function() {
    return run(
        'clean',
        'images',
        'styles',
        'scripts',
        'vendorScripts',
        'watch'
    );
});

gulp.task('build', function() {
    return run(
        'clean',
        'images',
        'build:styles',
        'build:scripts',
        'vendorScripts'
    );
});