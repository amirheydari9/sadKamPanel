import Vue from 'vue'
import Router from 'vue-router'
// import store from "./store/store";

Vue.use(Router)

const DashboardLayout = () => import(/* webpackChunkName: "DashboardLayout" */ './layouts/Layout');

const Login = () => import(/* webpackChunkName: "Login" */ './views/Auth/Login');
const LoginCheck = () => import(/* webpackChunkName: "LoginCheck" */ './views/Auth/LoginCheck');

const routes = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                isAuth: false
            }
        },
        {
            path: '/verify-code',
            name: 'LoginCheck',
            component: LoginCheck,
            meta: {
                isAuth: false
            }
        },
        {
            path: '/',
            redirect: 'dashboard/basic-dashboard',
            component: DashboardLayout,
            children: [
                {
                    name: 'Dashboard',
                    path: 'dashboard/basic-dashboard',
                    component: () => import('@/views/dashboard/BasicDashboard'),
                },
                {
                    name: 'Users',
                    path: '/users',
                    component: () => import('@/views/pages/User/Index.vue'),
                },

            ]
        },
    ],
})

// routes.beforeEach((to, from, next) => {
//     // if (to.meta.isAuth) {
//     //     if(store.getters['auth/getIsAuth']){
//     //        return  next()
//     //     }
//     // }
//     return next()
// })

export default routes;
