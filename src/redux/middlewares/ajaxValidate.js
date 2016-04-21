import {loaded} from "../modules/ajaxAction";
import {error as errorAction} from "../modules/errorAction";


export default function ajaxValidateMiddleware({ dispatch, getState }) {
  return next => action => {
    const {meta, error, payload, ...otherActionAttr} = action;
    if (meta && meta.isAjax) {
      dispatch(loaded());
      if (payload && "code" in payload) {
        if (payload.code !== "0") {
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
      }

      if (error || payload.error) {
          dispatch(errorAction(error));
      }
    } else {
      next(action);
    }
  };
}
