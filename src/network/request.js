//封装axios的模块
import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    // baseURL:'http://106.54.54.237:8000/api/chn',
    baseURL:'http://123.207.32.32:8000/api/chn',
    timeout: 5000
  })
  
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return err 
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return err
  })

  //返回的类型是Promise
  return instance(config)
}