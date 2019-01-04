const plan = require('flightplan')

// Configuracion para Azure
plan.target('staging', {
    host: 'billboardiv-vm.westeurope.cloudapp.azure.com',
    username: 'vagrant',
    agent: process.env.SSH_AUTH_SOCK
});

plan.remote((remote) => {
    remote.with('cd Billboard-IV', () => {
        remote.exec('npm start')
    });
});