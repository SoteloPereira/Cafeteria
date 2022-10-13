//Tareas


//con esto vamos a importar Gulp, estamos extrayendo lo que hemos instalado
const { src, dest, watch, series, parallel} = require('gulp'); //las llaves indican que importa multiples funciones
//src nos permite identificar el archivo
//dest nos permite guardar el archivo ya compilado
//watch estará revisando si hay cambios en los archivos (se le indica que revisar)

//Dependencias CSS y SASS
const sass = require('gulp-sass') (require('sass'));
//sass nos permite compilar las hojas de estilo (scss) ya identificada con src
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

//IMAGENES
//const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ){
    //compilar sass
    //pasos: 1- identificar archivo, 2- compilarla, 3- guardar el .css
    src('src/scss/app.scss') //la ruta completa del archivo scss con los estilos, y continua con .pipe altiro
        .pipe( sass( ))//{ outputStyle: 'compressed'} ) )  //se le pueden pasar objetos para configuracion
        //.pipe( postcss( [ autoprefixer() ]) ) //para dar soporte a otros navegadores
        .pipe( dest('build/css') )  //lo guarda en la ruta indicada
    done();
}

//creamos nueva tarea, imagenes para guardarlas y se carguen luego en la pagina
function imagenes(){
    return src('src/img/**/*')   //con el return no es necesario el done, ya que concluye la tarea.
        .pipe( imagemin( {optimizationLevel: 3 })) //recibe un objeto
        .pipe( dest('build/img'))   //no compilamos, solo las guardamos en build
}
//recordar incluir en series del default para que corra la funcion

function versionWebp(){
    const opciones = { quality: 50 } //declaramos un objeto con la quality
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp( opciones )) //ya declarado el objeto con quality se lo pasamos como parametro
        .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones = { quality: 50 }
    return src('src/img/**/*.{png, jpg}')
        .pipe(avif( opciones ))
        .pipe(dest('build/img'))
}

function dev(){
    //1er param: archivo a revisar, 2do param la funcion a ejecutar
    //watch('src/scss/app.scss', css) //estara revisando esto constantemente si hay cambios
    //para que observe varios archivos usameos comodin
    watch('src/scss/**/*.scss',css); //asi buscara cualquier archivo y subarchivos con extension .scss

    //para agregar las imagenes, usamos el watch 
    //watch('src/img/**/*', imagenes);
    watch('src/img/**/*', versionWebp);
    watch('src/img/**/*', versionAvif);
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.avif = versionAvif;
//lo que hace es que ejecuta la primera, y una vez que la termina, realiza la siguiente
exports.default = series( versionWebp, versionAvif, css , dev );
//luego en consola llamar a la funcion para  que haga los pasos, compile y cree el archivo css
//en consola colocar gulp css (nombre de funcion) y hara la magia



//done es un callback para indicar que acabó la tarea
function tarea( done){
    console.log("Desde mi primer tarea");
    done()
} 
//se deben exportar las tareas, para ello se sigue la sintaxis
exports.primerTarea = tarea

//tareas por default - la ventaja es que no hay que colocarle nombre al llamar, solamente gulp
//dato: dejar siempre el del watch al final
function tareaDefault(done){
    console.log("soy la tarea por default");
    done()
}

//series - se ejecuta la primera, y una vez que termina, empieza con la siguiente 
//paralelel - todas las funciones inician al mismo tiempo 