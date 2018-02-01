import React from 'react'
import { observer } from 'mobx-react'

import { USER_ROLES } from './utils/consts'

import WrappedLoginForm from './components/Login'
import Workspace from './components/Workspace'
import Dashboard from './components/Dashboard'

@observer class App extends React.Component {
  constructor() {
    super()

    this.render = this.render.bind(this)
  }

  render() {
    let page
    if (this.props.store.appStore.state.user.id == -1) {
      // not logged in
      page = <WrappedLoginForm store={this.props.store} />
    }
    else {
      if (this.props.store.appStore.state.user.role === USER_ROLES.ADMIN) {
        page = <Workspace store={this.props.store} />
      }
      else {
        page = <Dashboard store={this.props.store} />
      }
    }

    return <div className="full-height">{page}</div>
  }
}

export default App
