import React, { useEffect } from 'react';
import { Col,Modal } from 'antd';
import PageHeaderWrapper,{Extra} from '@/components/PageHeaderWrapper';
import { IModPageProps } from '@/viewconfig/ModConfig';

import styles from './list.less';
import { useListPage} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/Notification.png');

const handleClick = (data:any) => {
    const modal = Modal.info({});
    modal.update({
        className:'modal',
        title:'平台公告',
        okText:'确定',
        width: 520,
        icon:null,
        content:<Col className={styles.container}>
        <Col span={24} className={styles.title2}>
          <span className={[styles.text1, 'text-overflow'].join(' ')}>{data['title']}</span>
        </Col>
        <Col span={24} className={styles.title2}>
          <span className={[styles.text, 'text-overflow'].join(' ')}>{data['company_name']}</span>—
          <span className={[styles.text, 'text-overflow'].join(' ')}>{data['department_name']}</span>—
          <span className={[styles.text, 'text-overflow'].join(' ')}>{data['employee_name']}</span>
        </Col>
        <Col span={24} className="styles.title3" dangerouslySetInnerHTML={{__html: data['body_html']}} />
      </Col>
    })
}

const del_html_tag = (html:string)=>{
    return html.replace(/<[^>]+>/g,"");
}

const list:React.FC<IModPageProps> = ({ route }) => {
    const { authority } = route;
    const {
        setCurrent,
        setPageSize,
        load,
        pageSize,
        current,
        pageSizeOptions,
        total,
        data
    } = useListPage(authority)

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
                    <Col className={styles.container} key={item['id']}>
                      <Col span={3} className={styles.left}>
                        <img src={IconPng} alt="icon" className={styles.Icon} />
                        <Col className={styles.text}>公告通知</Col>
                      </Col>
                      <Col span={19} className={styles.middle}>
                        <Col className={styles.title} onClick={e => handleClick(item)}>{item['title']}</Col>
                        <Col className={styles.content1}>
                          {del_html_tag(item['body_html'])}
                        </Col>
                        <Col className={styles.bottom}>
                          <Col className={styles.name}>发布人: {item['department_name']} - {item['employee_name']} </Col>
                          <Col className={styles.datetime}>发布时间：{item['create_at']}</Col>
                        </Col>
                      </Col>
                    </Col>))
            }
    </PageHeaderWrapper>
}

export default list