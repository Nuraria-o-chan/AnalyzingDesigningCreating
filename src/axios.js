import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://schooldb.skillline.ru/api',
})

export default instance
