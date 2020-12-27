import repository from '../repository/locker.repository';
import { Validator, Field } from '../../../validator';

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