'use strict';

//DEPENDENCIAS
var gulp = require('gulp'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//Main vars
var baseDir = {
    dest        : 'app',
    src         : 'prod',
    scss        : '/sass/**/*.scss',
    css         : '/css',
    cssName     : 'styles.min.css',
    jsInRequire : '/js/common.js',
    jsInClasses : '/js/classes/',
    jsInPages   : '/js/page/',
    jsOut       : '/js/',
    local       : 'http://localhost/_PowerInfluencer/_CreadorCampanas/app'
};



//SCSS compiler
gulp.task('scss-dev', function () {
    return gulp.src(baseDir.src + baseDir.scss)
        .pipe(scss.sync({ outputStyle: 'nested' }).on('error', scss.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(rename(baseDir.cssName))
        .pipe(gulp.dest(baseDir.dest + baseDir.css))
        .pipe(browserSync.stream());
});


gulp.task('scss-prod', function () {
    return gulp.src(baseDir.src + baseDir.scss)
        .pipe(scss.sync({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(rename(baseDir.cssName))
        .pipe(gulp.dest(baseDir.dest + baseDir.css))
});


//JS compiler for each page
gulp.task('uglify-dev-pages', function () {
    
    var pages = ['index']
    for (var i = 0; i < pages.length; i++) {
        gulp.src(baseDir.src + baseDir.jsInPages + pages[i] + '.js')
            .pipe(uglify({
                output: {
                    beautify: false
                }
            }))
            .pipe(rename(pages[i] + '.js'))
            .pipe(gulp.dest(baseDir.dest + baseDir.jsOut + 'page'))
            .pipe(browserSync.stream());
    }

});


//JS Compiler for Common.js
gulp.task('ugilfy-dev-common', function () {

    gulp.src(baseDir.src + baseDir.jsInRequire)
        .pipe(uglify({
            output: {
                beautify: false
            }
        }))
        .pipe(rename('common.js'))
        .pipe(gulp.dest(baseDir.dest + baseDir.jsOut))
        .pipe(browserSync.stream());
})

//JS Compiler for Classes
gulp.task('uglify-dev-classes', function () {
    
    var classes = ['campana']
    for (var i = 0; i < pages.length; i++) {
        gulp.src(baseDir.src + baseDir.jsInClasses + classes[i] + '.js')
            .pipe(uglify({
                output: {
                    beautify: false
                }
            }))
            .pipe(rename(pages[i] + '.js'))
            .pipe(gulp.dest(baseDir.dest + baseDir.jsOut + 'classes'))
            .pipe(browserSync.stream());
    }
})


gulp.task('uglify-prod-pages', function () {

    var pages = ['index']
    for (var i = 0; i < pages.length; i++) {
        gulp.src(baseDir.src + baseDir.jsInPages + pages[i] + '.js')
            .pipe(uglify({
                output: {
                    beautify: false
                }
            }))
            .pipe(rename(pages[i] + '.js'))
            .pipe(gulp.dest(baseDir.dest + baseDir.jsOut + 'page'))
            .pipe(browserSync.stream());
    }

});


gulp.task('ugilfy-prod-common', function () {

    gulp.src(baseDir.src + baseDir.jsInRequire)
        .pipe(uglify({
            output: {
                beautify: false
            }
        }))
        .pipe(rename('common.js'))
        .pipe(gulp.dest(baseDir.dest + baseDir.jsOut))
        .pipe(browserSync.stream());
})

//JS Compiler for Classes
gulp.task('ugilfy-prod-classes', function () {
    
    var classes = ['campana']
    for (var i = 0; i < classes.length; i++) {
        gulp.src(baseDir.src + baseDir.jsInClasses + classes[i] + '.js')
            .pipe(rename(classes[i] + '.js'))
            .pipe(gulp.dest(baseDir.dest + baseDir.jsOut + 'classes'))
            .pipe(browserSync.stream());
    }
})

console.log(baseDir.src + baseDir.jsInClasses)

//BrowsrSync
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: baseDir.local
    });
    gulp.watch('**/*{.html,.php}').on('change', reload);
    gulp.watch([baseDir.src + baseDir.scss], ['scss-dev']).on('change', reload);
    gulp.watch([baseDir.src + baseDir.jsInRequire], ['ugilfy-prod-common']).on('change', reload);
    gulp.watch([baseDir.src + baseDir.jsInPages + '*.js'], ['uglify-prod-pages']).on('change', reload);
    gulp.watch([baseDir.src + baseDir.jsInClasses + '*.js'], ['ugilfy-prod-classes']).on('change', reload);
});

//TASK for production version
gulp.task('dev', ['browser-sync']);
gulp.task('prod', ['scss-prod', 'ugilfy-prod-common', 'uglify-prod-pages', 'ugilfy-prod-classes']);