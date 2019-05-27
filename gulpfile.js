var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

// sassコンパイルタスク
gulp.task('sass-compile', function(){
  return gulp.src('./dev/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
  done();
});

// gulp-webserver
gulp.task('webserver', function(){
  return gulp.src('public')
    .pipe(webserver({
	  //host: '',
	  livereload: true,
	  directoryListing: true,
	  open: true
    }));
});


// gulpのデフォルトタスクとしてsass-compaileタスクを指定
//gulp.task('default', ['sass-compile']);
gulp.task('default', gulp.series('sass-compile','webserver', function(){
}));
