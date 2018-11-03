//  Class destinated to create an object as response to express routes
module.exports = class Respuesta {
    //  Constructor for Respuesta class
    constructor(status, statusCode, route, message, value) {
        this.status = status;
        this.statusCode = statusCode;
        this.parametros = {
            'ruta': route,
            'message': message,
            'valor': value
        }
    }

    //  Setter for the status
    set status(status) {
        this._status = status;
    }

    //  Setter for the status code
    set statusCode(statusCode) {
        this._statusCode = statusCode;
    }

    //  Setter for parameters
    set parametros(parametros) {
        this._parametros = parametros;
    }

    //  Setter for route
    set ruta(ruta) {
        this._parametros.ruta = ruta;
    }

    //  Setter for response message
    set message(message) {
        this._parametros.message = message;
    }

    //  Setter for value
    set valor(valor) {
        this._parametros.valor = valor;
    }

    //  Getter for status
    get status(){
        return this._status;
    }

    //  Getter for statusCode
    get statusCode() {
        return this._statusCode;
    }

    //  Getter for parameters
    get parametros() {
        return this._parametros
    }

    //  Getter for route
    get ruta() {
        return this._parametros.ruta;
    }

    //  Getter for response message
    get message() {
        return this._parametros.message;
    }
    
    //  Getter for parameter value response
    get valor() {
        return this._parametros.valor;
    }
}
