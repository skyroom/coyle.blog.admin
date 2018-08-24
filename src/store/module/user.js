import { login, logout, getUserInfo } from '@/api/user'
import { getTestData } from '@/api/testApi'
import { getLocalToken, setLocalToken, clearLocalToken } from '@/libs/util'

export default {
    state: {
        username: '',
        userId: '',
        avatorImgPath: '',
        token: getLocalToken(),
        access: ''
    },
    mutations: {
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.username = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setLocalToken(token)
        },
        clearToken(state) {
            console.log('我开始清楚token');
            state.token = '';
            clearLocalToken();
        }
    },
    actions: {
        // 登录
        handleLogin({
            commit
        }, {username, password}) {
            username = username.trim()
            return new Promise((resolve, reject) => {
                console.log('我登录的用户密码', username, password);
                login({username, password}).then(data => {
                    commit('setToken', data.token);
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },

        clearToken({ commit }) {
            commit('clearToken');
        },

        // 测试api
        getTestDataHandle({
            commit
        }, {userName, password}) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                getTestData({userName, password}).then(res => {
                    // const data = res.data
                    // commit('setToken', data.token)
                    console.log('我成功了');
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('setToken', '')
                    commit('setAccess', [])
                    resolve()
                }).catch(err => {
                    reject(err)
                })
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                // commit('setToken', '')
                // commit('setAccess', [])
                // resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
                    const data = res.data
                    commit('setAvator', data.avator)
                    commit('setUserName', data.user_name)
                    commit('setUserId', data.user_id)
                    commit('setAccess', data.access)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
