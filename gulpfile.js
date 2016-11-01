
var gulp = require('gulp'),
	
	// 编译LESS
	less = require('gulp-less'),

	// 压缩CSS
	cssmin = require('gulp-cssmin'),

	// 压缩图片
	imagemin = require('gulp-imagemin'),

	// 文件替换
	useref = require('gulp-useref'),

	// js混淆
	uglify = require('gulp-uglify'),

	// 类型筛选
	gulpif = require('gulp-if'),

	// 指纹命名
	rev = require('gulp-rev')

	// 文件名替换
	revCollector = require('gulp-rev-collector'),

	// 重命名
	rename = require('gulp-rename')

// 定义CSS任务
gulp.task('css', function () {

	return gulp.src('./public/less/main.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(rev())
		.pipe(gulp.dest('./release/public/css'))
		.pipe(rev.manifest())
		.pipe(rename('css-manifest.json'))
		.pipe(gulp.dest('./release/rev'));

});

// 定义image任务
gulp.task('image', function () {

	return gulp.src(['./public/images/**/*', './uploads/*'], {base: './'})
		.pipe(imagemin())
		.pipe(rev())
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('image-manifest.json'))
		.pipe(gulp.dest('./release/rev'));
});

// js
gulp.task('useref', function () {
	return gulp.src(['./*.html', './views/*.html'], {base: './'})
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.js', rev()))
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('js-manifest.json'))
		.pipe(gulp.dest('./release/rev'));
});

// 其它
gulp.task('other', function () {

	gulp.src(['./api/*', './public/*(fonts|libs)/*'], {base: './'})
		.pipe(gulp.dest('./release'));

});

gulp.task('rev', ['css', 'image', 'useref'], function () {
	gulp.src(['./release/rev/*.json', './release/*.html', './release/views/*.html'], {base: './release'})
		.pipe(revCollector())
		.pipe(gulp.dest('./release'));
});

gulp.task('release', ['other', 'rev']);


