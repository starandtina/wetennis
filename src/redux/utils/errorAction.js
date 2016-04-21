import {createAction, handleAction} from "redux-actions";

export const ERROR = "__ERROR__"; 

export const error = createAction(ERROR);

export default handleAction(ERROR, (state, _) => {
  return _.payload;
});
