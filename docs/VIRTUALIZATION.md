# Virtualización utilizando contenedores

Para ello se ha utilizado la herramienta `Docker`. Se ha creado un fichero denominado `Dockerfile` en la raíz de la aplicación, este fichero contiene las órdenes necesarias para instalar dependencias y la aplicación en sí en el contenedor que se creará

Su contenido es: *(susceptible a cambios)*

```dockerfile
#  Imagen del contenedor
FROM node:latest

#  Informacion personal
MAINTAINER  Mario Antonio Lopez Ruiz <marioanloru@correo.ugr.es>

#  Directorio donde se alojara la aplicacion
WORKDIR /usr/src/app

# Copia de contenidos al contendor
COPY package.json ./

# Instalacion de dependencias
RUN npm install

# Copiar codigo de la aplicacion
COPY . /usr/src/app  
#  Establecer el puerto 8333
ENV PORT 8333

# Ejecucion del comando establecido al lanzarse el contenedor
CMD ["npm", "start"]

```

En el que se descarga la imagen de node que se va a utilizar, en este caso siempre última disponible. Además se copian los ficheros fuentes a `/usr/src/app` que será el directorio en el que se aloja la aplicación, y se instalan las dependencias definidas en el fichero `package.json` mediante el comando `npm install`. Se define el puerto que usará el contenedor de forma privada y el público (8333 en ambos) y el comando que se ejecutará al lanzarse el contenedor.

Una vez definido el `Dockerfile`, tenemos que construir nuestra imagen, para ello:

`docker build -t marioanloru/billboard-app`

Siendo `marioanloru/billboard-app` el nombre definido para el contenedor. Este comando ejecutará linea a lina de forma secuencial el fichero `Dockerfile`, creando el correspondiente contenedor, como se puede apreciar en la siguiente imagen, tras ejecutar `docker images`:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/docker-images.png)

Ahora, tenemos que ejecutar dicho contenedor y ponerlo a funcionar, para ello:

`docker run -d -p 8333:8333 marioanloru/billboard-app`

Con la opción -d se ejecutará en background y con la opción -p se especifica el puerto interno y el expuesto para acceder desde fuera del contenedor

Tras este comando, si accedemos a 0.0.0.0:8333 tendremos acceso a la aplicación

## Orquestación mediante docker-compose

Para poder orquestar diferentes contenedores se va a utilizar docker-compose, con ello, podemos definir los distintos servicios que se van a utilizar (especificando como se crearán esos contenedores), así como los puertos a exponer de cada servicio y multitud de otras opciones.

De momento solo se tiene un servicio (web) y único contenedor, pero en el futuro se añadirán otros como bases de datos para añadir persistencia.

Para utilizar docker-compose se define el fichero `docker-compose.yml` cuyo contenido es:

```yml
version: '3'
services:
  web:
    build: .
    ports:
      - "8333:8333"
```

En la primera línea se indica la versión a utilizar de docker-compose (3 es la última actualmente), y en la siguiente se definen los servicios, en esta caso y de momento únicamente el servicio web en el puerto 8333. Para construir este servicio se utiliza el `Dockerfile` alojado en la carpeta raíz, cuando se añadan otros servicios se modificará

Para ejecutar el docker-compose:

`docker-compose up -d`

Esto construirá todos los servicios y lo configurado en el ficher `docker-compose.yml`. Con la opción -d se ejecutará en background, si queremos ver los log podemos acceder a los logs del contenedor directamente (`docker logs <NAME>) o si ejecutamos el contenedor sin la opción -d tendremos directamente acceso.

## Docker Hub

Para compartir la imagen de docker con quien la desee se utiliza Docker Hub. Aquí, puedo pushear en el correspondiente repositorio la imagen que desee con un tag.

Para realizarlo hay que estar registrado en Docker Hub y logueado en local, una vez tenemos la imagen de docker, basta con ponerle un tag y pushear al repositorio que se debe haber creado.

Para descargar la imagen de docker de la aplicación:

`docker pull marioanloru/billboard-iv`

## Despliegue de Docker en Heroku

Para empezar, he creado otra app llamada `docker-billboard-iv` en la que se desplegará mediante docker, para no pisar la ya realizada en `billboard-iv` conectada con github.

Para realizar este despliegue, se ha utilizado el Heroku CLI.  Una vez realizado el login en heroku mediante: `heroku container:login` el siguiente paso es pushear la imagen a la aplicación, para ello:

`heroku container:push web --app docker-billboard-iv`

Con ello ya tenemos subida la imagen, queda desplegearla, y para ello:

`heroku container:release web --app=docker-billboard-iv`

La aplicación se puede encontrar desplegada mediante Docker en Heroku en:

Contenedor: https://docker-billboard-iv.herokuapp.com/

También desde la línea de comandos se puede abrir la aplicación:

`heroku open --app docker-billboard-iv`