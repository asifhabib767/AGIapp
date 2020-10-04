/**
 * diffInMinutes()
 *
 * @param object dateTime2 Date Time 2 Object
 * @param object dateTime1 Date Time 1 Object
 * @return int Minutes value
 */
export function diffInMinutes(dateTime2, dateTime1) {
  let diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000;
  return Math.abs(Math.round(diff));
}

export function diffInSeconds(dateTime2, dateTime1) {
  let diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000;
  return diff;
}

export function minuteToFormattedTime(m) {
  let num = m;
  let hours = num / 60;
  let rHours = Math.floor(hours);
  let minutes = (hours - rHours) * 60;
  let rMinutes = Math.round(minutes);
  let formattedTime = rHours + ":" + rMinutes;
  return formattedTime;
}

export function dateDifferenceInFormattedTime(dateTime2, dateTime1) {
  const seconds = diffInSeconds(dateTime2, dateTime1);
  return SecondsTohhmmss(seconds);
}

export function SecondsTohhmmss(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  var seconds = totalSeconds - hours * 3600 - minutes * 60;

  // round seconds
  seconds = Math.round(seconds * 100) / 100;
  seconds = Math.round(seconds);

  var result = hours < 10 ? "0" + hours : hours;
  result += ":" + (minutes < 10 ? "0" + minutes : minutes);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  return result;
}
