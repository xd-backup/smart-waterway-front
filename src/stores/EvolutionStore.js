import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class EvolutionStore {
  @observable state = {
    evolutionList: [],
    index: 0,
    playFlag: false
  }

  constructor() {
    this.setIndex = this.setIndex.bind(this)
    this.loadEvolutionList = this.loadEvolutionList.bind(this)
  }

  // index
  setIndex(index) {
      this.state.index = index
  }

  nextIndex() {
      if (this.state.index == this.state.evolutionList.length) {
          this.state.index = 0
      }
      else {
          this.state.index++
      }
  }

  // date
  @computed get date() {
      return this.state.evolutionList[index].date
  }

  @computed get dateMarkList() {
      return this.state.evolutionList.map((evo) => {
          return evo.date
      })
  }

  // evolutionList
  loadEvolutionList() {
      this.state.evolutionList = []
  }

  // play
  togglePlay() {
      this.state.playFlag = !this.state.playFlag
  }

  @computed get playIcon() {
      return (this.state.playFlag ? constants.EVOLUTION_PAUSE_ICON : constants.EVOLUTION_PLAY_ICON )
  }

}

export default EvolutionStore
