# Depliegue en PaaS

## Heroku

En este proyecto se ha seleccionado Heroku como PaaS. Para desplegar en Heroku se necesita:

- [x] Crear una cuenta en Heroku
- [x] Descargar e instalar el `toolbet` de Heroku (Heroku CLI) 
- [x] Login localmente en heroku
- [x] Creaciónd de la app y repositorio de Heroku
- [x] Configuración del fichero `Procfile` y sincronización con Github y Travis

Para crear una cuenta en Heroku podemos realizarlo siguiendo los pasos de la interfaz desde la [página principal](https://www.heroku.com/).

Descargarmos Heroku CLI en nuestro terminal para poder realizar los siguientes pasos. Con el comando `heroku login` insertamos los credenciales de nuestra cuenta y de esta forma tenemos nuestro PC conectado con los servidores de Heroku. Creamos la app de Heroku con el comando:

`heroku apps:create --region eu billboard-iv` 

Con este comando, hemos creado la app `billboard-iv` para la región `eu`(punto necesario. Ahora vamos a integrar Heroku con github, de forma que cada vez que se haga `push` al repositorio del proyecto en github, se compruebe que los test de integración continua hayan pasado, y entonces se despliega en Heroku (se hace push automáticamente al repositorio de Heroku). Para esto, se ha utilizado la versión beta de la herramienta disponible en Heroku que directamente desde la interfaz se puede configurar en sencillos pasos.

Si se quiere hacer `push`directamente al repositorio de Heroku:

` git push heroku master`

El fichero `Procfile` contiene la configuración que se utilizará para realizar el despliegue en Heroku una vez se suban los cambios, si se quiere modificar la app habrá que modificar este fichero, o si se quiere aplicar alguna herramienta nueva para realizar el `build`