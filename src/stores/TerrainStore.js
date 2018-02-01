import {observable, computed} from 'mobx'
import Mobx from 'mobx'

class TerrainStore {
  @observable state = {
    lightSwitch: true,
    mark: false,
    hydrology: true,
    fog: false,
    meteorology: false,
    ship: false,
    rotateAngle: 0.0
  }
  rotateFlag = false

  constructor() {
    this.toggleSwitch = this.toggleSwitch.bind(this)
    this.toggleLight = this.toggleLight.bind(this)
    this.toggleRotate = this.toggleRotate.bind(this)
    this.update = this.update.bind(this)
  }

  toggleSwitch(key) {
    this.state[key] = this.state[key] ? false : true
  }

  // light
  toggleLight() {
    this.state.lightSwitch = this.state.lightSwitch ? false : true
  }

  @computed get lightColor() {
    return (this.state.lightSwitch ? 0xffffff : 0x000000)
  }

  // rotate
  toggleRotate() {
    this.rotateFlag = (this.rotateFlag) ? false : true
  }

  update() {
    if (this.rotateFlag)
      if (this.state.rotateAngle < 2 * Math.PI)
        this.state.rotateAngle += Math.PI / 360.0
      else
        this.state.rotateAngle = 0.0
  }

}

export default TerrainStore
