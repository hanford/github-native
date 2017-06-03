import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { setSearchText, setSearchCategory, searchUsersOrRepos } from '../../redux/search/actions'
import { fetchUser } from '../../redux/profile/actions'

import Component from './component'

function mapStateToProps ({ search, loading }) {
  return {
    text: search.text,
    category: search.category,
    results: search.results,
    loading: loading.search
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSearchText: v => dispatch(setSearchText(v)),
    setSearchCategory: v => dispatch(setSearchCategory(v)),
    searchUsersOrRepos: () => dispatch(searchUsersOrRepos()),
    fetchUser: (login) => dispatch(fetchUser(login))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
