import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Board from '../views/Board.vue'
import ApiRequest from '../views/ApiRequest.vue'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import Content from '../components/SelectContent.vue'
import NotFound from '../components/NotFound.vue'
import Register from '../views/Register.vue'
import VueCookies from 'vue-cookies'
import store from '../store/index'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/About.vue'),
        },
        {
            path: '/board',
            name: 'board',
            component: Board
        },
        {
            path: '/request',
            name: 'apirequest',
            component: ApiRequest
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage
        },
        {
            path: '/register1',
            name: 'register1',
            component: Register
        },
        {
            path: '/content/:num',
            name: 'content',
            component: Content
        },
        {
            path: '*',
            component: NotFound
        },
    ],
})

router.beforeEach((to, from, next) => {
    try {
        if (VueCookies.get('AccessToken')) {
            store.dispatch('login')
            var AccessToken = VueCookies.get('AccessToken')
            var Token = jwt.verify(AccessToken, 'WebTokenTest')
            store.state.userId = Token.id
            store.state.userAccessToken = AccessToken
            return next()
        } else {
            store.state.userId = null
            store.state.userAccessToken = null
            return next()
        }
    } catch {
        VueCookies.remove('AccessToken')
        store.state.userAccessToken = null
        return next()
    }
})

export default router