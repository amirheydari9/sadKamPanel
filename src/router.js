import Vue from 'vue'
import Router from 'vue-router'
// import store from "./store/store";
import {authService} from "./service/authService";
import {permission} from "./plugins/permission";
import store from "./store/store";

Vue.use(Router)

const DashboardLayout = () => import(/* webpackChunkName: "DashboardLayout" */ './layouts/Layout');

const Login = () => import(/* webpackChunkName: "Login" */ './views/Auth/Login');
const LoginCheck = () => import(/* webpackChunkName: "LoginCheck" */ './views/Auth/LoginCheck');

const routes = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/test',
            name: 'Test',
            component: () => import('@/views/pages/Test.vue'),
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guest: true,
            }
        },
        {
            path: '/verify-code',
            name: 'LoginCheck',
            component: LoginCheck,
            meta: {
                guest: true,
                phoneVerified: true
            }
        },
        {
            path: '/',
            name: 'Panel',
            redirect: 'dashboard/basic-dashboard',
            component: DashboardLayout,
            meta: {
                auth: true,
            },
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
                    meta: {
                        permission: 'user_manager'
                    }
                },
                {
                    name: 'Organizations',
                    path: '/organizations',
                    component: () => import('@/views/pages/Organization/Index.vue'),
                    meta: {
                        isSuperAdmin: true
                    }
                },
                {
                    name: 'Products',
                    path: '/products',
                    component: () => import('@/views/pages/Product/Index.vue'),
                    meta: {
                        permission: 'orders'
                    }
                },
                {
                    name: 'Episodes',
                    path: '/episodes',
                    component: () => import('@/views/pages/Episode/Index.vue'),
                    meta: {
                        permission: 'orders'
                    }
                },
                {
                    name: 'AssessmentRequest',
                    path: '/assessmentRequest',
                    component: () => import('@/views/pages/AssessmentRequest/Index.vue'),
                    meta: {
                        hasAssessmentRequestPermission: true
                    }
                },
                {
                    name: 'AssessmentRequest1',
                    path: '/assessmentRequest1',
                    component: () => import('@/views/pages/AssessmentRequest1/Index.vue'),
                    meta: {
                        hasAssessmentRequestPermission: true
                    }
                },
                {
                    name: 'ViewAssessmentRequest',
                    path: '/viewAssessmentRequest',
                    component: () => import('@/views/pages/ViewAssessmentRequest/Index.vue'),
                    meta: {
                        permission: 'orders'
                    }
                },

            ]
        },
    ],
})

routes.beforeEach(async (to, from, next) => {

    if (authService().existToken() && !store.getters['getCurrentUser']) {
        await store.dispatch('handleCurrentUser', authService().decodeToken(authService().getToken()))
    }

    if ((to.meta.guest || to.matched.some(parent => parent.meta.guest))
        && authService().existToken()) {
        return next({name: 'Panel'});
    }

    if ((to.meta.auth || to.matched.some(parent => parent.meta.auth))
        && !authService().existToken()) {
        return next({name: 'Login'});
    }

    if (store.getters['getCurrentUser'] && to.meta.permission) {
        if (permission().can(to.meta.permission)) {
            return next();
        } else {
            await store.dispatch('logout');
            return next({name: 'Login'});
        }
    }

    if (store.getters['getCurrentUser'] && to.meta.isSuperAdmin) {
        if (permission().isSuperAdmin()) {
            return next();
        } else {
            await store.dispatch('logout');
            return next({name: 'Login'});
        }
    }
    if (store.getters['getCurrentUser'] && to.meta.hasAssessmentRequestPermission) {
        if (permission().hasAssessmentRequestPermission()) {
            return next();
        } else {
            await store.dispatch('logout');
            return next({name: 'Login'});
        }
    }
    // if ((to.meta.phoneVerified || to.matched.some(parent => parent.meta.phoneVerified))
    //     && !store.state.loginPhone) {
    //     console.log(store.state.loginPhone)
    //     return next({name: 'Login'});
    // }
    return next()
})

export default routes;
