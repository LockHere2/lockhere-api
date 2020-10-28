import lockerService from '../service/locker.service';
import lockerRepository from '../repository/locker.repository';
import addressRepository from '../../address/repository/address.repository';

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

        const { _id, startDate, endDate, price } = req.body;

        const locker = await lockerRepository.findLockerById(_id);
        if (!locker) {
            return res.status(400).json({ message: 'Locker não encontrado' });
        }

        if (!locker.available) {
            return res.status(400).json({ message: 'Locker não esta disponivel' });
        }
        
        const sucess = await lockerRepository.createReserve({ userId: req.user.id, lockerId: _id, startDate, endDate, price });
        
        if (!sucess) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado na criação da reserva' });
        }

        return res.status(200).json(locker);
    }
};