import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  console.log(token)
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token }
  })

  return response.data
}

export default { 
  setToken,
  getAll,
  create
}