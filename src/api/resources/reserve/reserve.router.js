import express from 'express';
import passport from 'passport';
import reserveController from './controller/reserve.controller';

export const reserveRouter = express.Router();
reserveRouter.get('/:id', passport.authenticate('jwt', { session: false }), reserveController.fetchReserve);
reserveRouter.get('/', passport.authenticate('jwt', { session: false }), reserveController.getReservesHistory);
reserveRouter.post('/', passport.authenticate('jwt', { session: false }), reserveController.reserveLocker);
reserveRouter.put('/:id/status/:status', passport.authenticate('jwt', { session: false }), reserveController.updateReserveStatus);
reserveRouter.put('/:id/finish', passport.authenticate('jwt', { session: false }), reserveController.finishReserve);