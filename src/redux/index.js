import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import user from './user/reducer'
import notifications from './notifications/reducer'
import timeline from './timeline/reducer'

const reducers = combineReducers({
  user,
  notifications,
  timeline
})

export function configureStore () {
  return createStore(reducers, applyMiddleware(thunk))
}
