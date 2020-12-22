import express from 'express';
import passport from 'passport';
import paypayController from './controller/paypal.controller';

export const paypalRouter = express.Router();
paypalRouter.post('/create-payment', passport.authenticate('jwt', { session: false }), paypayController.createPayment);
paypalRouter.get('/execute-payment', paypayController.executePayment);
