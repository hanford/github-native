import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchNotifications } from '../../redux/notifications/actions'
import Component from './component'

function mapStateToProps (state) {

  return {
    list: state.notifications.list,
    loading: state.notifications.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
