'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var DIR = {
    'src': './web',
    'dest': './dist'
};

/**
 * @task styles
 * Compile sass/scss to unique css file
 */
gulp.task('styles', function () {
    gulp.src(DIR.src + '/scss/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIR.src + '/app/css/'));
});


/**
 * @task scripts
 * Compile js scripts to unique js file
 */
gulp.task('scripts', function () {
    gulp.src([
        DIR.src + '/js/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIR.src + '/app/js/'));
});

/**
 * @task style-prod
 * Copy app.css to destination folder
 */
gulp.task('style-prod', function () {
    gulp.src(DIR.src + '/app/css/*.css')
        .pipe(gulp.dest(DIR.dest + '/app/css/'));
});

/**
 * @task script-prod
 * Copy app.js to destination folder
 */
gulp.task('script-prod', function () {
    gulp.src(DIR.src + '/app/js/*.js')
        .pipe(gulp.dest(DIR.dest + '/app/js/'));
});

/**
 * @task files
 * Copy php files to destination folder
 */
gulp.task('files', function () {
    gulp.src(DIR.src + '/**/**/*.+(php|json)')
        .pipe(gulp.dest(DIR.dest));
});

/**
 * @task fonts
 * Copy clean fonts to destination folder
 */
gulp.task('fonts', function () {
    gulp.src(DIR.src + '/fonts/**/*.+(eot|svg|ttf|woff)')
        .pipe(gulp.dest(DIR.dest + '/fonts/'));
});

/**
 * @task images
 * Copy images to destination folder
 */
gulp.task('images', function () {
    gulp.src(DIR.src + '/images/**/*.+(jpg|jpeg|png|svg|gif)')
        .pipe(gulp.dest(DIR.dest + '/images/'));
});

/**
 * @task watch
 * Compile/watch app OTF (dev)
 */
gulp.task('watch', function () {
    gulp.watch(DIR.src + '/scss/**/*.scss', ['styles']);
    gulp.watch(DIR.src + '/js/**/*.js', ['scripts']);
});

/**
 * @task web-dev
 * Compile entire web app
 */
gulp.task('web-dev', ['styles', 'scripts'], function () {
    return true;
});

/**
 * @task dist-prod
 * Compile entire dist app
 */
gulp.task('dist-prod', ['style-prod', 'script-prod', 'files', 'fonts', 'images'], function () {
    return true;
});

/**
 * @task default
 * Compile/watch app OTF (dev)
 */
gulp.task('default', ['watch'], function () {
    return true;
});