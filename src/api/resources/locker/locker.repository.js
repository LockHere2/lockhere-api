import mongoose from 'mongoose';
import lockerGroup from './lockerGroup.model';
import locker from './locker.model';

const ObjectId = mongoose.Types.ObjectId;

export default {
    findByRange({ longMin, longMax, latMin, latMax }) {
        return lockerGroup.find({
            long: {
                $gte: longMin,
                $lte: longMax
            },
            lat: {
                $gte: latMin,
                $lte: latMax
            }
        });
    },
    findLockersByGroupId(groupId) {
        return locker.find({ group_id: new ObjectId(groupId) });
    },
    findLockerGroupById(id) {
        return lockerGroup.findOne({ _id: new ObjectId(id) });
    }
}