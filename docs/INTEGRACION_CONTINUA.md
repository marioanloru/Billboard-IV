# Hito 2

## Desarrollo basado en pruebas

###### Creación de Tests

Para la creación de test se ha utilizado *Assert*, librería que forma parte de la estándar de JS. Mediante esta librería crearé los tests en Javascript.

Los tests se encuentran alojados en la carpeta `tests`

###### Marco de ejecución de los tests

Para ejecutar los tests creados con *Assert* y obtener informes de los resultados voy a utilizar *Mocha*, framework de pruebas de JavaScript ejecutado en Node.js. Permite crear tanto tests síncronos como asíncronos de forma muy sencilla, así como utilidades para ejecución y reporte de los tests.

Para ejecutar los test podemos ejecutar `npm test`, un alias que ejecutará mocha en la carpeta `/tests`. También se puede realizar ejecutando mocha de forma manual bajo el directorio `/tests` 

###### Gestor de versión y bibliotecas

Para la automatización y replicabilidad del entorno voy a utilizar *n*vm, para reflejar localmente los entornos que se usan en producción y facilitar las mismas condiciones que encontraremos más adelante en un PaaS. 

###### Herramienta de constucción

Como herramienta de construcción se va a utilizar *Grunt*, una herramienta de "compilación" para automatizar procesos. 

Para ello he creado un archivo `Gruntfile.js` con la información necesaria. Para crear la documentación de los ficheros fuentes he utilizado `docco`



###### Integración continua

Se utilizará Travis (travis-ci), dada la facilidad para sincronizar y configurar la cuenta con GitHub. Soporta múltiples lenguajes, entre ellos NodeJS. Permite ejecutar los tests de forma inmediata, al añadir funcionalidades a la clase que se está testeando