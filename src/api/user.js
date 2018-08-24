import axios from '@/libs/axios'

export const login = ({ username, password }) => {
    const data = {
        username,
        password
    };
    return axios({
        url: '/blog/back/login',
        data,
        method: 'post'
    });
}

export const getUserInfo = (token) => {
  return axios({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios({
    url: 'logout',
    method: 'post'
  })
}
