import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)

    return Promise.reject(error)
  }
)

export default instance
