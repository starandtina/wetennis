/**
 * returns true if a cookie exists
 * @param  {string}  name - the name of the cookie
 * @return {Boolean} - returns true if the cookie exists
 */
function is(name) {
    return document.cookie.indexOf(name) > -1;
}
/**
 * returns the value of a cookie as an object
 * @param  {string} name - the name of the cookie to be returned
 * @return {object} - a JS object representation of the cookie
 */
function get(name) {
    var jsonString = decodeURIComponent(document.cookie.split(name + '=')[1].split(';')[0]);
    return JSON.parse(jsonString);
}

function getSimple(name) {
    var jsonString = decodeURIComponent(document.cookie.split(name + '=')[1].split(';')[0]);
    return JSON.parse(jsonString);
}
/**
 * sets a cookie
 * @param {string} name - the name of the cookie
 * @param {string | object} value - the body of the cookie
 * @param OPTIONAL {date string} expiration - a valid UTC date string "Thu, 18 Dec 2013 12:00:00 UTC" DEFAULT - Session
 * @param OPTIONAL {string} path - a URL path where the cookie should exist DEFAULT - '/'
 */
function set(name, value, expiration, path) {
    if (typeof path === 'undefined') {
        path = '/';
    }
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    if (typeof expiration === 'undefined') {
        document.cookie = name + '=' + value + '; path=' + path;
    } else {
        document.cookie = name + '=' + value + ';expires=' + expiration + '; path=' + path;
    }
}

/**
 * deletes a cookie
 * @param  {string} name - the name of the cookie
 */
function del(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export {
    get,
    set,
    del,
    is,
    getSimple
}
