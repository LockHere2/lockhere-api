import mongoose from 'mongoose';

const { Schema } = mongoose;
const userLockerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    locker_id: {
        type: Schema.Types.ObjectId,
        ref: 'Locker',
        index: true
    },
    allocation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Allocation',
        index: true
    }
});

export default mongoose.model('UserLocker', userLockerSchema);