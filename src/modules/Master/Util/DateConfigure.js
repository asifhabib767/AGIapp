export function currentMonth() {
  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();
  // let currntDate = '01/' + month + '/' + year;
  currntDate = year + '-' + parseInt(month + 1) + '-' + '01';
  return currntDate;
}

export function currentdate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  // today = mm + '/' + dd + '/' + yyyy;
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

/**
 * getFormattedCurrentDate()
 *
 * @return string formatted current date as YYYY-MM-DD >> 2019-12-20
 */
export function getFormattedCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

/**
 * generateStringDateFromDate()
 *
 * Generate A Nice Date String from a date
 * @param {string} oldDate
 */
export function generateStringDateFromDate(oldDate, isWithTime = false) {
  let stringDate = '';

  if (typeof oldDate != 'undefined') {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // olddate = 2017-12-28T13:52:37.69
    let year = oldDate.substr(0, 4);
    let month = oldDate.substr(5, 2);
    let date = oldDate.substr(8, 2);
    stringDate = date + ' ' + months[month - 1] + ' ' + year; // 12 November 2019

    if (isWithTime) {
      stringDate = stringDate + ' at ' + oldDate.substr(11, 5);
    }
  }

  return stringDate;
}

/**
 * generateStringDateFromDateTime()
 *
 * Generate A Nice Date Time String from a date
 * @param {string} oldDate
 */
export function generateStringDateFromDateTime(oldDate, isSeconds = false) {
  let stringDate = '';
  let stringTime = '';
  let stringDateTime = '';

  if (typeof oldDate != 'undefined' && oldDate != null) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // olddate = 2017-12-28T13:52:37.69
    let year = oldDate.substr(0, 4);
    let month = oldDate.substr(5, 2);
    let date = oldDate.substr(8, 2);
    stringDate = date + ' ' + months[month - 1] + ' ' + year; // 12 November 2019

    if (isSeconds) {
      stringTime = oldDate.substr(11, 8);
    } else {
      stringTime = oldDate.substr(11, 5);
    }
  }
  stringDateTime = stringDate + ' ' + stringTime;

  return stringDateTime;
}

export function getShipmentDateStatus(submitFullDate) {
  if (typeof submitFullDate != 'undefined') {
    const today = currentdate();
    const submitDate = submitFullDate.substr(0, 10);
    const newSubmitFullDate =
      submitDate + 'T' + submitFullDate.substr(11, 8) + 'Z';
    let submitDateMin = submitDate + 'T' + '15:00:00Z';

    if (today == submitDate) {
      // Submit date after 15:00:00 mark these as a status
      const d1 = Date.parse(submitDateMin);
      const d2 = Date.parse(newSubmitFullDate);

      if (d2 > d1) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    console.log('Invalid');
  }
  return true;
}
