module.exports = class Film {
    //  Constructor for Film class
    constructor(title, date) {
        this.id = '123456789';
        this._title = title;
        this._date = date;
    }
    //  Setter for the title
    set title(title) {
        this._title = title;
    }
    
    //  Setter for the date
    set date(date) {
        this._date = date;
    }

    //  Getter for the title
    get title(){
        return this._title;
    }

    //  Getter for the date
    get date() {
        return this._date;
    }

    //  Transformas actual Film with its attributes to a string
    to_string() {
        return this._title + ' - ' + this._date;
    }

    //  Shows the title of the film
    viewInfo(){
        console.log('The title of the film is: : ', title());
    }
}