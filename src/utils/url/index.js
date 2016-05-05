let urls = require('./url_prod');

if (__DEV__) {
  urls = require('./url_dev');
}

export default Object.assign({}, urls);
