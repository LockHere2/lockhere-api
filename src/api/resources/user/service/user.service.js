import bcrypt from 'bcryptjs';
import moment from 'moment';
import userUpdateService from '../service/userUpdate.service';
import UserValidator from '../validator/UserValidator';
import userModeEnum from '../enum/userMode.enum';
import ResponseErrorException from '../../../exception/ResponseErrorException';

export default {
  encryptPassword(palinText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(palinText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSignup(body) {
    const { name, email, password, repassword, cpf, born } = body;
    const validator = new UserValidator();
    return validator
      .name(name)
      .email(email)
      .confirmPassword(password, repassword)
      .cpf(cpf)
      .born(born)
      .isValid();
  },
  validateLogin(email, password) {
    const validator = new UserValidator();
    return validator.email(email).password(password).isValid();
  },
  updateUser(id, body, mode) {
    const { BASE_INFO, EMAIL, PASSWORD } = userModeEnum;
    switch(mode) {
      case BASE_INFO:
        return userUpdateService.updateBaseInfo(id, body);
      case PASSWORD:
        return userUpdateService.updatePassword(id, body);
      case EMAIL:
        return userUpdateService.updateEmail(id, body);
      default:
        throw ResponseErrorException.responseError('Modo invalido', 400);
    }
  }
};
