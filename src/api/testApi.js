import axios from '@/libs/api.request'

export const getTestData = () => {
  return axios.request({
    url: '/api-d/getProjectAuantitytree',
    method: 'get',
    headers: {
      'Authorization': 'Bearer a0a750f6-2cc2-4d03-9cb0-13de9d27d56c',
    }
  })
}
