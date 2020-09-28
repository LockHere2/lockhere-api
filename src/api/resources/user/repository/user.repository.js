import User from '../model/user.model';

export default {

    findByEmail(email) {
        return User.findOne({ email });
    },
    findByCpf(cpf) {
        return User.findOne({ cpf });
    },
    create({ name, email, password, cpf, born }) {
        return User.create({ name, email, password, cpf, born });
    }

}
