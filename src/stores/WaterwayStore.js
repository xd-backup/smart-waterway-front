import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class WaterwayStore {
  @observable state = {
    waterwayList: [],
    currentId: 0,
    operation: ''
  }

  constructor() {
    this.setCurrentId = this.setCurrentId.bind(this)
    this.setOperation = this.setOperation.bind(this)

    this.addWaterway = this.addWaterway.bind(this)
    this.updateWaterway = this.updateWaterway.bind(this)
    this.removeWaterway = this.removeWaterway.bind(this)
    this.loadWaterwayList = this.loadWaterwayList.bind(this)
  }

  setCurrentId(id) {
      this.state.currentId = id
  }

  setOperation(operation) {
      this.state.operation = operation
  }

  // CRUD
  addWaterway(waterway) {
      this.state.waterwayList.push(waterway)
  }

  updateWaterway(waterway) {
      this.state.waterwayList = this.state.waterwayList.map(value => {
          if (value.id == waterway.id) {
              return waterway
          }
          else {
              return value
          }
      })
  }

  removeWaterway(id) {
      this.state.waterwayList = this.state.waterwayList.filter(value => {
          if (value.id == id) {
              return false
          }
          else {
              return true
          }
      })
  }

  @computed get waterway() {
      return this.state.waterwayList.reduce((prev, curr) => {
          if (curr.id == this.state.currentId) {
              return curr
          }
          else {
              return prev
          }
      }, {
          id: 0,
          name: "",
          createTs: "",
          projectId: "",
          info: "",
          user: ""
      })
  }

  loadWaterwayList() {
      this.state.waterwayList = [{
            "id": 12345,
            "name":"水富至宜宾航道图（一）",
            "createTs":"2016-6-1",
            "projectId":"12345",
            "info":"包含重点桥梁",
            "user":"刘华"
        },
        {
            "id": 12346,
            "name":"水富至宜宾航道图（二）",
            "createTs":"2016-10-4",
            "projectId":"12346",
            "info":"包含重点滩涂",
            "user":"刘华"
        },
        {
            "id": 12347,
            "name":"水富至宜宾航道图（三）",
            "createTs":"2016-12-4",
            "projectId":"12347",
            "info":"包含沿岸建筑物",
            "user":"刘华"
        },
        {
            "id": 12348,
            "name":"嘉陵江川境段航道图（一）",
            "createTs":"2016-3-4",
            "projectId":"12348",
            "info":"包含重点桥梁",
            "user":"张黎"
        },
        {
            "id": 12349,
            "name":"嘉陵江川境段航道图（二）",
            "createTs":"2016-5-8",
            "projectId":"12349",
            "info":"包含重点滩涂",
            "user":"张黎"
        },
        {
            "id": 12350,
            "name":"嘉陵江川境段航道图（三）",
            "createTs":"2016-8-4",
            "projectId":"12350",
            "info":"包含沿岸建筑物",
            "user":"张黎"
        },
        {
            "id": 12351,
            "name":"嘉陵江川境段航道图（四）",
            "createTs":"2016-12-4",
            "projectId":"12351",
            "info":"包含堤坝",
            "user":"张黎"
        },
        {
            "id": 12352,
            "name":"嘉陵江广元至黄帽沱段航道图（一）",
            "createTs":"2017-1-4",
            "projectId":"12352",
            "info":"包含重点桥梁",
            "user":"何晶晶"
        },
        {
            "id": 12353,
            "name":"嘉陵江广元至黄帽沱段航道图（二）",
            "createTs":"2017-3-5",
            "projectId":"12353",
            "info":"包含重点滩涂",
            "user":"何晶晶"
        },
        {
            "id": 12354,
            "name":"嘉陵江广元至黄帽沱段航道图（三）",
            "createTs":"2017-4-4",
            "projectId":"12354",
            "info":"包含沿岸建筑物",
            "user":"何晶晶"
        },
        {
            "id": 12355,
            "name":"嘉陵江广元至黄帽沱段航道图（四）",
            "createTs":"2017-6-14",
            "projectId":"12355",
            "info":"包含堤坝",
            "user":"何晶晶"
        },
        {
            "id": 12356,
            "name":"长江中游荆江航道图（一）",
            "createTs":"2016-1-4",
            "projectId":"12356",
            "info":"包含重点桥梁",
            "user":"刘华"
        },
        {
            "id": 12357,
            "name":"长江中游荆江航道图（二）",
            "createTs":"2016-5-4",
            "projectId":"12357",
            "info":"包含重点滩涂",
            "user":"刘华"
        },
        {
            "id": 12358,
            "name":"长江中游荆江航道图（三）",
            "createTs":"2016-8-4",
            "projectId":"12358",
            "info":"包含沿岸建筑物",
            "user":"刘华"
        },
        {
            "id": 12359,
            "name":"长江中游荆江航道图（四）",
            "createTs":"2016-12-4",
            "projectId":"12359",
            "info":"包含堤坝",
            "user":"刘华"
        },
        {
            "id": 12360,
            "name":"长江中游荆江航道图（五）",
            "createTs":"2016-12-4",
            "projectId":"12345",
            "info":"包含管线及附属设施",
            "user":"刘华"
        }
    ]
  }

}

export default WaterwayStore
