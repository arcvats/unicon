var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('init',['copy-img','copy-js','copy-css','copy-html'],function(){
    console.log('Initiated');
});

gulp.task('default',['copy-css','nodemon'],function(){
    gulp.watch('./client/src/**/*.html',['copy-html']);
    gulp.watch('./client/src/js/**/*.js',['copy-js']);
    gulp.watch('./client/src/stylus/**/*.styl',['copy-css']);
});

gulp.task('nodemon',function(){
    nodemon({
        script:'index.js',
        ext:'js',
        env:{'NODE_ENV':'development'}
    })
});

gulp.task('copy-img',[],function(){
    gulp.src('./client/src/images/*')
        .pipe(imagemin({
            progressive:true,
            use:[pngquant()]
        }))
        .pipe(gulp.dest('./client/dist/images'))
});

gulp.task('copy-js',[],function(){
        gulp.src('./client/src/js/**/*.js')
        .pipe(gulp.dest('./client/dist/js'))
});

gulp.task('copy-css',[],function(){
    return gulp.src('./client/src/stylus/*.styl')
                .pipe(stylus({
                    compress:false
                }))
                .pipe(autoprefixer({
                    browsers:['last 2 versions'],
                    cascade: false
                }))
                .pipe(gulp.dest('./client/dist/css'))
});

gulp.task('copy-html',[],function(){
    gulp.src('./client/src/**/*.html')
        .pipe(gulp.dest('./client/dist'))
});