import paymentTransactionRepository from '../repository/paymentTransaction.repository';

export default {
    updateReservationIdById(id, reservationId) {
        return paymentTransactionRepository.updatePaymentTransactionById(id, { user_locker_id: reservationId })
    }
}