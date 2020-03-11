import React, { useState, useEffect } from 'react';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Col, Tag, Button, Modal, Row } from 'antd';

import styles from './index.less';
import { colDisplay, colorfun } from '@/utils/utils';
import { get } from '@/utils/req';
import { IModBtn } from '@/viewconfig/ModConfig';
import FlowSteps from '@/components/FlowStep';

const defaultPng = require('@/assets/login-bg.png');
const IconPng = require('@/assets/plan.png');

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

interface GroupTourDetail {
    detail: any,
}

const Detail: React.FC<GroupTourDetail> = ({ detail }) => {
    const [isShow, setShow] = useState(true);
    const [isDzShow, setDzShow] = useState(true);
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
                            <Col span={24} className={styles.tableBorder} key={'名单' + mdkey}>
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
                        <Col span={7} onClick={() => lookOver()}>
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

            <div className={[styles.childrenMod, 'clear'].join(' ')}>
                <div className={styles.ModTitle}>应转明细</div>
                <div className={styles.ModContent}>
                    <Row className={[styles.ModCell, 'clear'].join(' ')}>
                        <Col span={6}>转入对象： {detail.assitant}</Col>
                        <Col span={6}>应转金额： {detail.settle_amount}</Col>
                        <Col span={6}>已转金额： {detail.settled_amount}</Col>
                        <Col span={6}>未转金额： {detail.settle_amount - detail.settled_amount}</Col>
                        <span className={styles.detail} onClick={() => setShow(!isShow)}> {isShow ? '收起' : '详情'}</span>
                    </Row>
                    <div className={styles.childrenother} style={isShow ? { display: 'block' } : { display: 'none' }}>
                        <Row className={[styles.cTitle, 'clear'].join(' ')}>
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
                        </Row>
                        {
                            detail['订单应转'] && detail['订单应转'].map((snap: any, yzIndex: number) => (
                                <Row className={[styles.cCell, 'clear'].join(' ')} key={'应转' + yzIndex}>
                                    <Col span={6} className="text-center">{snap.price_comment}</Col>
                                    <Col span={6} className="text-center">{snap.peer_price}</Col>
                                    <Col span={6} className="text-center">{snap.number}</Col>
                                    <Col span={6} className="text-center">{snap.total}</Col>
                                </Row>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={[styles.childrenMod, 'clear'].join(' ')}>
                <div className={styles.ModTitle}>对账明细</div>
                <div className={styles.ModContent}>
                    <Row className={[styles.ModCell, 'clear'].join(' ')}>
                        <Col span={6}>收款对象: {detail.retailer_name}</Col>
                        <Col span={6}>应收金额: {detail.payable}</Col>
                        <Col span={6}>已收金额: {detail.paid}</Col>
                        <Col span={6}>未收金额: {detail.pay_diff}</Col>
                        <span className={styles.detail} onClick={() => setDzShow(!isDzShow)}> {isDzShow ? '收起' : '详情'}</span>
                    </Row>
                    <div className={styles.childrenother} style={isShow ? { display: 'block' } : { display: 'none' }}>
                        <Row className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={8} className="text-center">
                                类型
                            </Col>
                            <Col span={8} className="text-center">
                                金额
                            </Col>
                            <Col span={8} className="text-center">
                                备注
                            </Col>
                        </Row>
                        {
                            detail['订单对账'] && detail['订单对账'].map((snap: any, dzIndex: number) => (
                                <Row className={[styles.cCell, 'clear'].join(' ')} key={'对账' + dzIndex}>
                                    <Col span={8} className="text-center">{snap.xy_name}</Col>
                                    <Col span={8} className="text-center">{snap.amount}</Col>
                                    <Col span={8} className="text-center">{snap.comment}</Col>
                                </Row>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className={[styles.childrenMod, 'clear'].join(' ')}>
                <div className={styles.ModTitle}>订单备注</div>
                <div className={styles.ModContent}>
                    <div className={styles.childrenother}>
                        <Row className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={4} className="text-center">备注人</Col>
                            <Col span={6} className="text-center">备注时间</Col>
                            <Col span={14} className="text-center">备注内容</Col>
                        </Row>
                        {
                            detail['订单备注'] && detail['订单备注'].map((val: any, cIndex: number) => (
                                <Row className={[styles.cCell, 'clear'].join(' ')} key={'备注' + cIndex}>
                                    <Col span={4} className="text-center">{val.creator.split('-')[2]}</Col>
                                    <Col span={6} className="text-center">{val.create_at}</Col>
                                    <Col span={14} className="text-center">{val.comment}</Col>
                                </Row>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={[styles.childrenMod, 'clear'].join(' ')}>
                <div className={styles.ModTitle}>对账审批</div>
                <div className={styles.ModContent}>
                    <div className={styles.childrenother}>
                        <Row className={[styles.cTitle, 'clear'].join(' ')}>
                            <Col span={4} className="text-center">操作人</Col>
                            <Col span={4} className="text-center">动作</Col>
                            <Col span={6} className="text-center">操作时间</Col>
                            <Col span={10} className="text-center">审批备注</Col>
                        </Row>
                        {
                            detail['订单审批日志'] && detail['订单审批日志'].map((item: any, flowIndex: number) => (
                                <Row className={[styles.cCell, 'clear'].join(' ')} key={'日志' + flowIndex}>
                                    <Col span={4} className="text-center">{item.flower.split('-').filter((e: any, i: number) => i != 1).join('-')}</Col>
                                    <Col span={4} className="text-center">
                                        {
                                            colDisplay(item.opinion, 'Opinion', item)
                                        }
                                    </Col>
                                    <Col span={6} className="text-center">{item.create_at}</Col>
                                    <Col span={10} className="text-center">{item.comment}</Col>
                                </Row>
                            ))
                        }
                    </div>
                </div>
            </div>
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

    useEffect(() => {
        if (detail) {
            setMore(true);
        }
    }, [detail])

    const showFlowInfo = (data: GroupTourProps['data']) => {
        get('/comm/FlowList/seeDetail', { flow_id: data.check_flow_id }).then((r) => {
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
            get('/Sale/Order/read_detail_for_dz', { 'id': data.id }).then(r => {
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
        <div className={styles.OrderList}>
            <Row className={styles.item}>
                <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
                    {
                        renderImg(data.list_pic, data.id)
                    }
                </Col>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <div className={styles.content}>
                        <Col span={24} className={styles.contentTop}>
                            <Tag color="blue">团队游</Tag>
                            <span className={styles.name}>
                                {data.pd_name}
                            </span>
                        </Col>
                        <Col span={24} className={styles.contentCenter}>
                            <Col span={5}>
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
                            <Col span={5}>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>出团日期：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.dep_date}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>回团日期：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.back_date}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>出发城市： </span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(data.dep_city_id, 'City', data)}</span>
                                </div>
                            </Col>
                            <Col span={5}>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>应内转：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.settle_amount}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>已内转：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.settled_amount}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>未内转： </span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.settle_diff}</span>
                                </div>
                            </Col>
                            <Col className={styles.cloumn} span={5}>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>应收款：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.payable}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>已收款：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.paid}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>未收款： </span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{(parseFloat(data.payable) - parseFloat(data.paid)).toFixed(2)}</span>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>报名人：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.creator.split('-')[2]}</span>
                                </div>
                                <div className={styles.cell}>
                                    <span className={styles.lable}>确认人：</span>
                                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.name}</span>
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
                <Col xs={24} sm={24} md={3} lg={3} className={styles.Approval}>
                    <Row>
                        <Col span={24} className={styles.infoCell} style={{ textAlign: 'center' }}>
                            <span className={styles.lable}>对账审批</span>
                            <div style={colorfun({ flow: data.check_flow })} className={[styles.text, 'text-overflow'].join(' ')}>
                                {colDisplay(data.check_flow, 'Flow', data)}
                            </div>
                            <div className={styles.plan} onClick={() => showFlowInfo(data)}>
                                <img src={IconPng} className={styles.planimg}/>
                                <div className={styles.query}>进度查询</div>
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
        </div>);
}

export default GroupTour;