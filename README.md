## Billboard - Proyecto Infraestructura Virtual

Copyright (C) 2018-2019 Mario Antonio López Ruiz

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) 

## 1 - Descripción

Proyecto desarrollado en la asignatura "Infraestructura Virtual" de la ETS de Ingenierías Informática y de Telecomunicación en el grado de Ingeniería Informática. Consiste en la obtención de información de la cartelera cinematográfica bajo determinadas condiciones (tiempo, situación geográfica...), así como poder consultar opiniones del público sobre las diferentes películas.

Constará de dos microservicios relacionados con carteleras cinematográficas, siendo prioritario el primerio ante el segundo:

- Obtener información de la cartelera bajo determinadas condiciones
- Obtener opioniones de usuarios sobre ciertas películas de la cartelera

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

- #### AngularJS

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



## 4 - Desarrollo basado en pruebas

###### Creación de Tests

Para la creación de test se va a utilizar *Assert*, librería que forma parte de la estándar de JS. Mediante esta librería crearé los tests en Javascript

###### Marco de ejecución de los tests

Para ejecutar los tests creados con *Assert* y obtener informes de los resultados voy a utilizar *Mocha*, framework de pruebas de JavaScript ejecutado en Node.js. Permite crear tanto tests síncronos como asíncronos de forma muy sencilla, así como utilidades para ejecución y reporte de los tests.

###### Gestor de versión y bibliotecas

Para la automatización y replicabilidad del entorno voy a utilizar *nvm*, para reflejar localmente los entornos que se usan en producción y facilitar las mismas condiciones que encontraremos más adelante en un PaaS. 

Nvm es el acrónimo de *"Node Version Manager"*

###### Herramienta de constucción

Como herramienta de construcción se va a utilizar *Grunt*, una herramienta de "compilación" para automatizar procesos

###### Integración continua

Se utilizará Travis (travis-ci), dada la facilidad para sincronizar y configurar la cuenta con GitHub. Soporta múltiples lenguajes, entre ellos NodeJS. Permite ejecutar los tests de forma inmediata, al añadir funcionalidades a la clase que se está testeando

## 5 - Autores

Para más detalles sobre los autores, consulte el archivo [AUTHORS](https://github.com/marioanloru/Billboard-IV/blob/master/AUTHORS.md)
