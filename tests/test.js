var assert = require('assert');
var Film = require('../src/Film.js');
var request = require('supertest');
app = require('../src/app.js');

describe('PUT film', () => {
  it('should create', (done) => {
    request(app)
      .put('/pelicula/Avatar/18/12/2009')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
});

describe('Film', () => {
  //  Checks for a right load of the library
  describe('Load', () => {
    it('Film library should be loaded correctly', () => {
      assert(Film, "Loaded");
    })
  });
  describe('Creation', () => {
    it('Film should be created correctly', () => {
      var new_film = new Film('Pocahontas', '23-06-1995');
      assert.equal(new_film.to_string(), 'Pocahontas - 23-06-1995');
    });
  });
});



/*var nueva_pelicula = new Pelicula('El exorcista', '01/09/1973');
assert(nueva_pelicula, 'Nueva pelicula creada');
assert.equal(nueva_pelicula.as_string(), 'El exorcista - 01/09/1973')
console.log('Todos los tests pasados correctamente');*/
