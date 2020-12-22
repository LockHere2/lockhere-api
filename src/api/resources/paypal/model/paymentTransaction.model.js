import mongoose from 'mongoose';

const { Schema } = mongoose;
const paymentTransactionSchema = new Schema({
    user_locker_id: {
        type: Schema.Types.ObjectId, 
        ref: 'UserLocker',
        index: true
    },
    transaction_id: {
        type: String
    }
});

export default mongoose.model('PaymentTransaction', paymentTransactionSchema);
