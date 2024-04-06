import axiosOrig from 'axios'
import { apiBaseUrl } from './env'
import { StorageKeys } from './consts'

const axios = axiosOrig.create({
  baseURL: apiBaseUrl,
})

axios.interceptors.request.use(config => {
  const loginToken = localStorage.getItem(StorageKeys.authToken)

  if (!config.headers.Authorization && loginToken) {
    config.headers.Authorization = `Bearer ${loginToken}`
  }

  return config
})

export default axios
