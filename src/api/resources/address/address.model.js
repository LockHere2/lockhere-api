import mongoose from 'mongoose';

const { Schema } = mongoose;
const addressSchema = new Schema({
    street: {
        type: String,
        required: true,
        index: true
    },
    number: {
        type: Number,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    additional: {
        type: String
    }
});

export default mongoose.model('Address', addressSchema);