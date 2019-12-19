import React, { useEffect } from 'react';
import { Col,Button } from 'antd';
import PageHeaderWrapper,{Extra,Content} from '@/components/PageHeaderWrapper';
import { getRowBtnArray } from '@/utils/utils';
import { IModPageProps } from '@/viewconfig/ModConfig';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { useListPage ,useListPageBtn, useListPageSearch} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/role.png');

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
        query,
        setQuery,
        data
    } = useListPage(authority)

    const { headerBtns, rowBtns} = useListPageBtn(authority);

    const { dropDownSearch,textSearch } = useListPageSearch(authority);

    useEffect(() => {
        load();
    }, [pageSize, current])

    const pageNumChange = (page:number) => {
        setCurrent(page);
    }

    const pageSizeChange = (_Current:number, size:number) => {
        setPageSize(size);
    }

    const colorfun = (item:any) => {
        let flowColor = {}
            switch (item['state']) {
              case '0':
                flowColor = { color: 'red' }
                break;
              case '1':
                flowColor = { color: 'green' }
                break;
              default:
                flowColor = { color: '#333' }
            }
            return flowColor;
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
            content={Content(query, setQuery, load, headerBtns,dropDownSearch,textSearch)}
            >
            {data.map((item) => (
              <Col key={item['id']} className={styles.container}>
                <Col span={4} className={styles.left}>
                  <img src={IconPng} alt="icon" className={styles.img} />
                </Col>
                <Col span={12} className={styles.middle}>
                  <Col span={24} className={styles.top}>
                    <span className={styles.lable}>{item['name']}</span>
                  </Col>
                  <Col span={12} className={styles.centerL}>
                    <div>
                      <span className={styles.lable}>创建人员:  </span>{' '}&nbsp;&nbsp;&nbsp;
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{item['creator_id']}</span>
                    </div>
                    <div>
                      <span className={styles.lable}>创建日期:  </span>{' '}&nbsp;&nbsp;&nbsp;
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{item['create_at']}</span>
                    </div>
                    <div>
                      <span className={styles.lable}>最近变动:  </span>{' '}&nbsp;&nbsp;&nbsp;
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{item['last_update']}</span>
                    </div>

                  </Col>
                  <Col span={9} className={styles.centerR}>
                    <div>
                      <span className={styles.lable}>权限备注:  </span>{' '}&nbsp;&nbsp;&nbsp;
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{item['scope']}</span>
                    </div>
                    <div>
                      <span className={styles.lable}>角色成员:  </span>{' '}&nbsp;&nbsp;&nbsp;
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{item['employee_num']}人</span>
                    </div>
                  </Col>
                </Col>
                <Col span={8} className={styles.right}>
                  <div className={styles.head}>
                    <span className={styles.lable}>账号状态</span>
                  </div>
                  <div className={styles.state}>
                    <span style={colorfun(item)} className={[styles.text, 'text-overflow'].join(' ')}>
                      {getEnum('State')[item['state']]}
                    </span>
                  </div>
                  <div className={styles.btn}>
                    <div className={styles.button}>
                        {getRowBtnArray(item,rowBtns).map(btn=>(
                            <Button 
                                className={styles.approval} 
                                type="primary" 
                                size="small"
                                key={btn.text}
                                onClick={() =>  {
                                if(btn.onClick)
                                    btn.onClick(item)
                                }}
                            >
                            {btn.text || ''}
                            </Button>
                        ))}
                    </div>
                  </div>
                </Col>
              </Col>))}
    </PageHeaderWrapper>
}

export default list