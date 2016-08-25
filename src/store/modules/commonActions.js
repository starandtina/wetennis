import URLConf from "utils/url";
import API from "utils/API";
export function cascadeFilter(actionType, data) {
  return {
    types: actionType,
    promise: () => API.post(URLConf.cascadeFilter, {...data})
  };
}
