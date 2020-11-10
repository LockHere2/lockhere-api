export default {
    ACTIVE_EMAIL: 'active_email',
    CHANGE_EMAIL: 'change_email',
    toArray() { return [this.ACTIVE_EMAIL, this.CHANGE_EMAIL] },
    isActionValid(action) {
        return this.toArray().includes(action);
    } 
}