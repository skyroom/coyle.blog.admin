import { getArticleList } from '@/api/article'

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
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}
