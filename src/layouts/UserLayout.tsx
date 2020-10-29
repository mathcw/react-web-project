import {  MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { Row, Col } from 'antd';

import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './UserLayout.less';
import Footer from '@/components/Footer';
const IconPng = require('@/assets/homepage.png');

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <Row className={styles.box}>
          <Col span={12} className={styles.l}>
            <img src={IconPng} alt="icon" className={styles.img} />
          </Col>
          <Col span={12} className={styles.r}>
            <div className={styles.r_login}>
              <div className={styles.r_name}>兔兔同业助手<span style={{ fontSize: '23px' }}>V1.0</span></div>
              <div >{children}</div>
            </div>
          </Col>
        </Row>
        <Footer style={{backgroundColor:'white'}}/>
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
