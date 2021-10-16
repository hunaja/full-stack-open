import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  notification: notificationReducer,
  users: userReducer
})

export default createStore(reducer, applyMiddleware(thunk))
