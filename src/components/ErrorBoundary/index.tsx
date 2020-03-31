import React from 'react';
import { req } from '@/utils/req';
import { Result, Button } from 'antd';
import { router } from 'umi';

class ErrorBoundary extends React.Component {
  readonly state = {hasError: false};

  static getDerivedStateFromError(error:any) {
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    req('PublicApi/error',{error,errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return <Result
      status="500"
      title="500"
      subTitle="对不起,好像出了点问题."
      extra={<Button type="primary" onClick={()=>router.replace('/')}>返回首页</Button>}
    />
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;