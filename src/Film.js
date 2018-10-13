module.exports = class Film {
    constructor(title, date) {
        this.id = '123456789';
        this._title = title;
        this._date = date;
    }

    set title(title) {
        this._title = title;
    }

    set date(date) {
        this._date = date;
    }

    get title(){
        return this._title;
    }

    get date() {
        return this._date;
    }

    to_string() {
        return this._title + ' - ' + this._date;
    }

    viewInfo(){
        console.log('The title of the film is: : ', title());
    }
}
