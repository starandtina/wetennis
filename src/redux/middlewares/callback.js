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
    } else {
      return next(action);
    }
  };
}

function callbackProcess(dispatch, payload, cb) {
  if (typeof cb === "function") {
    dispatch(cb(payload));
  } else {
    dispatch(cb);
  }
}

function isPromise(f) {
  return f && typeof f.then === "function";
}
