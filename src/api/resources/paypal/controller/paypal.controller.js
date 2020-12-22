import paypalService from '../service/paypal.service';
import paymentTransactionRepository from '../repository/paymentTransaction.repository';

export default {
    async createPayment(req, res) {
        try {
            const { reservationId, transactions } = req.body;
            const uri = await paypalService.createPayment(reservationId, transactions);
            return res.status(200).json({ uri });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async executePayment(req, res) {
        try {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            const reservationId = req.query.reservationId;
            const payment = await paypalService.executePayment(payerId, paymentId);
            const transactionId = payment.transactions[0].related_resources[0].sale.id;
            await paymentTransactionRepository.create(reservationId, transactionId);
            return res.status(200).json({});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}