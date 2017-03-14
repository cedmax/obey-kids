import constants from 'store/constants';
import moment from 'moment';

function today() {
  return moment().format(constants.URL_FORMAT);
}

function prev(date) {
  return moment(date, constants.URL_FORMAT)
    .subtract(1, 'days')
    .format(constants.URL_FORMAT);
}

function next(date) {
  return moment(date, constants.URL_FORMAT)
    .add(1, 'days')
    .format(constants.URL_FORMAT);
}

function pretty(date) {
  return moment(date, constants.URL_FORMAT).format(constants.DATE_FORMAT);
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