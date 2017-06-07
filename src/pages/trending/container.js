import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchTrending } from '../../redux/trending/actions'
import { fetchRepo } from '../../redux/repo/actions'
import Component from './component'

function mapStateToProps (state) {
  return {
    list: state.trending.list,
    loading: state.loading.trending
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTrending: () => dispatch(fetchTrending()),
    fetchRepo: repo => dispatch(fetchRepo(repo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
