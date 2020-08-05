import Vue from 'vue'
import Vuex from 'vuex'
import vueCookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        transactions: [],
        isLogin: false,
        isError: false,
        userAccessToken: null,
        userId: '',
        userList: [
            { id: 1, name: 'hiw', email: 'hiw@a.com', password: '1234' },
            { id: 2, name: 'bbb', email: 'bbb@a.com', password: '1234' },
            { id: 3, name: 'ccc', email: 'ccc@a.com', password: '1234' }
        ],

        contentList: [
            //{ subject: '안녕', contents: '반갑습니다', author: 'kim' },

        ],
    },
    mutations: {
        login(state) {
            state.isLogin = true,
                state.isError = false
        },
        error(state) {
            state.isLogin = false,
                state.isError = true
        },
        logout(state) {
            state.isLogin = false,
                state.isError = false,
                state.userId = null,
                state.userAccessToken = null
        },
    },
    actions: {
        login({ commit }) {
            commit('login')
        },
        logout({ commit }) {
            commit('logout')
            vueCookies.remove('AccessToken')
            console.log('로그아웃 되었습니다.')
        },
    },
    getters: {
        dataList: state => state.contentList
    },
    modules: {}
})