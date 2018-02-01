import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class ProjectStore {
  @observable state = {
    projectList: [],
    currentId: 0,
    operation: ''
  }

  constructor() {
    this.setCurrentId = this.setCurrentId.bind(this)
    this.setOperation = this.setOperation.bind(this)

    this.addProject = this.addProject.bind(this)
    this.updateProject = this.updateProject.bind(this)
    this.removeProject = this.removeProject.bind(this)
    this.loadProjectList = this.loadProjectList.bind(this)
  }

  setCurrentId(id) {
      this.state.currentId = id
  }

  setOperation(operation) {
      this.state.operation = operation
  }

  // CRUD
  addProject(project) {
      this.state.projectList.push(project)
  }

  updateProject(project) {
      this.state.projectList = this.state.projectList.map(value => {
          if (value.id == project.id) {
              return project
          }
          else {
              return value
          }
      })
  }

  removeProject(id) {
      this.state.projectList = this.state.projectList.filter(value => {
          if (value.id == id) {
              return false
          }
          else {
              return true
          }
      })
  }

  @computed get project() {
      return this.state.projectList.reduce((prev, curr) => {
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
          detail: "",
          engineers: [],
          users: []
      })
  }

  loadProjectList() {
      this.state.projectList = [{
            "id": 12345,
            "name":"水富至宜宾航道整治一期",
            "createTs":"2016-6-1",
            "detail":"重点桥梁整治",
            "engineers":["刘华", "王东"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12346,
            "name":"水富至宜宾航道整治二期",
            "createTs":"2016-10-4",
            "detail":"重点滩涂整治",
            "engineers":["刘华", "李伟"],
            "users":["张黎", "吴凯"]
        },
        {
            "id": 12347,
            "name":"水富至宜宾航道整治三期",
            "createTs":"2016-12-4",
            "detail":"建筑物整治",
            "engineers":["刘华", "王东"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12348,
            "name":"嘉陵江川境段航道配套工程一期",
            "createTs":"2016-3-4",
            "detail":"重点桥梁整治",
            "engineers":["张黎", "吴凯"],
            "users":["陈一帆", "张斌"]
        },
        {
            "id": 12349,
            "name":"嘉陵江川境段航道配套工程二期",
            "createTs":"2016-5-8",
            "detail":"重点滩涂整治",
            "engineers":["张黎", "吴凯"],
            "users":["陈一帆", "张斌"]
        },
        {
            "id": 12350,
            "name":"嘉陵江川境段航道配套工程三期",
            "createTs":"2016-8-4",
            "detail":"建筑物整治",
            "engineers":["张黎", "吴凯"],
            "users":["陈一帆", "张斌"]
        },
        {
            "id": 12351,
            "name":"嘉陵江川境段航道配套工程四期",
            "createTs":"2016-12-4",
            "detail":"筑坝工程",
            "engineers":["张黎", "吴凯"],
            "users":["陈一帆", "张斌"]
        },
        {
            "id": 12352,
            "name":"嘉陵江广元至黄帽沱段航道整治一期",
            "createTs":"2017-1-4",
            "detail":"重点桥梁整治",
            "engineers":["何晶晶", "李英东"],
            "users":["何悦", "张斌"]
        },
        {
            "id": 12353,
            "name":"嘉陵江广元至黄帽沱段航道整治二期",
            "createTs":"2017-3-5",
            "detail":"重点滩涂整治",
            "engineers":["何晶晶", "李英东"],
            "users":["何悦", "张斌"]
        },
        {
            "id": 12354,
            "name":"嘉陵江广元至黄帽沱段航道整治三期",
            "createTs":"2017-4-4",
            "detail":"建筑物整治",
            "engineers":["何晶晶", "李英东"],
            "users":["何悦", "张斌"]
        },
        {
            "id": 12355,
            "name":"嘉陵江广元至黄帽沱段航道整治四期",
            "createTs":"2017-6-14",
            "detail":"筑坝工程",
            "engineers":["何晶晶", "李英东"],
            "users":["何悦", "张斌"]
        },
        {
            "id": 12356,
            "name":"长江中游荆江航道整治工程一期",
            "createTs":"2016-1-4",
            "detail":"重点桥梁整治",
            "engineers":["刘华", "李永熙"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12357,
            "name":"长江中游荆江航道整治工程二期",
            "createTs":"2016-5-4",
            "detail":"重点滩涂整治",
            "engineers":["刘华", "李永熙"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12358,
            "name":"长江中游荆江航道整治工程三期",
            "createTs":"2016-8-4",
            "detail":"建筑物整治",
            "engineers":["刘华", "李永熙"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12359,
            "name":"长江中游荆江航道整治工程四期",
            "createTs":"2016-12-4",
            "detail":"筑坝工程",
            "engineers":["刘华", "李永熙"],
            "users":["郑凡", "张斌"]
        },
        {
            "id": 12360,
            "name":"长江中游荆江航道整治工程五期",
            "createTs":"2017-3-4",
            "detail":"疏浚工程",
            "engineers":["刘华", "李永熙"],
            "users":["郑凡", "张斌"]
        }]
  }

}

export default ProjectStore
