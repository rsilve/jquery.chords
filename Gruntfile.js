'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
    	server: {
      		options: {
        		port: 9000,
        		base: './',
        		keepalive: true
      		}
    	},
    	livereload: {
        	options: {
          		port: 9001,
          		base: './',
          		middleware: function(connect, options) {
            		return [lrSnippet, folderMount(connect, options.base)]
          		}
        	}
      	}
  	},
    jison: {
		grid : {
			file : {
				src: 'grid.jison',
				dest:'grid.js'
			}
		}
    },
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    regarde: {
      test: {
        files: ['*.js', '*.html'],
        tasks: ['livereload']
      },
      parser: {
        files: ['*.jison'],
        tasks: ['jison','livereload']
      }
    },
    clean: ["target"]	
  });
  
	
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-jison');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
  

  grunt.registerTask('live', ['livereload-start', 'connect:livereload', 'regarde']);

  // Default task(s).
  grunt.registerTask('default', ['jison', 'nodeunit']);

};
