import React from 'react';
import { Col, Modal, Tag, Button } from 'antd';

import styles from './index.less';
import { colDisplay, colorfun } from '@/utils/utils';
import { get } from '@/utils/req';
import { IModBtn } from '@/viewconfig/ModConfig';
import FlowSteps from '@/components/FlowStep';

const defaultPng = require('@/assets/login-bg.png');

const IconPng = require('@/assets/plan.png');

function renderImg(list_pic: string, id: string) {
    return (
        <div className={styles.imgWrapper}>
            <img
                src={list_pic || defaultPng}
                className={styles.img}
                alt="产品图片"
            />
            <span className={[styles.imgText, 'text-overflow'].join(' ')}>{`产品编号P0${id}`}</span>
        </div>
    );
}

interface GroupTourProps {
    data: {
        list_pic: string,
        id: string,
        flow: string,
        [key: string]: any
    },
    btns?:IModBtn[],
    load?:()=>void,
}

const GroupTour: React.FC<GroupTourProps> = ({ data,btns=[],load }) => {

    const showFlowInfo = (data: GroupTourProps['data']) => {
        get('/comm/FlowList/seeDetail', { flow_id: data.flow_id }).then((r) => {
            if(r.data){
                Modal.info({
                    title: '审批记录',
                    content: (
                        <FlowSteps direction="vertical" size="small" current={1} data={r.data} />
                    ),
                    onOk() { },
                    okText: '关闭',
                });
            }
        });
    }

    return (
        <React.Fragment>
            <Col className={styles.GroupTour}>
                <Col
                    className={styles.top}
                >
                    <Col className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                        {
                            renderImg(data.list_pic, data.id)
                        }
                    </Col>
                    <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                        <Col span={20} className={styles.RTop}>
                            <Tag color="blue">团队游</Tag>
                            <a className={[styles.name, 'text-overflow'].join(' ')} onClick={() => {}} >
                                {data.pd_name}
                            </a>
                        </Col>
                        <Col span={18} className={styles.RCenter}>
                            <Col span={8} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>商家品牌：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.brand}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>发布人员：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.name}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>手机号码：</span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.mobile}</span>
                                </div>
                            </Col>
                            <Col span={8} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>出发城市： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.dep_city_id, 'City', data)}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>一级导航： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.primary_nav, 'PrimaryNav', data)}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.lable}>二级导航： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.secondary_nav, 'SecondaryNav', data)}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8} className={styles.RCenterL}>
                                <div>
                                    <span className={styles.lable}>在售团期： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.saleing_group_number}</span>
                                </div>
                                <div>
                                    <span className={styles.lable}>过期团期： </span>{' '}
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.timeout_group_number}</span>
                                </div>
                            </Col>
                        </Col>
                        <Col span={6} className={styles.Approval}>
                            <Col span={24} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                <span className={styles.lable}>审核状态</span>
                                <div
                                    className={[styles.text, 'text-overflow'].join(' ')}
                                    style={colorfun(data)}
                                >
                                    {colDisplay(data.flow, 'Flow', data)}
                                </div>
                                <Col
                                    className={styles.plan}
                                    onClick={() => showFlowInfo(data)}
                                >
                                    {
                                        data.flow_id && data.flow_id != 0 &&
                                        <img
                                            src={IconPng}
                                            className={[styles.text1].join(' ')}
                                        />
                                    }
                                    <div className={styles.query}>进度查询</div>
                                </Col>
                            </Col>
                        </Col>
                        <Col className={styles.btns}>
                            <Col
                                className={btns ? '' : 'hide'}
                            >
                                <div>
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
                                </div>
                            </Col>
                        </Col>
                        <Col className={styles.RBtm} span={18}>
                            <Col span={20} className={styles.RBtmL}>
                                {
                                    data.theme_arr.map((tag:string, index:number) => (
                                        index < 3 &&
                                        <div key={`${tag}\${index}`}>
                                            {colDisplay(tag,'PdTheme',{})}
                                        </div>
                                    ))
                                }
                                {data.theme_arr.length < 4 &&
                                    data.zj_theme_arr.slice(0, 3 - (data.theme_arr.length)).map((tag:string, index:number) => (
                                        index < 3 &&
                                        <div key={`${tag}\${index}`}>
                                            {tag}
                                        </div>
                                    ))
                                }
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Col>
        </React.Fragment>
    )
}

export default GroupTour;






