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
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token }
  })

  return response.data
}

const like = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1
  }, {
    headers: { Authorization: token }
  })

  return response.data
}

const remove = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token }
  })  
}

const actions = { 
  setToken,
  getAll,
  create,
  like,
  remove
}

export default actions
