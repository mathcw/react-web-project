import { notification, Tabs, Form, Input, Button } from 'antd';
import React, { useState } from 'react';

import styles from './style.less';
import { sys } from '@/utils/core';
import { req } from '@/utils/req';
import AppConst from '@/utils/AppConst';
import { router } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const loginFun = async (values: any, href: string) => {
  const { user: r } = await req('/UserLogin/login', values);
  localStorage[`${sys.APP_NAME}_sid`] = r.sid;
  router.replace(href);
}

interface LoginFormProps {
  onSubmit: (p:any) => void
  fieldMap:{
    username:string,
    password:string
  }
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit,fieldMap }) => {
  const onFinish = (values: any) => {
    if(onSubmit){
      onSubmit(values);
    }
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
    >
      <Form.Item
        name={fieldMap.username}
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input prefix={<UserOutlined className={styles.icon}/>} placeholder="用户名" className={styles.input}/>
      </Form.Item>
      <Form.Item
        name={fieldMap.password}
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles.icon}/>}
          type="password"
          placeholder="密码"
          className={styles.input}
        />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" className={styles.btn}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

const Login: React.FC = () => {

  const [type, setType] = useState<string>('SUPPLIER');
  const onTabChange = (type: string) => {
    setType(type);
  }
  const handleSubmit = (values:any) => {
    const field:{
      account?:string,
      password?:string
    } = {};
    let userType ;
    let href = '';
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
    loginFun({ ...field, userType }, href).catch(() => {
      // TODO ...
    });
  }

  return (
    <div className={styles.main}>
      <Tabs defaultActiveKey={type} onChange={onTabChange}>
        <Tabs.TabPane tab="供应商登录" key='SUPPLIER'>
          <LoginForm onSubmit={handleSubmit} fieldMap={
            {
              username:'supplierAccount',
              password:'supplierPassword'
            }
          }/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="管理员登录" key='EMPLOYEE'>
          <LoginForm onSubmit={handleSubmit} fieldMap={
            {
              username:'account',
              password:'password'
            }
          }/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Login;
