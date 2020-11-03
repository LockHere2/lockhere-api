import repository from '../repository/locker.repository';
import { Validator, Field } from '../../../validator';
import { diff } from '../../../helpers/dateUtils';

const MIN_TIME_RESERVATION = 60;

export default {
    validateParams({ long, lat }) {
        const validator = new Validator();
        
        if (isNaN(long)) {
            validator.fields.push(new Field('Longitude inválida', 'long'));
        }
        if (isNaN(lat)) {
            validator.fields.push(new Field('Latitute inválida', 'lat'));
        }

        return validator;
    },

    validateReserve({ _id, startDate, endDate, price }) {
        const validator = new Validator();

        if (!_id) {
            validator.fields.push(new Field('_id inválido', '_id'));
        }

        if (!startDate) {
            validator.fields.push(new Field('Data de inicio inválida', 'startDate'));
        }

        if (isNaN(price)) {
            validator.fields.push(new Field('Preço inválido', 'price'));
        }

        return validator;
    },

    validateReserveSchedule({ startDate, endDate }) {
        const minutes = diff(startDate, endDate, 'minutes');

        const validator = new Validator();

        if (minutes <= 0) {
            validator.fields.push(new Field('Data de inicio não pode ser maior ou igual a data de termino'));
        }

        if (minutes < MIN_TIME_RESERVATION) {
            validator.fields.push(new Field('O tempo minimo de alocação deve ser de 1 hora'));
        }
        
        return validator;
    },

    getRange(long, lat, distance) {
        long = parseFloat(long);
        lat = parseFloat(lat);
        const longMin = long - distance;
        const longMax = long + distance;
        const latMin = lat - distance;
        const latMax = lat + distance;
        return { longMin, longMax, latMin, latMax };
    },

    findLockersByRange(long, lat) {
        const range = this.getRange(long, lat, 0.090000);
        return repository.findByRange(range);
    }
}