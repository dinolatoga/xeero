// Load plugins
var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')({ camelize: true }),
		browserSync = require('browser-sync');
		reload = browserSync.reload;

// Styles
gulp.task('styles', function() {
	gulp.src('assets/less/styles.less')
		.pipe(plugins.less())
		.on('error', plugins.util.log)
		.pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
		.pipe(gulp.dest('assets/css'))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(plugins.minifyCss())
		.pipe(reload({stream:true}))
		.pipe(gulp.dest('assets/css'))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
	gulp.src(['assets/js/*.js', '!assets/js/*.min.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'))
		//.pipe(plugins.concat('main.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(plugins.uglify())
		.pipe(reload({stream:true}))
		.pipe(gulp.dest('assets/js'))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
	gulp.src('assets/images/**/*')
		.pipe(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
		.pipe(reload({stream:true}))
		.pipe(gulp.dest('assets/images'))
		.pipe(plugins.notify({ message: 'Images task complete' }));
});

// HTML
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(reload({stream:true}))
		.pipe(plugins.livereload())
		.pipe(plugins.notify({ message: 'HTML has been updated' }));
});

gulp.task('watch', function() {
	plugins.livereload.listen();
	gulp.watch('assets/less/**/*.less', ['styles']);
	gulp.watch('assets/js/**/*.js', ['scripts']);
	gulp.watch('assets/images/**/*', ['images']);
	gulp.watch('*.html', ['html']);
});

gulp.task('default', ['styles', 'scripts', 'watch' ]);
