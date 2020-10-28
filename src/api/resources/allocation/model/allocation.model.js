import mongoose from 'mongoose';

const { Schema } = mongoose;
const allocationSchema = new Schema({
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

export default mongoose.model('Allocation', allocationSchema);
