var path = {
    build: {
        js: 'js/',
        style: 'css/',
        img: 'img/',
        fonts: 'fonts/'
    },
    src: {
        js: 'src/js/**/*.*',
        style: 'src/style/index.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        svg: 'src/svg/**/*.svg'
    },
    watch: {
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    del = require('del'),
    svgSprite = require('gulp-svg-sprite'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('img:build', function () {
    del.sync(path.build.img);
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function () {
    del.sync(path.build.fonts);
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('style:build', function () {
    del.sync(path.build.style);
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style));
});

gulp.task('js:build', function () {
    del.sync(path.build.js);
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/fancybox/dist/jquery.fancybox.js',
        'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js',
        'bower_components/onepage-scroll/jquery.onepage-scroll.js',
        'bower_components/owl.carousel/dist/owl.carousel.js',
        path.src.js
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('svgSprite:build', function () {
    gulp.src(path.src.svg)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '',
                    sprite: 'decor/sprite.symbol.svg'
                }
            }
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('watch', function () {
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('build', [
    'style:build',
    'js:build'
]);
