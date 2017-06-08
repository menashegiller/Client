var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config')();

gulp.task('sass', function () {
    return gulp.src([config.assetsPath.styles + 'main.scss', config.assetsPath.styles + 'sela-mdl-theme/sela-mdl-theme.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.assetsPath.styles));
});

gulp.task('watch-sass', function () {
    gulp.watch(config.assetsPath.styles + '**/*.scss', ['sass']);
});
