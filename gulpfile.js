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
  sass: ['./scss/**/*.scss']
};

gulp.task('watch', ['default'], function () {
    gulp.watch(paths.sass, ['sass'])
});

gulp.task('default', ['sass']); // html

gulp.task('sass', function(done) {
  gulp.src('./scss/**.scss')
    .pipe($.sass())
    .pipe($.csso())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
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
