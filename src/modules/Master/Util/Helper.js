// import _ from "lodash";
/**
 * checkObject
 *
 * Check if the object is real or not
 *
 * @param {obj} obj
 */
export function checkObject(obj) {
  return obj && obj !== 'null' && obj !== 'undefined';
}

/**
 * generateUniqueArrayByKey
 *
 * @param array arr
 * @param key key
 * @return array Unique array by filtering key
 */
export function generateUniqueArrayByKey(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

/**
 * checkObjectInArray
 *
 * @param object obj
 * @param array array
 * @param string uniqueParam
 *
 * @return boolean Check if object is in the array by key or not
 */
export function checkObjectInArray(obj, array, uniqueParam) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][uniqueParam] === obj[uniqueParam]) {
      return true;
    }
  }
  return false;
}

/**
 * trimObjectValues
 *
 * @param object obj
 * @return object -> Get the full object value after trimming it's data
 */
export function trimObjectValues(obj) {
  let trimmedObject = {};
  const keys = Object.keys(obj);

  keys.forEach((key, index) => {
    if (typeof obj[key] !== 'undefined') {
      // check string
      if (typeof obj[key] === 'string') {
        trimmedObject[key] = obj[key].trim();
      }

      // Check Object
      else if (typeof obj[key] === 'object') {
        trimmedObject[key] = obj[key];
      }

      // Check others
      else {
        trimmedObject[key] = obj[key];
      }
    } else {
      trimmedObject[key] = obj[key];
    }
  });
  return trimmedObject;
}
