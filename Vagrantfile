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
  
  config.vm.network "forwarded_port", guest: 8333, host: 8333
  config.vm.network "public_network"

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
     az.tcp_endpoints = "8333"
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
