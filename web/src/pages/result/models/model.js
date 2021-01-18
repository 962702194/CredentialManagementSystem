import { queryInfo } from '../../../services/normal'
import PubSub from 'pubsub-js'

const pubsubList = {
  queryInfo: 'queryInfo'
}

export default {
  namespace: 'result',

  state: {
    result: {}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      for (const key in pubsubList) {
        PubSub.subscribe(key, (msg, data) => {
          dispatch({ type: pubsubList[key], payload: data })
        })
      }
    }
  },
  effects: {
    * queryInfo ({ payload }, { call, put }) {
      const { param } = payload
      const result = yield call(queryInfo, param)
      if (!result) return
      yield put({ type: 'updateState', payload: { result } })
    }
  },
  reducers: {
    updateState (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
