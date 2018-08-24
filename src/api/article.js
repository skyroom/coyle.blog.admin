import axios from '@/libs/axios'

export const getArticleList = () => {
    return axios({
        url: '/blog/back/articles-list',
        // data,
        method: 'get'
    });
}
