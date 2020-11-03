import mongoose from 'mongoose';
import user from '../model/user.model';
import userLocker from '../model/userLocker.model';

const ObjectId = mongoose.Types.ObjectId;

export default {

    findById(id) {
        return user.findOne({ _id: new ObjectId(id) });
    },
    findByEmail(email) {
        return user.findOne({ email });
    },
    findByCpf(cpf) {
        return user.findOne({ cpf });
    },
    create({ name, email, password, cpf, born }) {
        return user.create({ name, email, password, cpf, born });
    },
    findUserLockerById(id) {
        return userLocker.findOne({ _id: new ObjectId(id) });
    },
    updateUserById(id, fields) {
        return user.updateOne({ _id: new ObjectId(id) }, { $set: fields });
    }

}
