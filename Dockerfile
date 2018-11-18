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
#ENV PORT 8333

# Exponer puerto 8333 del contenedor para acceder desde fuera del mismo
#EXPOSE 8333

# Ejecucion del comando establecido al lanzarse el contenedor
CMD ["npm", "start"]

