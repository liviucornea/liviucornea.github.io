var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({lazy: true});

var colors = $.util.colors;
var envenv = $.util.env;
var port = process.env.PORT || config.defaultPort;

/**
 * Copying Css to build
 * @return {Stream}
 */

gulp.task('styles',  function () {//['clean-styles'],
    log('Compiling SCSS to build');

     return gulp
         .src(config.scss)
         .pipe($.plumber()) // exit gracefully if something fails after this
         .pipe($.sass().on('error', $.sass.logError))
         .pipe(gulp.dest(config.build + '/resources'));
});

gulp.task('styles-dev',  function () {//['clean-styles'],
    log('Compiling SCSS to build');

    return gulp
        .src(config.scss)
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest( './resources'));
});

gulp.task('scss-watcher', function () {
    gulp.watch([config.scss], ['styles']);
});


/**
 *
 * gulp plain javascript copy
 *
 */
gulp.task('Scripts',function()//['clean-Scripts'],
{
   log('Copying plain javascript files');
    return gulp
        .src(config.js)
        .pipe(gulp.dest(config.build + '/Scripts'));
});

gulp.task('SystemConfigScripts',function()
{
    log('Copying plain javascript files');
    return gulp
        .src(config.systemconfigjs)
        .pipe(gulp.dest(config.build));
});

gulp.task('NodeModulesScripts',function()
{
    log('Copying plain Node Modules javascript files');
	gulp.src([
      'node_modules/es6-shim/es6-shim.min.js']).pipe(gulp.dest(config.build + '/node_modules/es6-shim'));
	gulp.src([
      'node_modules/systemjs/dist/system-polyfils.js']).pipe(gulp.dest(config.build + '/node_modules/systemjs/dist'));
	gulp.src([
      'node_modules/systemjs/dist/system.src.js']).pipe(gulp.dest(config.build + '/node_modules/systemjs/dist'));
	gulp.src([
      'node_modules/reflect-metadata/Reflect.js']).pipe(gulp.dest(config.build + '/node_modules/reflect-metadata'));

	gulp.src([
      'node_modules/zone.js/dist/zone.js']).pipe(gulp.dest(config.build + '/node_modules/zone.js/dist'));	  
	gulp.src([
      'node_modules/jquery/dist/jquery.*js']).pipe(gulp.dest(config.build + '/node_modules/jquery/dist'));	
	gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap*.js']).pipe(gulp.dest(config.build + '/node_modules/bootstrap/dist/js'));	
	gulp.src([
      'node_modules/core-js/client/shim.min.js']).pipe(gulp.dest(config.build + '/node_modules/core-js/client'));	
	  
	  
    gulp.src(['node_modules/@angular/**/*'], { base: 'node_modules/@angular' })
        .pipe(gulp.dest(config.build + '/node_modules/@angular'));
    gulp.src(['node_modules/angular2-in-memory-web-api/**/*'], { base: 'node_modules/angular2-in-memory-web-api' })
        .pipe(gulp.dest(config.build + '/node_modules/angular2-in-memory-web-api'));
    gulp.src(['node_modules/rxjs/**/*'], { base: 'node_modules/rxjs' })
        .pipe(gulp.dest(config.build + '/node_modules/rxjs'));
 
	gulp.src(['node_modules/business-rules-engine/**/*'], { base: 'node_modules/business-rules-engine' })
        .pipe(gulp.dest(config.build + '/node_modules/business-rules-engine'));
		
	gulp.src(['node_modules/bootstrap/**/*'], { base: 'node_modules/bootstrap' })
        .pipe(gulp.dest(config.build + '/node_modules/bootstrap'));
	
	gulp.src([
      'node_modules/easy-pie-chart/dist/jquery.easypiechart.js']).pipe(gulp.dest(config.build + '/node_modules/easy-pie-chart/dist/'));		
	gulp.src([
      'node_modules/chart.js/Chart.min.js']).pipe(gulp.dest(config.build + '/node_modules/chart.js/'));		
	gulp.src([
      'node_modules/chartist/dist/chartist.js']).pipe(gulp.dest(config.build + '/node_modules/chartist/dist/'));
	gulp.src([
      'node_modules/chartist/dist/chartist.css']).pipe(gulp.dest(config.build + '/node_modules/chartist/dist/'));		
	gulp.src([
      'node_modules/lodash/lodash.min.js']).pipe(gulp.dest(config.build + '/node_modules/lodash/'));		
	gulp.src([
      'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2']).pipe(gulp.dest(config.build + '/node_modules/bootstrap/dist/fonts/'));
	gulp.src([
      'node_modules/chart.js/dist/Chart.min.js']).pipe(gulp.dest(config.build + '/node_modules/chart.js/dist/'));	
	gulp.src([
      'node_modules/ng2-charts/ng2-charts.js']).pipe(gulp.dest(config.build + '/node_modules/ng2-charts/'));	
	gulp.src([
      'node_modules/ng2-charts/components/charts/charts.js']).pipe(gulp.dest(config.build + '/node_modules/ng2-charts/components/charts/'));
	gulp.src([
      'node_modules/moment/min/moment.min.js']).pipe(gulp.dest(config.build + '/node_modules/moment/min/'));
	gulp.src([
      'resources/Datahub/routes/dashboard/dashboard.css']).pipe(gulp.dest(config.build + '/resources/Datahub/routes/dashboard/'));
	gulp.src([
      'resources/Bootstrap/bootstrap.css']).pipe(gulp.dest(config.build + '/resources/Bootstrap/'));


});


