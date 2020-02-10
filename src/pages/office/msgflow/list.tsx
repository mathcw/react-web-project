import React, { useEffect } from 'react';
import { Col ,Button} from 'antd';
import PageHeaderWrapper,{Extra} from '@/components/PageHeaderWrapper';
import Timer from '@/components/Timer';
import { IModPageProps } from '@/viewconfig/ModConfig';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { getBtnClickEvent } from '@/utils/utils';
import { useListPage} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/approval.png');

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

    const fastApprove = (item:object)=>{
      if(item['action'] && item['assoc_id']){
        getBtnClickEvent(item['action'])({id:item['assoc_id']},load);
      }
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
                      <Col span={12} className={styles.middle}>
                        <Col className={styles.state}>{item['title']}</Col>
                        <Col className={styles.datetime}>推送时间:{item['create_at']}</Col>
                      </Col>
                      <Col span={3} className={styles.right1}>
                        <Col className={styles.name}>推送人</Col>
                        <Col className={styles.name1}>{item['source']==="2"?getEnum('Account')[item['publisher']]:(item['publisher_info']['retailer_name']+'-'+item['publisher_info']['employee_name'])}</Col>
                      </Col>
                      <Col span={3} className={styles.right2}>
                        <Col className={styles.name}>搁置时间</Col>
                        <Col className={styles.name1}>
                          <Timer StartTime={item['create_at']} />
                        </Col>
                      </Col>
                      <Col span={3} className={styles.right3}>
                        <Col className={styles.name}>操作</Col>
                        <Button className={styles.look} size="small" onClick={()=>{fastApprove(item)}}>审批</Button>
                      </Col>
                </Col>)
            }
    </PageHeaderWrapper>
}

export default list