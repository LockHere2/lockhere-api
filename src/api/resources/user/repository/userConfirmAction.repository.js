import mongoose from 'mongoose';
import userConfirmAction from '../model/userConfirmAction.model';

const ObjectId = mongoose.Types.ObjectId;

export default {

    save({ _id, confirm_code, action, expire }) {
        return userConfirmAction.updateOne({ _id: new ObjectId(_id) }, { confirm_code, action, expire }, { upsert: true });
    },
    findUserConfirmActionByUserId(id) {
        return userConfirmAction.findOne({ _id: new ObjectId(id) });
    }

}