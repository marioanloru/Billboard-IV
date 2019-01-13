# Virtualización mediante Vagrantfile

Creamos un fichero de configuración base para tomar como referencia mediante el comando `Vagrant init` en el directorio de la aplicación, y lo modificamos para que, utilizando Ansible, automaticemos el proceso de creación y provisionamiento de la máquina virtual. Primero, hago una prueba en local con Vagrantfile para comprobar que el provisionamiento y la configuración de la máquina se realiza de forma correcta. El fichero Vagrantfile queda de la forma:

```bash
# Version de configuracion de Vagrant (2)
# que se utilizara
Vagrant.configure("2") do |config|

  # Especifico la imagen de forma local con este comando
  config.vm.box = "bento/ubuntu-16.04"

  # Bindeo el puerto de la maquina 8333 al 8333 
  config.vm.network "forwarded_port", guest: 8333, host: 8333

  # Mensaje a mostrar tras ejecutar vagrant up
  config.vm.post_up_message = "Para usar la aplicacion puede ejecutar 'fly staging' en el fichero 'despliegue' desde su ordenador. Dentro de la maquina puede hacerlo a traves de nodemon"

  # Sincronizo el directorio de provisionamiento con /vagrant
  # En /vagrant ejecutaremos Ansible de forma local a la maquina
  config.vm.synced_folder "provision/", "/vagrant"

  # Copio los ficheros necesarios a la maquina, ficheros fuente y package.json para instalar dependencias con npm
  config.vm.provision "file", source: "./src", destination: "$HOME/Billboard-IV/src"
  config.vm.provision "file", source: "./package.json", destination: "$HOME/Billboard-IV/package.json" 
  
  # Configuracion del provisionador de la maquina y poder de esta forma
  # instalar y configurar todo lo necesario al crear la maquina
  # Utilizo ansible_local ya que vamos a ejecutar Ansible desde la maquina de forma local
  
  config.vm.provision :ansible_local do |ansible|
    # Ansible debe estar instalado en la maquina, por defecto
    # se intentara instalar, pero podemos especificarlo
    # La version por defecto es "latest", la mas actual
    ansible.install = true
    # Especifico como quiero instalar ansible
    # Por defecto en sistemas ubuntu se instalara desde el repositorio ppa:ansible/ansible (puede especificarse la instalacion mediante pip)
    ansible.install_mode = :default
    # Direccion del playbook de Ansible en /vagrant
    ansible.playbook = "playbook.yml"
    # Activo modo verbose para ver que ocurre en todo momento
    ansible.verbose = "vvvv"
  end
end
```

Para el provisionamiento se utilizará el fichero YAML `playbook.yml` mediante `ansible_local`. En este fichero especificamos una serie de tareas siguiendo un orden secuencial. Cada tarea tiene un nombre que especifica que se está instalando o que esta ocurriendo, para que la persona que lo ejecute pueda entender que está ocurriendo.

Para poder utilizar ansible necesitamos tenerlo instalado, pero se instala directamente desde Vagrantfile

