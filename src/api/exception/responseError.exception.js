export default class ResponseErrorException {

    static responseError(message, statusCode) {
        return { message, statusCode };
    }

    static responseErrorValidator(validator, statusCode) {
        return { ...validator, statusCode };
    }

}