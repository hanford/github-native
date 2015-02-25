var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var minifyHTML = require('gulp-minify-html');
var mainBowerFiles = require("main-bower-files");
var $ = require("gulp-load-plugins")();

var paths = {
  sass: ['./app/**/*.scss'],
  js: ['app/**/*.js']
};

gulp.task('default', ['sass', 'js', 'move-bower', 'templates', 'index', 'move-lib', 'css']);

gulp.task('watch', ['default'], function () {
    gulp.watch(paths.sass, ['sass'])
    gulp.watch(paths.js, ['js'])
});

gulp.task('templates', function() {
  return gulp.src('./app/templates/**/*.html')
    .pipe(gulp.dest('./www/dist/js/templates/'))
});

gulp.task('index', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./www/'))
});

gulp.task('move-lib', function() {
  return gulp.src('./app/lib/**/*.*')
    .pipe(gulp.dest('./www/lib/'))
});

gulp.task('css', function() {
  return gulp.src('app/css/**.*')
    .pipe(gulp.dest('www/css/'))
})

gulp.task('sass', function(done) {
  gulp.src('./app/scss/**.scss')
    .pipe($.sass())
    .pipe($.csso())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('./www/dist/css/'))
    .on('end', done);
});

gulp.task('move-bower', function() {
  return gulp.src('./app/bower_components/**/*.*')
    .pipe(gulp.dest('./www/bower_components/'))
})

gulp.task('js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./www/dist/js'));
});

// gulp.task("html", function(){
//     return gulp.src('./www/index.html')
//         .pipe(inject(
//             gulp.src(
//                 mainBowerFiles(),
//                 {read: false, cwd: "./www/lib/bower"}
//             ),
//             {name: "bower", addPrefix: "lib"}
//         ))
//         // .pipe(minifyHTML())
//         .pipe(gulp.dest('./www/'));
// });

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
