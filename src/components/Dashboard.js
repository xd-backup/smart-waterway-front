import React from 'react'
import {observer} from 'mobx-react'
import {Table, Modal, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'
import CesiumViewer from './CesiumViewer'

import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Dashboard extends React.Component {
  constructor() {
    super()

    // member function
    this.exitClickHandler = this.exitClickHandler.bind(this)
    this.menuClickHandler = this.menuClickHandler.bind(this)

    this.selectClickHandler = this.selectClickHandler.bind(this)
    this.selectOkHandler = this.selectOkHandler.bind(this)
    this.selectCancelHandler = this.selectCancelHandler.bind(this)

    this.evolutionClickHandler = this.evolutionClickHandler.bind(this)

    this.componentDidMount = this.componentDidMount.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
  }

  // helper
  selectClickHandler() {
      this.props.store.appStore.operate('select')
  }

  selectOkHandler() {
      this.props.store.appStore.operate('')
  }

  selectCancelHandler() {
      this.props.store.appStore.operate('')
  }

  evolutionClickHandler() {
      this.props.store.appStore.operate('evolution')
  }

  exitClickHandler() {
      this.props.store.appStore.nav('exit')
  }

  menuClickHandler(e) {
      this.props.store.appStore.toggleLayer(e.key)
      this.territorystore.appStore.toggleSwitch(e.key)
  }

  render() {
    let selectModalShow = (this.props.store.appStore.state.operation == 'select') ? true : false
                        // <Button type="primary" onClick={this.selectClickHandler} className="select-button" ><Icon type="picture" />航道图选择</Button>
    return <Layout className="full-height">
            <Header className="Header">
                <Row>
                    <Col span={1} offset={0} ><div className="Logo" /></Col>
                    <Col span={4} offset={15} >
                        <Button type="primary" onClick={this.evolutionClickHandler} className="evolution-button" ><Icon type="line-chart" />河床演变</Button>
                        <Button type="primary" onClick={this.exitClickHandler} className="logout-button" ><Icon type="logout" />退出</Button>
                    </Col>
                </Row>
            </Header>
            <Layout className="full-height">
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu 
                        theme="dark"
                        mode="inline"
                        multiple={true}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={this.menuClickHandler}
                        selectedKeys={this.props.store.appStore.state.layers} >
                        <Menu.Item key="marker"><Icon type="environment-o" />航标</Menu.Item>
                        <Menu.Item key="hydrology"><Icon type="line-chart" />水文</Menu.Item>
                        <Menu.Item key="fog"><Icon type="eye-o" />雾情</Menu.Item>
                        <Menu.Item key="meteorology"><Icon type="cloud-o" />气象</Menu.Item>
                        <Menu.Item key="ship"><Icon type="share-alt" />船舶</Menu.Item>                        
                    </Menu>
                </Sider>
                <Layout className="full-height">
                    <Content className="full-height" style={{ background: '#fff', padding: 0, margin: 0, minHeight: 280 }}>
                        <CesiumViewer />
                    </Content>
                </Layout>
            </Layout>
            <Modal
          title="选择航道图"
          visible={selectModalShow}
          onOk={this.selectOkHandler}
          onCancel={this.selectCancelHandler}
          >
        </Modal>
        </Layout>
  }
}

export default Dashboard
