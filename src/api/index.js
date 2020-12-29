import express from 'express';
import { userRouter } from './resources/user/user.router';
import { lockerRouter } from './resources/locker/locker.router';
import { addressRouter } from './resources/address/address.router';
import { paypalRouter } from './resources/paypal/paypal.router';
import { paymentTransactionRouter } from './resources/paypal/paymentTransaction.router';
import { reserveRouter } from './resources/reserve/reserve.router';

export const restRouter = express.Router();
restRouter.use('/users', userRouter);
restRouter.use('/locker', lockerRouter);
restRouter.use('/address', addressRouter);
restRouter.use('/paypal', paypalRouter);
restRouter.use('/payment-transaction', paymentTransactionRouter);
restRouter.use('/reserve', reserveRouter);