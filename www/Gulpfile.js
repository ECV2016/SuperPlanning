'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var DIR = {
    'dest': './dist'
};

/**
 * @task styles
 * Compile sass/scss to unique css file
 */
gulp.task('styles', function () {
    gulp.src('scss/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css/'));
});


/**
 * @task scripts
 * Compile js scripts to unique js file
 */
gulp.task('scripts', function () {
    gulp.src([
        'js/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js/'));
});

/**
 * @task watch
 * Compile/watch app OTF (dev)
 */
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
});

/**
 * @task web-dev
 * Compile entire web app
 */
gulp.task('web-dev', ['styles', 'scripts'], function () {
    return true;
});

/*
/**
 * @task default
 * Compile/watch app OTF (dev)
 */
gulp.task('default', ['watch'], function () {
    return true;
});