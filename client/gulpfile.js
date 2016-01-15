var gulp 				= require('gulp');
	gutil 				= require("gulp-util"),
	webpack 			= require('webpack'),
	webpackStream		= require('webpack-stream'),
	WebpackDevServer 	= require("webpack-dev-server"),
	webpackConfig 		= require("./webpack.config.js"),
	del 				= require('del'),
    imagemin 			= require('gulp-imagemin');


gulp.task('webpack', function() {
  return gulp.src('src/app/app.js')
  	.on('error', console.error.bind(console))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/'));
});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});



gulp.task('views', function(){
	gulp.src('src/index.html')
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('build'));
});

gulp.task('images', function() {
   	gulp.src('client/src/images/**/*')
   		.on('error', console.error.bind(console))
    	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    	.pipe(gulp.dest('client/dist/images'));
    	//.pipe(notify({ message: 'Images task complete' }));
});

//always run this task first
gulp.task('clean', function() {
    return del(['build']);
});



gulp.task('default', ['clean'], function(){
	gulp.start('views', 'images', 'webpack','webpack-dev-server');
});

//gulp.task('default', ['views', 'images', 'webpack','webpack-dev-server']);