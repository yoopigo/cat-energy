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
const ghPages = require("gulp-gh-pages");

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

const createWebpCatalog = () => {
  return gulp
    .src("source/img/catalog/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img/catalog"));
};

exports.createWebpCatalog = createWebpCatalog;

const createWebPromo = () => {
  return gulp
    .src("source/img/promo/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img/promo"));
};

exports.createWebPromo = createWebPromo;

const createWebSlider = () => {
  return gulp
    .src("source/img/slider/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img/slider"));
};

exports.createWebSlider = createWebSlider;

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

const reload = (done) => {
  sync.reload();
  done();
};

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

//Builds

const allCopy = gulp.parallel(copyFonts, copyOther, copyOther2, copyNormalize);

const createWebp = gulp.parallel(
  createWebpCatalog,
  createWebPromo,
  createWebSlider
);

exports.allCopy = allCopy;
exports.createWebp = createWebp;

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
  imgMin,
  gulp.parallel(minCss, html, scripts, createWebp, scripts)
);

gulp.task("deploy", function () {
  return gulp.src("./build/**/*").pipe(ghPages());
});
