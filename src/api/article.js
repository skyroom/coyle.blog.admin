import axios from '@/libs/axios'

export const getArticleList = () => {
    return axios({
        url: '/blog/back/articles-list',
        // data,
        method: 'get'
    });
}

export const addArticle = (data) => {
    return axios({
        url: 'blog/back/article',
        data,
        method: 'post'
    });
}

export const deleteArticle = (id) => {
    return axios({
        url: `blog/back/article/${id}`,
        method: 'delete'
    });
}
