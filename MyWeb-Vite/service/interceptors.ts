import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
    ElMessage
  } from 'element-plus'

export class Request {
    public static axiosInstance: AxiosInstance

    public static init() {
        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000', //转接
            timeout: 20000
        })
        // 初始化拦截器
        this.initInterceptors()
        return axios
    }

    // 初始化拦截器
    public static initInterceptors() {
        // 设置post请求头
        this.axiosInstance.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded'
        /**
         * 请求拦截器
         * 每次请求前，如果存在token则在请求头中携带token
         */
        // const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
        // if(token){
        //     this.axiosInstance.defaults.headers['Token'] = token;
        // }

        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                return config
            },
            (error: any) => {
                console.log(error)
            }
        )

        // 响应拦截器
        this.axiosInstance.interceptors.response.use(
            // 请求成功
            (response: AxiosResponse) => {
                let resData = response.data;
                if(resData.code != 200 && !resData.success){
                    ElMessage.error(resData.message);
                }
                return response;
            },
            // 请求失败
            (error: any) => {
                const { response } = error
                if (response) {
                    return Promise.reject(response.data)
                } else {
                    // 处理断网的情况
                    // eg:请求超时或断网时，更新state的network状态
                    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                    // message.warn('网络连接异常,请稍后再试!')
                    console.log('网络连接异常,请稍后再试!')
                }
            }
        )
    }
}

export default Request