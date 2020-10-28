import moment from 'moment';

const DATE_PATTERN = 'DD.MM.YYYY HH:mm';

export const diff = (startDate, endDate, unitOfTime) => {
    const startDateAux = moment(startDate, DATE_PATTERN);
    const endDateAux = moment(endDate, DATE_PATTERN);
    return endDateAux.diff(startDateAux, unitOfTime);
}