//const gulp = require('gulp');
const { src, dest, parallel, watch } = require('gulp');
const hbs = require('gulp-handlebars-master');
const rename = require('gulp-rename');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

function html() {
    let templatedata = {};
    let options = {
        batch : ['./src/views/partials']
    };

    return src('./src/views/pages/*.hbs')
        .pipe( hbs('./src/views/layouts/default.hbs', templatedata, options))
        .pipe( rename( function(path){
            path.extname = '.html';
        }))
        .pipe(dest('./dist'));
}

function css() {
    return src('./src/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(dest('./dist/css'))
}

function js() {
    return src('./src/scripts/*.js', { sourcemaps: true })
        .pipe(concat('scripts.min.js'))
        .pipe(dest('./dist/js', { sourcemaps: true }))
}

function assets() {
    return src('./src/assets/**/*')
        .pipe(dest('./dist/assets'))
}

function cssdev() {
    return src('./src/less/*.less')
        .pipe(less())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(dest('./src/css'))
}

function watchCss() {
    watch('./src/less/**/*', cssdev);
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = watchCss;
exports.default = parallel(html, css, js, assets);
