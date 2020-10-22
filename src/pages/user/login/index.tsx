import { notification, Form, Input, Button } from 'antd';
import React, { useState, useEffect, useRef } from 'react';

import styles from './style.less';
import { sys } from '@/utils/core';
import { req } from '@/utils/req';
import AppConst from '@/utils/AppConst';
import { router } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

interface LoginFormProps {
  onSubmit: () => void
  fieldMap: {
    username: string,
    password: string
  }
  form: FormInstance
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, fieldMap, form }) => {

  const onFinish = (values: any) => {
    if (onSubmit) {
      onSubmit();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      form={form}
    >
      <Form.Item
        name={fieldMap.username}
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input prefix={<UserOutlined className={styles.icon} />} placeholder="用户名" className={styles.input} />
      </Form.Item>
      <Form.Item
        name={fieldMap.password}
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles.icon} />}
          type="password"
          placeholder="密码"
          className={styles.input}
        />
      </Form.Item>

      <div id='captcha' style={{ marginBottom: '24px' }}></div>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" className={styles.btn}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

const Login: React.FC = () => {

  const [form] = Form.useForm();
  const [type, setType] = useState<string>('SUPPLIER');
  const enableAfs = useRef<boolean>(false);
  const onTabChange = (type: string) => {
    setType(type);
    form.resetFields();
  }
  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const field: {
      account?: string,
      password?: string
    } = {};
    let userType;
    let href = '';
    if (type === 'SUPPLIER') {
      field.account = values.account;
      field.password = values.password;
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
    if (!enableAfs.current) {
      const data = await req('/UserLogin/login', { ...field, userType });
      const { user } = data;
      localStorage[`${sys.APP_NAME}_sid`] = user.sid;
      router.replace(href);
    } else {
      //@ts-ignore
      let nvcVal = getNVCVal();

      const data = await req('/UserLogin/login', { ...field, userType, nvcVal });
      if (data.nvcCode == 200 || data.nvcCode == 100) {
        // @ts-ignore
        nvcReset()
        const { user } = data;
        localStorage[`${sys.APP_NAME}_sid`] = user.sid;
        router.replace(href);
      } else if (data.nvcCode == 400) {
        //唤醒滑动验证 并设置 
        // @ts-ignore
        getNC().then(function () {
          // @ts-ignore
          _nvc_nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
          })
          // @ts-ignore
          _nvc_nc.reset()
        })
      } else if (data.nvcCode == 600) {
        // @ts-ignore
        getNC().then(function () {
          // @ts-ignore
          _nvc_nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
          })
          // @ts-ignore
          _nvc_nc.reset()
        })
      } else if (data.nvcCode == 700) {
        // @ts-ignore
        getNC().then(function () {
          let nc_config = {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
          }
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            nc_config = {
              'LOADING': "加载中...",//加载
              'SLIDER_LABEL': "请向右滑动验证",//等待滑动
              'CHECK_Y': "验证通过",//通过
              'ERROR_TITLE': "非常抱歉，这出错了...",//拦截
              'CHECK_N': "验证未通过", //准备唤醒二次验证
              'OVERLAY_INFORM': "经检测你当前操作环境存在风险，请输入验证码",//二次验证
              'TIPS_TITLE': "验证码错误，请重新输入"//验证码输错时的提示
            }
          }
          // @ts-ignore
          _nvc_nc.upLang('cn', nc_config)
          // @ts-ignore
          _nvc_nc.reset()
        })
      } else {
        // @ts-ignore
        nvcReset();
      }
    }

  }

  useEffect(() => {
    req('/Front/getAfsConfig').then(res => {
      enableAfs.current = res.enableAfs;
      if (res.enableAfs && res.frontAfsSecret) {
        if (!window.NVC_Opt) {
          //@ts-ignore
          window.NVC_Opt = {
            //无痕配置 && 滑动验证、刮刮卡、问答验证码通用配置
            // appkey: 'FFFF0N00000000006930',
            appkey: res.frontAfsSecret,
            scene: 'nvc_login',
            isH5: false,
            popUp: false,
            renderTo: '#captcha',
            language: "cn",
            //滑动验证长度配置
            customWidth: '100%',
          }
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            window.NVC_Opt.scene = 'nvc_login_h5';
            window.NVC_Opt.isH5 = true;
          }
          let script = document.createElement('script');
          script.src = '//g.alicdn.com/sd/nvc/1.1.112/guide.js';
          document.head.appendChild(script);
        }
      }
    });

    //@ts-ignore


  }, [])

  return (
    <div className={styles.main}>

      <div className={styles.tabs}>
        <div className={styles['tabs-nav']}>
          <div onClick={() => onTabChange('SUPPLIER')} className={type === 'SUPPLIER' ? `${styles.tab} ${styles['tab-active']}` : `${styles.tab}`} >供应商登录</div>
          <div onClick={() => onTabChange('EMPLOYEE')} className={type === 'EMPLOYEE' ? `${styles.tab} ${styles['tab-active']}` : `${styles.tab}`}>管理员登录</div>
        </div>
      </div>
      <LoginForm onSubmit={handleSubmit} form={form} fieldMap={
        {
          username: 'account',
          password: 'password'
        }
      } />
    </div>
  )
}

export default Login;
