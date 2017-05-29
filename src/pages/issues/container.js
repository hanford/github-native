import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { fetchData } from '../../redux/user/actions'

import Component from './component'

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

class IssuesContainer extends PureComponent {

  render () {
    return (
      <Component {...this.props} />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesContainer)
