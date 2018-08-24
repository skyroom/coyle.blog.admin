import Axios from 'axios'
import baseURL from '_conf/url'
import {Message, Notice} from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY, getLocalToken, setLocalToken, clearLocalToken } from '@/libs/util'
import store from '../store'
import router from '../router'

class httpRequest {

    constructor() {
        this.options = {
            method: '',
            url: ''
        }
        // 存储请求队列
        this.queue = {}
    }

    // 销毁请求实例
    destroy(url) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }

    // 请求拦截
    interceptors(instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            // if (!config.url.includes('/users')) {
            //     config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
            // }
            config.headers['token'] = getLocalToken(TOKEN_KEY)
            // Spin.show()
            // 在发送请求之前做些什么
            return config;
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            // console.log('拦截器里面的res', res);
            const { data } = res;
            // const is = this.destroy(url)
            // if (!is) {
            //     setTimeout(() => {
            //         // Spin.hide()
            //     }, 500)
            // }
            if (data.code >= 500) {
                Notice.error({ title: '服务器错误' });
                return Promise.reject('服务器错误');
            }
            if (data.code == 403) {
                Notice.error({ title: '没有权限' });
                return Promise.reject('没有权限');
            }
            if (data.code == 401) {
                Notice.error({ title: '请登录' });
                // console.log('router is', router);
                store.dispatch('clearToken');
                router.push({
                    name: 'login'
                });
                // location.href = location.pathname + '#/login';
                return Promise.reject('请登录');
            }
            if (data.code == 400) {
                Notice.error({ title: res.data.msg });
                return Promise.reject(res.data.msg);
            }
            if (data.code == 200 || res.status == 201) {
                return Promise.resolve(res.data);
            }

            // if (data.code !== 200) {
            //     // 后端服务在个别情况下回报201，待确认
            //     if (data.code === 401) {
            //         // Cookies.remove(TOKEN_KEY)
            //         window.location.href = window.location.pathname + '#/login'
            //         Message.error('未登录，或登录失效，请登录')
            //     } else {
            //         if (data.msg)
            //             Message.error(data.msg)
            //     }
            //     return false
            // }
            // return data
        }, (error) => {
            // console.log('error', error);
            Promise.reject(error);
            Notice.error({ title: error });
        })
    }

    // 创建实例
    create() {
        let conf = {
            // baseURL: baseURL,
            baseURL: '/api',
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 'X-URL-PATH': location.pathname
            }
        }
        return Axios.create(conf)
    }

    // 合并请求实例
    mergeReqest(instances = []) {
        //
    }

    // 请求实例
    request(options) {
        console.log('我开始创建Axios实例');
        var instance = this.create()
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        this.queue[options.url] = instance
        return instance(options)
    }
}

const httpR = new httpRequest();
const axios = httpR.create();
httpR.interceptors(axios);

export default axios;
