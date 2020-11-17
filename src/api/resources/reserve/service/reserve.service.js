import moment from 'moment';
import reserveRepository from '../repository/reserve.repository';
import userRepository from '../../user/repository/user.repository';
import { diff } from '../../../helpers/dateUtils';
import statusEnum from '../enum/status.enum';

export default {
    async updateReserveStatus(id, status) {
        const userLocker = await userRepository.findUserLockerById(id);
        if (!userLocker) throw 'Alocação não encontrada';

        if (status === statusEnum.CANCELED &&
            userLocker.status === statusEnum.SCHEDULED &&
            diff(userLocker.start_date, moment().format('DD.MM.YYYY HH:mm'), 'days') > 0) {
            throw 'Não é possivel cancelar uma alocação já iniciada';
        }

        if (status === statusEnum.CANCELED && userLocker.status === statusEnum.SCHEDULED) {
            // realizar reembolso
        }

        await reserveRepository.updateReserveStatus(id, status);
    },
    async finishReserve(id) {
        await this.updateReserveStatus(id, statusEnum.DONE);
        await reserveRepository.updateReserve(id, { end_date: new Date() });
    }
}