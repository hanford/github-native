import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchNestedRepoContent, goBack } from '../../redux/code/actions'
import Component from './component'

function mapStateToProps ({ code: { content }}) {

  return {
    content
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchNestedRepoContent: (path, isDirectory) => dispatch(fetchNestedRepoContent(path, isDirectory)),
    goBack: () => dispatch(goBack())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
