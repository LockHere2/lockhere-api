import mongoose from 'mongoose';
import userLocker from '../../user/model/userLocker.model';
import locker from '../../locker/model/locker.model';
import statusEnum from '../enum/status.enum';

const ObjectId = mongoose.Types.ObjectId;
const AVAILABLE = 1;
const NOT_AVAILABLE = 0;
const FETCH_LIMIT = 10;

export default {
    findReserve(id) {
        return userLocker.findById(id);
    },
    async createReserve({ user_id, locker_id, start_date, end_date, price, status }) {
        const conn = mongoose.connection;
        let session = await conn.startSession();
        try {
            session.startTransaction();
            const [reserve] = await userLocker.create([{ 
                user_id: new ObjectId(user_id), 
                locker_id: new ObjectId(locker_id), 
                start_date, 
                end_date, 
                price,
                status
            }], { session });
            await locker.updateOne({ _id: new ObjectId(locker_id) }, { available: NOT_AVAILABLE }, { session });
            await session.commitTransaction();
            return { sucess: true, reserve };
        } catch (e) {
            console.log(e)
            await session.abortTransaction();
            return { sucess: false };
        } finally {
            session.endSession();
        }
    },
    updateReserve(id, fields){
        return userLocker.updateOne({ _id: new ObjectId(id) }, { $set: fields });
    },
    async updateReserveStatus(id, status) {
        const conn = mongoose.connection;
        let session = await conn.startSession();
        try {
            session.startTransaction();

            const { locker_id } = await userLocker.findOneAndUpdate({ _id: new ObjectId(id) }, { status }, { session });

            if (status === statusEnum.CANCELED || status === statusEnum.DONE) {
                await locker.updateOne({ _id: new ObjectId(locker_id) }, { available: AVAILABLE }, { session });
            }

            await session.commitTransaction();
        } catch(e) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        }

    },
    async fetchReservesByUserId(id, options = { page: 1, orderBy: 'start_date', direction: 'asc' }) {
        const userReservations = await userLocker.find({ user_id: new ObjectId(id), status: { $in: options.status } })
            .limit(FETCH_LIMIT)
            .skip((options.page * FETCH_LIMIT) - FETCH_LIMIT)
            .sort({ [options.orderBy]: options.direction })
            .populate('locker_id')
            .populate({ path: 'locker_id', populate: { path: 'group_id' } })
            .populate({ path: 'locker_id', populate: { path: 'group_id', populate: { path: 'address_id' } } });

        return userReservations.map(userReservation => {
            const { start_date, end_date, price, status, locker_id } = userReservation;
            const { available, number, size, hour_price, group_id } = locker_id;
            const { address_id, long, lat } = group_id;
            const { street, zip_code, city, additional} = address_id;
            return {
                id: userReservation._id,
                start_date,
                end_date,
                price,
                status,
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
                }
            }
        });
    }
}