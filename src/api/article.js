import axios from '@/libs/axios'

export const getArticleList = (data) => {
    return axios({
        url: '/blog/back/articles-list',
        data,
        method: 'post'
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

export const editArticle = (params) => {
    return axios({
        url: `blog/back/article/${params.id}`,
        method: 'put',
        data: params.data
    });
}
