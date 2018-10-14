//  Requirements
const express = require('express');
const Pelicula = require('../src/Film.js');
const app = express();

//  Root app path
app.get('/', (req, res) => {
    res.send('Welcome to Billboard!');
});

//  Returns a film
app.get('/pelicula', (req, res) => {
    pelicula = new Pelicula('La madonna', '02/03/1960');
    res.send(pelicula.to_string());
});

//  Server listening on the specified port
app.listen(8333, () => {
    console.log('Listening on port 8333')
});