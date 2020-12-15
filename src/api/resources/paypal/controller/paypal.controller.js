import paypalService from '../service/paypal.service';

export default {
    async createPayment(req, res) {
        try {
            const { transactions } = req.body;
            const uri = await paypalService.createPayment(transactions);
            return res.status(200).json({ uri });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async executePayment(req, res) {
        try {
            const { transactions } = req.body;
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            await paypalService.executePayment(payerId, paymentId, transactions);
            return res.status(200);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}