import constants from 'store/constants';
import moment from 'moment';

function today() {
  return moment().format(constants.DATE_FORMAT);
}

function prev(date) {
  return moment(date, constants.DATE_FORMAT)
    .subtract(1, 'days')
    .format(constants.DATE_FORMAT);
}

function next(date) {
  return moment(date, constants.DATE_FORMAT)
    .add(1, 'days')
    .format(constants.DATE_FORMAT);
}

function pretty(date) {
  return moment(date, constants.DATE_FORMAT).format('DD/MM/YYYY');
}

function upUntilNow(date) {
  const results = [];
  const refDate = today();
  while (date !== refDate) {
    date = next(date);
    results.push(date);
  }
  return results;
}
export default {
  today,
  prev,
  next,
  pretty,
  upUntilNow
};