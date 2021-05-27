import moment from 'moment';

export const getDday = endDate => {
  const dDay = moment(endDate).diff(moment(new Date()), 'days');
  return dDay;
};
