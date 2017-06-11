import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchNestedRepoContent } from '../../redux/code/actions'
import Component from './component'

function mapStateToProps ({ code: { content }}) {

  return {
    content: content[content.length - 1]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchNestedRepoContent: path => dispatch(fetchNestedRepoContent(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
