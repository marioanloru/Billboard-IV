const app = require('./app.js')

//  Pretty output settings
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}
app.set('json spaces', 4);

//  Server listening on the specified port
app.listen(process.env.PORT || 8333, () => {
    let puerto;
    if (process.env.PORT) puerto = process.env.PORT
    else puerto = 8333 
    console.log('Listening on port', puerto);
});