import moment from 'moment';

export const calcDate = date => {
  const day = moment(date).diff(moment(new Date()), 'days');
  if (day !== 0) {
    return day;
  }
  const hour = moment(date).diff(moment(new Date()), 'hours');
  if (hour !== 0) {
    return hour;
  }

  const min = moment(date).diff(moment(new Date()), 'minutes');
  return min;
};
