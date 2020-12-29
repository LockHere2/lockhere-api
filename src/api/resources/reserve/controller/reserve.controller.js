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
        const validator = reserveService.validateReserve(req.body);

        if (!validator.isValid) {
            return res.status(400).json(validator);
        }

        const { _id, start_date, end_date, price, status } = req.body;

        const locker = await lockerRepository.findLockerById(_id);
        if (!locker) {
            return res.status(400).json({ message: 'Locker não encontrado' });
        }

        if (!locker.available) {
            return res.status(400).json({ message: 'Locker não esta disponivel' });
        }

        const result = await reserveRepository.createReserve({ userId: req.user.id, lockerId: _id, start_date, end_date, price, status });
        
        if (!result.sucess) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado na criação da reserva' });
        }

        return res.status(200).json(result.reserve);
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
            console.log(e)
            return res.status(400).json({ message: e });
        }
    },
    async finishReserve(req, res) {
        const { id } = req.params;
        const { price } = req.body;

        try {
            await reserveService.finishReserve(id, price);
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