Para obtener toda esta información y crear el fichero Vagrantfile desde cero se ha consultado la [documentacion oficial de Vagrant](https://www.vagrantup.com/docs/)

La configuración y órdenes de ansible residen en el fichero `playbook.yml`:

```yaml
---
  - hosts: all
    gather_facts: yes
    remote_user: vagrant

    tasks:
    - name: Actualizar paquetes y cache del sistema
      become: yes
      apt: 
        update_cache: yes

    - name: Instalacion de npm
      apt: 
        name: npm
        become: yes
        state: present

    - name: Instalacion de node via npm
      become: yes
      command: npm install -g n

    - name: Actualizacion de node a la ultima version
      become: yes
      command: n latest

    - name: Instalacion de los paquetes necesarios de node a traves de npm en package.json
      npm:
        path: /home/vagrant/Billboard-IV
        production: yes
        state: latest

    - name: Instalacion de nodemon de forma global
      npm:
        name: nodemon
        global: yes
```

Con este fichero estamos especificando una serie de tareas de provisionamiento para la máquina virtual que queremos finalmente crear. Se ejecutan de forma secuencial, aunque tenemos la opción de decidir por que tarea empezar.

Las tareas que he especificado son:

- Actualizar el sistema y cache
- Instalación de [NPM](https://www.npmjs.com/) , gestor de paquetes de JavaScript
- Instalación de [NodeJS](https://nodejs.org/es/) a través de NPM
- Actualización de [NodeJS](https://nodejs.org/es/) a la última versión disponible
- Instalación de los paquetes necesarios especificados en `package.json` en entorno de produción, por lo que se instalan las dependencias que residen en el bloque "dependencies" únicamente (ignorando "devDependencies"). Estos paquetes serán utilizados por el microservicio y se creará la carpeta `node_modules` con los paquetes dentro
- Instalación del paquete `nodemon` de forma global en la máquina para despues ser utilizado en el despliegue por `flightplan`. [Nodemon](https://nodemon.io/) es un paquete que automatiza el inicio y reinicio de la aplicación. Está pensado principalmente para entorno de desarrollo, pero también se utiliza en producción. Una alternativa mas conocida en producción es [Forever](https://www.npmjs.com/package/forever)

Para iniciar la máquina virtual en local, ejecutamos `vagrant up` en el directorio en el que se encuentre el `Vagrantfile` (o carpetas que sean hijos del mismo directorio, irá subiendo hasta encontrar el Vagrantfile alojado mas superiormente en la jerarquía), esto creará y provisionará la máquina virtual siguiendo las líneas del `Vagrantfile`

(La primera vez que se ejecuta tardará un poco más al tener que descargarse la imagen especificada de Ubuntu a local)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up2.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up3.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up4.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up5.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisining-upfinal.png)

Para comprobar que la máquina se ha creado y provisionado con éxito, nos conectamos a ella mediante ssh y ejecutamos la aplicación, tras ello comprobamos en el host si podemos acceder:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant_ssh.png)

Y vemos que se ha levantado la aplicación en la máquina virtual correctamente.

La instalación de node se ha realizado mediante npm tras tener problemas instalandolo con apt nodejs, gracias a esta [RESPUESTA](https://www.digitalocean.com/community/questions/node-installed-but-can-t-get-version-or-run-node) en digitalocean. Node se instalaba como `nodejs`  y no como `node ` pero de esta forma lo he "solucionado". Para mas detalles sobre la creación del fichero `playbook.yml`  de Ansible puede consultarse [AQUI](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html)

# Despliegue en Azure

Ya hemos probado la creación de máquinas virtuales en local con Vagrantfile y su provisionamiento con Ansible. Ahora, lo haremos en remoto al IaaS Azure.Lo primero es descargar el plugin de Vagrant para azure: `vagrant-azure`, para ello actualizo Vagrant a la última versión disponible:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant-update.png)

Y descargo el plugin de vagrant con:

`vagrant plugin install vagrant-azure` 

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant-azure.png)

Instalo el cliente de Azure mediante node:

`npm install -g azure-cli`

Compruebo la versión del cli con `azure --version`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-version.png)

Ya tenemos los prerrequisitos instalados, ahora tenemos que configurar los credenciales e información adicional de Azure y nuestra suscripción para poder interactuar con las máquinas de Azure, para ello:

Cambiamos el modo del cli a ASM

`azure config mode asm`

Con el siguiente comando tendremos que irnos al navegador (con la url que se proporciona) y logearnos con nuestra cuenta, una vez realizado se descargará un fichero con información de nuestra cuenta:



`azure account download`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/account1.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/account-download.png)

`azure account import ~/Descargas/Windows\ Azure\ MSDN\ -\ 4_1_2019\ 14_23_30\ -\ credentials.publishsettings`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-import.png)

Podemos eliminar el fichero una vez importado, ya que contiene información sensible sobre nuestra suscripción en azure. Comprobamos que la cuenta se ha importado correctamente (los ids han sido borrados por motivos de seguridad)

`azure account list`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-list.png)

Ahora nos logueamos con nuestra cuenta, para ello:

`azure login`

Se abrirá una pestaña en el navegador, en la cual pegaremos el código que se nos muestra por terminal, y estaremos logueados.

