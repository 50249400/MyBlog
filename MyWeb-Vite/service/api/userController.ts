import Request from "../interceptors";

export function userLogin(parameter: any) {//导出方法
  return Request.axiosInstance({
    url: '/index/login',
    method: 'POST',
    data: parameter
  })
}