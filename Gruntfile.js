/// <vs SolutionOpened='development' />
/// <binding ProjectOpened='development' />
/// <vs SolutionOpened='development, setup' />
// This shows a full config file!
module.exports = function (grunt) {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    watch: {
      svg: {
        files: 'less/1-tools/icons/*.*',
        tasks: ['clean:svg', 'svg_sprite', 'less:development']
      },
      setup: {
        files: 'less/1-tools/flaticon/font/*.*',
        tasks: ['refactor:sass_to_less', 'rename:remove_underscores', 'replace', 'less:development']
      },
      docs: {
        files: 'less/**/**/*.less',
        tasks: ['clean:sg', 'less:guide', 'kss', 'copy']
      },
      development: {
        files: ['less/**/**/**/**/**/*.less', 'css/**/*.less'],
        tasks: ['less:development']
      },
      production: {
        files: 'less/**/**/*.less',
        tasks: ['less:production', 'bless']
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          paths
        },
        files: {
          "style.css": "less/style.less"
        }
      },
      production: {
        options: {
          paths: ["css"],
          cleancss: true,
          compress: true,
          /*sourceMap: true,
          sourceMapURL: "../css/style.map"
*/
        },
        files: {
          "style.css": "less/style.less"
        }
      }
    },

    bless: {
      css: {
        options: {
          force: true,
          compress: true
        },
        files: {
          'css/style.css': 'css/style.css'
        }
      }
    },
    copy: {
      styleguide: {
        files: [
          {
            src: ['css/style.doc.css'],
            dest: 'styleguide/style.doc.css'
          }
        ]
      }
    },
    kss: {
      // pro generovani dokumentace
      options: {
        includeType: 'css',
        includePath: 'css/style.doc.css',
        css: '../css/style.doc.css',
        framework: {
          name: 'kss'
        }
      },
      dist: {
        files: {
          'styleguide/': "css/"
        }

      }

    },
    shell: {
      styleguide: {
        command: 'kss css styleguide --css style.doc.css'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
                            'css/*.css',
                            'css/*.doc.css',
                            'templates/**/*.xslt',
                            'css/admin/*.css'
                    ]
        },
        options: {
          watchTask: true,
          baseDir: "/",
          port: 3210
        }
      }
    },

    clean: {
      sg: ['styleguide'],
      svg: ['css/svg/', 'css/png']
    },
    iconizr: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        src: ['less/1-tools/icons'],
        dest: 'css/',
        // Target-specific file lists and/or options go here.
      },
    },
    svg_sprite: {
      complex: {

        // Target basics 
        expand: true,
        cwd: 'less/1-tools/icons/opt',
        src: ['**/*.svg'],
        dest: 'css/',

        // Target options 
        options: {
          shape: {
            dimension: { // Set maximum dimensions 
              //              maxWidth: 32,
              //              maxHeight: 32
            },
            spacing: { // Add padding 
                padding: 1,
                box: 'padding'
            },
            transform: ['svgo'],
            dest: 'out' // Keep the intermediate files 
          },
          mode: {
            view: { // Activate the «view» mode 
              bust: false,
              dest: './',
              render: {
                less: true
              },

            },
            symbol: {   // Activate the «symbol» mode 
              bust: false,
              dest: './',
              render: {
                  less: false
              },
              example: true
            },

            defs: {
            dest: './'}
          }
        }
      }
    },
 
    svg2png: {
      all: {
        // specify files in array format with multiple src-dest mapping 
        files: [
                // rasterize all SVG files in "img" and its subdirectories to "img/png" 
          {
            cwd: 'css/svg/',
            src: ['sprite.view.svg'],
            dest: 'css/png/'
          }
            ]
      }
    },
      
    "remove-svg-properties": {
        options: {
            stylesheets: false,
            properties: ['stroke', 'fill', 'color'],
            namespaces: ['i', 'sketch', 'inkscape']
        },
        all: {
            src: 'less/1-tools/icons/*.svg',
            dest: 'less/1-tools/icons/opt/'
        }
    },
    'extract-svg-styles': {
        options: {
            styleDest: 'css/test/',
            classPrefix: 'icon-',
        },
        all: {
            src: 'less/1-tools/icons/**/*.svg',
            dest: 'css/test/svg'
        }
    }
  });
 // grunt.registerTask('remfill', ['remove-svg-properties']);

//  grunt.registerTask('icons', ['iconizr'])
//  grunt.registerTask('sg', ['watch:docs']); // Add other tasks here if needed
//  grunt.registerTask('svg', ['clean:svg', 'svg_sprite','svg2png',/* 'less:development',*/ 'watch:svg']); //'rename:owl',
//  grunt.registerTask('slider', ['refactor:scss_to_less']); //'rename:owl',
//  grunt.registerTask('s2l', ['refactor', 'rename']);
//  //project setup icons update
//  grunt.registerTask('setup', ['refactor', 'rename', 'replace', 'watch:setup']); //'watch:setup',
  // nastaveni pro vyvoj
  grunt.registerTask('default', ['browserSync', 'watch:development', 'watch:production']);
  // spustit pred commitem
  grunt.registerTask('development', ['browserSync', 'watch:development']);
  grunt.registerTask('production', ['watch:production']);

};