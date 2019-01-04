# Virtualización mediante Vagrantfile

Creamos una máquina virtual con `Vagrant init` en el directorio de la aplicación, y lo modificamos para que, utilizando Ansible, automatizamos el proceso de creación y provisionamiento de la máquina virtual, creando y configurándose de forma automática. El fichero Vagrantfile queda de la forma:



Para poder utilizar ansible hay que instalarlo con:

`sudo apt-get install ansible`

La configuración y órdenes de ansible residen en el fichero `playbook.yml`:

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

El fichero `playbook.yml` queda de la siguiente forma:

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

Las tareas que especificamos son, limpiar la caché, actualizar la versión de git, instalar los paquetes básicos para la máquina virtual, descargar npm e instalar con el mismo node. Instalo el paquete de npm `gruntp  para poder levantar la aplicación y por último clono el repositorio de la aplicación.

Para iniciar la máquina virtual, ejecutamos `vagrant up` en el directorio en el que se encuentre el `Vagrantfile`, esto creará la máquina virtual siguiendo las órdenes de dicho fichero y provisionando mediante lo especificado en `playbook.yml` con ansible:

(La primera vez que se ejecuta tardará un poco más al tener que descargarse la imagen especificada de Ubuntu)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisioning-up.png)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisioning-up2.png)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisioning-up3.png)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisioning-up4.png)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisioning-up5.png)

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/provisining-upfinal.png)

Para comprobar que la máquina se ha creado y provisionado con éxito, nos conectamos a ella mediante ssh y ejecutamos la aplicación, tras ello comprobamos en el host si podemos acceder:

![](/home/tehribbon/Documentos/INFORMATICA/4ºCurso/IV/Billboard-IV/docs/img/vagrant_ssh.png)

Y vemos que se ha levantado la aplicación en la máquina virtual correctamente.

# Despliegue en Azure

