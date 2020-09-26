import lockerService from '../service/locker.service';
import lockerRepository from '../repository/locker.repository';
import addressRepository from '../../address/repository/address.repository';

export default {
    async getNearbyLockers(req, res) {
        const long = req.params.long;
        const lat = req.params.lat;
        const validator = lockerService.validateParams(req.params);

        if (!validator.isValid) {
            return res.status(400).json({ params: validator.params });
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
    }
};