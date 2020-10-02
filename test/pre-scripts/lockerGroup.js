import mongoose from 'mongoose';

import lockerGroup from '../../src/api/resources/locker/model/lockerGroup.model';

const ObjectId = mongoose.Types.ObjectId;

export default () => {

    const data = [
        { 
            _id : ObjectId("5f5aaa8d3fbc6c815371c116"),
            address_id : ObjectId("5f5aa9614585f61ea52d43cf"),
            long : -122.054,
            lat : 37.4214983 
        },
        {
            _id : ObjectId("5f6544c43fbc6c8153721de0"),
            address_id : ObjectId("5f5aac563fbc6c815371c1d3"),
            long : -47.427197,
            lat : -22.602073
        },
        {
            _id : ObjectId("5f63d03b3fbc6c8153720928"),
            address_id : ObjectId("5f5aac563fbc6c815371c1d3"),
            long : -47.427097,
            lat : -22.602173
        }
    ];

    return lockerGroup.insertMany(data);
};
