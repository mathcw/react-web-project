import React, { useEffect } from "react";
import PageHeaderWrapper, {
    Extra,
    Content
} from "@/components/PageHeaderWrapper";

import { IModPageProps, IModBtn } from "@/viewconfig/ModConfig";
import {
    useListPage,
    useListPageBtn,
    useListPageSearch
} from "@/utils/ListPageHooks";

import styles from "./list.less";
import { Col, Button, Row } from "antd";
import { getRowBtnArray,colorfun, colDisplay } from "@/utils/utils";

const IconPng = require('@/assets/Notification.png');

interface IAnnouncement {
    title: string;
    id: string;
    company_name: string;
    department_name: string;
    employee_name: string;
    submit_at?:string;
    publish_at?:string;
    publish_state:string;
    flow:string;
    [key: string]: any;
}

interface IAnnouncementProps {
    data: IAnnouncement;
    btns: IModBtn[];
    load: ()=>void
}

const Announcement:React.FC<IAnnouncementProps> = ({data,btns,load}) =>{
    return (
        <React.Fragment>
            <Col className={styles.Org}>
                <Col className={styles.top}>
                    <Col className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                        <img src={IconPng} alt="icon" className={styles.img} />    
                        <div className={styles.text}>公告通知</div>
                    </Col>
                    <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                        <Col span={20} className={styles.RTop}>
                            <span className={[styles.name, 'text-overflow'].join(' ')} title={data.title}>{data.title}</span>
                        </Col>
                        <Col span={17} className={styles.RCenter}>
                            <Col span={10} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>提交部门：  </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.company_name} </span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.department_name} </span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.employee_name}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>提交时间：  </span>{' '}
                                    {
                                        data.submit_at && <>
                                              <span className={[styles.text, 'text-overflow'].join(' ')}>{data.submit_at.split(' ')[0]} </span>
                                              <span className={[styles.text, 'text-overflow'].join(' ')}>{data.submit_at.split(' ')[1]}</span>
                                          </>
                                    }
                                </div>
                                <div>
                                    <span className={styles.lable}>发布时间：  </span>{' '}
                                    {
                                        data.publish_at && <>
                                          <span className={[styles.text, 'text-overflow'].join(' ')}>{data.publish_at.split(' ')[0]} </span>
                                          <span className={[styles.text, 'text-overflow'].join(' ')}>{data.publish_at.split(' ')[1]}</span>
                                        </>
                                    }
                                </div>
                            </Col>
                        </Col>
                        <Col span={5} className={styles.Approval}>
                            <Row>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}>审核状态</span>
                                    <div className={[styles.text, 'text-overflow'].join(' ')}  style={colorfun(data)}>
                                        {colDisplay(data.flow, 'Flow', data)}
                                    </div>
                                </Col>
                                <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                    <span className={styles.lable}>发布状态</span>
                                    
                                    <div className={[styles.text, 'text-overflow'].join(' ')} style={colorfun(data)}>
                                        {
                                            colDisplay(data.publish_state,'PublishState',data)
                                        }
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

    const actionMap = {
    };

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);

    useEffect(() => {
        load();
    }, [pageSize, current]);

    const pageNumChange = (page: number) => {
        setCurrent(page);
    };

    const pageSizeChange = (_Current: number, size: number) => {
        setPageSize(size);
    };

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
                <Announcement
                    data={item}
                    btns={getRowBtnArray(item, rowBtns)}
                    load={load}
                    key={item["id"]}
                />
            ))}
        </PageHeaderWrapper>
    );
};

export default list;