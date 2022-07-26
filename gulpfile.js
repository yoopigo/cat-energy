const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");

// Styles

const styles = () => {
  return gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

const minCss = () => {
  return gulp.src("build/css/*.css").pipe(csso()).pipe(gulp.dest("build/css"));
};

exports.minCss = minCss;

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// JS
const scripts = () => {
  return gulp
    .src("source/js/*.js")
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

//IMG

const imgMin = () => {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 95, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

exports.imgMin = imgMin;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}").pipe(gulp.dest("build/img"));
};

exports.copyImages = copyImages;

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

exports.createWebp = createWebp;

//Fonts

const copyFonts = () => {
  return gulp.src("source/fonts/*.{woff,woff2}").pipe(gulp.dest("build/fonts"));
};

exports.copyFonts = copyFonts;

const copyOther = () => {
  return gulp
    .src("source/*.ico", "source/*.webmanifest")
    .pipe(gulp.dest("build"));
};

exports.copyOther = copyOther;

const copyOther2 = () => {
  return gulp.src("source/*.webmanifest").pipe(gulp.dest("build"));
};

exports.copyOther2 = copyOther2;

const copyNormalize = () => {
  return gulp.src("source/css/*.css").pipe(gulp.dest("build/css"));
};

exports.copyNormalize = copyNormalize;

//Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;
// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html").on("change,html", sync.reload);
};

//Builds

const allCopy = gulp.parallel(copyFonts, copyOther, copyOther2, copyNormalize);

exports.allCopy = allCopy;

const build = gulp.series(
  clean,
  allCopy,
  styles,
  imgMin,
  gulp.parallel(minCss, html, scripts, createWebp, scripts)
);

exports.build = build;

exports.default = gulp.series(
  clean,
  allCopy,
  styles,
  copyImages,
  gulp.parallel(html, scripts, createWebp, scripts),
  gulp.series(server, watcher)
);
