const express = require('express');
const Pelicula = require('../src/Film.js');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/pelicula', (req, res) => {
    pelicula = new Pelicula('La madonna', '02/03/1960');
    res.send(pelicula.to_string());
});

app.listen(8333, () => {
    console.log('Listening on port 8333')
});