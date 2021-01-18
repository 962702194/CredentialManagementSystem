import axios from 'axios'
import { localhostApi } from './api.json'
const localhost = 'http://localhost:8080'
const api = 'http://192.168.137.1:8080'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  console.log('error', error)
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request (url, body = {}, method = 'POST') {
  const options = {
    method
    // headers: { 'Content-Type': 'application/json' }
  }
  if (method === 'POST') options.data = body
  else if (method === 'get') options.params = body
  const apiUrl = `${localhostApi}/${url}`
  options.url = apiUrl
  try {
    // console.time('请求')
    // const response = await fetch(apiUrl, options)
    const response = await axios(options)
    // console.timeEnd('请求')
    checkStatus(response)
    const data = await response.data
    if (data.status === 1) {
      return data.data || true
    } else {
      window.alert(data.msg)
      return false
    }
  } catch (error) {
    return false
  }
}
