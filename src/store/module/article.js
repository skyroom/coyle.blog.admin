import { getArticleList, addArticle, deleteArticle } from '@/api/article'

export default {
    state: {
        articleList: [],
    },
    mutations: {
        setArticleList(state, data) {
            state.articleList = data;
        },
    },
    actions: {
        // 获取文章列表
        getArticleList({
            commit
        }) {
            return new Promise((resolve, reject) => {
                getArticleList()
                .then(data => {
                    commit('setArticleList', data.data);
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 添加文章
        addArticle({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                addArticle(params)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 删除文章
        deleteArticle({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                deleteArticle(params)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}
