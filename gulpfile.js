const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const stylelint = require("gulp-stylelint");
const sassGlob = require("gulp-sass-glob");

// Directories to search SCSS files to build. By default, node-sass does not
// build files that begin with _.
const SCSS_FILE_PATHS = [
  "web/modules/custom/**/*.scss",
  "web/themes/custom/**/*.scss",
];

// Directories to search ES6 JavaScript files to build. Files will be build
// to a .js file extension.
const JS_FILE_PATHS = [
  "web/modules/custom/**/*.es6.js",
  "web/themes/custom/**/*.es6.js",
];

/**
 * build tasks.
 */
const buildScripts = () => {
  return gulp
    .src(JS_FILE_PATHS)
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(".es6", "");
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

const buildStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [
        "node_modules",
        "web/libraries",
      ]
    }))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

exports.build = gulp.series(buildScripts, buildStyles);
exports.buildScripts = buildStyles;
exports.buildStyles = buildStyles;

/**
 * Watch tasks.
 */
const watchScripts = () => {
  return gulp.watch(JS_FILE_PATHS, gulp.series(buildScripts));
};

const watchStyles = () => {
  return gulp.watch(SCSS_FILE_PATHS, gulp.series(buildStyles));
};

exports.watch = gulp.parallel(watchScripts, watchStyles);
exports.watchScripts = watchScripts;
exports.watchStyles = watchStyles;

/**
 * Code validator tasks.
 */
const validateScripts = () => {
  return gulp
    .src(JS_FILE_PATHS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

const validateStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(stylelint({
      reporters: [
        {
          formatter: "verbose",
          console: true,
        }
      ],
      debug: true,
    }));
};

exports.validate = gulp.series(validateScripts, validateStyles);
exports.validateScripts = validateScripts;
exports.validateStyles = validateStyles;

/**
 * Automatic code validation fixer tasks.
 */
const fixScripts = () => {
  return gulp
    .src(JS_FILE_PATHS)
    .pipe(eslint({ fix: true }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

const fixStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(stylelint({ fix: true }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

exports.fix = gulp.series(fixScripts, fixStyles);

/**
 * Default task.
 */
exports.default = exports.build;
