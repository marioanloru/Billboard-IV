const app = require('./app.js')

//  Server listening on the specified port
app.listen(process.env.PORT || 8333, () => {
    console.log('Listening on port 8333')
});