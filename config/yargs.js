// TAREA:

// const argv................

// comando crear 'Crear un elemento por hacer'
//     --descripcion - d

// comando actualizar 'Actualiza el estado completado de una tarea'
//     --descripcion - d
//     --completado - c true

// --help

const descripcion = {
    descripcion: {
        demand: true, // requerido
        alias: 'd',
        desc: 'Descripcion de la tarea por hace'
    }
};
const completado = {
    completado: {
        alias: 'c',
        default: true,
        desc: 'Marca como completado o pendiente la tarea'
    }
};

const argv = require('yargs')
    // 1= Comamdo,2=Ayuda explicacion, 
    // 3= es un objeto, este objeto va a recibir la configuracion de parametros o de flats que ese comando puede recibir
    .command('crear', 'Crear una tarea', {...descripcion })
    .command('borrar', 'Borrar una tarea', {...descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        ...completado,
        ...descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
};