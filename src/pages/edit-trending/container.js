import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setLanguage, setTime } from '../../redux/trending/actions'

import Component from './component'

function mapStateToProps (state) {
  console.log(state.trending.language, state.trending.time)

  return {
    language: state.trending.language,
    time: state.trending.time
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLanguage: language => dispatch(setLanguage(language)),
    setTime: time => dispatch(setTime(time))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
