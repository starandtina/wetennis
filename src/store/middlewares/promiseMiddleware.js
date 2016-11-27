export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    const { promise, types, ...rest } = action
    if (!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({...rest, type: REQUEST})

    const actionPromise = isPromise(action.promise) ? action.promise : promise(dispatch, getState)
    
    actionPromise.then(
      ({ payload, error = false }) => {
        const { code, errorMsg, data } = payload

        if (Number(code) === 0 && !errorMsg) {
          return next({...rest, payload: data, error, type: SUCCESS})
        } else {
          error = true
          return next({...rest, payload: errorMsg, error, type: FAILURE})
        }
      },
      (error) => {
        return next({...rest, error, type: FAILURE})
      }
    ).catch((error)=> {
      next({...rest, error, type: FAILURE})
    })

    return actionPromise
  }
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}
