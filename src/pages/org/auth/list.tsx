import React, { useEffect } from 'react';
import { Col,Button,Row } from 'antd';
import PageHeaderWrapper,{Extra,Content} from '@/components/PageHeaderWrapper';
import { IModPageProps } from '@/viewconfig/ModConfig';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { useListPage ,useListPageBtn, useListPageSearch} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/role.png');

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
        query,
        setQuery,
        data
    } = useListPage(viewConfig)

    const { headerBtns, rowBtns} = useListPageBtn(viewConfig);

    const { dropDownSearch,textSearch } = useListPageSearch(viewConfig);

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
            <React.Fragment>
            <Col className={styles.Org}>
                <Col className={styles.top}>
                    <Col span={2} className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                        <img src={IconPng} alt="icon" className={styles.img} />
                    </Col>
                    <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                        <Col span={20} className={styles.RTop}>
                            <span className={[styles.name, 'text-overflow'].join(' ')}>{item['name']}</span>
                        </Col>
                        <Col span={17} className={styles.RCenter}>
                            <Col span={10} className={styles.RCenterL}>
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
                            <Col span={10} className={styles.RCenterL}>
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
                        <Col span={7} className={styles.Approval}>
                            <Row>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}></span>
                                    <div className={[styles.text, 'text-overflow'].join(' ')}></div>
                                </Col>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}>账号状态</span>
                                    <div style={colorfun(item)} className={[styles.text, 'text-overflow'].join(' ')}>
                                        {getEnum('State')[item['state']]}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    
                    <Col className={rowBtns ? styles.btns : 'hide'}>
                        {rowBtns.map(btn => (
                            <Button
                                className={styles.button}
                                type="primary"
                                size="small"
                                key={btn.text}
                                onClick={() => {
                                    if (btn.onClick) btn.onClick(data, load);
                                }}
                            >
                                {btn.text || ""}
                            </Button>
                        ))}
                    </Col>
                </Col>
            </Col>
            </React.Fragment>
        ))}
    </PageHeaderWrapper>
}

export default list