"use strict";

var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    liquify = require('gulp-liquify'),
    browserSync = require('browser-sync'),
    data = require('gulp-data'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    scss = require("gulp-scss");

// Data for liquid
var locals = require('./src/data');
console.log(locals.shopify);


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['./demo']
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

//SCSS nefunguje
//tedy smazat carts.css az bude fungovat.
//fucking swatches


//Clear Dist folder!!!

gulp.task('js', function() {
  gulp.src('src/script.js')
    .pipe(rename('quickbeam.js'))
    .pipe(gulp.dest('demo/'))
    .pipe(uglify())
    .pipe(rename('quickbeam.min.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scss', function() {
  gulp.src('src/style.scss')
    .pipe(rename('quickbeam.scss'))
    .pipe(gulp.dest('dist/'))
    .pipe(scss({"bundleExec": true}))
    .pipe(rename('quickbeam.css'))
    .pipe(gulp.dest('demo/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('liquid', function() {
  gulp.src('src/template.liquid')
    .pipe(rename('quickbeam.liquid'))
    .pipe(gulp.dest('dist/'))
});



gulp.task('default', ['browser-sync', 'js', 'scss', 'liquid'], function () {
  gulp.watch('./src/**/*.js',   ['js']);
  gulp.watch('./src/**/*.scss', ['scss']);
  gulp.watch('./src/**/*.liquid', ['liquid']);
});
