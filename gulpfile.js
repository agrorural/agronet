const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const uglify = require('gulp-uglify-es').default;
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const gutil = require('gulp-util');

let config = {
    dist: 'dist/',
    source: 'assets/',
    sass: {
        source: './assets/styles/app.scss',
        dist: './dist/styles',
        fileName: 'app.css',
        minifiedFileName: 'app.min.css',
        watch: './assets/styles/**/*.scss'
    },
    html: {
        watch: './*.html'
    },
    js: {
        require: ['jquery', 'chartkick', 'datatables.net-responsive-bs4', 'owl.carousel', 'jquery-confirm'],
        source: './assets/scripts/vendor.js',
        dist: './dist/scripts',
        fileName: 'vendor.js',
        minifiedFileName: 'vendor.min.js',
        watch: './assets/scripts/*.js'
    },
    image: {
        source: './assets/images/*',
        dist: './dist/images'
    },
    font: {
        source: './assets/fonts/*',
        dist: './dist/fonts'
    },
    misc: {
        source: ['./*.{ico,png,txt}', './.htaccess'],
        dist: './dist/'
    },
    sync: {
        server: true
    }
};
// https://www.browsersync.io/docs/options/

// misc
gulp.task('misc', function() {
    return gulp.src(config.misc.source)
        .pipe(gulp.dest(config.dist));
});

// jslint
gulp.task('lint', function() {
    return gulp.src(config.js.watch)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// clean
gulp.task('clean', function() {
    return del([config.dist]);
});

//fonts
gulp.task('fonts', function() {
    return gulp.src(config.font.source)
        .pipe(gulp.dest(config.font.dist));
});

// image min
gulp.task('imagemin', function() {
    return gulp.src(config.image.source)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.image.dist));
});

// sass to css
gulp.task('sass', function() {
    gulp.src(config.sass.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.sass.dist))
        .pipe(browserSync.stream());
});

// browserify
gulp.task('js', function() {
    return browserify({ entries: [config.js.source], require: [config.js.require] })
        .transform(babelify, { presets: ['es2015'] }) // "es2015", "react"
        .bundle()
        .pipe(source(config.js.fileName))
        .pipe(gulp.dest(config.js.dist))
        .pipe(browserSync.stream());
});

// default task adn watch
gulp.task('serve', ['sass', 'js', 'imagemin', 'fonts', 'misc'], function() {
    browserSync.init(config.sync);

    watch(config.sass.watch, function() {
        gulp.start('sass');
    });
    watch(config.js.watch, function() {
        gulp.start('js');
    });
    watch(config.html.watch, function() {
        reload();
    });
});

// default task
gulp.task('default', ['serve']);

// gulp build and minify things
gulp.task('production', ['sass', 'js', 'imagemin', 'fonts', 'misc'], function() {
    gulp.src(config.js.dist + '/' + config.js.fileName)
        .pipe(rename(config.js.minifiedFileName))
        .pipe(uglify())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest(config.js.dist));

    gulp.src(config.sass.dist + '/' + config.sass.fileName)
        .pipe(cssnano())
        .pipe(rename(config.sass.minifiedFileName))
        .pipe(gulp.dest(config.sass.dist));
});

gulp.task('prod', ['clean'], function() {
    gulp.start('production');
});