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

    return (
        <Col className={styles.container}>
            <Col span={4} className={styles.left}>
                <Col className={styles.img}>
                    {
                        renderImg(data.stamp)
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
                <Col span={13} className={styles.centerR}>
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
            <Col span={4} className={styles.right}>
                {data.type === '1' &&
                    <div className={styles.rightR}>
                        <div className={styles.head}>
                            <span className={styles.lable}>自建审批</span>
                        </div>
                        <div className={styles.state}>
                            <span style={colorfun(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                                {colDisplay(data.flow, 'Flow', data)}
                            </span>
                        </div>
                    </div>
                }
                {data.type === '0' &&
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
                }
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