//Tareas

//done es un callback para indicar que acabó la tarea
function tarea( done){
    console.log("Desde mi primer tarea");

    done()
} 

//se deben exportar las tareas, para ello se sigue la sintaxis

exports.primerTarea = tarea

//con esto vamos a importar Gulp, estamos extrayendo lo que hemos instalado
const { src, dest, watch, series, parallel} = require('gulp'); //las llaves indican que importa multiples funciones
//src nos permite identificar el archivo
//dest nos permite guardar el archivo ya compilado
//watch estará revisando si hay cambios en los archivos (se le indica que revisar)

const sass = require('gulp-sass') (require('sass'));
//sass nos permite compilar las hojas de estilo (scss) ya identificada con src

const autoprefixer = require('autoprefixer')
const postcss = require('postcss')


function css( done ){
    //compilar sass
    //pasos: 1- identificar archivo, 2- compilarla, 3- guardar el .css
    src('src/scss/app.scss') //la ruta completa del archivo scss con los estilos, y continua con .pipe altiro
        .pipe( sass( ))//{ outputStyle: 'compressed'} ) )  //se le pueden pasar objetos para configuracion
        //.pipe( postcss( [ autoprefixer() ]) ) //para dar soporte a otros navegadores
        .pipe( dest('build/css') )  //lo guarda en la ruta indicada
    done();
}


function dev( ){
    //1er param: archivo a revisar, 2do param la funcion a ejecutar
    //watch('src/scss/app.scss', css) //estara revisando esto constantemente si hay cambios
    //para que observe varios archivos usameos comodin
    watch('src/scss/**/*.scss',css) //asi buscara cualquier archivo y subarchivos con extension .scss
}

exports.css = css
exports.dev = dev
//lo que hace es que ejecuta la primera, y una vez que la termina, realiza la siguiente
exports.default = series( css, dev );
//luego en consola llamar a la funcion para  que haga los pasos, compile y cree el archivo css
//en consola colocar gulp css (nombre de funcion) y hara la magia


//tareas por default - la ventaja es que no hay que colocarle nombre al llamar, solamente gulp
//dato: dejar siempre el del watch al final
function tareaDefault(done){
    console.log("soy la tarea por default");
    done()
}

//series - se ejecuta la primera, y una vez que termina, empieza con la siguiente 
//paralelel - todas las funciones inician al mismo tiempo 