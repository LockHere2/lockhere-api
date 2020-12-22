import paymentTransaction from '../model/paymentTransaction.model';


export default {
    
    create(reservationId, transactionId) {
        return paymentTransaction.create({ user_locker_id: reservationId, transaction_id: transactionId });
    }

}