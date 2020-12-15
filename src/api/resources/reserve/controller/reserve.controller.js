import lockerService from '../../locker/service/locker.service';
import lockerRepository from '../../locker/repository/locker.repository';
import reserveService from '../service/reserve.service';
import reserveRepository from '../repository/reserve.repository';
import statusEnum from '../enum/status.enum';

export default {
    async fetchReserve(req, res) {
        const { id } = req.params;

        const reservation = await reserveRepository.findReserve(id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }

        return res.status(200).json(reservation);
    },
    async reserveLocker(req, res) {
        const validator = lockerService.validateReserve(req.body);

        if (!validator.isValid) {
            return res.status(400).json(validator);
        }

        const { _id, startDate, endDate, price, status } = req.body;

        const locker = await lockerRepository.findLockerById(_id);
        if (!locker) {
            return res.status(400).json({ message: 'Locker não encontrado' });
        }

        if (!locker.available) {
            return res.status(400).json({ message: 'Locker não esta disponivel' });
        }
        
        const sucess = await reserveRepository.createReserve({ userId: req.user.id, lockerId: _id, startDate, endDate, price, status });
        
        if (!sucess) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado na criação da reserva' });
        }

        return res.status(200).json(locker);
    },
    async updateReserveStatus(req, res) {
        const { id, status } = req.params;

        try {
            if (!statusEnum.isStatusValid(status)) {
                return res.status(400).json({ message: `status ${status} invalido` });
            }
    
            await reserveService.updateReserveStatus(id, status);
            return res.status(200).json({ success: true });
        } catch(e) {
            return res.status(400).json({ message: e });
        }
    },
    async finishReserve(req, res) {
        const { id } = req.params;

        try {
            await reserveService.finishReserve(id);
            return res.status(200).json({ success: true });
        } catch(e) {
            return res.status(500).json({ message: 'Ocorreu uma falha ao finalizar a reserva.' });
        }
    },
    async getReservesHistory(req, res) {
        try {
            const reservations = await reserveService.fetchReservesByUserId(req.user.id, req.query);
            return res.status(200).json(reservations);
        } catch(e) {
            console.log(e)
            return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
        }        
    }
};