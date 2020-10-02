import { use } from 'chai';
import mongoose from 'mongoose';

import { connect } from '../src/config/db';
import locker from './pre-scripts/locker';
import lockerGroup from './pre-scripts/lockerGroup';
import user from './pre-scripts/user';
import address from './pre-scripts/address';

async function init() {
    await connect();
    mongoose.connection.db.dropDatabase(() => console.log('db_api_test deletado'));
    await user();
    await lockerGroup();
    await locker();
    await address();

    run();
}

init();