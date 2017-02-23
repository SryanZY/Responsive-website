# Responsive-website
一套代码响应PC端、移动端和平板


## 使用的响应式技术:
* 媒体查询
* 使用rem适配移动端
* picture标签以及srcset、media属性

## 效果预览图
### PC端
![PC端效果](https://github.com/SryanZY/Responsive-website/raw/master/pasted-image-small.png)

### Pad端
![Pad端効果](https://github.com/SryanZY/Responsive-website/raw/master/pasted-image-small-2-2.png)

### 移动端
![移动端效果](https://github.com/SryanZY/Responsive-website/raw/master/pasted-image-small-3.png)

## 注意事项：

```
1)媒体查询使用相对单位且媒体查询的优先级高于html（或：root），所以需要重新设置分割单位

2)对于响应式图片，使用picture标签配合srcset和media属性。如果需要兼容低版本IE，需要引入polyfill.js,

此处因为响应图片所以引进了picturefill.js

3)进行归一化处理，引入modernizr.js

```

## 关于调试与发布

1. 安装Node.js以及npm
2. 全局安装browser-sync工具，可以实现多设备同步更新
3. 利用gulp或webpack等打包发布工具进行压缩打包

****

## 关于gulp的打包发布   

首先,全局安装gulp  
```
npm install -g gulp
```   
其次,初始化项目目录并安装依赖 
```
npm init
npm i gulp-rev gulp-rev-replace gulp-useref gulp-filter gulp-uglify gulp-csso --save-dev
```    
然后,在根目录下创建gulpfile.js并用Commonjs的方法将安装的依赖项引入   
```
var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");  //更新版本号,更新index中的引用
var useref = require("gulp-useref");  //通过注释的方法将css和js文件整合成一个文件
var filter = require("gulp-filter");  //过滤器
var uglify = require("gulp-uglify");  //压缩js文件
var csso = require("gulp-csso");  ////压缩css文件
```
最后，使用gulp的task函数创建过滤器和分装任务
```
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
```   


注：**根据自己的目录结构改写gulp.src中的路径,还有根据gulp-useref改写index.html中的代码**
```
<!-- build:css css/combined.css -->
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="js/vendor/owl.carousel.2.1.0/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="js/vendor/owl.carousel.2.1.0/assets/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/main.css" />
    <!-- endbuild -->
```
> 如果没有dist目录需要创建一个，用于存放打包后的文件
