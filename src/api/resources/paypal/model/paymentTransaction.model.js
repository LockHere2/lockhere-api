import mongoose from 'mongoose';
import paymentEnum from '../enum/payment.enum';

const { Schema } = mongoose;
const paymentTransactionSchema = new Schema({
    user_locker_id: {
        type: Schema.Types.ObjectId, 
        ref: 'UserLocker',
        index: true
    },
    transaction_id: {
        type: String
    },
    status: {
        type: String,
        enum : paymentEnum.toArray(),
        default: paymentEnum.IN_PROGRESS
    }
});

export default mongoose.model('PaymentTransaction', paymentTransactionSchema);
