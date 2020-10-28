import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import bcrypt from 'bcryptjs';

const Joi = BaseJoi.extend(Extension);

export default {
  encryptPassword(palinText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(palinText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSignup(body) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15),
      repassword: Joi.string().required().min(6).max(15),
      cpf: Joi.string().required().regex(/^\d{11}$/),
      born: Joi.date().format('DD/MM/YYYY').required()
    });

    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateLogin(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};
