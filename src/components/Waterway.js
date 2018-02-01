import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Table, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import WaterwayForm from './WaterwayForm'
import WaterwayStore from '../stores/WaterwayStore'
import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Waterway extends React.Component {
  constructor() {
    super()

    // data member
    this.store = new WaterwayStore()
    this.store.loadWaterwayList()

    this.columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTs',
            key: 'createTs'
        },
        {
            title: '所属项目ID',
            dataIndex: 'projectId',
            key: 'projectId'
        },
        {
            title: '描述',
            dataIndex: 'info',
            key: 'info'
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

      this.store.removeWaterway(key)
  }

  render() {
    let modalTitle
    let modalShow = true
    if (this.store.state.operation == 'add') {
        modalTitle = "添加航道图"
    }
    else if (this.store.state.operation == 'update') {
        modalTitle = "编辑航道图"
    }
    else {
        modalShow = false
    }
    console.log(modalShow)

    return <div>
        <Row><Col><Button className="add-button" type="primary" onClick={this.addClickHandler} ><Icon type="plus-circle-o" /></Button></Col></Row>
        <Row><Col><Table columns={this.columns} dataSource={this.store.state.waterwayList} /></Col></Row>
        <Modal
          title={modalTitle}
          visible={modalShow}
          closable={false}
          footer={null} >
          <WaterwayForm store={this.store} />
        </Modal>
    </div>
  }
}

export default Waterway
