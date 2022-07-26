const gulp = require('gul')
const clean = require('clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist 
gulp.task('clean', () => {
    return gulp.src('./dist', { allowEmpty: true })
        .pipe(clean());
});

// Creates js bundle  from several js files
gulp.task('bundle', () => {
    return webpack(webpackConfig)
        .pipe(gulp.dest('./dist'));
});

// Converts scss to css
gulp.task('scss', () => {
    return gulp.src('./src/client/**/*scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});

// Transfers index
gulp.task('indes', () => {
    return gulp.src('./src/client/**/*.html')
        .pipe(gulp.dest('./dist'));
});

// Transfers icon
gulp.task('icon', () => {
    return gulp.src(['./src/client/favicon.ico'])
        .pipe(gulp.dest('./dist'));
});


// Watch scss files
gulp.task('watch-scss', () => {
    return gulp.watch('./src/client/**/*scss', gulp.series('scss'));
});

// Watch html files
gulp.task('watch-html', () => {
    return gulp.watch(['./src/client/**/*.html'], gulp.series('index'));
});