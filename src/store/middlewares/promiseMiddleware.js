export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    const { promise, types, ...rest } = action
    if (!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({...rest, type: REQUEST})

    const actionPromise = promise(dispatch, getState)
    actionPromise.then(
      ({payload, error}) => {
        return next({...rest, payload, error, type: SUCCESS})
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
