// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        preprocessors: {
			'src/main/javascript/**.js': ['coverage']
        },

        // base path, that will be used to resolve files and exclude
        basePath: '.',

        // list of files / patterns to load in the browser
        files: [
			"lib/openlayers/dist/ol.js",
			"node_modules/proj4/dist/proj4.js",
			"lib/jsts/dist/jsts.min.js",
			'src/main/javascript/acd/ol/acd.ol.js',
			'src/main/javascript/acd/ol/ol.mapwithactions.js',
			'src/main/javascript/acd/ol/*.js',
			'src/main/javascript/acd/ol/action/ol.action.js',
			'src/main/javascript/acd/ol/action/ol.mapaction.js',
			'src/main/javascript/acd/ol/action/ol.selectaction.js',
			'src/main/javascript/acd/ol/action/ol.boxselectaction.js',
			'src/main/javascript/acd/ol/action/*.js',
			'src/main/javascript/acd/ol/interaction/*.js',
			'src/test/javascript/util.js',
            'src/test/**/!(karma.conf).js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9876,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-requirejs",
            "karma-script-launcher",
            'karma-ng-html2js-preprocessor',
			'karma-coverage']
    });
};
