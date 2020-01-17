import React, { useState, useEffect } from 'react';
import { Col, Icon, Tag, Button, Modal } from 'antd';

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

interface GroupTourDetail {
    detail: any,
}

const Detail: React.FC<GroupTourDetail> = ({ detail }) => {
    const [isShow, setShow] = useState(true);
    const lookOver = () => {
        Modal.info({
            title: '旅客名单',
            width: 520,
            className: 'modal-confirm-body',
            icon: <></>,
            content: (
                <Col className={styles.tourist}>
                    <Col span={24} className={styles.tableBorder}>
                        <Col span={4} className={styles.tableTitle}>
                            <span className={styles.key}>姓名 </span>
                        </Col>
                        <Col span={3} className={styles.tableTitle}>
                            <span className={styles.key}>性别 </span>
                        </Col>
                        <Col span={6} className={styles.tableTitle}>
                            <span className={styles.key}>出生日期 </span>
                        </Col>
                        <Col span={5} className={styles.tableTitle}>
                            <span className={styles.key}>证件类型 </span>
                        </Col>
                        <Col span={6} className={styles.tableTitle}>
                            <span className={styles.key}>证件号码 </span>
                        </Col>
                    </Col>
                    <div className={styles.tableDiv}>
                        {detail['订单名单'] && detail['订单名单'].map((val: any, mdkey: number) => (
                            <Col span={24} className={styles.tableBorder} key={'名单'+mdkey}>
                                <Col span={4} className={styles.tableBody}>
                                    <span className={styles.key}>{val.name} </span>
                                </Col>
                                <Col span={3} className={styles.tableBody}>
                                    <span className={styles.key}>{val.gender} </span>
                                </Col>
                                <Col span={6} className={styles.tableBody}>
                                    <span className={styles.key}>{val.birthday} </span>
                                </Col>
                                <Col span={5} className={styles.tableBody}>
                                    <span className={styles.key}>{val.certificate_type} </span>
                                </Col>
                                <Col span={6} className={styles.tableBody}>
                                    <span className={styles.key}>{val.certificate_num} </span>
                                </Col>
                            </Col>
                        ))}
                    </div>
                </Col>
            ),
            onOk() { },
            okText: '关闭',
        });
    }

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
                        <Col span={7} onClick={() => lookOver()}>
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

            <Col className={[styles.childrenMod, 'clear'].join(' ')}>
                <Col className={styles.ModTitle}>应转明细</Col>
                <Col className={styles.ModContent}>
                    <Col className={[styles.ModCell, 'clear'].join(' ')}>
                        <Col span={6}>转入对象： {detail.assitant}</Col>
                        <Col span={6}>应转金额： {detail.settle_amount}</Col>
                        <Col span={6}>已转金额： {detail.settled_amount}</Col>
                        <Col span={6}>未转金额： {detail.settle_amount - detail.settled_amount}</Col>
                        <span className={styles.detail} onClick={() => setShow(!isShow)}> {isShow ? '收起' : '详情'}</span>
                    </Col>
                    <Col className={styles.childrenother} style={isShow ? { display: 'block' } : { display: 'none' }}>
                        <Col className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={6} className="text-center">
                                价格类型
                            </Col>
                            <Col span={6} className="text-center">
                                同行价
                            </Col>
                            <Col span={6} className="text-center">
                                数量
                            </Col>
                            <Col span={6} className="text-center">
                                小计
                            </Col>
                        </Col>
                        {
                            detail['订单应转'] && detail['订单应转'].map((snap: any,yzIndex:number) => (
                                <Col className={[styles.cCell, 'clear'].join(' ')} key={'应转'+yzIndex}>
                                    <Col span={6} className="text-center">{snap.price_comment}</Col>
                                    <Col span={6} className="text-center">{snap.peer_price}</Col>
                                    <Col span={6} className="text-center">{snap.number}</Col>
                                    <Col span={6} className="text-center">{snap.total}</Col>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>
            </Col>


            <Col className={[styles.childrenMod, 'clear'].join(' ')}>
                <Col className={styles.ModTitle}>订单备注</Col>
                <Col className={styles.ModContent}>
                    <Col className={styles.childrenother}>
                        <Col className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={4} className="text-center">备注人</Col>
                            <Col span={6} className="text-center">备注时间</Col>
                            <Col span={14} className="text-center">备注内容</Col>
                        </Col>
                        {
                            detail['订单备注'] && detail['订单备注'].map((val: any,cIndex:number) => (
                                <Col className={[styles.cCell, 'clear'].join(' ')} key={'备注'+cIndex}>
                                    <Col span={4} className="text-center">{val.creator.split('-')[2]}</Col>
                                    <Col span={6} className="text-center">{val.create_at}</Col>
                                    <Col span={14} className="text-center">{val.comment}</Col>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>
            </Col>

            <Col className={[styles.childrenMod, 'clear'].join(' ')}>
                <Col className={styles.ModTitle}>变更审批</Col>
                <Col className={styles.ModContent}>
                    <Col className={styles.childrenother}>
                        <Col className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={4} className="text-center">操作人</Col>
                            <Col span={4} className="text-center">动作</Col>
                            <Col span={6} className="text-center">操作时间</Col>
                            <Col span={10} className="text-center">审批备注</Col>
                        </Col>
                        {
                            detail['订单审批日志'] && detail['订单审批日志'].map((item: any,flowIndex:number) => (
                                <Col className={[styles.cCell, 'clear'].join(' ')} key={'日志'+flowIndex}>
                                    <Col span={4} className="text-center">{item.flower.split('-').filter((e: any, i: number) => i != 1).join('-')}</Col>
                                    <Col span={4} className="text-center">
                                        {
                                            colDisplay(item.opinion, 'Opinion', item)
                                        }
                                    </Col>
                                    <Col span={6} className="text-center">{item.create_at}</Col>
                                    <Col span={10} className="text-center">{item.comment}</Col>
                                </Col>
                            ))
                        }
                    </Col>
                </Col>
            </Col>
        </Col>
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

    const showFlowInfo = (data: GroupTourProps['data']) => {
        get('/comm/Flow/seeDetail', { flow_id: data.order_change_flow_id }).then((r) => {
            if (r.data) {
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

    const loadMore = () => {
        if (!more) {
            get('/Sale/Order/read_detail_for_bg', { 'id': data.id }).then(r => {
                if (r.data) {
                    setDetail(r.data);
                }
            })
        } else {
            setMore(false);
        }
    }

    const renderMore = () => <Detail detail={detail} />

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
                                    <Col className={styles.cloumn} xs={24} sm={24} md={6} lg={6} xl={6}>
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

                                    <Col className={styles.cloumn} xs={24} sm={24} md={6} lg={6} xl={6}>
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

                                    <Col className={styles.cloumn} xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>应内转： </span>
                                            <span>{data.settle_amount}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>已内转： </span>
                                            <span>{`${data.settled_amount}`}</span>
                                        </Col>
                                        <Col className={styles.row}>
                                            <span className={styles.key}>未内转： </span>
                                            <span>{data.settle_diff}</span>
                                        </Col>
                                    </Col>

                                    <Col className={styles.cloumn} xs={24} sm={24} md={6} lg={6} xl={6}>
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
                                <Col xs={24} sm={24} md={12} lg={12}>
                                    <span className={styles.lable1}>订单状态</span>
                                    <br />
                                    <div style={orderStateFun(data)} className={[styles.text1, 'text-overflow'].join(' ')}>
                                        {colDisplay(data.state, 'OrderState', data)}
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} className={styles.changeState}>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <span className={styles.lable1}>变更状态</span>
                                        <br />
                                        <div style={colorfun({ flow: data.order_change_flow })} className={[styles.text1, 'text-overflow'].join(' ')}>
                                            {colDisplay(data.order_change_flow, 'Flow', data)}
                                        </div>
                                    </Col>
                                    <Col className={styles.plan} onClick={() => showFlowInfo(data)}>
                                        <img
                                            src={IconPng}
                                            className={styles.text2}
                                        />
                                        <div className={styles.query}>进度查询</div>
                                    </Col>
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






