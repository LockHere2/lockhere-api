import moment from 'moment';
import userService from '../service/user.service';
import userRepository from '../repository/user.repository';
import userConfirmActionRepository from '../repository/userConfirmAction.repository';
import UserValidator from '../validator/UserValidator';
import ResponseErrorException from '../../../exception/ResponseErrorException';
import userConfirmActionEnum from '../enum/userConfirmAction.enum';

export default {
    async updateBaseInfo(id, fields = { name, cpf, born }) {
        const userValidator = new UserValidator();
        const validator = userValidator.name(fields.name).cpf(fields.cpf).born(fields.born).isValid();
        if (!validator.isValid) {
            throw ResponseErrorException.responseErrorValidator(validator, 400);
        }

        const user = await userRepository.findByCpf(fields.cpf);
        if (user && user._id !== id) {
            throw ResponseErrorException.responseError('Já existe um usuário com este cpf', 400);
        }

        await userRepository.updateUserById(id, fields);
    },
    async updatePassword(id, { password, repassword }) {
        const userValidator = new UserValidator();
        const validator = userValidator.confirmPassword(password, repassword).isValid();

        if (!validator.isValid) {
            throw ResponseErrorException.responseErrorValidator(validator, 400);
        }

        const encryptedPass = userService.encryptPassword(password);
        await userRepository.updateUserById(id, { password: encryptedPass });
    },
    async updateEmail(id, { email, code }) {
        const userValidator = new UserValidator();
        const validator = userValidator.email(email).isValid();
        if (!validator.isValid) {
            throw ResponseErrorException.responseErrorValidator(validator, 400);
        }

        const user = await userRepository.findByEmail(email);
        if (user && user._id.toString() !== id.toString()) {
            throw ResponseErrorException.responseError('Já existe um usuário com este email', 400);
        }

        const { action, confirm_code, expire } = await userConfirmActionRepository.findUserConfirmActionByUserId(id);

        if (!confirm_code) {
            throw ResponseErrorException.responseError('Você não possuí um código de verificação', 400);
        }

        if (moment().diff(expire, 'hours') > 0) {
            throw ResponseErrorException.responseError('Código expirado', 400);
        }

        if (code !== confirm_code) {
            throw ResponseErrorException.responseError('Código inválido', 400);
        }

        if (action === userConfirmActionEnum.ACTIVE_EMAIL) {
            return userRepository.updateUserById(id, { verified: true });
        }

        return userRepository.updateUserById(id, { email });
    }
}