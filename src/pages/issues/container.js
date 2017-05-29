import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { fetchIssues } from '../../redux/issues/actions'

import Component from './component'

function mapStateToProps (state) {

  return {
    list: state.issues.list,
    loading: state.issues.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchIssues: () => dispatch(fetchIssues())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
