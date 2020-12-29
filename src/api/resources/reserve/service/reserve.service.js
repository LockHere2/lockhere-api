import moment from 'moment';
import reserveRepository from '../repository/reserve.repository';
import userRepository from '../../user/repository/user.repository';
import { diff } from '../../../helpers/dateUtils';
import { Validator, Field } from '../../../validator';
import statusEnum from '../enum/status.enum';

const MIN_TIME_RESERVATION = 60;

export default {
    async updateReserveStatus(id, status) {
        const userLocker = await userRepository.findUserLockerById(id);
        if (!userLocker) throw 'Alocação não encontrada';

        if (status === statusEnum.CANCELED &&
            userLocker.status === statusEnum.SCHEDULED &&
            diff(userLocker.start_date, moment().format('YYYY-MM-DD HH:mm'), 'days') > 0) {
            throw 'Não é possivel cancelar uma alocação já iniciada';
        }

        await reserveRepository.updateReserveStatus(id, status);
    },

    async finishReserve(id, price) {
        await this.updateReserveStatus(id, statusEnum.DONE);
        await reserveRepository.updateReserve(id, { end_date: new Date(), price });
    },

    fetchReservesByUserId(id, options) {
        if (!options.status) {
            options.status = statusEnum.toArray();
        }
        return reserveRepository.fetchReservesByUserId(id, options);
    },

    validateReserve({ _id, start_date, end_date, price, status }) {
        const validator = new Validator();

        if (!_id) {
            validator.fields.push(new Field('_id inválido', '_id'));
        }

        if (!start_date) {
            validator.fields.push(new Field('Data de inicio inválida', 'start_date'));
        }

        if (isNaN(price)) {
            validator.fields.push(new Field('Preço inválido', 'price'));
        }

        if (status === statusEnum.SCHEDULED) {
            validator.fields.concat(this.validateReserveSchedule(start_date, end_date).fields);
        }

        return validator;
    },

    validateReserveSchedule(start_date, end_date) {
        const minutes = diff(start_date, end_date, 'minutes');

        const validator = new Validator();

        if (minutes <= 0) {
            validator.fields.push(new Field('Data de inicio não pode ser maior ou igual a data de termino'));
        }

        if (minutes < MIN_TIME_RESERVATION) {
            validator.fields.push(new Field('O tempo minimo de alocação deve ser de 1 hora'));
        }
        
        return validator;
    }
}