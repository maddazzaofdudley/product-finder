module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'http-server': {
        dist: {
            root: './',
            port: 8080,
            host: '127.0.0.1',
            cache: 0,
            showDir: true,
            autoIndex: true,
            ext: 'html',
            runInBackground: true,
            openBrowser: false
        }
    },

    sass: {
        dist: {
            options: {
                style: 'expanded'
            },

            files: {
                'Styles/product-finder.css' : 'Styles/product-finder.scss',
                'Styles/product-finder-ie8.css' : 'Styles/product-finder-ie8.scss'
            }
        }
    },

    watch: {
        css: {
            files: 'Styles/**/*.scss',
            tasks: ['sass']
        }
    }

  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'http-server', 'watch']);

};
