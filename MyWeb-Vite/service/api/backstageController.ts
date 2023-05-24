import Request from "../interceptors";

// 新增历程数据
export function addCourse(parameter: any) {
  return Request.axiosInstance({
    url: '/backstage/addCourse',
    method: 'POST',
    data: parameter
  })
}

// 修改历程数据
export function editCourse(parameter: any) {
  return Request.axiosInstance({
    url: '/backstage/editCourse',
    method: 'POST',
    data: parameter
  })
}

// 删除历程数据
export function deleteCourse(parameter: any) {
  return Request.axiosInstance({
    url: '/backstage/deleteCourse',
    method: 'post',
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

// 获取列表详情
export function getTableDetail(id: string, url: string) {
  return Request.axiosInstance({
    url: `${url}/getCourseDetail?id=${id}`,
    method: 'GET'
  })
}