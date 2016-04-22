var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglyfly = require('gulp-uglyfly');
var imagemin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var menu = require('./menu.json');

gulp.task('templates', () => {
	var data = {
		year: new Date().getFullYear(),
		menu: menu.menuItems
	},
	options = {
		batch : ['./src/templates/partials']
	}
	return gulp.src(['src/templates/**/*.hbs', '!src/templates/partials/**/*.hbs'])
	.pipe(handlebars(data, options))
	.pipe(rename(function(path){
		path.extname = ".html"
	}))
	.pipe(gulp.dest('./'));

});

gulp.task('images', () => {
	return gulp.src('src/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.stream());
});


gulp.task('styles', function() {
	return gulp.src('src/styles/main.scss')

	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer())
	// .pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	var b = browserify({
		entries:'src/scripts/main.js',
		debug:true
	});

	b.bundle()
	.pipe(source('main.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps:true}))
	.pipe(uglyfly())
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('dist/scripts/'))
	.pipe(browserSync.stream());

});


gulp.task('default',['styles','images', 'scripts','templates' ], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	// gulp.watch("src/**/*").on('change', browserSync.reload);
	gulp.watch("src/styles/**/*.scss", ['styles']);
	gulp.watch("src/img/**/*", ['images']);
	gulp.watch("src/scripts/**/*.js", ['scripts']);
	gulp.watch("src/templates/**/*.hbs", ['templates']);
	gulp.watch("*.html").on('change', browserSync.reload);

});
