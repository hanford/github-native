import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import user from './user/reducer'

const reducers = combineReducers({
  user
})

export function configureStore () {
  return createStore(reducers, applyMiddleware(thunk))
}
