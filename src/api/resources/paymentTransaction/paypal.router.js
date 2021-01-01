import express from 'express';
import passport from 'passport';
import paypayController from './controller/paypal.controller';

export const paypalRouter = express.Router();
paypalRouter.post('/create-payment', passport.authenticate('jwt', { session: false }), paypayController.createPayment);
paypalRouter.put('/refund-payment/:reservationId', passport.authenticate('jwt', { session: false }), paypayController.refundPayment);
paypalRouter.get('/execute-payment', paypayController.executePayment);
