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
import { Col, Button } from 'antd';

const defaultPng = require('@/assets/login-bg.png');

function renderImg(photo?: string) {
    return (
        <div className={styles.imgWrapper}>
            <img src={photo || defaultPng} className={styles.img} alt="头像" />
        </div>
    );
}

interface ICompanyItem {
    photo?: string;
    full_name: string;
    brand: string;
    supp_type: string;
    city_id: string;
    account_id: string;
    retailer_id: string;
    creator: string;
    create_at: string;
    flow: string;
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
        switch (item.ruku_state) {
            case '1':
                flowColor = { color: '#00A36A' }
                break;
            case '2':
                flowColor = { color: '#333' }
                break;
            case '3':
                flowColor = { color: '#F1830D' }
                break;
            default:
                flowColor = { color: '#333' }
        }
        return flowColor;
    }
    return (
        <Col className={styles.container}>
            <Col span={4} className={styles.left}>
                <Col className={styles.img}>
                    {
                        renderImg(data.photo)
                    }
                </Col>
            </Col>
            <Col span={16} className={styles.middle}>
                <Col span={24} className={styles.top}>
                    <span className={styles.lable}>{data.full_name}</span> ——
            <span className={styles.lable}>{data.brand}</span>
                </Col>
                <Col span={10} className={styles.centerL}>
                    <div>
                        <span className={styles.lable}>商家类型：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.supp_type, 'SuppKind', data)}
                        </span>
                    </div>
                    <div>
                        <span className={styles.lable}>所在城市：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.city_id, 'City', data)}
                        </span>
                    </div>
                    <div>
                        <span className={styles.lable}>处&nbsp;&nbsp;理&nbsp;&nbsp;人：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.account_id, 'EmpAccount', data)}
                        </span>
                    </div>

                </Col>
                <Col span={13} className={styles.centerR}>
                    <div>
                        <span className={styles.lable}>提报用户：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.retailer_id, 'Retailer', data)}
                        </span>
                    </div>
                    <div>
                        <span className={styles.lable}>提报人员：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.creator}</span>
                    </div>
                    <div>
                        <span className={styles.lable}>提报时间：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.create_at} </span>
                    </div>
                </Col>
            </Col>
            <Col span={4} className={styles.right}>
                <div className={styles.rightL}>
                    <div className={styles.head}>
                        <span className={styles.lable}>处理状态</span>
                    </div>
                    <div className={styles.state}>
                        <span style={colorfuntwo(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.ruku_state, 'RkState', data)}
                        </span>
                    </div>
                </div>
                <div className={styles.rightR}>
                    <div className={styles.head}>
                        <span className={styles.lable}>吸纳审批</span>
                    </div>
                    <div className={styles.state}>
                        <span style={colorfun(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.flow, 'Flow', data)}
                        </span>
                    </div>
                </div>
            </Col>
            <Col className={styles.btn}>
                <div className={styles.button}>
                    {btns.map(btn => (
                        <Button
                            className={styles.approval}
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
                </div>
            </Col>
        </Col>
    )
}


const list: React.FC<IModPageProps> = ({ route }) => {
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
    } = useListPage(authority);

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

    const { headerBtns, rowBtns } = useListPageBtn(authority, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(authority);

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
            {data.map((item: any) => (
                <Company
                    data={item}
                    btns={getRowBtnArray(item, rowBtns)}
                    load={load}
                    key={item["id"]}
                />
            ))}
        </PageHeaderWrapper>
    )
};

export default list;