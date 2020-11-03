
export default class Validator {
    constructor() {
        this.fields = [];
    }

    get isValid() {
        return !this.fields.length;
    }
}