module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					install: true,
					copy: false,
					targetDir: './bower_components',
					cleanTargetDir: true
				}
			}
		},
		jshint: {
			all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
		},
		karma: {
			options: {
				configFile: 'test/karma.conf.js'
			},
			unit: {
				singleRun: true
			},

			continuous: {
				singleRun: false,
				autoWatch: true
			}
		},
		html2js: {
			dist: {
				src: [ 'app/views/*.html' ],
				dest: 'dist/templates.js'
			}
		},
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: [ 'app/**/*.js'],
				dest: 'dist/app.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/app.min.js': [ 'dist/app.js' ]
				},
				options: {
					mangle: false
				}
			}
		},
		watch: {
			dev: {
				files: [ 'Gruntfile.js', 'app/**/*.js', 'app/views/*.html' ],
				tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist' ],
				options: {
					atBegin: true
				}
			},
			min: {
				files: [ 'Gruntfile.js', 'app/**/*.js', 'app/views/*.html'  ],
				tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist' ],
				options: {
					atBegin: true
				}
			}
		}

		// Task configuration will be written here
	});

	// Loading of tasks and registering tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-karma');


	grunt.registerTask('dist', [ 'bower', 'jshint', 'html2js', 'concat', 'uglify' ]);
	grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
};