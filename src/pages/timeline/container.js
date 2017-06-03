import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/profile/actions'
import { fetchTimeline } from '../../redux/timeline/actions'

import Component from './component'

function mapStateToProps (state) {

  return {
    list: state.timeline.list,
    loading: state.loading.timeline
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTimeline: () => dispatch(fetchTimeline()),
    fetchUser: (login) => dispatch(fetchUser(login))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