gulp.task('clean-Scripts', function (done) {
    clean(config.build + 'Scripts/*.*', done);
});

/**
 * Copying Html to build
 * TODO Add compression and other stuff for PROD
 * @return {Stream}
 */
gulp.task('html',  function () {//['clean-html'],
    log('Copying Html to build');

    return gulp
        .src(config.html)
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe(gulp.dest(config.build + '/app'));
});

gulp.task('indexhtml', function () {
    log('Copying Html to build');

    return gulp
        .src(config.indexhtml)
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe(gulp.dest(config.build));
});

/**
 * Transpile ts files to js
 */
var devProject = $.typescript.createProject(config.src + 'tsconfig.json');

gulp.task('tsc', function() {
    log('Transpiling typescript files using gulp');
    var tsResult = gulp.src(config.ts)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(devProject));

    return tsResult.js
        .pipe($.sourcemaps.write(config.tsMaps))
        .pipe(gulp.dest(config.build + '/app'));
});


/*gulp.task('tsc-rootts', function() {
    log('Transpiling typescript files using gulp');
    var tsResult = gulp.src(config.rootts)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(devProject));

    return tsResult.js
        .pipe($.sourcemaps.write(config.tsMaps))
        .pipe(gulp.dest(config.build));
});*/

gulp.task('ts-watcher', function () {
    gulp.watch([config.ts], ['tsc']);
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function (done) {
    clean(config.build + 'images/**/*.*', done);
});

/**
 * Compress images
 * @return {Stream}
 */
/*gulp.task('images-dev', function () {
    log('Copying images');

    return gulp
        .src(config.images)
        .pipe($.plumber())
        .pipe($.directorySync(config.src + config.imagesRoot , config.build + config.imagesRoot, { printSummary: true}));
});

gulp.task('image-watcher', function () {
    gulp.watch([config.images], ['images-dev']);
});*/


/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function () {
    log('Compressing and copying images');

    return gulp
        .src(config.images)
        .pipe($.plumber())
        //.pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + '/app'));
});

/**
 * Build everything
 */
gulp.task('build', ['SystemConfigScripts', 'Scripts', 'tsc', 'images','indexhtml','html','styles' ], function () {//,'NodeModulesScripts'
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp build`'
    };
    log(msg);
});

gulp.task('default', ['styles', 'html','SystemConfigScripts', 'Scripts', 'tsc', 'images','indexhtml','html'], function () {//,'NodeModulesScripts'
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp build`'
    };
    log(msg);
});
/**
 * Watch for CSS and Html changes
 */
/*gulp.task('default', ['build', 'scss-watcher', 'html-watcher', 'ts-watcher', 'image-watcher','Scripts'], function() {
    var msg = {
        title: 'gulp',
        subtitle: 'Watching for HTML, CSS and Typescript changes...'
    };
    log(msg);
});*/

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build + '*');
    clean(delconfig, done);
});

/**
 * Remove all styles from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function (done) {
    var files = [].concat(
        config.build + '**/*.css'
    );
    clean(files, done);
});

/**
 * Remove all html from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-html', function (done) {
    var files = [].concat(
        config.build + '**/*.html'
    );
    clean(files, done);
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.build + '**/*.js',
        config.build + '**/*.html'
    );
    clean(files, done);
});

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path).then(function() {
        if(typeof done === 'function')
            done();
    });
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

module.exports = gulp;
