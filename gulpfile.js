//include gulp
var gulp = require('gulp');

//dependencies
var jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    scssLint = require('gulp-scss-lint');

//paths
var jsPaths = ['./app/javascripts/*.js'],
    scssPaths = ['./app/sass/*.scss', './app/patterns/**/*.scss'];


//jshint
gulp.task('jshint', function(){
    gulp.src('./app/javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//scss lint
gulp.task('scssLint', function() {
  gulp.src(scssPaths)
    .pipe(scssLint());
});

//compass
gulp.task('compass', function() {
    gulp.src('./app/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './app/stylesheets',
            sass: './app/sass'
            }))
        .pipe(gulp.dest('./app/stylesheets'));
});

//browser-sync
gulp.task('browserSync', function(){
    var files = [
    './app/*.html',
    './app/**/*.css',
    './app/**/*.png',
    './app/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './app'
        }
    });
});

//watch scss files
gulp.task('watch', function(){
    gulp.watch(scssPaths, function(){
        gulp.run('compass', 'scssLint');
    });
});

gulp.task('default', ['jshint', 'compass', 'watch']);
