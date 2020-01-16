import React, { useState, useEffect } from 'react';
import { Col, Icon, Tag, Button } from 'antd';

import styles from './index.less';
import { colDisplay } from '@/utils/utils';
import { get } from '@/utils/req';
import { IModBtn } from '@/viewconfig/ModConfig';

const defaultPng = require('@/assets/login-bg.png');

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

    useEffect(()=>{
        if(detail){
            setMore(true);
        }
    },[detail])

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
            <Col className={styles.children}>
                <Col className={[styles.childrenMod, 'clear'].join(' ')}>
                    <Col className={styles.ModTitle}>基础信息</Col>
                    <Col className={styles.ModContent}>
                        <Col className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>客户简称： {detail.retailer_name}</Col>
                            <Col span={7}>订单编号： D0{detail.retailer_order_id}</Col>
                            <Col span={9}>报名人： {detail.retailer_name}-{detail.creator.split('-')[2]}-{detail.creator.split('-')[3]}</Col>
                        </Col>
                        <Col className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>产品编号： P0{detail.pd_id}</Col>
                            <Col span={7}>
                                订单人数： <span className={styles.button}>{detail.num_of_people}人</span>
                            </Col>
                            <Col span={9}>确认人： {`${detail.supplier_brand}-${detail.name}-${detail.mobile}`}</Col>
                        </Col>
                        <Col className={[styles.ModCell, 'clear'].join(' ')}>
                            <Col span={6}>团&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号： {detail.gp_num}</Col>
                            <Col span={7}>订单状态：
                                    {colDisplay(detail.state, 'OrderState', detail)}
                            </Col>
                            <Col span={9}>接单人： {detail.retailer_name}-{detail.assitant.split('-')[2]}-{detail.assitant.split('-')[3]}</Col>
                        </Col>
                    </Col>
                </Col>
            </Col>
        );
    }

    return (
        <>
            <Col className={styles.OrderList}>
                <Col className={styles.item}>
                    <Col className={styles.list}>
                        <Col className={styles.content}>
                            <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
                                {
                                    renderImg(data.list_pic, data.id)
                                }
                            </Col>

                            <Col xs={24} sm={24} md={15} lg={15}>
                                <Col className={styles.top} style={{ paddingLeft: '14px' }} xs={24} sm={24} md={24} lg={24}>
                                    <Tag color="blue">团队游</Tag>
                                    <Col className={[styles.title, 'text-overflow'].join(' ')}>
                                        {data.pd_name}
                                    </Col>
                                </Col>
                                <Col className={styles.center} style={{ paddingLeft: '14px' }} xs={24} sm={24} md={24} lg={24}>
                                    <Col className={styles.cloumn} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>客户简称： </span>
                                            <span>{data.retailer_name}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>订&nbsp;&nbsp;单&nbsp;号： </span>
                                            <span>D0{data.retailer_order_id}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>订单人数： </span>
                                            <span>{data.num_of_people}人</span>
                                        </Col>
                                    </Col>

                                    <Col className={styles.cloumn} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Col className={styles.row}>
                                            <div className={styles.obj}>
                                                <span className={styles.key}>出团日期：</span>
                                                <span className={styles.val}>{data.dep_date}</span>
                                            </div>
                                        </Col>
                                        <Col className={styles.row}>
                                            <div className={styles.obj}>
                                                <span className={styles.key}>回团日期：</span>
                                                <span className={styles.val}>{data.back_date}</span>
                                            </div>
                                        </Col>
                                        <Col className={styles.row}>
                                            <div className={styles.obj}>
                                                <span className={styles.key}>出发城市：</span>
                                                <span className={styles.val}>
                                                    {colDisplay(data.dep_city_id, 'City', data)}
                                                </span>
                                            </div>
                                        </Col>
                                    </Col>

                                    <Col className={styles.cloumn} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>报名人： </span>
                                            <span>{data.creator.split('-')[2]}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>确认人： </span>
                                            <span>{`${data.name}`}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>接单人： </span>
                                            <span>{data.assitant.split('-')[2]}</span>
                                        </Col>
                                    </Col>
                                </Col>

                                <Col className={styles.bottom} style={{ paddingLeft: '14px' }}
                                    xs={24} sm={24} md={24} lg={24}
                                    onClick={() => { loadMore() }}
                                >
                                    <span style={more ? {} : { marginRight: '5px' }}>{more ? "收起详情" : "展开详情"}</span>
                                    <Icon type="double-left" className={more ? styles.close : styles.open} style={{ padding: '0px' }} />
                                </Col>

                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} className={styles.rightcontent}>
                                <Col className={styles.time} xs={24} sm={24} md={12} lg={12}>
                                    <span className={styles.lable1}>留位时限</span>
                                    <br />
                                    <div className={[styles.text1, 'text-overflow'].join(' ')}>
                                        {data.timer_end_date}
                                    </div>
                                </Col>
                                <Col className={styles.state} xs={24} sm={24} md={12} lg={12}>
                                    <span className={styles.lable1}>订单状态</span>
                                    <br />
                                    <div style={orderStateFun(data)} className={[styles.text1, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.state, 'OrderState', data)}
                                    </div>
                                </Col>
                            </Col>
                        </Col>
                        <Col className={btns ? styles.btns : 'hide'}>
                            <div>
                                {btns.map(btn => (
                                    <Button
                                        className={styles.button}
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
                    {
                        more && renderMore()
                    }
                </Col>
            </Col>
        </>
    )
}

export default GroupTour;






