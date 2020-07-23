import React from 'react';
import { Spin } from 'antd';
import { useRootState } from '@/rootState';
import styles from './index.less';
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
const PageLoading: React.FC = () => {
  const { loading } = useRootState();
  const height = document.getElementById("root")?.clientHeight;

  return loading ? (
    <div className={styles['Spin-box']} style={{height:height}}><Spin size="large"/></div>
  ) : null;
}


export default PageLoading;
