import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const edit = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const data = {
    user: blog.user,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const endpoint = baseUrl + '/' + blog.id
  const response = await axios.put(endpoint, data, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const endpoint = baseUrl + '/' + blog.id
  const response = await axios.delete(endpoint, config)
  return response.data
}

export default { setToken, getAll, create, edit, remove }