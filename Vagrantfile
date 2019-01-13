# Version de configuracion de Vagrant (2)
# que se utilizara
Vagrant.configure("2") do |config|

  # Es necesario meter este parametro en el vagrantfile o si no dara fallo al hacer vagrant up
  # La imagen que se utilizara es la especificada en urn en el apartado de azure provider
  # necesito tener una maquina 'dummy'
  config.vm.box = "azure"

  # Configuracion de la conexion a traves de ssh
  config.ssh.private_key_path = "~/.ssh/id_rsa"

  # Mensaje a mostrar tras ejecutar vagrant up y que finalice
  config.vm.post_up_message = "Para usar la aplicacion puede ejecutar 'fly production' en el fichero 'despliegue' desde su ordenador. Dentro de la maquina puede hacerlo a traves de nodemon"

  # Configuracion del proveedor, Azure en este caso
  config.vm.provider :azure do |provider|
    # Credenciales para Azure
    provider.tenant_id = "90367942-a8d3-4bf2-88bd-dd03089b3bb2"
    provider.client_id = "a500f9cc-b1ee-4fd1-9e21-00498c65e2ab"
    provider.client_secret = "7RbEUj6hzUg2oB6gSLGx5WggudoGCy9jy+H0FCyELLE="
    provider.subscription_id = "3e1ad7f7-e750-4c32-8210-69aff555ba47"
    provider.vm_name = "billboardivmachine"
    provider.location = "westeurope"
    provider.resource_group_name = "resources_hito_5"
    # Configuro endpoint en el puerto 8333, para abrir dicho puerto TCP y que este disponible
    provider.tcp_endpoints = 8333
    #provider.virtual_network_name = "billboard_network"
    # Esperar a borrar todos los recursos para terminar Vagrant destroy
    provider.wait_for_destroy = "true"
    # Imagen que se utilizara obtenida en https://docs.microsoft.com/es-es/azure/virtual-machines/linux/cli-ps-findimage?toc=%2Fazure%2Fvirtual-machines%2Flinux%2Ftoc.json
    # azure vm image list
    provider.vm_image_urn = "canonical:ubuntuserver:16.04.0-LTS:latest"
    #provider.vm_image_urn = "b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu-16_04-LTS-amd64-server-20180522-en-us-30GB"
    # Tamanio de la maquina mas basico para mi region
    # https://docs.microsoft.com/es-es/azure/virtual-machines/linux/sizes-general
    provider.vm_size = "Basic_A1"
    # Tiempo a esperar para la instancia de la maquina a que este lista (en segundos)
    provider.instance_ready_timeout = 300
  end


  # Desactivo la sincronizacion de todo el directorio y
  # lo hago solo con el directorio de provision
  # config.vm.synced_folder "provision/", "/vagrant"

  # Copio los ficheros necesarios a la maquina
  config.vm.provision "file", source: "./src", destination: "$HOME/Billboard-IV/src"
  config.vm.provision "file", source: "./package.json", destination: "$HOME/Billboard-IV/package.json"
  # Copio el playbook a /vagrant, donde utilizara luego Ansible 
  config.vm.provision "file", source: "./provision", destination: "/vagrant"

  # Configuracion del provisionador de la maquina y poder de esta forma
  # instalar y configurar todo lo necesario al crear la maquina
  # Utilizo ansible_local ya que vamos a ejecutar Ansible desde la maquina de forma local
  
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
