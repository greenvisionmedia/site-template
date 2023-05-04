import gulp from 'gulp';
import terser from 'gulp-terser';
import cssnano from 'gulp-cssnano';
import htmlmin from 'gulp-htmlmin';
import hash from 'gulp-hash-filename';

function markup() {
    return gulp.src('src/**/*.html').pipe(htmlmin()).pipe(gulp.dest('public/'));
}

function styles() {
    return gulp
        .src('src/css/*.css')
        .pipe(cssnano())
        .pipe(hash())
        .pipe(gulp.dest('public'));
}

function scripts() {
    return gulp.src('src/js/*.js').pipe(terser()).pipe(gulp.dest('public/js/'));
}

function images() {
    return gulp.src('src/images/*').pipe(gulp.dest('public/images/'));
}

function fonts() {
    return gulp.src('src/fonts/*').pipe(gulp.dest('public/fonts/'));
}

function txt() {
    return gulp.src('src/*.txt').pipe(gulp.dest('public/'));
}

gulp.task('default', gulp.parallel(markup, styles, scripts, images(), fonts(), txt()));
