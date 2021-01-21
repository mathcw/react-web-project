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
                title='津ICP备2021000444号-1'
                target='_blank'
                href='http://beian.miit.gov.cn/'
                >
                津ICP备2021000444号-1
                </a>
            </div>
            <div>天津东青信息技术有限公司</div>
            <div className={styles.copyright}>
                Copyright <CopyrightCircleFilled /> 2020 TourTool All Rights Reserved
            </div>
        </Footer>
    )
}