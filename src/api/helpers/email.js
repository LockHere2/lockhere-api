import nodemailer from 'nodemailer';
import env from '../../config/env';
import ResponseErrorException from '../exception/ResponseErrorException';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.companyEmail,
        pass: env.companyEmailPassword
    }
});

export default {
    sendMail(mailOptions = { from: env.companyEmail, to: '', subject: '', text: '' }) {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return reject(ResponseErrorException.responseError('Falha no envio do email', 500));
                } else {
                    return resolve();
                }
            });
        });
    }
}