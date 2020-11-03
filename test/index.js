import mongoose from 'mongoose';

import { connect } from '../src/config/db';
import locker from './pre-scripts/locker';
import lockerGroup from './pre-scripts/lockerGroup';
import user from './pre-scripts/user';
import address from './pre-scripts/address';

function dropDatabase() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropDatabase(() => { 
            console.log('db_api_test deletado'); 
            resolve()
        });
    });
}

async function init() {
    await connect();
    await dropDatabase();
    await user();
    await lockerGroup();
    await locker();
    await address();

    run();
}

init();