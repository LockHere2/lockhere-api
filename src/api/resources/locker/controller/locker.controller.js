import lockerService from '../service/locker.service';
import reserveService from '../../reserve/service/reserve.service';
import lockerRepository from '../repository/locker.repository';
import reserveRepository from '../../reserve/repository/reserve.repository';
import addressRepository from '../../address/repository/address.repository';
import statusEnum from '../../reserve/enum/status.enum';

export default {
    async getNearbyLockers(req, res) {
        const long = req.params.long;
        const lat = req.params.lat;
        const validator = lockerService.validateParams(req.params);

        if (!validator.isValid) {
            return res.status(400).json(validator);
        }

        const lockers = await lockerService.findLockersByRange(long, lat);

        return res.status(200).send(lockers);
    },
    async getLockersByLockerGroup(req, res) {
        const id = req.params.id;
        const lockerGroup = await lockerRepository.findLockerGroupById(id);

        if (!lockerGroup) {
            return res.status(400).json({ message: 'Locker group não encontrado.' });
        }

        const address = await addressRepository.findAddressById(lockerGroup.address_id);
        const lockers = await lockerRepository.findLockersByGroupId(id);

        return res.status(200).send({ address, lockers });
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