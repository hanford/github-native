import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchRepos } from '../../redux/repos/actions'
import Component from './component'

function mapStateToProps (state) {

  return {
    list: state.repos.list,
    loading: state.repos.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchRepos: () => dispatch(fetchRepos())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