Comprobamos la lista de imagenes disponibles de Ubuntu 16.x en Azure con:

`azure vm image list | grep -i ubuntu-16`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-vm.png)

Para ver donde podemos provisionar las máquinas: 

`azure vm location list`

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-locationl.png)

Para poder continuar, genero el par de claves públicas y privada y con ellas genero un certificado que hay que subir mas tarde a azure

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ~/.ssh/azurevagrant.key -out ~/.ssh/azurevagrant.key`

`chmod 600 ~/.ssh/azurevagrant.key `

`openssl x509 -inform pem -in ~/.ssh/azurevagrant.key -out ~/.ssh/azurevagrant.cer `

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-cert.png) 

Ya podemos subir el cerficado a Azure siguiendo las instrucciones en la [documentacion oficial](https://docs.microsoft.com/es-es/azure/azure-api-management-certs) 

Ahora nos falta configurar el Vagrantfile que habíamos probado anteriormente de forma local para que podamos provisionar la máquina de Azure, el fichero `Vagrantfile` queda de la forma:

```bash
# Version de configuracion de Vagrant (2)
# que se utilizara
Vagrant.configure("2") do |config|

  # Es necesario meter este parametro en el vagrantfile o si no dara fallo al hacer vagrant up, EXPLICACIÓN TRAS EL FICHERO
  # La imagen que se utilizara es la especificada en urn en el apartado de azure provider, la urn remota
  config.vm.box = "azure"

  # Configuracion de la conexion a traves de ssh
  config.ssh.private_key_path = "~/.ssh/id_rsa"

  # Mensaje a mostrar tras ejecutar vagrant up y que finalice
  config.vm.post_up_message = "Para usar la aplicacion puede ejecutar 'fly production' en el fichero 'despliegue' desde su ordenador. Dentro de la maquina puede hacerlo a traves de nodemon"

  # Configuracion del proveedor, Azure en este caso
  config.vm.provider :azure do |provider|
    # Credenciales para Azure
    provider.tenant_id = ENV['AZURE_TENANT_ID']
    provider.client_id = ENV['AZURE_CLIENT_ID']
    provider.client_secret = ENV['AZURE_CLIENT_SECRET']
    provider.subscription_id = ENV['AZURE_SUBSCRIPTION_ID']
    # Información y parametros de configuracion de la maquina en Azure
    provider.vm_name = "billboardivmachine"
    provider.location = "westeurope"
    # Nombre del grupo de recursos creado
    provider.resource_group_name = "resources_hito_5"
    # Configuro endpoint en el puerto 8333, para abrir dicho puerto TCP y que este disponible
    provider.tcp_endpoints = 8333
    # Esperar a borrar todos los recursos para terminar Vagrant destroy
    provider.wait_for_destroy = "true"
    # Imagen que se utilizara obtenida en https://docs.microsoft.com/es-es/azure/virtual-machines/linux/cli-ps-findimage?toc=%2Fazure%2Fvirtual-machines%2Flinux%2Ftoc.json
    provider.vm_image_urn = "canonical:ubuntuserver:16.04.0-LTS:latest"
    # Tamanio de la maquina basico para mi region
    # https://docs.microsoft.com/es-es/azure/virtual-machines/linux/sizes-general
    provider.vm_size = "Basic_A1"
    # Tiempo a esperar para la instancia de la maquina a que este lista (en segundos)
    provider.instance_ready_timeout = 300
  end


  # Copio los ficheros necesarios a la maquina
  config.vm.provision "file", source: "./src", destination: "$HOME/Billboard-IV/src"
  config.vm.provision "file", source: "./package.json", destination: "$HOME/Billboard-IV/package.json"
  # Copio el playbook a /vagrant, donde lo utilizara luego Ansible 
  config.vm.provision "file", source: "./provision", destination: "/vagrant"

  # Configuracion del provisionador de la maquina y poder de esta forma
  # instalar y configurar todo lo necesario al crear la maquina
  # Utilizo ansible_local ya que vamos a ejecutar Ansible desde la maquina de forma local, el fichero de Ansible reside en /vagrant
  
  config.vm.provision :ansible_local do |ansible|
    # Ansible debe estar instalado en la maquina, por defecto
    # se intentara instalar, pero podemos especificarlo
    # La version por defecto es "latest", la mas actual
    ansible.install = true
    # Especifico como quiero instalar ansible
    # Por defecto en sistemas ubuntu se instalara desde el repositorio ppa:ansible/ansible
    ansible.install_mode = :default
    # Direccion donde Ansible guarda archivos de forma temporal al provisionar
    #ansible.tmp_path = "tmp/ansible-provisioning"
    # Direccion del playbook de Ansible en /vagrant
    ansible.playbook = "playbook.yml"
    # Activo modo verbose para ver que ocurre en todo momento
    ansible.verbose = "vvvv"
  end
