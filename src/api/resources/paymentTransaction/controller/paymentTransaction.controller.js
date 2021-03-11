import paymentTransactionService from '../service/paymentTransaction.service';

export default {
    async updateReservationId(req, res) {
        try {
            const { id } = req.params;
            const { reservation_id } = req.body;
            await paymentTransactionService.updateReservationIdById(id, reservation_id);
            return res.status(200).json({ success: true });
        } catch (e) {
            res.status(500).json(e);
        }
    }
}