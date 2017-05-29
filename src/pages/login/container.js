import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { setToken } from '../../redux/user/actions'

import Component from './component'

function mapStateToProps (state) {
  const { token } = state.user

  return {
    token
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setToken: (t) => dispatch(setToken(t))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