end

```

Unas aclaraciones sobre este fichero. La imagen que se tomará para la máquina virtual será la especificada en `vm_image_urn` con el correspondiente URN de azure (remoto). Sin embargo también he especificado un valor de `vm.box = "azure"` que corresponde a una máquina virtual local. ¿Por qué tengo especificado ambos si son contradictorios? Consultando el [git de vagrant-azure](https://github.com/Azure/vagrant-azure)  encontramos:

> Normally, a lot of the options, e.g., `vm_image_urn`, will be embedded in a box file and you just have to provide minimal options in the `Vagrantfile`. Since, we're using a dummy box, there are no pre-configured defaults

Por ello hemos especificado la `azure` en vm.box, porque se requiere una máquina sin preconfiguración en la que se tendrá embebido la imagen final (especificada en la urn de Azure)

Las variables de entorno deben corresponder a los credenciales de Azure, mediante el comando `azure account show` podemos obtener el valor del TENANT_ID y el SUBSCRIPTION_ID. Para obtener el valor de AZURE_CLIENT_ID y AZURE_CLIENT_SECRET hay que generar una app desde el portal de Azure como recurso, que estará asociado a la suscripción que se nos proporcionó durante la asignatura. Es muy importante darle permisos a esta aplicación como `contribuidor` (o superior) para que puedan ejecutarse determinados comandos que requerirá `vagrant up`, de lo contrario acabará fallando. 
Una vez configurado el Vagrantfile correctamente, solo queda crear la máquina en Azure, para ello:

`vagrant up` 

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion1.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion2.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion3.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion4.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion5.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion6.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-creacion7.png)

La máquina ya está creada en Azure, comprobamos conectándonos mediante ssh. 

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-vm-creada.png)

Y vemos que está creada correctamente, ahora falta desplegar la aplicación.

## Depliegue mediante flighplan

Por último, el despliegue se va a realizar mediante el paquete de node `flightplan`, instalo el paquete con npm: 

`npm install --save flightplan`

Que guardará la dependencia en `package.json` e instalará el paquete en `node_modules`

`npm install -g flightplan` (Para tenerlo en mi ordenador y poder ejecutarlo)

Defino en el fichero `flightplan.js` a donde debe realizarse la conexión y los comandos a ejecutar, quedando de la forma:

```javascript
const plan = require('flightplan')

// Configuracion para Azure
plan.target('production', {
    host: 'billboardivmachine.westeurope.cloudapp.azure.com',
    username: 'vagrant',
    agent: process.env.SSH_AUTH_SOCK
});

plan.remote((remote) => {
    remote.with('cd Billboard-IV', () => {
        remote.exec('nodemon src/index.js')
    });
});
```

Se conecta con la máquina de azure a través de SSH con el usuario `vagrant` y levanta la aplicación a través de nodemon, que en caso caerse o ocurrir algo la reiniciará. 

Para realizar el despliegue, simplemente hay que dirigirse a la carpeta `despliegue` y ejecutar `fly staging`

Compruebo que está disponible a través de la url de Azure (en el puerto 8333 como especificamos en el fichero `Vagrantfile`):

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-despliegue-correcto1)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-despliegue-correcto2)

Y observamos que está completamente disponible

Documentacion oficial de [Flightplan](https://www.npmjs.com/package/flightplan)
