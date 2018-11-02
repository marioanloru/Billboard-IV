module.exports = function(grunt) {
     // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docco: {
      debug: {
        src: ['src/*.js', 'app/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    shell: {
      connect: {
        command: 'node src/index.js'
      },
      install: {
        command: 'npm install .'
      }

    }
  });

  // Task load(s)
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-shell');
  // Task(s.
  grunt.registerTask('documentation', ['docco']);
  grunt.registerTask('install', ['shell:install']);
  grunt.registerTask('server', ['default', 'shell:connect']);
  grunt.registerTask('default', ['shell:connect']);
};