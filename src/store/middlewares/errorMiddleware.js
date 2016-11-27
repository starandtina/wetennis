import { error as errorAction } from "store/modules";
export default function errorMiddleware({ dispatch, getState }) {
  return next => action => {
    const { error, payload, ...actionAttr } = action;
    if (!error || (payload && payload.hidenErrorBar)) {
      return next(action);
    }

    dispatch(errorAction(payload));
    return next({...actionAttr, payload});
  };
}
