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
import repo from './repo/reducer'
import code from './code/reducer'

const reducers = combineReducers({
  user,
  code,
  notifications,
  timeline,
  issues,
  repos,
  repo,
  loading,
  trending,
  profile,
  search
})

export function configureStore () {
  return createStore(reducers, applyMiddleware(thunk))
}
