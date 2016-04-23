export default function errorMiddleware({ dispatch, getState }) {
  return next => action => {
    if (!action.error) {
      return next(action);
    }
  };
}
