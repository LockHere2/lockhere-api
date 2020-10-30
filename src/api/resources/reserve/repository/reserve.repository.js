import mongoose from 'mongoose';
import userLocker from '../../user/model/userLocker.model';
import allocation from '../../allocation/model/allocation.model';
import locker from '../../locker/model/locker.model';

const ObjectId = mongoose.Types.ObjectId;
const NOT_AVAILABLE = 0;
const FETCH_LIMIT = 10;

export default {
    async createReserve({ userId, lockerId, startDate, endDate, price }) {
        const conn = mongoose.connection;
        let session = await conn.startSession();
        try {
            session.startTransaction();
            const [ newAllocation ] = await allocation.create([{ start_date: startDate, end_date: endDate, price }], { session });
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
    },
    async fetchReservesByUserId(id, options = { page: 1, orderBy: 'start_date', direction: 'asc' }) {
        const userReservations = await userLocker.find({ user_id: new ObjectId(id) })
            .limit(FETCH_LIMIT)
            .skip((options.page * FETCH_LIMIT) - FETCH_LIMIT)
            .populate('allocation_id')
            .populate('locker_id')
            .populate({ path: 'locker_id', populate: { path: 'group_id' } })
            .populate({ path: 'locker_id', populate: { path: 'group_id', populate: { path: 'address_id' } } });

        return userReservations.map(userReservation => {
            const { locker_id, allocation_id } = userReservation;
            const { start_date, end_date, price } = allocation_id;
            const { available, number, size, hour_price, group_id } = locker_id;
            const { address_id, long, lat } = group_id;
            const { street, zip_code, city, additional} = address_id;
            return {
                id: userReservation._id,
                locker: { 
                    id: locker_id._id, 
                    available, 
                    number, 
                    size, 
                    hour_price, 
                    locker_group: { 
                        id: group_id._id,
                        long, 
                        lat,
                        address: {
                            street,
                            number: address_id.number,
                            zip_code,
                            city,
                            additional
                        } 
                    } 
                },
                allocation: {
                    id: allocation_id._id,
                    start_date,
                    end_date,
                    price
                }
            }
        });
    }
}