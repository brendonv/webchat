// Gulp / Build dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');  
var html2js = require('gulp-ng-html2js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var order = require("gulp-order");
var addsrc = require('gulp-add-src');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var streamqueue = require('streamqueue');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var ENV = process.env.NODE_ENV || 'DEV';
var PORT = process.env.PORT || 5000;

// File Paths and Build Destinations
var concat_dest = 'public/build';
var app_filename = 'webchat.min.js';
var css_filename = 'webchat.css';
var vendor_filename = 'vendor.min.js';
var dev_glob = ['app/**/*.js', '!app/config/production-config.js'];
var prod_glob = ['app/**/*.js', '!app/config/dev-config.js'];
var vendor_js = ['vendor/angular/*.min.js', 'vendor/**/*.min.js', 'vendor/**/dist/*.min.js'];
var app_css = ['app/style/*.scss'];
  

// Task Components
gulp.task('build-vendor', function(){
  return gulp.src(vendor_js)
    .pipe(concat(vendor_filename))
    .pipe(gulp.dest(concat_dest));
});

gulp.task('js', function(){
  var build_glob = (ENV.toUpperCase() === 'PRODUCTION' || ENV.toUpperCase() === 'TEST') ? prod_glob : dev_glob;
  console.log('Build glob: ', ENV, build_glob);
  return streamqueue({ objectMode: true },
    gulp.src(build_glob),
    gulp.src(['app/views/*.pug'])
      .pipe(pug({pretty: true}))
      .pipe(html2js({ moduleName: 'templates', declareModule: false, rename: function(url){
        return url.split('/').pop(-1);
      }}))
  )
  .pipe(concat(app_filename))
  .pipe(gulp.dest(concat_dest));
});

gulp.task('sass', function(){
  return gulp.src(app_css)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(addsrc(['vendor/**/*.css']))
    .pipe(concat(css_filename))
    .pipe(gulp.dest(concat_dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
      proxy: "localhost:" + PORT
    });

    gulp.watch(app_css, ['sass']);
    gulp.watch(dev_glob).on('change', browserSync.reload);
});

gulp.task('start', function() {
  nodemon({
    script: 'index.js',
    ext: 'js pug',
    env: { 'NODE_ENV': 'DEV' }
  });
});

// gulp.task('test', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done);
// });

// Compound Tasks
gulp.task('default',  ['build-vendor', 'js', 'sass']);

gulp.task('dev', ['build-vendor', 'js', 'sass', 'browser-sync', 'start']);
