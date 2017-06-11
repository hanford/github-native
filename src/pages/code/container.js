import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Component from './component'

function mapStateToProps ({ repo: { content }}) {

  return {
    content
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
