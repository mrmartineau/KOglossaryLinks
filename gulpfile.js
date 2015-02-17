'use strict';

// Include Gulp & Tools We'll Use
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var uglify      = require('gulp-uglify');
var pkg         = require('./package.json');


var CONFIG = {
	DISTDIR : 'dist', // CONFIG.DISTDIR
	DISTNAME: 'KOglossaryLinks', // CONFIG.DISTNAME

	JS : {
		FILELIST : [ // CONFIG.JS.FILELIST
			'jquery-KOglossaryLinks.js'
		]
	},

	AUTOPREFIXER_BROWSERS : [
		'> 5%',
		'last 2 versions',
		'ie > 8'
	],

	// CONFIG.BANNER
	BANNER : ['/**',
	  ' * <%= pkg.name %> - <%= pkg.description %>',
	  ' * @version v<%= pkg.version %>',
	  ' * @link <%= pkg.homepage %>',
	  ' * @license <%= pkg.license %>',
	  ' */',
	  ''].join('\n')
};

// JAVASCRIPT
gulp.task('js', function() {
	return gulp.src(CONFIG.JS.FILELIST)
		.pipe($.sourcemaps.init())
			.pipe($.concat('jquery-KOglossaryLinks.js'))
		.pipe($.sourcemaps.write())
		.pipe($.header(CONFIG.BANNER, { pkg : pkg } ))
		.pipe(gulp.dest(CONFIG.DISTDIR))
		.pipe($.size({title: 'Unminified js',gzip: true}))
		.pipe($.uglify())
		.pipe($.rename({suffix: '.min'}))
		.pipe($.header(CONFIG.BANNER, { pkg : pkg } ))
		.pipe(gulp.dest(CONFIG.DISTDIR))
		.pipe(reload({stream:true}))
		.pipe($.size({title: 'Minified js',gzip: true}));
});

//
gulp.task('styles', function () {
	return gulp.src(['KOglossaryLinks.scss'])
		.pipe($.sourcemaps.init())
			.pipe($.sass({
				precision: 10,
				onError: console.error.bind(console, 'Sass error:\n')
			}))
		.pipe($.sourcemaps.write())
		.pipe($.autoprefixer({browsers: CONFIG.AUTOPREFIXER_BROWSERS}))
		.pipe($.header(CONFIG.BANNER, { pkg : pkg } ))
		.pipe(gulp.dest(CONFIG.DISTDIR))
		.pipe($.size({title: 'Unminified styles',gzip: true}))

		// Concatenate And Minify Styles
		.pipe($.if('*.css', $.csso()))
		.pipe($.rename({suffix: '.min'}))
		.pipe($.header(CONFIG.BANNER, { pkg : pkg } ))
		.pipe(gulp.dest(CONFIG.DISTDIR))
		.pipe(reload({stream:true}))
		.pipe($.size({title: 'Minified styles',gzip: true}));

});

// Serve site, watch files for changes & reload
gulp.task('serve', ['styles', 'js'], function () {
	browserSync({
		notify: false,
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(['*.scss'], ['styles']);
	gulp.watch(['jquery-KOglossaryLinks.js'], ['js']);
	gulp.watch(['*.html'], reload({stream:true}));
});


// Build Production Files, the Default Task
gulp.task('default', function (cb) {
	runSequence('styles', ['jshint', 'js'], cb);
});

// Watch task
gulp.task('watch', ['styles', 'js'], function () {
	gulp.watch(['*.scss'], ['styles']);
	gulp.watch(['jquery-KOglossaryLinks.js'], ['js']);
});


// Lint JavaScript
gulp.task('jshint', function () {
	return gulp.src(CONFIG.JS.FILELIST)
		.pipe(reload({stream: true, once: true}))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});
