import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import user from './user/reducer'
import notifications from './notifications/reducer'
import timeline from './timeline/reducer'
import trending from './trending/reducer'
import loading from './loading/reducer'
import profile from './profile/reducer'
import search from './search/reducer'
import issues from './issues/reducer'
import repos from './repos/reducer'

const reducers = combineReducers({
  user,
  notifications,
  timeline,
  issues,
  repos,
  loading,
  trending,
  profile,
  search
})

export function configureStore () {
  return createStore(reducers, applyMiddleware(thunk))
}
