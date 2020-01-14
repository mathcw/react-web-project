import { Alert,notification } from 'antd';
import {  formatMessage,FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { ConnectState } from '@/models/connect';

import AppConst from '@/utils/AppConst';
import { sys } from '@/utils/core';
import { req } from '@/utils/req';
import { router } from 'umi';

const { Tab, UserName, Password,Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
}
interface LoginParam {
  account:string;
  password:string;
}

const loginFun = async (values:any, href:string) => {
  const { user: r } = await req('/b2b-back/UserLogin/login', values);
  localStorage[`${sys.APP_NAME}_sid`] = r.sid;
  router.replace(href);
}

@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'SUPPLIER',
  };

  handleSubmit = (err: unknown, values: any) => {
    const { type } = this.state;
    const field :LoginParam = {account:'',password:''};
    let href = '';
    let userType:number;
    if (type === 'SUPPLIER') {
      field.account = values.supplierAccount;
      field.password = values.supplierPassword;
      userType = AppConst.USER_SUP;
      href = '/home/supplier';
    } else if (type === 'EMPLOYEE') {
      field.account = values.account;
      field.password = values.password;
      userType = AppConst.USER_EMP;
      href = '/home/admin'
    } else {
      notification.error({
        message: '账号类型错误',
        description: '账号类型错误',
      });
      return;
    }
    if (!err) {
      loginFun({ ...field, userType }, href).catch(() => {
        // TODO ...
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key='SUPPLIER' tab={formatMessage({ id: 'user-login.login.supplier' })}>
            {status === 'error' &&
              loginType === 'SUPPLIER' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}
            <UserName
              name="supplierAccount"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: loginType === 'SUPPLIER' && true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="supplierPassword"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: loginType === 'SUPPLIER' && true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key='EMPLOYEE' tab={formatMessage({ id: 'user-login.login.employee' })}>
            {status === 'error' &&
              loginType === 'EMPLOYEE' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}
            <UserName
              name="account"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: loginType === 'EMPLOYEE' && true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: loginType === 'EMPLOYEE' && true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
