import gulp from 'gulp';
import terser from 'gulp-terser';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import clean from 'gulp-clean';

/**
 * Generates a simple hash
 */

const hash = '-' + (Math.random() + 1).toString(36).substring(7);

/**
 * Cleans old hashed css files
 * Excludes any file ending in the current hash string
 */

function clean() {
    return gulp
        .src(['public/css/*.css', `!public/css/*!${hash}.css`], {allowEmpty: true})
        .pipe(clean());
}

/**
 * Minifies scripts using terser
 */

function scripts() {
    return gulp.src('src/js/*.js').pipe(terser()).pipe(gulp.dest('public/js/'));
}

/**
 * First pipes all but normalize.css and appends the hash
 * Then pipes in normalize and minifies using cssnano
 */

function styles() {
    return gulp
        .src(['src/css/*.css', '!src/css/normalize.css'])
        .pipe(
            rename((path) => {
                path.basename += hash;
            })
        )
        .pipe(gulp.src('src/css/normalize.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('public/css/'));
}

/**
 * Replaces all instances of the string {{hash}} with the current hash
 * Doesn't minify to make editing final html easier
 */

function markup() {
    return gulp
        .src('src/**/*.html')
        .pipe(replace('{{hash}}', hash))
        .pipe(gulp.dest('public/'));
}

/**
 * Images and fonts are moved to public/ without changes by default
 */

function images() {
    return gulp.src('src/images/*').pipe(gulp.dest('public/images/'));
}

function fonts() {
    return gulp.src('src/fonts/*').pipe(gulp.dest('public/fonts/'));
}

gulp.task('default', gulp.parallel(clean, markup, styles, scripts, images, fonts));
