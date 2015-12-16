module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
        dist: {
            options: {
                style: 'expanded'
            },

            files: {
                'Styles/product-finder.css' : 'Styles/product-finder.scss'
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);

};
