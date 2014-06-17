'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var rupture = require('rupture');

gulp.task('styles', function () {
  return gulp.src('app/styles/styles.styl')
    .pipe($.stylus({ use: [rupture()] }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('check', function () {
  return gulp.src([
      'app/scripts/**/*.js',
      '!app/scripts/vendor/*.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs())
    .pipe($.size());
});

gulp.task('html', ['styles'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/index.html')
    .pipe($.useref.assets({searchPath: '{.tmp,app}'}))

    .pipe(jsFilter)
    .pipe($.ngmin())
    .pipe($.uglify())
    .pipe(jsFilter.restore())

    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())

    .pipe($.useref.restore())

    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());

  // Special handling for Octicons
  return gulp.src('app/bower_components/octicons/octicons/*.{eot,svg,ttf,woff}')
    .pipe($.flatten())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});

gulp.task('extras', function () {
  gulp.src([
      'package.json',
      'Procfile'
    ])
    .pipe(gulp.dest('dist'))
    .pipe($.size());

  return gulp.src([
      'favicon.ico',
      'robots.txt',
      'server.js',
      'config/*.js',
      'views/**/*.html'
    ], { cwd: 'app', base: './app' })
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', [
  'check',
  'html',
  'images',
  'fonts',
  'extras'
]);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('serve', ['styles'], function () {
  $.nodemon({
    script: 'app/server.js',
    watch: 'app/server.js',
    nodeArgs: ['--debug']
  });
});

gulp.task('watch', ['serve'], function () {
  var server = $.livereload();

  // watch for changes
  gulp.watch([
    'app/**/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js'//,
    // 'app/images/**/*'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch('app/styles/**/*.styl', ['styles']);
  // gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
