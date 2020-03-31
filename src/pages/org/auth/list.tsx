import React, { useEffect } from 'react';
import { Col,Button,Row } from 'antd';
import PageHeaderWrapper,{Extra,Content} from '@/components/PageHeaderWrapper';
import { IModPageProps } from '@/viewconfig/ModConfig';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { useListPage ,useListPageBtn, useListPageSearch} from '@/utils/ListPageHooks';

const IconPng = require('@/assets/role.png');

const list:React.FC<IModPageProps> = ({ route }) => {
    const {authority,viewConfig } = route;
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
    } = useListPage(authority,viewConfig)

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
        <div className={styles.ScrollHight}>
            {data.map((item) => (
                <React.Fragment key={item['id']}>
                    <Row className={styles.container}>
                        <Col span={3} className={styles.left}>
                            <div className={styles.headerIcon}>
                                <img src={IconPng} alt="icon" className={styles.img} />
                            </div>
                        </Col>
                        <Col span={17} className={styles.middle}>
                            <Col span={24} className={styles.top}>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{item['name']}</span>
                            </Col>
                            <Row>
                                <Col xl={8} lg={8} md={24} sm={24} xs={24} className={styles.centerL}>
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
                                <Col xl={9} lg={9} md={24} sm={24} xs={24} className={styles.centerL}>
                                    <div>
                                        <span className={styles.lable}>权限备注:  </span>{' '}&nbsp;&nbsp;&nbsp;
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{item['scope']}</span>
                                    </div>
                                    <div>
                                        <span className={styles.lable}>角色成员:  </span>{' '}&nbsp;&nbsp;&nbsp;
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{item['employee_num']}人</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} className={styles.Approval}>
                            <div className={styles.head}>
                                <span className={styles.lable}>账号状态</span>
                            </div>
                            <div className={styles.state}>
                                <span style={colorfun(item)} className={[styles.text, 'text-overflow'].join(' ')}>
                                {getEnum('State')[item['state']]}
                                </span>
                            </div>
                            <Col className={rowBtns ? styles.btns : 'hide'}>
                                {rowBtns.map(btn => (
                                    <Button
                                        className={styles.button}
                                        type="primary"
                                        size="small"
                                        key={btn.text}
                                        onClick={() => {
                                            if (btn.onClick) btn.onClick(item, load);
                                        }}
                                    >
                                        {btn.text || ""}
                                    </Button>
                                ))}
                            </Col>
                        </Col>
                    </Row>
                </React.Fragment>
            ))}
        </div>
    </PageHeaderWrapper>
}

export default list;