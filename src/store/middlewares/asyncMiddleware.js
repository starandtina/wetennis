function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function asyncMiddleware({ dispatch }) {
  return next => async(action) => {
    const { promise } = action;

    if (!promise) {
      return next(action);
    }

    const { type, ...restParams } = action
    next({ type: type, ...restParams })
    // dispatch(loading())
    try {
      const resp = await action.promise()
      return next({ type: `${type}_SUCCESS`, payload: resp.payload })
    } catch(err) {
      return next({ type: `${type}_FAILTURE`, error: true, payload: err });
    }
    // dispatch(loaded())
  };
}
