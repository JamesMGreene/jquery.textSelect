'use strict';

module.exports = function(grunt) {

  var localPort = 8000;
  
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('textSelect.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    connect: {
      server: {
        options: {
          port: localPort
        }
      }
    },
    qunit: {
      file: ['test/<%= pkg.title %>.html'],
      http: {
        options: {
          urls: [
            /*'1.0', '1.0.1', '1.0.2', '1.0.3', '1.0.4',*/
            /*'1.1', '1.1.1', '1.1.2', '1.1.3', '1.1.4',*/
            /*'1.2', '1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.2.6',*/
            /*'1.3', '1.3.1', '1.3.2',*/
            /*'1.4', '1.4.1', '1.4.2', '1.4.3', '1.4.4',*/
            /*'1.5', '1.5.1', '1.5.2',*/
            /*'1.6', '1.6.1', '1.6.2', '1.6.3', '1.6.4',*/
            '1.7', '1.7.1', '1.7.2',
            '1.8.0', '1.8.1', '1.8.2', '1.8.3',
            '1.9.0', '1.9.1',
            '2.0.0b1',
            'git'
          ].map(function(jqVersion) {
            return 'http://localhost:' + localPort + '/test/<%= pkg.title %>.html?jquery=' + jqVersion;
          })
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.title %>.js'],
        dest: 'dist/<%= pkg.title %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.title %>.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'concat', 'uglify']);

  // Travis CI task.
  grunt.registerTask('travis', ['jshint', 'connect', 'qunit']);

};
