const gulp  = require('gulp');
const babel = require('gulp-babel');

gulp.task('src', () => {
    return gulp.src(['src/**/*'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['src'] , () => {
    gulp.watch('src/**/*', ['src']);
});