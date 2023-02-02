import { createRouter, createWebHistory } from 'vue-router'
import backstageRoute from './backstage';

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name:'home',
            component: () => import('../pages/home/home.vue'),
            redirect: '/career',
            children: [
                {
                    path: 'career',
                    name:'career',
                    component: () => import('../pages/home/career.vue')
                }
            ]
        },
        ...backstageRoute
    ]
});


export default router