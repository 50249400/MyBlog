// 后台路由
const backstageRoute = [
    {
        path: '/backstage/login',
        name:'登录',
        component: () => import('../pages/backstage/login.vue')
    },
    {
        path: '/backstage/index',
        name:'首页',
        component: () => import('../pages/backstage/index.vue'),
        redirect: '/backstage/index/career',
        children: [
            {
                path: 'career',
                name: '职业生涯',
                component: () => import('../pages/backstage/career/career.vue')
            },
            {
                path: 'careerAdd',
                name:'职业生涯-新增',
                component: () => import('../pages/backstage/career/careerAdd.vue')
            },
            {
                path: 'setting',
                name:'设置',
                component: () => import('../pages/backstage/setting.vue')
            }
        ]
    }
];

export default backstageRoute;