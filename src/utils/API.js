import fetch from 'isomorphic-fetch'

class API {
  constructor() {
    ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach((method) =>
      this[method] = (path, data = {} ) => {

        let fetchConfig = {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        }

        return new Promise((resolve, reject) => {
          return fetch(path, fetchConfig).then(
            (response = {}) => {
              const {status, statusText, ok, headers} = response
              if (ok) {
                response.json().then(( payload ) => {
                  resolve({
                    payload: payload
                  })
                })
              } else {
                reject(
                  new RequestError({
                    headers: { response_code: status, response_message: statusText }
                  }
                ))
              }
            },
            (error = {}) => {
              reject(error);
            }
          )
        })
    })
  }
}

export default new API()

function RequestError(payload, message) {
  this.name = 'RequestError';
  this.message = message || 'Request Error';
  this.payload = payload
}
RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;
