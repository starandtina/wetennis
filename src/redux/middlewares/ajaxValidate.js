import {loaded} from "../utils/ajaxAction";
import {error as errorAction} from "../utils/errorAction";


export default function ajaxValidateMiddleware({ dispatch, getState }) {
  return next => action => {
    const {meta, error, payload, ...otherActionAttr} = action;
    if (meta && meta.isAjax && payload && "code" in payload) {
      dispatch(loaded());
      if (payload.code !== 0) {
        dispatch(errorAction(payload.errorMsg));
      } else {
        dispatch({
          ...otherActionAttr,
          meta: {
            ...meta,
            isAjax: false
          },
          payload: payload.data
        });
      }
    } else {
      return next(action);
    }
  };
}
