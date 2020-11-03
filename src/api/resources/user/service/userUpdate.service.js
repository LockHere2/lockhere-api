import userService from '../service/user.service';
import userRepository from '../repository/user.repository';
import UserValidator from '../validator/user.validator';
import ResponseErrorException from '../../../exception/responseError.exception';

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
    async updateEmail(id, { email }) {
        const userValidator = new UserValidator();
        const validator = userValidator.email(email).isValid();
        if (!validator.isValid) {
            throw ResponseErrorException.responseErrorValidator(validator, 400);
        }

        const user = await userRepository.findByEmail(email);
        if (user && user._id !== id) {
            throw ResponseErrorException.responseError('Já existe um usuário com este email', 400);
        }

        await userRepository.updateUserById(id, { email });
    }
}