import mongoose from 'mongoose';
import env from './env';

mongoose.Promise = global.Promise;
export const connect = () => mongoose.connect(env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
