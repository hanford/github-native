import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchTimeline } from '../../redux/timeline/actions'
import Component from './component'

function mapStateToProps (state) {

  return {
    list: state.timeline.list,
    loading: state.timeline.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTimeline: () => dispatch(fetchTimeline())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
