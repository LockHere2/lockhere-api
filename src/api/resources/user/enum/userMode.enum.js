export default {
    BASE_INFO: 'base_info',
    EMAIL: 'email',
    PASSWORD: 'password',
    toArray() { return [this.BASE_INFO, this.EMAIL, this.PASSWORD] },
    isModeValid(mode) {
        return this.toArray().includes(mode);
    } 
}