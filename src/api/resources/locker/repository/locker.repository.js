import mongoose from 'mongoose';
import lockerGroup from '../model/lockerGroup.model';
import locker from '../model/locker.model';
import userLocker from '../../user/model/userLocker.model';
import allocation from '../../allocation/model/allocation.model';

const ObjectId = mongoose.Types.ObjectId;
const NOT_AVAILABLE = 0;

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
    },
    findLockerById(id) {
        return locker.findById(id);
    },
    async createReserve({ userId, lockerId, startDate, endDate, price }) {
        const conn = mongoose.connection;
        let session = await conn.startSession();
        try {
            session.startTransaction();
            const newAllocation = await allocation.create([{ start_date: startDate, end_date: endDate, price }], { session });
            await userLocker.create([{ user_id: new ObjectId(userId), locker_id: new ObjectId(lockerId), allocation_id: new ObjectId(newAllocation._id) }], { session });
            await locker.updateOne({ _id: new ObjectId(lockerId) }, { available: NOT_AVAILABLE }, { session });
            await session.commitTransaction();
            return true;
        } catch (e) {
            await session.abortTransaction();
            return false;
        } finally {
            session.endSession();
        }
    }
}