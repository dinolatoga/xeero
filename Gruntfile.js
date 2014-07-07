module.exports = function(grunt){

	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			less: {
				build: {
					files: {
							'css/master.css': ['less/master.less']
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
						'head-script-disabled': false, // allow scripts in the head
						'style-disabled': true
					},
					src: ['*.html']
				}
			},

			uglify: {
				build: {
					files: {
						'js/global.min.js': ['js/global.js']
					}
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
					files: ['js/global.js'],
					tasks: ['uglify']
				},
				css: {
					files: ['less/**/*.less'],
					tasks: ['less']
				}
			},

	});

	grunt.registerTask('default',   []);

};
