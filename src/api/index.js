import express from 'express';
import { userRouter } from './resources/user/user.router';
import { lockerRouter } from './resources/locker/locker.router';
import { addressRouter } from './resources/address/address.router';

export const restRouter = express.Router();
restRouter.use('/users', userRouter);
restRouter.use('/locker', lockerRouter);
restRouter.use('/address', addressRouter);
