import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Component from './component'

function mapStateToProps ({ repo, loading }) {
  return {
    repo: repo.data,
    loading: loading.repos
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
