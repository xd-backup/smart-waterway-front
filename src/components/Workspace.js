import React from 'react'
import {observer} from 'mobx-react'
import {Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'
import Project from './Project'
import Waterway from './Waterway'
import Document from './Document'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Workspace extends React.Component {
  constructor() {
    super()

    // member function
    this.settingClickHandler = this.settingClickHandler.bind(this)
    this.exitClickHandler = this.exitClickHandler.bind(this)
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.render = this.render.bind(this)
  }

  // helper
  settingClickHandler() {
      this.props.store.nav('setting')
  }

  exitClickHandler() {
      this.props.store.nav('exit')
  }

  menuClickHandler(e) {
      this.props.store.nav(e.key)
  }

  render() {
    let content
    switch(this.props.store.appStore.state.position) {
        case 'project':
        content = <Project store={this.props.store} />
        break

        case 'user':
        content = <User store={this.props.store} />
        break

        case 'waterway':
        content = <Waterway store={this.props.store} />
        break

        case 'document':
        content = <Document store={this.props.store} />

        default:
        content = <Project store={this.props.store} />
    }

    return <div>
        <Layout>
            <Header className="Header">
                <Row>
                    <Col span={1} offset={0} ><div className="Logo" /></Col>
                    <Col span={4} offset={19} >
                        <Button type="primary" onClick={this.settingClickHandler} className="setting-button" ><Icon type="setting" />设置</Button>
                        <Button type="primary" onClick={this.exitClickHandler} className="logout-button" ><Icon type="logout" />退出</Button>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu 
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        theme="dark"
                        onClick={this.menuClickHandler}
                        selectedKeys={[this.props.store.appStore.state.position]} >
                        <Menu.Item key="project"><span><Icon type="appstore-o" />工程管理</span></Menu.Item>
                        <Menu.Item key="user"><span><Icon type="user" />用户管理</span></Menu.Item>
                        <Menu.Item key="waterway"><span><Icon type="picture" />航道图管理</span></Menu.Item>
                        <Menu.Item key="interface"><span><Icon type="code-o" />接口管理</span></Menu.Item>
                        <Menu.Item key="marker"><span><Icon type="environment-o" />航标管理</span></Menu.Item>
                        <Menu.Item key="hydrology"><span><Icon type="line-chart" />水文管理</span></Menu.Item>
                        <Menu.Item key="fog"><span><Icon type="eye-o" />雾情管理</span></Menu.Item>
                        <Menu.Item key="meteorology"><span><Icon type="cloud-o" />气象管理</span></Menu.Item>
                        <Menu.Item key="ship"><span><Icon type="share-alt" />船舶管理</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px 24px 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>{content}</Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  }
}

export default Workspace
