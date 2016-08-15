import { error } from "store/modules";
export default function errorMiddleware({ dispatch, getState }) {
  return next => action => {
    const { error, ...actionAttr } = action;
    if (!error) {
      return next(action);
    }

    dispatch(error(error));
    return next({...actionAttr});
  };
}
