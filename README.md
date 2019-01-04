## Billboard - Proyecto Infraestructura Virtual

Copyright (C) 2018-2019 Mario Antonio López Ruiz

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Build Status](https://travis-ci.org/marioanloru/Billboard-IV.svg?branch=master)](https://travis-ci.org/marioanloru/Billboard-IV) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://billboard-iv.herokuapp.com/)

## 1 - Descripción

Microservicio relacionados con carteleras cinematográficas, siendo prioritario el primero:

- Obtener información de la cartelera bajo determinadas condiciones

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

Las herramientas utilizadas para el desarrollo de este proyecto se pueden consultar en [HERRAMIENTA_Y_SERVICIOS](https://github.com/marioanloru/Billboard-IV/blob/master/LICENSE), así como los motivos por los cuales se han seleccionado

## 4 - Despliegue en PaaS

Tras comparar y probar diferentes opciones PaaS (Openshift, Azure, AWS) he decidido utilizar para este proyecto Heroku, ya que ofrece un servicio "fremium", siendo la parte gratuita bastante extensa. Además posee una herramienta en estado "beta" para integración con Github, y también permite la integración continua con Travis.

Para comprobar el despliegue en Heroku funcionando: [DESPLIEGUE](https://billboard-iv.herokuapp.com/)
Puede consultar con detalle la configuración para el despliegue en Hekoru en [DESPLIEGUE](https://github.com/marioanloru/Billboard-IV/blob/master/docs/DESPLIEGUE.md)

## 5 - API
Consultar la documentación en https://github.com/marioanloru/Billboard-IV/blob/master/docs/API.md

## 6 - Aislamiento mediante contenedores

Para acceder y descargar la imagen de docker [Enlace a DockerHub](https://hub.docker.com/r/marioanloru/billboard-iv/)

La aplicación desplegada en Heroku mediante docker se encuentra en : 

Contenedor: https://docker-billboard-iv.herokuapp.com/

Para realizar el aislamiento de la aplicación en un entorno aislado (usando contenedores) se usa [Docker](https://www.docker.com/). Docker es una herramienta de gestión de contenedores que además de permitir instalarlos permite trabajar con conjuntos de contenedores y exportarlos de forma que se pueda desplegar en diferentes servicios en la nube.

Para leer la documentación detallada de cómo se ha realizado, consulte el archivo [VIRTUALIZATION](https://github.com/marioanloru/Billboard-IV/blob/master/docs/VIRTUALIZATION.md)

Para descargar la imagen desde Docker hub: `docker pull marioanloru/billboard-iv`

## 7 - Despliegue desde 0 en Azure

He utilizado como IaaS Azure, generando la/s máquina/s virtuales con Vagrant y su configuración mediante Ansible. Para levantar la aplicación se utiliza el paquete de npm `flightplan`

Despligue final: 40.114.236.235:8333

URL Despliegue final: http://billboardiv-vm.westeurope.cloudapp.azure.com:8333/

Para crear y provisionar la/s máquina/s virtuales en Azure: `vagrant up --provider=azure`. Para levantar el servicio: `cd despliegue; fly staging`

Para más detalles consultar [VIRTUALIZATION_AND_AZURE](https://github.com/marioanloru/Billboard-IV/blob/master/docs/VIRTUALIZATION_AND_AZURE.md)



## 8 - Autores

Para más detalles sobre los autor(es), consulte el archivo [AUTHORS](https://github.com/marioanloru/Billboard-IV/blob/master/AUTHORS.md)

