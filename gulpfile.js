const {src,dest,watch,parallel} = require('gulp');

//Css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); // autoprefixer soporte a otros nav
const cssnano = require('cssnano') //comprimir
const postcsss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

// Tarea para compilar y minificar el codigo css
function css(done){
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcsss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))

    done();
}

// Tarea para reducir el peso de las imagenes
function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}
// Tarea para convertir las imegenes a webp
function versionWebp(done){
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}
// Tarea para convertir las imagenes a avif
function versionAvif(done){
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
// Tarea para compilar y minificar el codigo js
function javascript(done){
    src('src/js/**/*.js')
    // .pipe(sourcemaps.init())
    // .pipe(terser())
    // .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}
// Tarera que escucha los cambios en los archivos de scss y js
function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript,css,dev);



