import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchTrending } from '../../redux/trending/actions'
import Component from './component'

function mapStateToProps (state) {
  console.log(state)
  return {
    list: state.trending.list,
    loading: state.loading.trending
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTrending: () => dispatch(fetchTrending())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
