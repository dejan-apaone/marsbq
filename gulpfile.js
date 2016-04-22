var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglyfly = require('gulp-uglyfly');
const imagemin = require('gulp-imagemin');

gulp.task('images', () => {
	return gulp.src('src/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.stream());
});


gulp.task('styles', function() {
	return gulp.src('src/styles/*.css')
	.pipe(sourcemaps.init())
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	gulp.src('src/scripts/main.js')
	.pipe(sourcemaps.init())
	.pipe(uglyfly())
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.stream());
});


gulp.task('default', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	// gulp.watch("src/**/*").on('change', browserSync.reload);
	gulp.watch("src/img/**/*", ['images']);
	gulp.watch("src/styles/**/*.css", ['styles']);
	gulp.watch("src/scripts/**/*.js", ['scripts']);
	gulp.watch("*.html").on('change', browserSync.reload);

});
