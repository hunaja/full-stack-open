import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  if (!action) return state

  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [action.data, ...state]
  case 'UPDATE_BLOG': {
    const otherBlogs = state.filter((b) => b.id !== action.data.id)
    return [action.data, ...otherBlogs]
  }
  case 'REMOVE_BLOG': {
    return state.filter((b) => b.id !== action.data.id)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => async (dispatch) => {
  const data = await blogService.getAll()

  dispatch({
    type: 'INITIALIZE_BLOGS',
    data
  })
}

export const createBlog = (blog) => async (dispatch) => {
  const data = await blogService.create(blog)

  dispatch({
    type: 'ADD_BLOG',
    data
  })
}

export const likeBlog = (blog) => async (dispatch) => {
  const data = await blogService.like(blog)

  dispatch({
    type: 'UPDATE_BLOG',
    data
  })
}

export const removeBlog = (data) => async (dispatch) => {
  await blogService.remove(data)

  dispatch({
    type: 'REMOVE_BLOG',
    data
  })
}

export const commentBlog = (anecdote, comment) => async (dispatch) => {
  const data = await blogService.comment(anecdote, {
    content: comment
  })

  dispatch({
    type: 'UPDATE_BLOG',
    data
  })
}

export default blogReducer
