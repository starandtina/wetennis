// buildUrl('http://www.a.com/?a=1', {
//   b: 1,
//   c: 'khalil zhang'
// }); -- http://www.a.com/?a=1&b=1&c=khalil%20zhang
export function buildUrl(url, params) {
  var q = [];
  for (var key in params) {
    q.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  }
  if (q.length !== 0) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    url = url + sep + q.join('&'); // eslint-disable-line no-param-reassign
  }

  return url;
}

// Tag function for class template strings.
export function cls(template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
      return accumulator + expressions[i - 1] + part
    })
    .replace(/\s+/g, " ")
    .trim();
}


// Returns a function, that, as long as it continues to be invoked, will not 
// be triggered. The function will be called after it stops being called for 
// N milliseconds. If `immediate` is passed, trigger the function on the 
// leading edge, instead of the trailing. 
export function debounce(func, wait, immediate) {
  let timeout
  return (...args) => {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args);
    }
    const callNow = immediate && !timeout
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(context, args)
  }
}
