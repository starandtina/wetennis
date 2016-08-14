import { loading, loaded } from 'store/modules'

class LoadingBarCounter {
  count = 0;

  add() {
    this.count++
  }

  dec() {
    this.count--
  }

  isEmpty() {
    return !this.count
  }
}

const loadingBarCounter = new LoadingBarCounter()

export default function loadingBarMiddlewar({ dispatch, getState }) {
  return next => action => {
    const { promise, types, ...rest } = action
    if (!promise) {
      return next(action)
    }

    loadingBarCounter.add()

    if(loadingBarCounter.isEmpty) {
      dispatch(loading())
    }

    const actionPromise = promise(dispatch, getState)

    actionPromise
      .finally(() => {
        loadingBarCounter.dec()

        if (loadingBarCounter.isEmpty()) {

          dispatch(loaded())
        }
      })

    return next(Object.assign(action, { promise: actionPromise }))
  }
}


