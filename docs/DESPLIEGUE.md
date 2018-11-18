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

Para comprobar que efectivamente se despliega en heroku directamente cuando pusheamos a Github, primero comprobamos que la configuración sea correcta:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-git.png)

Y ahora hacemos la prueba, vamos a realizar algún cambio, hacemos push a el repositorio de Github, se debería esperar a que pasen los test de integración continua y después desplegarse en Heroku, en ese orden:

Hacemos push al repositorio en github:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-git1.png)

Comprobamos que se estén pasando los test de integración continua:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-git2.png)

Esperamos a que se pasen los test:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-git3.png)

Vamos a heroku y comprobamos que tras pasar los test, se ha desplegado la aplicación:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-git4.png)

Desde el log de github, podemos observar que el despliegue ha sido correcto

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/heroku-gitf.png)

#### Fichero `Procfile`

Heroku posee distintos tipos de ejecución y nosotros podemos definir como queremos que nuestra aplicación se ejecute. Para configurar que tipo de ejecución se quiere utilizar en Heroku se define a través del fichero `Procfile`

El contenido del fichero `Procfile` es:

 `web: <comando>`

Web es el tipo de proceso que se está definiendo, y el comando que viene después es la orden que se va a ejecutar. ¿Por qué web? Porque la aplicación que estamos desarrollando es un microservicio web al que se quiere acceder por el usuario a través del navegador o por peticiones mediante http-