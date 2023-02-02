import Request from "../interceptors";

// 新增历程数据
export function addCourse(parameter: any) {
  return Request.axiosInstance({
    url: '/backstage/addCourse',
    method: 'POST',
    data: parameter
  })
}

// 获取历程列表
export function getTableList(parameter: any, url: string) {
  return Request.axiosInstance({
    url: `${url}`,
    method: 'POST',
    data: parameter
  })
}