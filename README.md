## Billboard - Proyecto Infraestructura Virtual

Copyright (C) 2018-2019 Mario Antonio López Ruiz

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Build Status](https://travis-ci.org/marioanloru/Billboard-IV.svg?branch=master)](https://travis-ci.org/marioanloru/Billboard-IV) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://billboard-iv.herokuapp.com/)

## 1 - Descripción

Proyecto desarrollado en la asignatura "Infraestructura Virtual" de la ETS de Ingenierías Informática y de Telecomunicación en el grado de Ingeniería Informática. Consiste en la obtención de información de la cartelera cinematográfica bajo determinadas condiciones (tiempo, situación geográfica...), así como poder consultar opiniones del público sobre las diferentes películas.

Constará de dos microservicios relacionados con carteleras cinematográficas, siendo prioritario el primerio ante el segundo:

- Obtener información de la cartelera bajo determinadas condiciones
- Obtener opiniones de usuarios sobre ciertas películas de la cartelera

Para probar el proyecto, una vez descargado, basta con ejecutar:

`grunt install`

Instalará las dependencias necesarias para el proyecto

`grunt server`

Activará en el puerto 8333 el proyecto. Si accedemos a localhost:8333/pelicula obtendremos información sobre las películas actualmente procesadas.

Para más información puede consultar la documentación de [integración continua](https://github.com/marioanloru/Billboard-IV/tree/master/docs/INTEGRACION_CONTINUA.md)

Para obtener la documentación de todos los ficheros:

`grunt documentation`

Se generarará la documentación en la carpeta `/docs` en formato html



## 2 - Licencia: GNU GPL v3

Este proyecto es software libre, puede ser redistribuido libremente bajo ciertas condiciones.

```
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

Para más detalles, consulte el archivo [LICENSE](https://github.com/marioanloru/Billboard-IV/blob/master/LICENSE)

## 3 - Servicios y herramientas

Las herramientas utilizadas para el desarrollo de este proyecto, así como los motivos por los cuales se han seleccionado:

- ### NodeJS

  - Uso de javascript tanto en cliente como en servidor
  - Asíncrono (basado en eventos)
  - Gestión de paquetes con NPM (retroalimentación alta por parte de la comunidad)

- ### Express

  - Framework web para Node
  - Minimalista y flexible

- ### AngularJS

  - Framework para frontend
  - Utilizado para crear y mantener aplicaciones web de una sola página
  - Modelo Vista Controlador (MVC), haciendo que desarrollo y pruebas sean más fáciles

- ### Redis

  - Base de datos en memoria
  - NoSQL

- ### Docker

  - Gran adopción en el ámbito empresarial
  - Ventajas frente a máquinas virtuales
  - Despliegue ágil, automatizado y seguro
  - Portabilidad
  - Automatización de tests

- ### Mocha

  - Posibilidad de generar test síncronos o asíncronos
  - Sencillez
  - Utilidades para la ejecución y reporte de los tests
  
- ### Grunt
  - Automatización de procesos (validación de sintaxis, minificación, compilación...)
- ### Travis
  - Sincronización con Github
  - Ejecución de tests de forma inmediata al añadir funcionalidades

## 4 - Despliegue en PaaS

Tras comparar y probar diferentes opciones PaaS (Openshift, Azure, AWS) he decidido utilizar para este proyecto Heroku, ya que ofrece un servicio "fremium", siendo la parte gratuita bastante extensa. Además posee una herramienta en estado "beta" para integración con Github, y también permite la integración continua con Travis.

Para comprobar el despliegue en Heroku funcionando: [DESPLIEGUE](https://billboard-iv.herokuapp.com/)
Puede consultar con detalle la configuración para el despliegue en Hekoru en [DESPLIEGUE](https://github.com/marioanloru/Billboard-IV/blob/master/docs/DESPLIEGUE.md)

## 5 - API
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
## 6 - Virtualización mediante contenedores

Para acceder a la aplicación desplegada mediante docker: 

Contenedor: https://docker-billboard-iv.herokuapp.com/

Para realizar el aislamiento de la aplicación en un entorno virtualizado (usando contenedores) se usa [Docker](https://www.docker.com/). Docker es una herramienta de gestión de contenedores que además de permitir instalarlos permite trabajar con conjuntos de contenedores y exportarlos de forma que se pueda desplegar en diferentes servicios en la nube.

Para leer la documentación detallada de cómo se ha realizado, consulte el archivo [VIRTUALIZATION](https://github.com/marioanloru/Billboard-IV/blob/master/docs/VIRTUALIZATION.md)

Para descargar la imagen desde Docker hub: `docker pull marioanloru/billboard-iv`

Se encuentra en : https://hub.docker.com/r/marioanloru/billboard-iv/

## 7 - Autores

Para más detalles sobre los autor(es), consulte el archivo [AUTHORS](https://github.com/marioanloru/Billboard-IV/blob/master/AUTHORS.md)

