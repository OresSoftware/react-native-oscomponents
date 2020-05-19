import moment from 'moment';


export function formatCurrency(iValue) {
  return (
    'R$ ' +
    iValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}

export function formatDate(iDate) {
  return moment(iDate)
  .utc(false)
  .format('DD/MM/YYYY');
}