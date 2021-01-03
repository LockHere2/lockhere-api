import userService from '../service/user.service';
import userRepository from '../repository/user.repository';
import userModeEnum from '../enum/userMode.enum';
import jwt from '../../../helpers/jwt';

export default {
  async signup(req, res) {
    try {
      const validator = userService.validateSignup(req.body);

      if (!validator.isValid) {
        return res.status(400).json({ ...validator });
      }

      const { name, email, password, cpf, born } = req.body;
      let hasUser = await userRepository.findByEmail(email);
      if (hasUser) {
        return res.status(400).json({ message: 'Já existe um usuário com este email.' });
      }

      hasUser = await userRepository.findByCpf(cpf);
      if (hasUser) {
        return res.status(400).json({ message: 'Já existe um usuário com este Cpf.' });
      }

      const encryptedPass = userService.encryptPassword(password);

      const user = await userRepository.create({
        name,
        email,
        password: encryptedPass,
        cpf,
        born
      });

      const token = jwt.issue({ id: user._id }, '7d');
      return res.json({ success: true, token });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const validator = userService.validateLogin(email, password);
      if (!validator.isValid) {
        return res.status(400).json({ ...validator });
      }

      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      const authenticted = userService.comparePassword(password, user.password);
      if (!authenticted) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      const token = jwt.issue({ id: user._id }, '7d');
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  async updateUser(req, res) {
    const { mode } = req.params;
    const { id } = req.user;

    try {
      if (!userModeEnum.isModeValid(mode)) {
        return res.status(400).json({ message: `Modo de atualização ${mode} inválido` });
      }
      
      await userService.updateUser(id, req.body, mode);
  
      return res.status(200).json({ success: true });
    } catch(e) {
      return res.status(e.statusCode).json(e);
    }
  },
  profile(req, res) {
    return res.json(req.user);
  }
};
