module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Minify files
        uglify: {
            build: {
                src: 'js/scripts.js',
                dest: 'js/scripts.min.js'
            }
        },
                                                                                                                                                                                                                                                            
        // Compile SASS (with Compass)
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    output: 'compressed'
                }
            }
        },


        // Watch files
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }, 

            css: {
                files: ['**/*.scss'],
                tasks: ['compass']
            }
        },


    });

    // Tell Grunt what plugin(s) to use
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tell Grunt what to do when ("grunt" command)
    grunt.registerTask('default', ['uglify', 'watch',]);

};