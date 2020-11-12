import moment from 'moment';
import userEmailService from '../service/userEmail.service';
import userConfirmActionRepository from '../repository/userConfirmAction.repository';
import userRepository from '../repository/user.repository';
import ResponseErrorException from '../../../exception/ResponseErrorException';
import generateCode from '../../../helpers/generateCode';
import userConfirmActionEnum from '../enum/userConfirmAction.enum';

export default {

    async sendConfirmCodeByEmail(req, res) {
        try {
            const { action } = req.body;

            if (!userConfirmActionEnum.isActionValid(action)) {
                throw ResponseErrorException.responseError(`Ação ${action} inválida`, 400);
            }

            const { id } = req.user;
            const code = generateCode();
            const { email } = await userRepository.findById(id);
            await userEmailService.sendConfirmCodeByEmail(email, code);
            await userConfirmActionRepository.save({ _id: id, confirm_code: code, action, expire: moment().add(1, 'hours') });
            return res.status(200).json();
        } catch (e) {
            return res.status(e.statusCode).json(e);
        }
    }

}