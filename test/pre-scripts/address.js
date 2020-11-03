import mongoose from 'mongoose';

import address from '../../src/api/resources/address/model/address.model';

const ObjectId = mongoose.Types.ObjectId;

export default () => {

    const data = [
        {
            _id : ObjectId("5f5aac563fbc6c815371c1d3"),
            street : "Sebastião Fonseca Lima",
            number : 123,
            zip_code : "13481852",
            city : "Limeira",
            additional : "na rua"
        }
    ];

    return address.insertMany(data);
};