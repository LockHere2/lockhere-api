import mongoose from 'mongoose';
import statusEnum from '../../reserve/enum/status.enum';

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
    start_date: {
        type: Date,
        required: true
    }, 
    end_date: {
        type: Date
    }, 
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum : statusEnum.toArray(),
        required: true
    }
});

export default mongoose.model('UserLocker', userLockerSchema);