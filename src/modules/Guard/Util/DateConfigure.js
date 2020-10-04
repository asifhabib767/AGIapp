export function currentMonth() {
  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();
  // let currntDate = '01/' + month + '/' + year;
  currntDate = year + '-' + parseInt(month+1) + '-' + '01';
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
export function getFormattedCurrentDate(){
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
export function generateStringDateFromDate(oldDate){

  let stringDate = ""; 

  if(typeof oldDate != 'undefined'){
    console.log('Old Date: ', oldDate);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    // olddate = 2017-12-28T13:52:37.69
    let year = oldDate.substr(0, 4);
    let month = oldDate.substr(5, 2);
    let date = oldDate.substr(8, 2);
    stringDate = date + ' ' + months[month-1] + ' ' + year; // 12 November 2019
    console.log('New Date: ', stringDate);
  }
  
  return stringDate;
}