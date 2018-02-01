import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Table, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'
const confirm = Modal.confirm
const FormItem = Form.Item

import config from '../config'
import { USER_ROLES } from '../utils/consts'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const UserForm = Form.create()(
    (props) => {
        const { visible, title, onCancel, onOk, user, form } = props
        const { getFieldDecorator } = form
        return (
            <Modal
                visible={visible}
                title={title}
                okText="确定"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form layout="vertical">
                    <FormItem label="用户名">{getFieldDecorator('username', {
                            initialValue: user.username || ''
                        })(<Input />)}
                    </FormItem>

                    <FormItem label="密码">{getFieldDecorator('password', {
                            initialValue: user.password || ''
                        })(<Input />)}
                    </FormItem>

                    <FormItem label="角色">
                        {getFieldDecorator('role', {
                            initialValue: user.role || USER_ROLES.NORMAL,
                        })(
                        <Radio.Group>
                            <Radio value={USER_ROLES.NORMAL}>普通用户</Radio>
                            <Radio value={USER_ROLES.ADMIN}>管理员</Radio>
                        </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

@observer class User extends React.Component {
  constructor() {
    super()

    this.columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: '角色',
            key: 'role',
            render: (text, record) => (
                <span>{(record.role === USER_ROLES.NORMAL ? '普通用户' : '管理员')}</span>
            )
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.updateClickHandler} data-key={record._id} ><Icon type="edit" /> 编辑</a>
                    <span className="ant-divider" />
                    <a href="#" onClick={this.removeClickHandler} data-key={record._id} ><Icon type="minus-circle-o" /> 删除</a>
                </span>
            )
        }
    ]

    // member function
    this.addClickHandler = this.addClickHandler.bind(this)
    this.updateClickHandler = this.updateClickHandler.bind(this)
    this.removeClickHandler = this.removeClickHandler.bind(this)
    this.okHandler = this.okHandler.bind(this)
    this.cancelHandler = this.cancelHandler.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
      this.props.store.userStore.list()
  }

  addClickHandler() {
      this.store.userStore.resetuser()
      this.store.userStore.setOperation('add')
  }

  async updateClickHandler(e) {
      const key = e.target.dataset['key']
      await this.store.userStore.read(key)

      this.store.userStore.setOperation('update')
  }

  async removeClickHandler(e) {
      let key = e.target.dataset['key']
      await this.store.userStore.read(key)

      confirm({
          title: '确认删除该用户？',
          content: `${this.store.userStore.user.username}`,
          okText: '删除',
          cancelText: '取消',
          async onOk() {
              await this.store.userStore.remove()
              await this.store.userStore.list()
          },
          /*
          onCancel() {

          }
          */
      })
  }

  okHandler() {
    const from = this.form
    form.validateFields((err, values) => {
        if (err) {
            return
        }

        // TODO : values
        console.log(values)

        const doc = {
            access: values.access,
            desc: values.desc,
            geo: [values.x, values.y],
            users: values.users
        };
        
        form.resetFields()
        this.store.userStore.resetOperation()
    });
  }

  cancelHandler() {
      this.store.userStore.resetuser()
      this.store.userStore.resetOperation()
  }

  saveFormRef(form) {
      this.form = form
  }

  render() {
    return <div>
        <Row><Col><Button className="add-button" type="primary" onClick={this.addClickHandler} ><Icon type="plus-circle-o" /></Button></Col></Row>
        <Row><Col><Table columns={this.columns} dataSource={this.store.userStore.users} /></Col></Row>
        <userForm
            ref={this.saveFormRef}
            visible={this.props.store.userStore.modalVisibility}
            onCancel={this.cancelHandler}
            onOk={this.okHandler}
            user={this.props.store.userStore.user}
        />
    </div>
  }
}

export default user
