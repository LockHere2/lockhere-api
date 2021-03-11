import paypalService from '../service/paypal.service';
import paymentTransactionRepository from '../repository/paymentTransaction.repository';
import paymentEnum from '../enum/payment.enum';

export default {
    async createPayment(req, res) {
        try {
            const { transactions } = req.body;
            const { _id } = await paymentTransactionRepository.create();
            const uri = await paypalService.createPayment(transactions, _id);
            return res.status(201).json({ uri });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async executePayment(req, res) {
        try {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            const paymentTransactionId = req.query.paymentTransactionId;
            const payment = await paypalService.executePayment(payerId, paymentId);
            const transactionId = payment.transactions[0].related_resources[0].sale.id;
            await paymentTransactionRepository.updatePaymentTransactionById(paymentTransactionId, 
                { transaction_id: transactionId, status: paymentEnum.PAID });
            return res.status(200).json();
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async refundPayment(req, res) {
        try {
            const { reservationId } = req.params;
            const transaction = await paymentTransactionRepository.findByReservationId(reservationId);
            
            if (!transaction) {
                return res.status(404).json({ message: 'Transação não encontrada' });
            }

            if (transaction.status === paymentEnum.REFUNDED) {
                return res.status(400).json({ message: 'Transação já foi ressarcida' });
            }

            await paypalService.refundPayment(transaction.transaction_id);
            await paymentTransactionRepository.updateTransactionStatusByReservationId(reservationId, paymentEnum.REFUNDED);
            return res.status(201).json({ success: true });
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }
    }
}