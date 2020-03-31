import React, { useEffect } from 'react';
import { IModPageProps, IModBtn } from '@/viewconfig/ModConfig';
import {
    useListPage,
    useListPageBtn,
    useListPageSearch
} from "@/utils/ListPageHooks";

import PageHeaderWrapper, {
    Extra,
    Content
} from "@/components/PageHeaderWrapper";
import { getRowBtnArray, colDisplay, colorfun } from '@/utils/utils';

import styles from './list.less';
import { Col, Button, Row } from 'antd';

const defaultPng = require('@/assets/login-bg.png');

function renderImg(photo?: string) {
    return (
        <div className={styles.imgWrapper}>
            <img src={photo || defaultPng} className={styles.img} alt="图片" />
        </div>
    );
}

interface ICompanyItem {
    stamp?: string;
    full_name: string;
    brand: string;
    supp_type: string;
    id: string;
    city_id: string;

    account_id: string;
    retailer_id: string;
    addr?: string;
    creator?: string;
    create_at: string;
    employee_name: string;
    flow: string;
    type: | '1' | '0',
    [key: string]: any;
}

interface ICompanyProps {
    data: ICompanyItem;
    btns: IModBtn[];
    load: () => void
}


const Company: React.FC<ICompanyProps> = ({ data, btns, load }) => {
    const colorfuntwo = (item: any) => {
        let flowColor = {}
        switch (item.xn_flow) {
            case '0':
                flowColor = { color: '#333' }
                break;
            case '1':
                flowColor = { color: '#333' }
                break;
            case '2':
                flowColor = { color: '#FFCC00' }
                break;
            case '3':
                flowColor = { color: 'red' }
                break;
            case '4':
                flowColor = { color: 'green' }
                break;
            default:
                flowColor = { color: '#333' }
        }
        return flowColor;
    }

    return (
        <React.Fragment>
            <Col className={styles.Supplier}>
                <Col className={styles.top}>
                    <Col className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                        {renderImg(data.stamp)}
                    </Col>
                    <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                    <Col span={20} className={styles.RTop}>
                            <span className={[styles.name, 'text-overflow'].join(' ')}>{data.full_name}-{data.brand}</span>
                        </Col>
                        <Col span={17} className={styles.RCenter}>
                            <Col span={10} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>商家类型： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.supp_type, 'SuppKind', data)}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>商家编号： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>S0{data.id}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>所在城市： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.city_id, 'City', data)}
                                    </span>
                                </div>
                            </Col>
                            <Col span={13} className={styles.RCenterL}>
                                <div className={styles.address}>
                                    <span className={styles.lable}>办公地址： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.addr || ''}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>创建方式：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.type, 'SuppType', data)}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>创建人员： </span>{' '}
                                    {data.creator &&
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.creator}</span>
                                    }
                                    {!data.creator &&
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.employee_name}</span>
                                    }
                                </div>
                            </Col>
                        </Col>
                        <Col span={5} className={styles.Approval}>
                            <Row>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}>自建审批</span>
                                    <div className={[styles.text, 'text-overflow'].join(' ')}  style={colorfun(data)}>
                                        {colDisplay(data.flow, 'Flow', data)}
                                    </div>
                                </Col>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}>吸纳审批</span>
                                    <div className={[styles.text, 'text-overflow'].join(' ')} style={colorfuntwo(data)}>
                                        {colDisplay(data.xn_flow, 'Flow', data)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col className={btns ? styles.btns : 'hide'}>
                        {btns.map(btn => (
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
    )
}


const list: React.FC<IModPageProps> = ({ route }) => {
    const { authority,viewConfig } = route;
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
    } = useListPage(authority,viewConfig);

    useEffect(() => {
        load();
    }, [pageSize, current]);

    const pageNumChange = (page: number) => {
        setCurrent(page);
    };

    const pageSizeChange = (_Current: number, size: number) => {
        setPageSize(size);
    };

    const actionMap = {};

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);

    return (
        <PageHeaderWrapper
            extra={Extra(
                pageSize,
                pageSizeOptions,
                total,
                current,
                pageNumChange,
                pageSizeChange
            )}
            content={Content(
                query,
                setQuery,
                load,
                headerBtns,
                dropDownSearch,
                textSearch
            )}
        >
            <div className={styles.ScrollHight}>
                {data.map((item: any) => (
                    <Company
                        data={item}
                        btns={getRowBtnArray(item, rowBtns)}
                        load={load}
                        key={item["id"]}
                    />
                ))}
            </div>
        </PageHeaderWrapper>
    )
};

export default list;