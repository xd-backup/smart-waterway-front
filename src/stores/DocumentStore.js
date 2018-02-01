import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class DocumentStore {
  @observable state = {
    document: {},
    documents: [],
    operation: '',
  }

  constructor() {
    this.read = this.read.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.list = this.list.bind(this)
    this.remove = this.remove.bind(this)

    this.setDocument = this.setDocument.bind(this)
    this.resetDocument = this.resetDocument.bind(this)

    this.setOperation = this.setOperation.bind(this)
    this.resetOperation = this.resetOperation(this)
  }

  setDocument(doc) {
      this.state.document = doc
  }

  resetDocument() {
      this.state.document = {}
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

export default AppStore
