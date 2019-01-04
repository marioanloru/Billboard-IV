# API 

Tanto si la aplicación se está desplegando en local como si se utiliza el despliegue en Heroku, aquí se exponen las funcionalidades en base a las rutas disponibles:

### Comprobar estado de la app
Para comprobar el estado de la aplicación, petición GET a la ruta:: `/`

### Obtener una película aleatoria
Petición GET a la ruta: `/pelicula`

### Obtener una película por título
Petición GET a la ruta: `/pelicula/<titulo>` siendo `<titulo>` el título de la película a consultar

### Obtener una película por fecha
Petición GET a la ruta: `/pelicula/<año>/<mes>/<dia>` sustituyendo los parametros entre `<>` por la el valor de la variable que indica su nombre

### Insertar una película nueva
Petición PUT a la ruta: `/pelicula/<titulo>/<anyo>/<mes>/<dia>` sustituyendo los parametros entre `<>` por la el valor de la variable que indica su nombre.
Un ejemplo con cURL: `curl -X PUT http://localhost:8333/pelicula/rutia/2/5/1996`

### Eliminar una película por título
[TO DO]Este apartado tendrá mas sentido cuando se añada persistencia mediante bases de datos
Peticion DELETE a la ruta: `/pelicula/<titulo>` siendo `<titulo>` el nombre de la película a eliminar