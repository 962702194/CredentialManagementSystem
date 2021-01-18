import { download, login } from '../../../services/normal'
import PubSub from 'pubsub-js'

const pubsubList = {
  download: 'download',
  login: 'login'
}

export default {
  namespace: 'download',

  state: {
    userID: ''
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
    * download ({ payload }, { call, put }) {
      const { id, callback } = payload
      const url = yield call(download, { id })
      if (callback && url) callback(url)
    },
    * login ({ payload }, { call, put }) {
      const { account, password, callback } = payload
      const data = yield call(login, { account, password })
      yield put({ type: 'updateState', payload: { userID: data } })
      if (data && callback) callback(data)
    }
  },
  reducers: {
    updateState (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
