import mongoose from 'mongoose';

const { Schema } = mongoose;
const lockerSchema = new Schema({
    group_id: {
        type: Schema.Types.ObjectId, 
        ref: 'LockerGroup',
        index: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    available: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    hour_price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Locker', lockerSchema);
