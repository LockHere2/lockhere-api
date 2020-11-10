import emailHelper from '../../../helpers/email';


export default {

    sendConfirmCodeByEmail(email, code) {
        return emailHelper.sendMail({ 
                to: email, 
                subject: 'LockHere código de validação', 
                text: `Segue o codigo de validação: ${code}` 
            });
    }

}