var gulp = require('gulp');
var sass = require('gulp-sass');

// sassコンパイルタスク
gulp.task('sass-compile', function(){
  return gulp.src('./dev/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

// gulpのデフォルトタスクとしてsass-compaileタスクを指定
//gulp.task('default', ['sass-compile']);
gulp.task('default', gulp.series('sass-compile', function(){}));
