var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib')();
var config = require('../config')();

gulp.task('styl', function () {
    // return gulp.src([config.assetsPath.styles + 'sela-mdl-theme/sela-mdl-theme.scss'])
    //     .pipe(sass().on('error', sass.logError))
    //     .pipe(gulp.dest(config.assetsPath.styles));
    return gulp.src([config.assetsPath.styles + 'sela-aggrid-theme/sela-aggrid-theme.styl'])
    .pipe(stylus({ use : nib }))
    .pipe(gulp.dest(config.assetsPath.styles));
});

gulp.task('watch-styl', function () {
    gulp.watch(config.assetsPath.styles + '**/*.styl', ['styl']);
});
