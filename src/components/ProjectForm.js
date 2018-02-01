import React from 'react'
import {observer} from 'mobx-react'
import {Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

const FormItem = Form.Item

@observer class ProjectFormClass extends React.Component {
  constructor() {
    super()

    // member function
    this.hasErrors = this.hasErrors.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.cancelHandler = this.cancelHandler.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  // helper
  submitHandler(e) {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
          if (!err) {
            let now = new Date()
            let nowDateStr = now.getFullYear().toString() + '-' + now.getMonth().toString() + '-' + now.getDay().toString()

            if (this.props.store.state.operation == 'add') {
              this.props.store.addProject({
                id: 12361,
                name: values["name"],
                createTs: nowDateStr,
                detail: values["detail"],
                info: [],
                user: []
              })

              this.props.store.setOperation('')
            }
            else if (this.props.store.state.operation == 'update') {
              this.props.store.updateProject({
                id: this.props.store.project.id,
                name: values["name"],
                createTs: nowDateStr,
                detail: values["detail"],
                engineers: [],
                users: []
              })

              this.props.store.setCurrentId(0)
              this.props.store.setOperation('')
            }
          }
      })
  }

  cancelHandler(e) {
    this.props.store.setCurrentId(0)
    this.props.store.setOperation('')
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name')
    const detailError = isFieldTouched('detail') && getFieldError('detail')

    return <Form onSubmit={this.submitHandler} className="project-form">
        <FormItem validateStatus={nameError ? 'error' : ''} help={nameError || ''} >
          {
            getFieldDecorator('name', { initialValue: this.props.store.project.name, rules: [{ required: true, message: '输入名称' }] }) (
              <Input prefix={<Icon type="tag-o" style={{ fontsize: 13 }} />} placeholder="名称" />
            )
          }
        </FormItem>
        <FormItem validateStatus={detailError ? 'error' : ''} help={detailError || ''} >
          {
            getFieldDecorator('detail', { initialValue: this.props.store.project.detail, rules: [{ required: true, message: '输入描述' }] }) (
              <Input prefix={<Icon type="file-text" style={{ fontsize: 13 }} />} placeholder="描述" />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="project-form-button" disabled={this.hasErrors(getFieldsError())}>提交</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.cancelHandler}>取消</Button>
        </FormItem>
      </Form>
  }
}

const ProjectForm = Form.create()(ProjectFormClass)

export default ProjectForm
