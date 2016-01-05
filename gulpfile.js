var gulp 			= require('gulp'),
	sass 			= require('gulp-ruby-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	minifycss 		= require('gulp-minify-css'),
	browserSync 	= require('browser-sync').create(),
	reload 			= browserSync.reload,
	ts 				= require('gulp-typescript'),
	jshint 			= require('gulp-jshint'),
    uglify 			= require('gulp-uglify'),
    concat 			= require('gulp-concat'),
    rename 			= require('gulp-rename'),
    notify 			= require('gulp-notify'),
    del 			= require('del'),
    imagemin 		= require('gulp-imagemin');

gulp.task('serve',function(){
	browserSync.init({
		server: {
            baseDir: ["./", "client/dist"]   //added multiple directories 
        }
	});

	gulp.watch('client/dist/libs/**/*').on('change',reload);
	gulp.watch('client/dist/index.html').on('change',reload);
	gulp.watch('client/dist/**/*.html').on('change',reload);
	gulp.watch('client/dist/images/**/*').on('change',reload);
	gulp.watch('client/dist/**/*.css').on('change',reload);
	gulp.watch('client/dist/**/*.js').on('change',reload);
});

gulp.task('libs' ,function(){
	gulp.src('client/src/libs/**/*')
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('client/dist/libs'));
		//.pipe(notify({ message: 'Libs task complete' }));
})


gulp.task('views', function(){
	gulp.src('client/src/index.html')
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('client/dist'));
	gulp.src('client/src/**/*.html')
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('client/dist'));
		//.pipe(notify({ message: 'Views task complete' }));

});

gulp.task('styles',function(){
	return sass('client/src/styles/main.scss')
				.on('error', console.error.bind(console))
				.pipe(autoprefixer('last 2 version'))
    			.pipe(gulp.dest('client/dist/styles'))
    			.pipe(rename({ suffix: '.min' }))
    			.pipe(minifycss())
    			.pipe(gulp.dest('client/dist/styles'));
				//.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts',function(){
	gulp.src('client/src/**/*.ts')
		.on('error', console.error.bind(console))
		.pipe(ts())
		.pipe(jshint('.jshintrc'))
    	.pipe(jshint.reporter('default'))
    	.pipe(concat('main.js'))
		.pipe(gulp.dest('client/dist/scripts'))
		.pipe(rename({ suffix: '.min' }))
    	.pipe(uglify())
    	.pipe(gulp.dest('client/dist/scripts'));
    	//.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
   	gulp.src('client/src/images/**/*')
   		.on('error', console.error.bind(console))
    	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    	.pipe(gulp.dest('client/dist/images'));
    	//.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch',function(){
	gulp.watch('client/src/libs/**/*',['libs']);
	gulp.watch(['client/src/index.html','client/src/**/*.html'], ['views']);
	gulp.watch('client/src/images/**/*',['images']);
	gulp.watch('client/src/**/*.scss',['styles']);
	gulp.watch('client/src/**/*.ts',['scripts']);
});

gulp.task('clean', function() {
    return del(['client/dist']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('libs', 'views', 'images', 'styles', 'scripts', 'watch', 'serve');
});

