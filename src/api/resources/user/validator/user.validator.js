import moment from 'moment';
import { Field, Validator } from '../../../validator/';

const CPF_REGEXP = /^\d{11}$/;
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordLength = str => str.length >= 6 && str.length <= 15;

export default class UserValidator {

    constructor() {
        this.fields = {};
    }

    setField(field, condition, message) {
        this.fields[field] = {
            isValid: condition,
            message
        }
    }

    name(name) {
        this.setField('name', name && typeof name === 'string', 'Nome inválido');
        return this;
    }

    email(email) {
        this.setField('email', email && EMAIL_REGEXP.test(email), 'Email inválido');
        return this;
    }

    password(password) {
        this.setField('password', password && passwordLength(password), 'Senha inválida');
        return this;
    }

    confirmPassword(password, repassword) {
        this.setField('password', password && repassword && passwordLength(password) && password === repassword, 'Senhas não condizem');
        return this;
    }

    cpf(cpf) {
        this.setField('cpf', cpf && CPF_REGEXP.test(cpf), 'Cpf inválido');
        return this;
    }

    born(born) {
        this.setField('born', born && moment(born, 'YYYY-MM-DD', true).isValid(), 'Data de nascimento inválida');
        return this;
    }

    isValid() {
        const validator = new Validator();
        validator.fields = Object.keys(this.fields)
            .filter(fieldName => !this.fields[fieldName].isValid)
            .map(fieldName => {
                const field = this.fields[fieldName];
                return new Field(field.message, fieldName);
            });
        return validator;
    }
}
