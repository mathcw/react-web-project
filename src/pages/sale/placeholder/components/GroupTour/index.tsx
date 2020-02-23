import React, { useState, useEffect } from 'react';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Col, Tag, Button, Row } from 'antd';

import styles from './index.less';
import { colDisplay } from '@/utils/utils';
import { get } from '@/utils/req';
import { IModBtn } from '@/viewconfig/ModConfig';

const defaultPng = require('@/assets/login-bg.png');

function renderImg(list_pic: string, id: string) {
    return (
        <>
            <img
                src={list_pic || defaultPng}
                className={styles.img}
                alt="产品图片"
            />
            <span className={[styles.imgText, 'text-overflow'].join(' ')}>{`产品编号P0${id}`}</span>
        </>
    );
}

interface GroupTourProps {
    data: {
        id: string;
        state: string,
        [key: string]: any
    },
    btns?: IModBtn[],
    load?: () => void,
}

const GroupTour: React.FC<GroupTourProps> = ({ data, btns = [], load }) => {
    const [more, setMore] = useState(false);
    const [detail, setDetail] = useState<any>(null);

    const orderStateFun = (item: { state: string | number; }) => {
        let Color = {}
        switch (item.state) {
            case '1':
                Color = { color: 'red' }
                break;
            case '2':
                Color = { color: '#FFCC00' }
                break;
            case '4':
                Color = { color: 'green' }
                break;
            case '8':
                Color = { color: '#FFCC00' }
                break;
            case '9':
                Color = { color: 'green' }
                break;
            case '10':
                Color = { color: 'red' }
                break;
            default:
                Color = { color: '#333' }
        }
        return Color;
    }

    useEffect(() => {
        if (detail) {
            setMore(true);
        }
    }, [detail])

    const loadMore = () => {
        if (!more) {
            get('/Sale/Order/read_detail_for_zw', { 'id': data.id }).then(r => {
                if (r.data) {
                    setDetail(r.data);
                }
            })
        } else {
            setMore(false);
        }
    }

    const renderMore = () => {
        return (
            <div className={styles.children}>
                <div className={[styles.childrenMod, 'clear'].join(' ')}>
                    <div className={styles.ModTitle}>基础信息</div>
                    <div className={styles.ModContent}>
                        <Row className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>客户简称： {detail.retailer_name}</Col>
                            <Col span={7}>订单编号： D0{detail.retailer_order_id}</Col>
                            <Col span={9}>报名人： {detail.retailer_name}-{detail.creator.split('-')[2]}-{detail.creator.split('-')[3]}</Col>
                        </Row>
                        <Row className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>产品编号： P0{detail.pd_id}</Col>
                            <Col span={7}>
                                订单人数： <span className={styles.button}>{detail.num_of_people}人</span>
                            </Col>
                            <Col span={9}>确认人： {`${detail.supplier_brand}-${detail.name}-${detail.mobile}`}</Col>
                        </Row>
                        <Row className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>团&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号： {detail.gp_num}</Col>
                            <Col span={7}>订单状态：
                                    {colDisplay(detail.state, 'OrderState', detail)}
                            </Col>
                            <Col span={9}>接单人： {detail.retailer_name}-{detail.assitant.split('-')[2]}-{detail.assitant.split('-')[3]}</Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    return <div className={styles.OrderList}>
        <Row className={styles.item}>
            <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
                {
                    renderImg(data.list_pic, data.id)
                }
            </Col>
            <Col xs={24} sm={24} md={15} lg={15}>
                <div className={styles.content}>
                    <Col span={24} className={styles.contentTop}>
                        <Tag color="blue">团队游</Tag>
                        <span className={styles.name}>
                            {data.pd_name}
                        </span>
                    </Col>
                    <Col span={24} className={styles.contentCenter}>
                        <Col span={8}>
                            <div className={styles.cell}>
                                <span className={styles.lable}>客户简称： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.retailer_name}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>订&nbsp;&nbsp;单&nbsp;号： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>D0{data.retailer_order_id}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>订单人数： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.num_of_people}人</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.cell}>
                                <span className={styles.lable}>出团日期：</span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.dep_date}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>回团日期：</span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>D0{data.back_date}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>出发城市： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(data.dep_city_id, 'City', data)}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.cell}>
                                <span className={styles.lable}>报名人： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.creator.split('-')[2]}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>确认人： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{`${data.name}`}</span>
                            </div>
                            <div className={styles.cell}>
                                <span className={styles.lable}>接单人： </span>
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.assitant.split('-')[2]}</span>
                            </div>
                        </Col>
                    </Col>
                    <Col span={24} className={styles.contentBottom} onClick={() => { loadMore() }}>
                        <span style={more ? {} : { marginRight: '5px' }}>{more ? "收起详情" : "展开详情"}</span>
                        <DoubleLeftOutlined className={more ? styles.close : styles.open} style={{ padding: '0px' }} />
                    </Col>
                </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
                <Row>
                    <Col span={16}>
                        <div className={styles.right}>
                            <span className={styles.rightlable}>留位时限</span>
                            <div className={[styles.righttext, 'text-overflow'].join(' ')}>
                                {data.timer_end_date}
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.right}>
                            <span className={styles.rightlable}>订单状态</span>
                            <div style={orderStateFun(data)} className={[styles.righttext, 'text-overflow'].join(' ')}>
                                {colDisplay(data.state, 'OrderState', data)}
                            </div>
                        </div>
                    </Col>
                </Row>
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
        </Row>
        {
            more && renderMore()
        }
    </div>
}

export default GroupTour;






