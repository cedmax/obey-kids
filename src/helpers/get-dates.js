import constants from 'store/constants';
import moment from 'moment';

export default {
  prev(date) {
    return moment(date, constants.DATE_FORMAT)
      .subtract(1, 'days')
      .format(constants.DATE_FORMAT);
  },

  next(date) {
    return moment(date, constants.DATE_FORMAT)
      .add(1, 'days')
      .format(constants.DATE_FORMAT);
  },

  today() {
    return moment().format(constants.DATE_FORMAT);
  },

  pretty(date) {
    return moment(date, constants.DATE_FORMAT).format('DD/MM/YYYY');
  }
};