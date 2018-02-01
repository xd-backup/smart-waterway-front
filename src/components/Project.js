import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Table, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import ProjectForm from './ProjectForm'
import ProjectStore from '../stores/ProjectStore'
import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Project extends React.Component {
  constructor() {
    super()

    // data member
    this.store = new ProjectStore()
    this.store.loadProjectList()

    this.columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.updateClickHandler} data-key={record.id} ><Icon type="edit" /> 编辑</a>
                    <span className="ant-divider" />
                    <a href="#" onClick={this.removeClickHandler} data-key={record.id} ><Icon type="minus-circle-o" /> 删除</a>
                </span>
            )
        }
    ]

    // member function
    this.addClickHandler = this.addClickHandler.bind(this)
    this.updateClickHandler = this.updateClickHandler.bind(this)
    this.removeClickHandler = this.removeClickHandler.bind(this)
    this.render = this.render.bind(this)
  }

  addClickHandler() {
      this.store.setCurrentId(0)
      this.store.setOperation('add')
  }

  updateClickHandler(e) {
      let key = e.target.dataset['key']

      this.store.setCurrentId(key)
      this.store.setOperation('update')
  }

  removeClickHandler(e) {
      let key = e.target.dataset['key']

      this.store.removeProject(key)
  }

  render() {
    let modalTitle
    let modalShow = true
    if (this.store.state.operation == 'add') {
        modalTitle = "添加工程"
    }
    else if (this.store.state.operation == 'update') {
        modalTitle = "编辑工程"
    }
    else {
        modalShow = false
    }

    return <div>
        <Row><Button className="add-button" type="primary" onClick={this.addClickHandler} ><Icon type="plus-circle-o" /></Button></Row>
        <Row><Table columns={this.columns} dataSource={this.store.state.projectList} /></Row>
        <Modal
          title={modalTitle}
          visible={modalShow}
          closable={false}
          footer={null} >
          <ProjectForm store={this.store} />
        </Modal>
    </div>
  }
}

export default Project
