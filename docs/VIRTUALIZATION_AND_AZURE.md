# Virtualización mediante Vagrantfile

Creamos una máquina virtual con `Vagrant init` en el directorio de la aplicación, y lo modificamos para que, utilizando Ansible, automatizamos el proceso de creación y provisionamiento de la máquina virtual, creando y configurándose de forma automática. El fichero Vagrantfile queda de la forma:

```bash
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "bento/ubuntu-16.04"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 8333, host: 8333, host_ip: "0.0.0.0"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "ansible" do |ansible|
      ansible.playbook = "playbook.yml"
      ansible.verbose = "v"
  end
  #   sudo apt-get update
  #   sudo apt-get install -y apache2
  # SHELL
end

```

Estamos especificando que la imagen que se usará en la máquina virtual es `ubuntu 16.04`, el forwarding de puertos, el puerto 8333 de la máquina será el 8333 en el host y que para el provisionamiento se utilizará el fichero YAML `playbook.yml` mediante ansible. En este fichero especificamos una serie de tareas siguiendo un orden. Cada tarea tiene un nombre que especifica que se está haciendo, para que la persona que lo ejecute pueda entender que está ocurriendo.


Para poder utilizar ansible hay que instalarlo con:

`sudo apt-get install ansible`

La configuración y órdenes de ansible residen en el fichero `playbook.yml`:

```yaml
---
  - hosts: all
    sudo: yes
    gather_facts: yes
    remote_user: vagrant
    tasks:
    - name: Actualizar paquetes y cache del sistema
      become: yes
      apt: 
        update_cache: yes

    - name: Instalacion de git
      apt: 
        name: git
        state: latest

    - name: Instalacion de build-essentials
      apt:
        name: build-essential
        state: latest

    - name: Instalacion de npm
      apt: 
        name: npm
        state: present

    - name: Instalacion de node via n (npm)
      become: yes
      command: npm install -g n

    - name: Actualizacion de node a la ultima version
      become: yes
      command: n latest

    - name: Instalacion de Grunt
      npm:
        name: grunt
        global: yes
        state: present

    - name: Clonar repositorio de la aplicacion Billboard
      git: repo=https://github.com/marioanloru/Billboard-IV.git dest=Billboard-IV/ clone=yes
```

Las tareas que especificamos son, limpiar la caché, actualizar la versión de git, instalar los paquetes básicos para la máquina virtual, descargar npm e instalar con el mismo node. Instalo el paquete de npm `grunt`  para poder levantar la aplicación y por último clono el repositorio de la aplicación.

Para iniciar la máquina virtual, ejecutamos `vagrant up` en el directorio en el que se encuentre el `Vagrantfile`, esto creará la máquina virtual siguiendo las órdenes de dicho fichero y provisionando mediante lo especificado en `playbook.yml` con ansible:

(La primera vez que se ejecuta tardará un poco más al tener que descargarse la imagen especificada de Ubuntu)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up2.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up3.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up4.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisioning-up5.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/provisining-upfinal.png)

Para comprobar que la máquina se ha creado y provisionado con éxito, nos conectamos a ella mediante ssh y ejecutamos la aplicación, tras ello comprobamos en el host si podemos acceder:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant_ssh.png)

Y vemos que se ha levantado la aplicación en la máquina virtual correctamente.

La instalación de node se ha realizado mediante npm tras tener problemas instalandolo con apt nodejs, gracias a esta [RESPUESTA](https://www.digitalocean.com/community/questions/node-installed-but-can-t-get-version-or-run-node) en el digitalocean. Node se instalaba como `nodejs` pero de esta forma lo he "solucionado". Para mas detalles sobre la creación del fichero `playbook.yml`  de Ansible puede consultarse [AQUI](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html)

# Despliegue en Azure

Lo primero es descargar el plugin de Vagrant para azure: `vagrant-azure`, para ello actualizo Vagrant a la última versión disponible:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant-update.png)

Y descargo el plugin de vagrant con:

`vagrant plugin install vagrant-azure` 

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/vagrant-azure.png)

Instalo el cliente de Azure mediande node:

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
# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'vagrant-azure'
# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "azure"
  

  config.ssh.private_key_path = "~/.ssh/id_rsa"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  
  #config.vm.network "forwarded_port", guest: 8333, host: 8333, host_ip: "0.0.0.0"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
   config.vm.provider "azure" do |az, override|
     az.tenant_id = ENV['AZURE_TENANT_ID']
     az.client_id = ENV['AZURE_CLIENT_ID']
     az.client_secret = ENV['AZURE_CLIENT_SECRET']
     az.subscription_id = ENV['AZURE_SUBSCRIPTION_ID']

     az.vm_name = "billboardiv-vm"
     az.vm_size = "Standard_DS1_v2"
     az.resource_group_name = "billboardiv"
     az.location = "westeurope"
     az.tcp_endpoints = "80"
   end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "ansible" do |ansible|
      ansible.playbook = "provision/playbook.yml"
      ansible.verbose = "v"
  end
  #   sudo apt-get update
  #   sudo apt-get install -y apache2
  # SHELL
end
```

Las variables de entorno deben corresponder a los credenciales de Azure, mediante el comando `azure account show` podemos obtener el valor del TENANT_ID y el SUBSCRIPTION_ID. Para obtener el valor de AZURE_CLIENT_ID y AZURE_CLIENT_SECRET hay que generar una app desde el portal de Azure como recurso, que estará asociado a la suscripción que se nos proporcionó durante la asignatura. Es muy importante darle permisos a esta aplicación como `contribuidor` (o superior) para que puedan ejecutarse determinados comandos que requerirá `vagrant up`. 
Una vez configurado el Vagrantfile correctamente, solo queda crear la máquina en Azure, para ello:

`vagrant up --provider=azure` (el provider no sería necesario especificarlo en este caso ya que solo hay uno)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-deploy.png)

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-deploy2.png)

Y se ejecutan el resto de tareas de ansible de provisionamiento, llegando a: 

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-deploy3.png)

La máquina ya está creada en Azure, comprobamos conectándonos mediante sshDocumentación y blogs seguidos para configuración de máquinas virtuales vagrant en Azure:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-vm-creada.png)

Y vemos que está creada correctamente:

![](https://github.com/marioanloru/Billboard-IV/blob/master/docs/img/azure-funcionando.png)

Para unas guías de ejemplo paso a paso de la configuración de Vagrantfile con Azure:

https://unindented.org/articles/provision-azure-boxes-with-vagrant/

https://blog.scottlowe.org/2017/12/11/using-vagrant-with-azure/

## Depliegue mediante flighplan

Por último, el despliegue se va a realizar mediante el paquete de node `flightplan`, instalo el paquete con npm: 

`npm install --save flightplan`

`npm install -g flightplan` (Para tenerlo localmente en mi ordenador)

Defino en el fichero `flightplan.js` a donde debe realizarse la conexión y los comandos a ejecutar, quedando de la forma:

```javascript
const plan = require('flightplan')

// Configuracion para Azure
plan.target('staging', {
    host: 'billboardiv-vm.westeurope.cloudapp.azure.com',
    username: 'vagrant',
    agent: process.env.SSH_AUTH_SOCK
});

plan.remote((remote) => {
    remote.with('cd Billboard-IV', () => {
        remote.exec('npm start');
    });
});
```

Se conecta con la máquina de azure a través de SSH con el usuario `vagrant` y levanta la aplicación. Para esto, simplemente hay que dirigirse a la carpeta `despliegue` y ejecutar `fly staging`

Documentacion oficial de [Flightplan](https://www.npmjs.com/package/flightplan)
