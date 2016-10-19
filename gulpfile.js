// Gulp / Build dependencies
var gulp = require('gulp');
var html2js = require('gulp-ng-html2js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var newer = require('gulp-newer');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var streamqueue = require('streamqueue');
var autoprefixer = require('gulp-autoprefixer');
var ENV = process.env.NODE_ENV || 'DEV';

// File Paths and Build Destinations
var concat_dest = 'public/build';
var app_filename = 'webchat.min.js';
var css_filename = 'webchat.css';
var vendor_filename = 'vendor.min.js';
var dev_glob = ['app/**/*.js', '!app/config/production-config.js'];
var prod_glob = ['app/**/*.js', '!app/config/dev-config.js'];
  

// Task Components
gulp.task('build-vendor', function(){
  return gulp.src(['vendor/**/*.min.js', 'vendor/**/dist/*.min.js', '!vendor/ng-file-upload/FileAPI.min.js', '!vendor/ng-file-upload/ng-file-upload-all.min.js', '!vendor/ng-file-upload/ng-file-upload-shim.min.js'])
    // .pipe(newer(concat_dest))
    .pipe(concat(vendor_filename))
    .pipe(gulp.dest(concat_dest));
});

gulp.task('build', function(){
  var build_glob = (ENV.toUpperCase() === 'PRODUCTION') ? prod_glob : dev_glob;
  console.log('Build glob: ', ENV, build_glob);
  return streamqueue({ objectMode: true },
    gulp.src(build_glob),
    gulp.src(['app/views/*.jade'])
      .pipe(jade({pretty: true}))
      .pipe(html2js({ moduleName: 'templates', declareModule: false, rename: function(url){
        return url.split('/').pop(-1);
      }}))
  )
  .pipe(concat(app_filename))
  .pipe(gulp.dest(concat_dest));
});

gulp.task('build-css', function(){
  return gulp.src(['app/style/*.styl'])
    // .pipe(newer(concat_dest))
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(addsrc(['vendor/**/*.css']))
    .pipe(concat(css_filename))
    .pipe(gulp.dest(concat_dest));
});

// gulp.task('test', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done);
// });

// Compound Tasks
gulp.task('default',  ['build-vendor', 'build', 'build-css']);
