import mongoose from 'mongoose';
import userConfirmActionEnum from '../enum/userConfirmAction.enum';

const { Schema } = mongoose;
const userConfirmActionSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    confirm_code: {
        type: String,
        required: true,
        unique: true
    },
    action: {
        type: String,
        enum : userConfirmActionEnum.toArray(),
        required: true
    },
    expire: {
        type: Date,
        required: true
    }
});

export default mongoose.model('UserConfirmAction', userConfirmActionSchema);
