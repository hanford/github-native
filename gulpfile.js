var gulp = require('gulp')
var gutil = require('gulp-util')
var bower = require('bower')
var minifyCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var sh = require('shelljs')
var watch = require('gulp-watch')
var inject = require('gulp-inject')
var minifyHTML = require('gulp-minify-html')
var mainBowerFiles = require("main-bower-files")
var browserSync = require('browser-sync')
var templateCache = require('gulp-angular-templatecache')
var $ = require("gulp-load-plugins")()

var paths = {
  sass: ['./src/**/*.scss'],
  js: ['src/**/*.js'],
  html: ['src/templates/**/*.html'],
  app: ['src/**/*.*']
}

gulp.task('default', ['sass', 'js', 'templates', 'index', 'move-lib', 'css'])

  gulp.task('watch', ['default'], function () {
    browserSync({
      notify: false,
      server: {
        baseDir: ['www']
      },
      port: "8100"
    })

    gulp.watch(paths.sass, ['sass'])
    gulp.watch(paths.js, ['js'])
    gulp.watch(paths.html, ['templates'])
    // gulp.watch(paths.app, ['default'])
})

gulp.task('templates', function() {
  var opts = {
    conditionals: true,
    spare:true
  }

  return gulp.src(paths.html)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./www/dist/js/templates/'))
})

gulp.task('index', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./www/'))
})

gulp.task('move-lib', function() {
  return gulp.src('./src/lib/**/*.*')
    .pipe(gulp.dest('./www/lib/'))
})

gulp.task('css', function() {
  return gulp.src('src/css/**.*')
    .pipe(gulp.dest('www/css/'))
})

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe($.sass())
    .pipe($.csso())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('./www/dist/css/'))
    .on('end', done)
})

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe($.concat('app.js'))
    .pipe($.size())
    .pipe(gulp.dest('./www/dist/js'))
})

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
//         .pipe(gulp.dest('./www/'))
// })
