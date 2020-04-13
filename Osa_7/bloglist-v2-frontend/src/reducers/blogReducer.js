import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.id ? blog : action.blog)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id !== action.id ? blog : action.blog)
  default: return state
  }
}

export const setBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      blogs: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      blog: newBlog
    })
  }
}

export const likeBlog = (blogs, id) => {
  return async dispatch => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    const response = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      blog: { ...response, user: blogToLike.user },
      id: id
    })
  }
}

export const removeBlog = (blogs, id) => {
  return async dispatch => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: id
      })
    }
  }
}

export const commentBlog = (blogs, id, comment) => {
  return async dispatch => {
    const blogToComment = blogs.find(b => b.id === id)
    const response = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      blog: { ...response, user: blogToComment.user },
      id: id
    })
  }
}

export default blogReducer