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

interface IPhotoItem {
    photo?: string;
    company_name: string;
    department_name: string;
    name: string;
    mobile: string;
    flow:string;
    [key: string]: any;
}

interface IPhotoProps {
    data: IPhotoItem;
    btns: IModBtn[];
    load: () => void
}


const Photo: React.FC<IPhotoProps> = ({ data, btns, load }) => {
    return (
        <Col className={styles.container}>
            <Col span={4} className={styles.left}>
                <Col className={styles.img}>
                    {renderImg(data.photo)}
                </Col>
            </Col>
            <Col span={12} className={styles.middle}>
                <Col span={24} className={styles.top}>
                    <span className={styles.lable}>{data.company_name}</span>{' —— '}
                    <span className={styles.lable}>{data.department_name}</span>
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
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.department_name}</span>
                    </div>
                </Col>
            </Col>
            <Col span={8} className={styles.right}>
                <div className={styles.rightR}>
                    <div className={styles.head}>
                        <span className={styles.lable}>头像审批</span>
                    </div>
                    <div className={styles.state}>
                        <span className={[styles.text, 'text-overflow'].join(' ')} style={colorfun(data)}>
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
                <Photo
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