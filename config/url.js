import env from './env'

const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
const PRO_URL = 'https://produce.com'
// const testUrl = 'http://47.104.177.198:8889/con'

export default env === 'development' ? DEV_URL : PRO_URL
// export default testUrl
