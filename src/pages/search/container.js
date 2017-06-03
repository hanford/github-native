import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setSearchText, setSearchCategory, searchUsersOrRepos } from '../../redux/search/actions'
import Component from './component'

function mapStateToProps ({ search }) {
  return {
    text: search.text,
    category: search.category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSearchText: v => dispatch(setSearchText(v)),
    setSearchCategory: v => dispatch(setSearchCategory(v)),
    searchUsersOrRepos: () => dispatch(searchUsersOrRepos())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
