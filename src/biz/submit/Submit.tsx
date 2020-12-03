import { AppState } from '@/store'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Preview from '../form/Preview'



interface SubmitProps{
  state:AppState
}
 class Submit extends Component<SubmitProps> {
  render() {
    return (
      <div>
        <p><Link to='/formpage'>返回上层</Link></p>
     <Preview/>
      </div>
    )
  }
}

const mapStateToProps = (state:AppState) => ({
  state
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
