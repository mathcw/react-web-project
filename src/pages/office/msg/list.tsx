import React, { useEffect } from 'react';
import { Col } from 'antd';
import PageHeaderWrapper,{Extra} from '@/components/PageHeaderWrapper';
import { IModPageProps } from '@/viewconfig/ModConfig';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { useListPage} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/new.png');

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
            data.map(item=>
                <Col className={styles.container} key={item['id']}>
                    <Col span={3} className={styles.left}>
                    <img src={IconPng} alt="icon" className={styles.Icon} />
                    </Col>
                    <Col span={17} className={styles.middle}>
                    <Col className={styles.state}>{item['title']}</Col>
                    <Col className={styles.datetime}>推送时间：{item['create_at']}</Col>
                    </Col>
                    <Col span={4} className={styles.right1}>
                    <Col className={styles.name}>推送人</Col>
                    {item['source'] === '1' && <Col className={styles.name1}>{ item['publisher_info']['retailer_name']}-{item['publisher_info']['employee_name'] }</Col>}
                    {item['source'] === '2' && <Col className={styles.name1}>{getEnum('Account')[item['publisher']]}</Col>}
                    </Col>
                </Col>
                )
            }
    </PageHeaderWrapper>
}

export default list