module.exports = function(config) {
  var appBase    = 'src/';       // transpiled app JS and map files
  var appSrcBase = appBase;      // app source TS files

  // Testing helpers (optional) are conventionally in a folder called `testing`
  var testingBase    = 'testing/'; // transpiled test JS and map files
  var testingSrcBase = 'testing/'; // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
	  'karma-coverage',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter'
    ],

    client: {
      builtPaths: [appBase, testingBase], // add more spec base paths as needed
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      'node_modules/systemjs/dist/system.src.js',

      'node_modules/core-js/client/shim.js',

      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },
      { pattern: 'node_modules/angular2-jwt/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/angular2-jwt/**/*.js.map', included: false, watched: false },

      { pattern: appBase + '/systemjs.config.js', included: false, watched: false },
      { pattern: appBase + '/systemjs.config.extras.js', included: false, watched: false },
      'karma-test-shim.js',
      { pattern: appBase + '**/*.js', included: false, watched: true },
      { pattern: appBase + 'app/components/**/*.js.map', included: false, watched: false },
      { pattern: appBase + 'app/components/**/*.html', included: true, watched: true },
      { pattern: appBase + 'app/components/**/*.css', included: true, watched: true },
      { pattern: appBase + 'app/components/**/*.ts', included: false, watched: false }
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for modules fetched by SystemJS
      '/base/src/node_modules/': '/base/node_modules/'
    },

	exclude: [ appBase + '/**/main.ts' ],

    reporters: ['progress', 'dots', 'coverage', 'kjhtml'],

    preprocessors: {
		'src/**/components/**/!(*spec).js': ['coverage'],
		'src/**/services/**/!(*spec).js': ['coverage']
	},

	coverageReporter: {
        reporters:[
            {type: 'json', subdir: '.', file: 'coverage-final.json'}
        ]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
});
};
