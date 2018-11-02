const app = require('./app.js')

//  Server listening on the specified port
app.listen(process.env.PORT || 8333, () => {
    let puerto;
    if (process.env.PORT) puerto = process.env.PORT
    else puerto = 8333 
    console.log('Listening on port', puerto);
});