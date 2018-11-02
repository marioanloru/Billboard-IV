//  Requirements
const express = require('express');
const Pelicula = require('../src/Film.js');
const app = express();

//  Root app path
app.get('/', (req, res) => {
    res.send({ 'status': 'OK'});
});

//  Returns a film
app.get('/pelicula', (req, res) => {
    pelicula = new Pelicula('La madonna', '02-03-1960');
    res.send(pelicula.to_string());
});

app.get('/hola/:id', (req, res) => {
    res.send({'status': 'HOLA'});
});

app.put('/pelicula/:titulo/:dia/:mes/:anyo', (req, res) => {
    var fecha = new Date(req.params.anyo, req.params.mes, req.params.dia);
    var nueva_pelicula = new Pelicula(req.params.titulo, fecha);
    res.send(nueva_pelicula);
});

module.exports = app;

