//  Requirements
const express = require('express');
const Pelicula = require('../src/Film.js');
const Respuesta = require('../src/Respuesta.js');
const app = express();



//  Provisional film storing structure until database persistence is added to the app
let peliculas = []
peliculas.push(new Pelicula('La madonna', new Date(1960,2,3)))
peliculas.push(new Pelicula('Deadpool', new Date(2016,1,21)))
peliculas.push(new Pelicula('Bambi', new Date(1950,9,11)))
peliculas.push(new Pelicula('El rey leon', new Date(1994,11,8)))
peliculas.push(new Pelicula('Chocolat', new Date(2000,5,27)))
peliculas.push(new Pelicula('Troya', new Date(2004,5,14)))
peliculas.push(new Pelicula('Titanic', new Date(1998,1,8)))
peliculas.push(new Pelicula('Solo en casa', new Date(1990,12,21)))


//  Response middleware
/*app.use((req, res, next) => {
    res.send({'Time': Date.now()})
});*/
//  Root app path
app.get('/', (req, res) => {
    res.status(200).send({
        "status": "OK",
        "ruta": req.route.path
    })
    //Desactivo respuesta temporal ya que si no no pasa los test de JJ
    //res.status(200).send(new Respuesta('OK', res.statusCode, req.route.path, 'App deployed', ''));
});

//  Root app path
app.get('/status', (req, res) => {
    res.status(200).send({
        "status": "OK",
        "ruta": req.route.path
    })
    //Desactivo respuesta temporal ya que si no no pasa los test de JJ
    //res.status(200).send(new Respuesta('OK', res.statusCode, req.route.path, 'App deployed', ''));
});

//  Returns a random film
app.get('/pelicula', (req, res) => {
    let min = 0;
    let max = peliculas.length - 1;
    let indice = Math.floor(Math.random() * (max - min) + min);
    let pelicula = peliculas[indice];
    console.log(pelicula.to_string());
    res.status(200).send(
        new Respuesta('OK', res.statusCode, req.route.path, 'Random film retrieved', pelicula)
    );
});

//  GET film by title
app.get('/pelicula/:titulo', (req, res) => {
    let titulo = req.params.titulo.toLowerCase().replace(/ /g, '');
    let pelicula;
    for(let i= 0; i< peliculas.length; i += 1) {
        if (peliculas[i].title.toLowerCase().replace(/ /g, '') === titulo) {
            pelicula = peliculas[i];
            break;
        }
    }

    if (pelicula) {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'Film found by title', pelicula)
        );
    } else {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'Film not found by title', '')
        );
    }
});

//  GET film by given date
app.get('/pelicula/:anyo/:mes/:dia', (req, res) => {
    let fecha = new Date(req.params.anyo, req.params.mes, req.params.dia);
    let pelicula;
    for(let i= 0; i< peliculas.length; i += 1) {
        //  Compares between timestamps
        if (peliculas[i].date.getTime() === fecha.getTime()) {
            pelicula = peliculas[i];
            break;
        }
    }

    if (pelicula) {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'Film found by date', pelicula)
        );
    } else {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'Film not found by date', '')
        );
    }
});

//  Inserts a new film with given parameters
app.put('/pelicula/:titulo/:anyo/:mes/:dia', (req, res) => {
    var fecha = new Date(req.params.anyo, req.params.mes, req.params.dia);
    var nueva_pelicula = new Pelicula(req.params.titulo, fecha);
    var already_inserted = false;
    //  Checks if film is already inserted
    //  [TO DO] Implement with lodash
    for (let i = 0; i < peliculas.length; i += 1) {
        if (peliculas[i].title.toLowerCase().replace(/ /g, '') === nueva_pelicula.title.toLowerCase().replace(/ /g, '')) {
            already_inserted = true;
            console.log('Film already inserted');
            break;
        }
    }
    if (!already_inserted) peliculas.push(nueva_pelicula);

    if (nueva_pelicula && !already_inserted) {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'New film inserted', nueva_pelicula)
        );
    } else {
        res.status(200).send(
            new Respuesta('ERROR', res.statusCode, req.route.path, 'Film not inserted', '')
        );
    }
});

//  Delete a film by title
app.delete('/pelicula/:titulo', (req, res) => {
    let deleted = false;
    let pelicula_deleted;
    for (let i= 0; i< peliculas.length; i += 1) {
        if (peliculas[i].title.toLowerCase().replace(/ /g, '') === req.params.titulo.toLowerCase().replace(/ /g, '')) {
            pelicula_deleted = peliculas[i].title;
            peliculas.splice(i, 1);
            deleted = true;
            break;
        }
    }

    if (deleted) {
        res.status(200).send(
            new Respuesta('OK', res.statusCode, req.route.path, 'Film deleted', pelicula_deleted)
        );
    } else {
        res.status(200).send(
            new Respuesta('ERROR', res.statusCode, req.route.path, 'Could not delete film', req.params.titulo)
        );
    }
})

//  404 error route, this has to be ALWAYS the last route  
app.get('*', (req, res) => {
    res.status(404).send(
        new Respuesta('ERROR', res.statusCode, req.route.path, 'This page could not be found', '')
    );
});

module.exports = app;

