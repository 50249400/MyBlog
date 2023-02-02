const express = require('express');
const constroller_UserLogin = require('./constroller/Login');
const constroller_Course = require('./constroller/Course');

const route = express.Router(); //创建路由路径的链式路由句柄。

/**
 * 登录
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {Object} result
 */
route.post('/index/login', (req, res) => {
    constroller_UserLogin.userLogin(req, res);
});

/**
 * 新增历程数据
 * @apiParam {string} inputDate 时间
 * @apiParam {string} title 标题
 * @apiParam {string} title 正文内容
 * @apiSuccess {Object} result
 */
route.post('/backstage/addCourse', (req, res) => {
    constroller_Course.addCourse(req, res);
});

/**
 * 查询历程列表数据
 * @apiParam {number} start 起始页
 * @apiParam {number} limit 查询条数
 * @apiSuccess {Object} result
 */
route.post('/backstage/getCourseList', (req, res) => {
    constroller_Course.getCourseList(req, res);
});

module.exports = route
