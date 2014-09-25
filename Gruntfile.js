module.exports = function(grunt){

	"use strict";
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			less: {
				build: {
					files: {
							'assets/css/master.css': ['assets/less/master.less']
					}
				}
			},

			autoprefixer: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ios 6', 'android 4']
				},
				files: {
					expand: true,
					flatten: true,
					cwd: 'assets/css',
					src: ['*.css', '!*.min.css'],
					dest: 'assets/css/'
				}
			},

			cssmin: {
				minify: {
					expand: true,
					cwd: 'assets/css',
					src: ['*.css', '!*.min.css'],
					dest: 'assets/css',
					ext: '.min.css'
				}
			},

			htmlhint: {
				build: {
					options: {
						'tag-pair': true,
						'tagname-lowercase': true,
						'attr-lowercase': true,
						'attr-value-double-quotes': true,
						'doctype-first': true,
						'spec-char-escape': true,
						'id-unique': true,
						'head-script-disabled': false,
						'style-disabled': true
					},
					src: ['*.html']
				}
			},

			uglify: {
				build: {
					files: {
						'assets/js/global.min.js': 'assets/js/global.js'
					}
				}
			},

			imagemin: {
				dynamic: {
					files: [
						{
							expand: true,
							cwd: 'assets/images/',
							src: ['**/*.{png,jpg,gif}'],
							dest: 'assets/images/'
						}
					]
				}
			},

			watch: {
				options: {
					livereload: true,
				},
				html: {
					files: ['*.html'],
					tasks: ['htmlhint']
				},
				js: {
					files: ['assets/js/global.js'],
					tasks: ['uglify']
				},
				less: {
					files: ['assets/less/**/*.less'],
					tasks: ['less','autoprefixer','cssmin']
				},
				images: {
					files: ['assets/images/**/*.{png,jpg,gif}'],
					tasks: ['imagemin']
				}
			},

	});

	grunt.registerTask('default', []);

};
