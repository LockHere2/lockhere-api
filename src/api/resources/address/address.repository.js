import mongoose from 'mongoose';
import addressModel from './address.model';

const ObjectId = mongoose.Types.ObjectId;

export default {
    findAddressById(id) {
        return addressModel.findOne({ _id: new ObjectId(id) });
    }
}