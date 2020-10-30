import { number } from 'joi';
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
    }
});

export default mongoose.model('UserLocker', userLockerSchema);