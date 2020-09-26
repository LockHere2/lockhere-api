import jwt from 'jsonwebtoken';
import env from '../../config/env';

export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, env.secret, {
      expiresIn,
    });
  },
};
