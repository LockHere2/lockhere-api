export default {
    BASE_INFO: 'base_info',
    EMAIL: 'email',
    PASSWORD: 'password',
    IMAGE: 'image',
    toArray() { return [this.BASE_INFO, this.EMAIL, this.PASSWORD, this.IMAGE] },
    isModeValid(mode) {
        return this.toArray().includes(mode);
    } 
}