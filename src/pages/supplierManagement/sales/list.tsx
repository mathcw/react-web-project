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
import { Col, Button } from 'antd';

const defaultPng = require('@/assets/login-bg.png');

function renderImg(photo?: string) {
    return (
        <div className={styles.imgWrapper}>
            <img src={photo || defaultPng} className={styles.img} alt="头像" />
        </div>
    );
}

interface ISalerItem {
    photo?:string;
    supplier_full_name:string;
    brand:string;
    name:string;
    gender:string;
    mobile:string;
    supplier_department_name:string;
    auth_id:string;
    online:string;
    [key: string]: any;
}

interface ISalerProps {
    data: ISalerItem;
    btns: IModBtn[];
    load: () => void
}


const Saler: React.FC<ISalerProps> = ({ data, btns, load }) => {
    const stateColor = (item: any) => {
        let Color = {}
        switch (item.state) {
            case '0':
                Color = { color: 'red' }
                break;
              case '1':
                Color = { color: '#00A36A' }
                break;
            default:
                Color = { color: '#333' }
        }
        return Color;
    }
    const onlineColor = (item: any) => {
        let Color = {}
        switch (item.online) {
            case '0':
                Color = { color: '#F1830D' }
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
        <Col className={styles.container}>
            <Col span={4} className={styles.left}>
                <Col className={styles.img}>
                    {
                        renderImg(data.ptoto)
                    }
                </Col>
            </Col>
            <Col span={12} className={styles.middle}>
                <Col span={24} className={styles.top}>
                    <span className={styles.lable}>{data.supplier_full_name}</span>{' —— '}
                    <span className={styles.lable}>{data.brand}</span>
                </Col>
                <Col span={10} className={styles.centerL}>
                    <div>
                        <span className={styles.lable}>姓名：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.name}</span>
                    </div>
                    <div>
                        <span className={styles.lable}>性别：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(data.gender, 'Gender', data)}</span>
                    </div>
                    <div>
                        <span className={styles.lable}>手机：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.mobile}</span>
                    </div>

                </Col>
                <Col span={13} className={styles.centerR}>
                    <div>
                        <span className={styles.lable}>所属部门：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.supplier_department_name}</span>
                    </div>
                    <div>
                        <span className={styles.lable}>账号权限：  </span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.auth_id, 'SuppAuth', data)}
                        </span>
                    </div>
                </Col>
            </Col>
            <Col span={8} className={styles.right}>
                <div className={styles.rightL}>
                    <div className={styles.head}>
                        <span className={styles.lable}>线上接单</span>
                    </div>
                    <div className={styles.state}>
                        <span style={onlineColor(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.online, 'YesNo', data)}
                        </span>
                    </div>
                </div>
                <div className={styles.rightR}>
                    <div className={styles.head}>
                        <span className={styles.lable}>账号状态</span>
                    </div>
                    <div className={styles.state}>
                        <span style={stateColor(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                            {colDisplay(data.state, 'State', data)}
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
                <Saler
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