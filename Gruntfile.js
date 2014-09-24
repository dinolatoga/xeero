module.exports = function(grunt){

	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			less: {
				build: {
					files: {
							'build/css/master.css': ['dev/less/master.less']
					}
				}
			},

			autoprefixer: {
				options: {
					browsers: ['last 10 versions', 'ie 8', 'ie 9', 'ios 6', 'android 4']
				},
				files: {
					expand: true,
					flatten: true,
					src: 'build/css/*.css',
					dest: 'build/css/'
				}
			},

			cssmin: {
				minify: {
					expand: true,
					cwd: 'build/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
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
						'build/js/global.min.js': 'dev/js/global.js'
					}
				}
			},

			imagemin: {
				dynamic: {
					files: [
						{
							expand: true,
							cwd: 'build/images/',
							src: ['**/*.{png,jpg,gif}'],
							dest: 'build/images/'
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
					files: ['dev/js/global.js'],
					tasks: ['uglify']
				},
				less: {
					files: ['dev/less/**/*.less'],
					tasks: ['less','autoprefixer','cssmin']
				},
				images: {
					files: ['build/images/**/*.{png,jpg,gif}'],
					tasks: ['imagemin']
				}
			},

	});

	grunt.registerTask('default', []);

};
