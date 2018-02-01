import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Table, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'
const confirm = Modal.confirm
const FormItem = Form.Item

import config from '../config'
import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const uploadProps = {
    name: 'documents',
    multiple: true,
    action: `${config.ajaxBaseUrl}/${config.apiVersion}/${config.documentUploadPath}`,
}

const DocumentForm = Form.create()(
    (props) => {
        const { visible, title, onCancel, onOk, document, form } = props
        const { getFieldDecorator } = form
        return (
            <Modal
                visible={visible}
                title={title}
                okText="OK"
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form layout="vertical">
                    <FormItem>
                        {getFieldDecorator('access', {
                            initialValue: document.access || constants.DOCUMENT_ACCESS.PUBLIC,
                        })(
                        <Radio.Group>
                            <Radio value={constants.DOCUMENT_ACCESS.PUBLIC}>公开</Radio>
                            <Radio value={constants.DOCUMENT_ACCESS.PRIVATE}>私密</Radio>
                        </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="描述">{getFieldDecorator('description', {
                            initialValue: document.desc || ''
                        })(<Input type="textarea" />)}</FormItem>
                    <FormItem label="X坐标">
                        {getFieldDecorator('x', {
                            initialValue: document.geo[0] || 0.0,
                            rules: [{ required: true, message: '请输入X坐标' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Y坐标">
                        {getFieldDecorator('y', {
                            initialValue: document.geo[1] || 0.0,
                            rules: [{ required: true, message: '请输入Y坐标' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="文件">
                        <div className="dropbox">
                        {getFieldDecorator('documents', {
                            valuePropName: 'documents',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload.Dragger
                                name="documents"
                                action={uploadProps}
                                multiple="true"    
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">点击或拖动文件到此处上传</p>
                                <p className="ant-upload-hint">支持单个或多个文件</p>
                            </Upload.Dragger>
                        )}
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

@observer class Document extends React.Component {
  constructor() {
    super()

    this.columns = [
        {
            title: '文件名',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: '所属项目',
            dataIndex: 'projectName',
            key: 'projectName'
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: '权限',
            key: 'access',
            render: (text, record) => (
                <span>{(record.access === 'public' ? '公开' : '私密')}</span>
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
      this.props.store.documentStore.list()
  }

  addClickHandler() {
      this.store.documentStore.resetDocument()
      this.store.documentStore.setOperation('add')
  }

  async updateClickHandler(e) {
      const key = e.target.dataset['key']
      await this.store.documentStore.read(key)

      this.store.documentStore.setOperation('update')
  }

  async removeClickHandler(e) {
      let key = e.target.dataset['key']
      await this.store.documentStore.read(key)

      confirm({
          title: '确认删除该文档？',
          content: `${this.store.documentStore.document.key}.${this.store.documentStore.document.ext} - ${this.store.documentStore.desc}`,
          okText: '删除',
          cancelText: '取消',
          async onOk() {
              await this.store.documentStore.remove()
              await this.store.documentStore.list()
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
            documents: values.documents
        };
        
        form.resetFields()
        this.store.documentStore.resetOperation()
    });
  }

  cancelHandler() {
      this.store.documentStore.resetDocument()
      this.store.documentStore.resetOperation()
  }

  saveFormRef(form) {
      this.form = form
  }

  render() {
    return <div>
        <Row><Col><Button className="add-button" type="primary" onClick={this.addClickHandler} ><Icon type="plus-circle-o" /></Button></Col></Row>
        <Row><Col><Table columns={this.columns} dataSource={this.store.documentStore.documents} /></Col></Row>
        <DocumentForm
            ref={this.saveFormRef}
            visible={this.props.store.documentStore.modalVisibility}
            onCancel={this.cancelHandler}
            onOk={this.okHandler}
            document={this.props.store.documentStore.document}
        />
    </div>
  }
}

export default Document
