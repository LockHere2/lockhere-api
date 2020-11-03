export default {
    SCHEDULED: 'scheduled',
    INUSE: 'inuse',
    CANCELED: 'canceled',
    DONE: 'done',
    toArray() { return [this.SCHEDULED, this.INUSE, this.CANCELED, this.DONE] },
    isStatusValid(status) {
        return this.toArray().includes(status);
    } 
}