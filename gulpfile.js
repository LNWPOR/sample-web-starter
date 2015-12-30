var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

gulp.task('serve',function(){
	browserSync.init({
		server: "./"
	});

	gulp.watch("./client/dist/*.html").on('change',reload);
	gulp.watch("./client/dist/*.css").on('change',reload);
	gulp.watch("./js/*.js").on('change',reload);
});

gulp.task('styles',function(){
	return sass('./client/src/*.scss')
	.pipe(gulp.dest('./client/dist/css'));
});

gulp.task('watch',function(){
	gulp.watch('./client/src/*.scss',['styles']);
});

gulp.task('default',['styles','watch','serve']);