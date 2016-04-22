// example:
// {
//   type: "action",
//   meta: {
//     callback: function(payload) {
//       console.log(payload);
//     }
//   }
// }
//
// {
//   type: "action",
//   meta: {
//     callback: [
//       function(payload) {
//         console.log(payload);
//       },
//       function(payload) {
//         console.log(payload);
//       },
//       function(payload) {
//         console.log(payload);
//       },
//     ]
//   }
// }
const invaildAction = {type: Date.now().toString(8)};

export default function callbackMiddleware({ dispatch, getState }) {
  return next => action => {
    const {payload, meta} = action;
    if (meta && meta.callback && !isPromise(payload)) {
      if(Array.isArray(meta.callback)) {
        meta.callback.forEach(item => {
          callbackProcess(dispatch, payload, item);
        });
      } else {
        callbackProcess(dispatch, payload, meta.callback);
      }
      return next({
        ...action,
        meta: {
          ...action.meta,
          callback: false
        }
      });
    } else {
      return next(action);
    }
  };
}

function callbackProcess(dispatch, payload, cb) {
  if (typeof cb === "function") {
    dispatch(cb(payload) || invaildAction);
  } else {
    dispatch(cb || invaildAction);
  }
}



function isPromise(f) {
  return f && typeof f.then === "function";
}
