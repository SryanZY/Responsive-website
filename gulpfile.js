var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");  //更新版本号,更新index中的引用
var useref = require("gulp-useref");  //通过注释的方法将css和js文件整合成一个文件
var filter = require("gulp-filter");  //过滤器
var uglify = require("gulp-uglify");  //压缩js文件
var csso = require("gulp-csso");  ////压缩css文件

gulp.task('default', function () {

    var jsFilter = filter('**/*.js', { restore: true });
    var cssFilter = filter('**/*.css', { restore: true });
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });

    return gulp.src('index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});