import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchRepos } from '../../redux/repos/actions'
import Component from './component'

function mapStateToProps (state) {
  return {
    list: state.repos.list,
    loading: state.loading.repos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchRepos: () => dispatch(fetchRepos())
  }
}

class ComponentContainer extends PureComponent {
  componentWillMount () {
    this.props.fetchRepos()
  }

  render () {
    return (
      <Component {...this.props} />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentContainer)
