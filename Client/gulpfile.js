var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./config/gulp/tasks'),
    dashboard = require('./config/gulp/utils/dashboard');

dashboard.show();

/* Default task */
gulp.task('default', ['serve-dev']);



gulp.task('copy.files.to.npmdist.root.dir', function() {
    return gulp.src(
        [
            './LICENSE',
            './FONT-LICENSE',
            './package/README.md',
            './package/index.d.ts',
            './package/index.js'
        ]).pipe(gulp.dest('./npmdist'));
});

gulp.task('edit.package.json.and.copy.to.npmdist.root.dir', function () {
    gulp.src("./package.json")
        .pipe(jeditor(function(json) {
            json.scripts = {};
            json.devDependencies = {};
            json.files = [
                'index.d.ts', 'index.js', 'LICENSE', 'FONT-LICENSE', 'package.json', 'README.md', 'dist', 'bundles'
            ];
            return json;
        }))
        .pipe(gulp.dest("./npmdist"));
});

