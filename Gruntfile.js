/**
 * Grunt!
 *
 * Front-end compile and dress-up directives
 *
 */

const sass = require('node-sass');
const grunt = require('grunt');

require('load-grunt-tasks')(grunt);

var webroot, // store local path to webroot
  build, // where we build to
  path; // store local paths to files

webroot = 'web_src/';
build = 'build/';

path = {
    static: {
        src: webroot,
        dest: build
    },
    img: {
        src: webroot + 'img/',
        dest: build + 'img/'
    },
    js: {
        src: webroot + 'js/',
        dest: build
    },
    sass: {
        src: webroot + 'sass/',
        dest: build + 'css/'
    },
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

/**
 * SASS, with libsass
 * https://github.com/sindresorhus/grunt-sass
 */
    'sass': {
      options: {
        sourceMap: true,
        implementation: sass
      },
      app: {
        src: path.sass.src + 'production.scss',
        dest: path.sass.dest + 'compiled.css'
      }
    },


/**
 * CSSMin
 * https://github.com/gruntjs/grunt-contrib-cssmin
 */
    'cssmin': {
      all: {
        expand: true,
        cwd: path.sass.dest,
        src: '*.css',
        dest: path.sass.dest,
        ext: '.css'
      }
    },

/**
 * Import
 * https://github.com/marcinrosinski/grunt-import
 */
    'import': {
      development: {
        src: path.js.src + "development.js",
        dest: path.js.dest + "game.js"
      },
      production: {
        src: path.js.src + "production.js",
        dest: path.js.dest + "game.js"
      }
    },

    copy: {
        html: {
            cwd: path.static.src,  // set working folder / root to copy
            src: '*.html',           // copy all files and subfolders
            dest: path.static.dest,    // destination folder
            expand: true           // required when using cwd
        },
        config: {
            cwd: path.static.src,  // set working folder / root to copy
            src: '*.json',           // copy all files and subfolders
            dest: path.static.dest,    // destination folder
            expand: true           // required when using cwd
        },
        img: {
            cwd: path.img.src,  // set working folder / root to copy
            src: '*.*',           // copy all files and subfolders
            dest: path.img.dest,    // destination folder
            expand: true           // required when using cwd
        }
    },


/**
 * UglifyJS
 * https://github.com/gruntjs/grunt-contrib-uglify-es
 */
    'uglify': {
      all: {
        expand: true,
        cwd: path.js.dest,
        src: ['*.js', '!*.cjs.js'],
        dest: path.js.dest,
        ext: '.js'
      }
    },


/**
 * Watch
 * https://github.com/gruntjs/grunt-contrib-watch
 */
    'watch': {
      options: {
        livereload: true
      },
      sass: {
        files: [path.sass.src + '**/*.scss'],
        tasks: ['compile-css']
      },

      js: {
        files: [
          path.js.src + '**/*.js',
          '!' + path.js.src + 'app.cjs/**/*.js',
          '!' + path.js.src + 'app.cjs.js',
        ],
        tasks: ['compile-js']
      },
      static: {
        files: [
          path.static.src + '**/*.html',
        ],
        tasks: ['copy']
      }
    },
/**
 * ESLint
 * https://www.npmjs.com/package/grunt-eslint
 */
    eslint: {
        target: [build + '/game.js']
    }
  });

  // Watch Tasks
  grunt.registerTask('watch-js', ['watch:js', 'watch:cjs']);
  grunt.registerTask('watch-less', ['watch:less']);
  grunt.registerTask('compile-js', ['import:development']);
  grunt.registerTask('compile-css', ['sass']);

  // Dev Tasks
  grunt.registerTask('development', ['import:development', 'sass', 'copy', 'eslint']);
  grunt.registerTask('d', ['import:development', 'sass', 'copy', 'eslint']);

  // Deploy Tasks
  grunt.registerTask('production', ['import:production', 'compile-css', 'cssmin', 'uglify', 'copy', 'eslint']);
  grunt.registerTask('p', ['import:production', 'compile-css', 'cssmin', 'uglify', 'copy', 'eslint']);

};
