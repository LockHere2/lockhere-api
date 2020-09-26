import repository from './locker.repository';

export default {
    validateParams({ long, lat }) {
        const validator = { isValid: true, params: [] };
        
        if (isNaN(long)) {
            validator.params.push({ message: 'Longitude inválida' });
        }
        if (isNaN(lat)) {
            validator.params.push({ message: 'Latitute inválida' });
        }

        validator.isValid = !validator.params.length;

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