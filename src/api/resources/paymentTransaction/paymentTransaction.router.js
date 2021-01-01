import express from 'express';
import passport from 'passport';
import paymentTransactionController from './controller/paymentTransaction.controller';

export const paymentTransactionRouter = express.Router();
paymentTransactionRouter.put('/:id', passport.authenticate('jwt', { session: false }), paymentTransactionController.updateReservationId);

