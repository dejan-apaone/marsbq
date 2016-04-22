var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	// gulp.watch("src/**/*", browserSync.reload);
	gulp.watch("src/**/*").on('change', browserSync.reload);
	gulp.watch("*.html").on('change', browserSync.reload);

});
