import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../../redux/profile/actions'
import { fetchRepo } from '../../redux/repo/actions'
import { fetchTimeline } from '../../redux/timeline/actions'

import Component from './component'

function mapStateToProps ({ timeline, loading, user }) {
  return {
    list: timeline.list,
    loading: loading.timeline,
    user: user.login
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTimeline: () => dispatch(fetchTimeline()),
    fetchUser: login => dispatch(fetchUser(login)),
    fetchRepo: name => dispatch(fetchRepo(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
