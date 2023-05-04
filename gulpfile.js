import gulp from 'gulp';
import terser from 'gulp-terser';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

const hash = '-' + (Math.random() + 1).toString(36).substring(7);

function scripts() {
    return gulp.src('src/js/*.js').pipe(terser()).pipe(gulp.dest('public/js/'));
}

function styles() {
    return gulp
        .src('src/css/*.css')
        .pipe(cssnano())
        .pipe(
            rename((path) => {
                path.basename += hash;
            })
        )
        .pipe(gulp.dest('public/css/'));
}

function markup() {
    return gulp
        .src('src/**/*.html')
        .pipe(replace('{{hash}}', hash))
        .pipe(gulp.dest('public/'));
}

function images() {
    return gulp.src('src/images/*').pipe(gulp.dest('public/images/'));
}

function fonts() {
    return gulp.src('src/fonts/*').pipe(gulp.dest('public/fonts/'));
}

gulp.task('default', gulp.parallel(markup, styles, scripts, images, fonts));
