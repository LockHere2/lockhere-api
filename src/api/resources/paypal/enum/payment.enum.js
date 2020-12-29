export default {
    IN_PROGRESS: 'in_progress',
    PAID: 'paid',
    REFUNDED: 'refunded',
    toArray() { return [this.PAID, this.REFUNDED, this.IN_PROGRESS] },
    isStatusValid(status) {
        return this.toArray().includes(status);
    } 
}