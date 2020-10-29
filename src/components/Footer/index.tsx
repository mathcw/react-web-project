import React from 'react';

import { Layout } from "antd";

import styles from './index.less';
import { CopyrightCircleFilled } from '@ant-design/icons';

const { Footer } = Layout;
export default ({style}) =>{
    return (
        <Footer className={styles.footer} style={style?style:{}}>
            <div className={styles.link}>
                <a
                title='苏ICP备17030489号-3'
                target='_blank'
                href='http://beian.miit.gov.cn/'
                >
                苏ICP备17030489号-3 
                </a>
            </div>
            <div>苏州方领圆冠网络科技有限公司</div>
            <div className={styles.copyright}>
                Copyright <CopyrightCircleFilled /> 2020 TourTool All Rights Reserved
            </div>
        </Footer>
    )
}