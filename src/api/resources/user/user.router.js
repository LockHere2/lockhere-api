import express from 'express';
import passport from 'passport';
import userController from './controller/user.controller';
import userEmailController from './controller/userEmail.controller';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/user', passport.authenticate('jwt', { session: false }), userController.authenticate);
userRouter.patch('/user/update/:mode', passport.authenticate('jwt', { session: false }), userController.updateUser);
userRouter.post('/user/send-confirm-code', passport.authenticate('jwt', { session: false }), userEmailController.sendConfirmCodeByEmail);
