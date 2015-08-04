module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                browserify: true,
                browser: true,
                devel: true
            },
            all: [
                'Gruntfile.js',
                'www/js/**/*.js',
            ]
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: ['build'],
                options: {
                    reload: true
                }
            },
            js: {
                files: [
                    'www/js/**/*.js',
                    'www/vendor/**/*'
                ],
                tasks: ['build']
            },
            tpl: {
                files: [
                    'www/js/**/*.html'
                ],
                tasks: ['browserify:dev']
            },
            css: {
                files: [
                    'www/css/page-container.css',
                    'www/vendor/bootstrap-dialog/css/bootstrap-dialog.css',
                    'www/js/boucleCarte/boucleCarte.css'
                ],
                tasks: ['cssmin']
            },
        },
        cssmin: {
            options: {
                sourceMap: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'www/index.css': [
                        './node_modules/bootstrap/dist/css/bootstrap.min.css',
                        './node_modules/planet-maps/dist/ol.css',
                        './www/css/swiper.min.css',
                        './www/vendor/bootstrap-dialog/css/bootstrap-dialog.css',
                        './www/css/main.css',
                        './www/css/page-container.css',
                        './www/css/page-profile.css',
                        './www/js/boucleCarte/boucleCarte.css'
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: 'www',
                    open: true,
                    livereload: true
                }
            }
        },
        browserify: {
            dev: {
                src: ['www/js/**/*.js'],
                dest: 'www/index.js',
                options: {
                    browserifyOptions: {
                        debug: true // Enable (inline) source map
                    }
                }
            },
            options: {
                transform: [
                    ['node-underscorify', {templateSettings: {variable: 'data'}}]
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['jshint', 'cssmin', 'browserify:dev']);
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
    grunt.registerTask('default', ['build']);
};

/* TODO:
 * - uglify (prod uniquement)
 * - remplacer connect par ripple et enlever le test "if (window.cordova)" dans init.js
 */
