import { request } from '../utils/request'

function login ({ account, password }) {
  return request('login', {
    account,
    password
  })
}

function queryInfo (param) {
  return request('queryInfo', param)
}

function download ({ id }) {
  return request('download', { id }, 'get')
}

export {
  login,
  queryInfo,
  download
}
