import axios from 'axios'

export function request (config) {
  //1.创建axios实例
  const instance = axios.create({
    //添加backend前缀，为部署vercle跨域服务
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 1000,
    headers: {
      'Referrer-Policy': 'unsafe-url'
    }
  })

  // vercel部署http->https跨域处理
  // instance.defaults.headers.common['Referrer-Policy'] = "unsafe-url";

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网路请求
  return instance(config)
}