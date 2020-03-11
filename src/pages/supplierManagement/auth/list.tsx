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
import { getRowBtnArray, colDisplay } from '@/utils/utils';

import styles from './list.less';
import { Col, Button,Row } from 'antd';

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

    const colorfun = (item: any) => {
        let Color = {}
        switch (item.state) {
            case '0':
                Color = { color: '#D40000' }
                break;
            case '1':
                Color = { color: '#00A36A' }
                break;
            default:
                Color = { color: '#333' }
        }
        return Color;
    }

    return (
        <React.Fragment>
            <Col className={styles.Supplier}>
                <Col className={styles.top}>
                    <Col span={2} className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                        <img src={defaultPng} className={styles.img} alt="图标" />
                    </Col>
                    <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                        <Col span={20} className={styles.RTop}>
                            <span className={[styles.name, 'text-overflow'].join(' ')}>{data.name}</span>
                        </Col>
                        <Col span={17} className={styles.RCenter}>
                            <Col span={10} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>创建人员：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.creator_id, 'Employee', data)}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>创建日期：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {data.create_at}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>最近变动：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.last_update}</span>
                                </div>
                            </Col>
                            <Col span={10} className={styles.RCenterL}>
                                <div className={styles.address}>
                                    <span className={styles.lable}>权限备注：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.scope}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>角色成员：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.supp_num}人</span>
                                </div>
                                <div className={[styles.text, 'text-overflow'].join(' ')}>
                                    <span className={styles.lable}>配置范围：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.is_all_sale === "1" ? '全部商家' : data.sup_str}</span>
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
                                    <div style={colorfun(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.state, 'State', data)}
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