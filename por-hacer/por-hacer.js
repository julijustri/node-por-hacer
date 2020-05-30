const fs = require('fs');

// Almacenamos las tareas en un arreglo
let listadoPorHacer = [];

// Cramos la funcion crear
const crear = (descripcion) => {
    console.log('object', descripcion);

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    // comprobarDirectorio().then(resp => {
    //     console.log('ssss', resp);
    // });

    guardarDB();

    return porHacer;
};

// Guardamos para hacer persistencia
const guardarDB = () => {


    let data = '';

    data = JSON.stringify(listadoPorHacer);


    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error(`No se pudo grabar: ${err}`);
            return;
        }

        console.log(`Los datos se han guardado correctamente`);
    });

};

// leer el archivo y asignarselo a listadoPorHacer, para que sume registros
const cargarDB = () => {

    // Nos encontramos con el problema de que si el .json esta vacion
    // nos lanzara un error, porque no tiene formato, solucion:
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

};

const getListado = () => {

    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }

};

const borrar = (descripcion) => {

    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);;
    //     guardarDB();
    //     return true;
    // }

    // LOS DOS FUNCIONAN

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    // console.log('por-hacer: ', index);

}

const comprobarDirectorio = () => {

    return new Promise((resolve, reject) => {

        let contador = 0;

        fs.readdir(`db/`, function(err, archivos) {
            if (err) {
                reject(err);
                return;
            }
            contador = archivos.length + 1;
            console.log('xxxx', archivos.length);

            resolve(contador);

        });

    });
};

// Exportamos la funcion
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};