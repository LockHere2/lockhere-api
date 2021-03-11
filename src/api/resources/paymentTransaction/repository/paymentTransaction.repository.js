import mongoose from 'mongoose';
import paymentTransaction from '../model/paymentTransaction.model';

const ObjectId = mongoose.Types.ObjectId;

export default {
    
    create() {
        return paymentTransaction.create({ });
    },

    findByReservationId(reservationId) {
        return paymentTransaction.findOne({ user_locker_id: reservationId });
    },

    updateTransactionStatusByReservationId(reservationId, status) {
        return paymentTransaction.updateOne({ user_locker_id: reservationId }, { status });
    },

    updatePaymentTransactionById(id, data) {
        return paymentTransaction.updateOne({ _id: new ObjectId(id) }, data);
    }

}