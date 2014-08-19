module.exports = function(grunt){

	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			less: {
				build: {
					files: {
							'build/css/master-unprefixed.css': ['dev/less/master.less']
					}
				}
			},

			autoprefixer: {
				options: {
					browsers: ['last 10 versions', 'ie 8', 'ie 9']
				},
				build: {
					files: {
						'build/css/master.css': 'build/css/master-unprefixed.css'
					}
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
							cwd: 'dev/images/',
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
				css: {
					files: ['dev/less/**/*.less'],
					tasks: ['less','autoprefixer']
				}
			},

	});

	grunt.registerTask('default', []);

};
