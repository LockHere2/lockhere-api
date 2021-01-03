import express from 'express';
import passport from 'passport';
import userController from './controller/user.controller';
import userEmailController from './controller/userEmail.controller';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);
userRouter.patch('/user/update/:mode', passport.authenticate('jwt', { session: false }), userController.updateUser);
userRouter.post('/user/send-confirm-code', passport.authenticate('jwt', { session: false }), userEmailController.sendConfirmCodeByEmail);
