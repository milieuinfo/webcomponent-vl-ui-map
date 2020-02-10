'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'dist/**'
					]
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/mapactions-min.js': [
						'src/main/javascript/acd/ol/acd.ol.js',
						'src/main/javascript/acd/ol/ol.mapwithactions.js',
						'src/main/javascript/acd/ol/*.js',
						'src/main/javascript/acd/ol/action/ol.action.js',
						'src/main/javascript/acd/ol/action/ol.mapaction.js',
						'src/main/javascript/acd/ol/action/ol.selectaction.js',
						'src/main/javascript/acd/ol/action/ol.boxselectaction.js',
						'src/main/javascript/acd/ol/action/*.js',
						'src/main/javascript/acd/ol/interaction/*.js'
					]
				}
			}
		},
		concat: {
			dist: {
				files: {
					'dist/mapactions.js': [
						'src/main/javascript/acd/ol/acd.ol.js',
						'src/main/javascript/acd/ol/ol.mapwithactions.js',
						'src/main/javascript/acd/ol/*.js',
						'src/main/javascript/acd/ol/action/ol.action.js',
						'src/main/javascript/acd/ol/action/ol.mapaction.js',
						'src/main/javascript/acd/ol/action/ol.selectaction.js',
						'src/main/javascript/acd/ol/action/ol.boxselectaction.js',
						'src/main/javascript/acd/ol/action/*.js',
						'src/main/javascript/acd/ol/interaction/*.js'
					]
				}
			}
		},
		copy: {
			dist: {
				files: [{
					cwd: 'src/main/style',
					src: '*.{css,scss}',
					dest: 'dist',
					expand: true
				}]
			}
		},
		sass: {
			dist: {
				files: {
					'dist/mapactions.css': 'src/main/style/mapactions.scss'
				}
			}
		}
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
		'clean:dist',
		'sass',
        'uglify:dist',
        'concat:dist',
		'copy:dist'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);

};
