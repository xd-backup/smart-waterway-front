import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class UserStore {
  @observable state = {
    user: {},
    users: [],
    operation: '',
  }

  constructor() {
    this.read = this.read.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.list = this.list.bind(this)
    this.remove = this.remove.bind(this)

    this.setUser = this.setUser.bind(this)
    this.resetUser = this.resetUser.bind(this)

    this.setOperation = this.setOperation.bind(this)
    this.resetOperation = this.resetOperation(this)
  }

  setUser(user) {
      this.state.user = user
  }

  resetUser() {
      this.state.user = {}
  }

  setOperation(operation) {
      this.state.operation = operation
  }

  resetOperation() {
      this.state.operation = ''
  }

  @computed get modalVisiblility() {
      return ((this.state.operation === 'add') || (this.state.operation === 'update') ? true : false)
  }

}

export default UserStore
