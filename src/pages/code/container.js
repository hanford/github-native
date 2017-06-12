import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchNestedRepoContent, goBack } from '../../redux/code/actions'
import Component from './component'

function mapStateToProps ({ code, loading }) {
  return {
    loading: loading.repos,
    raw: code.raw
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
