var gulp = require("gulp");
var sass = require("gulp-sass"); //Sassコンパイル
var autoprefixer = require("gulp-autoprefixer"); //ベンダープレフィックス
var csscomb = require("gulp-csscomb"); //CSS整形
var cmq = require("gulp-combine-media-queries"); // メディアクエリをまとめる
var imagemin = require("gulp-imagemin"); //画像圧縮
var pngquant  = require("imagemin-pngquant"); //画像圧縮を高くする(png)
var mozjpeg  = require("imagemin-mozjpeg"); //画像圧縮を高くする(jpg)
var pug = require("gulp-pug"); //pugコンパイル
var connectSSI = require("connect-ssi"); // SSI
var browser = require("browser-sync"); //ブラウザ表示
var plumber = require("gulp-plumber"); // エラー時の監視ストップ回避
var notify = require("gulp-notify"); //コンパイル完了通知

//pug task
gulp.task("pug", function() {
    var option = {
        pretty: true
    }
    gulp.src(["./src/pug/**/*.pug", "!./src/pug/inc/index.pug", "!./src/pug/inc/**/_*.pug"])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug(option))
    .pipe(gulp.dest("./dist/"))
});

//SCSS task
gulp.task("sass", function() {
    gulp.src("./src/scss/**/*.scss") //入力元
    	.pipe(plumber())
        .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
        .pipe(csscomb())
        .pipe(cmq())
        .pipe(autoprefixer({
	        browsers: ["last 2 version", "iOS >= 8.1", "Android >= 4.4"],
	        cascade: false
	    }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browser.reload({stream:true}))
        .pipe(notify("Scssをコンパイルしました！"));
});

//JS task
gulp.task("js", function () {
    gulp.src("./src/js/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("./dist/js"));
});

//Web server
//gulp.task('webserver', function(){
//  return gulp.src('public')
//    .pipe(webserver({
//      //host: '',
//      livereload: true,
//      directoryListing: true,
//      open: true
//    }));
//});


//IMG task
gulp.task("images", function() {
    gulp.src(["./src/images/**/*", "!./src/images/_**/*"])
        .pipe(imagemin([
            pngquant({
                quality: '90',  // 画質
                speed: 1,  // 最低のスピード
                floyd: 0,  // ディザリングなし
            }),
            mozjpeg({
                quality: 90, // 画質
                progressive: true
            }),
            imagemin.svgo(),
            imagemin.optipng(),
            imagemin.gifsicle()
        ]))
        .pipe(gulp.dest("./dist/images"));
});

//ブラウザ表示 task
gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./dist/",
      middleware: [
        connectSSI({
          baseDir: __dirname + "/dist",
          ext: ".html"
        })
      ]
    },
    host: "localhost",
    open: false
  });
});

//監視 task
gulp.task("watch", function() {
    gulp.watch(["./src/scss/**"], function() {
        gulp.start(['sass']);
    });
    gulp.watch(["./src/pug/**"], function() {
        gulp.start(["pug"]);
    });
    gulp.watch(["./src/js/**"], function() {
        gulp.start(["js"]);
    });
    gulp.watch(["./src/images/**"], function() {
        gulp.start(["images"]);
    });
});

//デフォルト
gulp.task("default", gulp.series("server", "pug", "sass", "js", "images", "watch", function(){
}));


