import mongoose from 'mongoose';

import locker from '../../src/api/resources/locker/model/locker.model';

const ObjectId = mongoose.Types.ObjectId;

export default () => {
    const data = [
        {
            _id: ObjectId("5f6d127a59d3ca868a0e03ee"),
            group_id: ObjectId("5f6544c43fbc6c8153721de0"),
            number: 1155,
            available: 0,
            size: "30cm X 30cm X 30cm",
            hour_price: 5
        },
        {
            _id : ObjectId("5f6d173159d3ca868a0e054f"),
            group_id : ObjectId("5f6544c43fbc6c8153721de0"),
            number : 1156,
            available : 0,
            size : "40cm X 40cm X 40cm",
            hour_price : 6
        },
        {
            _id : ObjectId("5f6d176259d3ca868a0e0574"),
            group_id : ObjectId("5f6544c43fbc6c8153721de0"),
            number : 1157,
            available : 0,
            size : "50cm X 50cm X 50cm",
            hour_price : 7
        },
        {
            _id : ObjectId("5f63d1043fbc6c815372093a"),
            group_id : ObjectId("5f5aaa8d3fbc6c815371c116"),
            number : 1158,
            available : 0,
            size : "50cm X 50cm X 50cm",
            hour_price : 7
        }
    ];

    return locker.insertMany(data);
};
