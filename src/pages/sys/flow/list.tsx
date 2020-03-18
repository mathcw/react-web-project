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
import { getRowBtnArray } from '@/utils/utils';
import { getEnum } from '@/utils/enum';

import styles from './list.less';
import { Col, Button, Row } from 'antd';

const defaultPng = require('@/assets/role.png');

interface IAuthItem {
    name: string;
    creator_id: string;
    create_at: string;
    last_update: string;
    scope: string;
    supp_num: string;
    is_all_sale: string;
    sup_str: string;
    [key: string]: any;
}

interface IAuthProps {
    data: IAuthItem;
    btns: IModBtn[];
    load: () => void
}

const Auth: React.FC<IAuthProps> = ({ data, btns, load }) => {
    return (
        <React.Fragment>
                <Row className={styles.container}>
                    <Col span={3} className={styles.left}>
                        <div className={styles.headerIcon}>
                            <img src={defaultPng} alt="icon" className={styles.img} />
                        </div>
                    </Col>
                    <Col span={17} className={styles.middle}>
                        <Col span={24} className={styles.top}>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>{data['name']}</span>
                        </Col>
                        <Row>
                            <Col xl={8} lg={8} md={24} sm={24} xs={24} className={styles.centerL}>
                                <div>
                                    <span className={styles.lable}>适用公司：</span>{' '}&nbsp;&nbsp;&nbsp;
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.branch_company_name}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>启停状态：</span>{' '}&nbsp;&nbsp;&nbsp;
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{getEnum('State')[data.state]}</span>
                                </div>
                            </Col>
                            <Col xl={12} lg={12} md={24} sm={24} xs={24} className={styles.centerL}>
                                <div>
                                    <span className={styles.lable}>审批步骤：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.flow_step}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} className={styles.Approval}>
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
                </Row>
        </React.Fragment>
    )
}

const list: React.FC<IModPageProps> = ({ route }) => {
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
    } = useListPage(viewConfig);

    useEffect(() => {
        load();
    }, [pageSize, current]);

    const pageNumChange = (page: number) => {
        setCurrent(page);
    };

    const pageSizeChange = (_Current: number, size: number) => {
        setPageSize(size);
    };

    const actionMap = {

    };

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
            {data.map((item: any) => (
                <Auth
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