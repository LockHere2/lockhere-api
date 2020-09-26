import userService from './user.service';
import User from './user.model';
import jwt from '../../helpers/jwt';

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return res.status(400).json(error);
      }

      let hasUser = await User.findOne({ email: value.email });
      if (hasUser) {
        return res.status(400).json({ message: 'Já existe um usuário com este email.' });
      }

      hasUser = await User.findOne({ cpf: value.cpf });
      if (hasUser) {
        return res.status(400).json({ message: 'Já existe um usuário com este Cpf.' });
      }

      const encryptedPass = userService.encryptPassword(value.password);

      const user = await User.create({
        name: value.name,
        email: value.email,
        password: encryptedPass,
        cpf: value.cpf,
        born: value.born
      });

      const token = jwt.issue({ id: user._id }, '7d');
      return res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async login(req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }
      const authenticted = userService.comparePassword(value.password, user.password);
      if (!authenticted) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      const token = jwt.issue({ id: user._id }, '7d');
      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  authenticate(req, res) {
    return res.json(req.user);
  },
};
