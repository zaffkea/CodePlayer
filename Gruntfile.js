// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: "scss/*.scss",
        tasks: ['sass', 'autoprefixer', 'combine_mq', 'cssmin']
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['concat', 'uglify'],
        options: {
          interrupt: true,
        }
      },
    },
    sass: {
      dist: {
        options: {
//          style: 'compressed',
          sourceMap: false,
          outputStyle: 'nested'
        },
        files: {
          "css/code-player.autoprefixer.css": "scss/main.scss",
        },
      },
    },
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['js/jquery-1.11.3.js', 'js/code-player.js'],
        dest: 'js/code-player.concat.js'
      }
    },
    uglify: {
      options: {
        interrupt: true,
        compress: {
          //drop_console: true
        }
      },
      js: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/code-player.min.js'
      }
    },
    autoprefixer: {
      prefixit: {
        options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        src: 'css/code-player.autoprefixer.css',
        dest: 'css/code-player.combine_mq.css'
      }
    },
    combine_mq: {
      combine: {
        src: '<%= autoprefixer.prefixit.dest %>',
        dest: 'css/code-player.combined.dest.css'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 1,
        sourceMap: true
      },
      target: {
        files: {
          'css/code-player.css': '<%= combine_mq.combine.dest %>',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-mq');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  // grunt.registerTask('default', ['sass', 'autoprefixer', 'combine_mq', 'cssmin', 'concat', 'uglify', 'copy', 'sftp-deploy', 'watch']);
  grunt.registerTask('default', ['sass', 'autoprefixer', 'combine_mq', 'cssmin', 'concat', 'uglify', 'watch']);

};
