import mongoose from 'mongoose';

const { Schema } = mongoose;
const lockerGroupSchema = new Schema({
    address_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Address',
        index: true
    },
    long: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
});

export default mongoose.model('LockerGroup', lockerGroupSchema);