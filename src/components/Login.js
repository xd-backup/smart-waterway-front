import React from 'react'
import {observer} from 'mobx-react'
import {Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

const FormItem = Form.Item

@observer class Login extends React.Component {
  constructor() {
    super()

    // member function
    this.hasErrors = this.hasErrors.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
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
              this.props.store.appStore.login(values["username"], values["password"])
          }
      })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return <div className="login-container">
        <div className="login-logo" />
        <h3 className="login-title">电子航道图应用系统</h3>
        <Form onSubmit={this.submitHandler} className="login-form">
          <FormItem validateStatus={usernameError ? 'error' : ''} help={usernameError || ''} >
            {
              getFieldDecorator('username', { rules: [{ required: true, message: '输入用户名' }] }) (
                <Input prefix={<Icon type="user" style={{ fontsize: 13 }} />} placeholder="用户名" />
              )
            }
          </FormItem>
          <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''} >
            {
              getFieldDecorator('password', { rules: [{ required: true, message: '输入密码' }] }) (
                <Input type="password" prefix={<Icon type="lock" style={{ fontsize: 13}} />} placeholder="密码" />
              )
            }
          </FormItem>
          <FormItem>
            { 
              getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true }) (
                <Checkbox>保持登录</Checkbox>
              )
            }
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.hasErrors(getFieldsError())}>登录</Button>
          </FormItem>
        </Form>
      </div>
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm
