import React, { useEffect } from 'react';
import { Col,Modal, Row } from 'antd';
import PageHeaderWrapper,{Extra} from '@/components/PageHeaderWrapper';
import { IModPageProps } from '@/viewconfig/ModConfig';

import styles from './list.less';
import { useListPage} from '@/utils/ListPageHooks';
import { getBtnClickEvent } from '@/utils/utils';

const IconPng = require('@/assets/Notification.png');

const handleClick = (data:any) => {
    getBtnClickEvent('查看公告公告通知')({id:data['id']});
}

const del_html_tag = (html:string)=>{
    return html.replace(/<[^>]+>/g,"");
}

const list:React.FC<IModPageProps> = ({ route }) => {
    const { viewConfig } = route;
    const {
        setCurrent,
        setPageSize,
        load,
        pageSize,
        current,
        pageSizeOptions,
        total,
        data
    } = useListPage(viewConfig)

    useEffect(() => {
        load();
    }, [pageSize, current])

    const pageNumChange = (page:number) => {
        setCurrent(page);
    }

    const pageSizeChange = (_Current:number, size:number) => {
        setPageSize(size);
    }

    return <PageHeaderWrapper
            extra={
                Extra(pageSize,
                    pageSizeOptions,
                    total,
                    current,
                    pageNumChange,
                    pageSizeChange)
            }
            >
            {
                data.map((item, index) => (
                    <Row className={styles.container} key={item['id']}>
                      <Col span={3} className={styles.left}>
                        <img src={IconPng} alt="icon" className={styles.Icon} />
                        <div className={styles.text}>公告通知</div>
                      </Col>
                      <Col span={21} className={styles.middle}>
                        <div className={styles.title} onClick={e => handleClick(item)}>{item['title']}</div>
                        <div className={styles.content1}>
                          {del_html_tag(item['body_html'])}
                        </div>
                        <Row className={styles.bottom}>
                          <Col span={10} className={styles.name}>发布人: {item['department_name']} - {item['employee_name']} </Col>
                          <Col className={styles.datetime}>发布时间：{item['create_at']}</Col>
                        </Row>
                      </Col>
                    </Row>))
            }
    </PageHeaderWrapper>
}

export default list