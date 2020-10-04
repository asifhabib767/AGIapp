

/**
 * isEmpty
 * 
 * Check if an object is empty or not
 * 
 * @param {object} obj 
 * @return {boolean} true if object, false if not object
 */

export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

/**
 * matchedString()
 * 
 * Check if one string is similar to another
 * 
 * @param {String} oldString 
 * @param {String} searchString 
 */
export function matchedString(oldString, searchString) {
    if (typeof oldString != 'undefined') {
        if(oldString.indexOf(searchString) > -1) return true;
        return false;
    }
    return false;
}