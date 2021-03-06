import React, { useEffect, useState } from 'react';
import { Col, message, Tag, Modal, Button, Row } from 'antd';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import { ApproveModal } from '@/components/ApproveBtns';
import router from 'umi/router';
import { submit } from '@/utils/req';

import styles from './approve.less';
import { colDisplay } from '@/utils/utils';
const defaultPng = require('@/assets/login-bg.png');

const Page: React.FC<IActionPageProps> = ({ route, location }) => {

    const initData: {
        '团期信息': any,
        '订单信息': any,
        '订单备注': any[],
        '基础团费': any[],
        '调整费用': any[],
        '应转费用': any[],
        '原名单': any[],
        '审批记录': any[],
        'flow_id': string
    } = {
        '团期信息': {},
        '订单信息': {},
        '订单备注': [],
        '基础团费': [],
        '调整费用': [],
        '应转费用': [],
        '原名单': [],
        '审批记录': [],
        'flow_id': '0'
    };
    const { authority,viewConfig } = route;
    const { state: ref } = location;

    const { data, setData, load, onCancel, cfg } = useActionPage<typeof initData>(authority,viewConfig, initData, ref);

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    const actionMap = {
        关闭: onCancel,
    }

    useEffect(() => {
        load().then((loadRst) => {
            setData({
                '团期信息': { ...loadRst['团期信息'] },
                '订单信息': { ...loadRst['订单信息'] },
                '订单备注': [...loadRst['订单备注']],
                '基础团费': [...loadRst['基础团费']],
                '调整费用': [...loadRst['调整费用']],
                '应转费用': [...loadRst['应转费用']],
                '原名单': [...loadRst['原名单']],
                '审批记录': loadRst['审批记录'] ? [...loadRst['审批记录']] : [],
                'flow_id': loadRst['订单信息']['confirm_flow_id']
            })
            setLoading(false);
        });
    }, [])

    const { btns } = useActionBtn(viewConfig, actionMap);

    const passOk = (comment: string) => {
        if (cfg.submit) {
            submit(cfg.submit.url, {
                flow_id: data.flow_id
                , opinion: 1, comment: comment
            }, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    const rejectOk = (comment: string) => {
        if (cfg.submit) {
            submit(cfg.submit.url, {
                flow_id: data.flow_id
                , opinion: 2, comment: comment
            }, cfg.submit.data).then((r: any) => {
                message.success(r.message);
                router.goBack();
            })
        }
    }

    const groupInfo = () => {
        let flowColor = {}
        const group = { ...data['团期信息'] };
        switch (group.state) {
            case '1':
                flowColor = { color: 'green' }
                break;
            case '2':
                flowColor = { color: 'red' }
                break;
            case '3':
                flowColor = { color: '#333' }
                break;
            case '4':
                flowColor = { color: 'yellow' }
                break;
            default:
                flowColor = { color: '#333' }
        }

        return (
            <div className={styles.Schedule}>
                <div className={styles.title} >
                    团期信息
                </div>
                <Row className={styles.item}>
                    <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
                        <div className={styles.imgWrapper}>
                            <img
                                src={group.picture || defaultPng}
                                className={styles.img}
                                alt="产品图片"
                            />
                            <div className={styles.imgText}>
                                {`产品编号P0${group.pd_id}`}
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                        <div className={styles.content}>
                            <Col span={24} className={styles.contentTop}>
                                <Tag color="blue">团队游</Tag>
                                <span className={styles.name}>
                                    {group.pd_name}
                                </span>
                            </Col>
                            <Col span={24} className={styles.contentCenter}>
                                <Col span={6}>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>出团日期：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.dep_date}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>回团日期：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.back_date}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>出发城市：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(group.dep_city_id, 'City', data)}</span>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>供应商：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.sup_brand}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>团&nbsp;&nbsp;&nbsp;号：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.gp_num}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>控团人： </span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(group.saler_id, 'SupplierSales', data)}</span>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>同行价：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.peer_price}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>计划位：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.gp_total}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>库&nbsp;&nbsp;&nbsp;存： </span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.stock}</span>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>实报：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.confirmation_num}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>占位：</span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.reservation_num}</span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.lable}>剩余： </span>
                                        <span className={[styles.text, 'text-overflow'].join(' ')}>{group.remain}</span>
                                    </div>
                                </Col>
                            </Col>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={3} lg={3}>
                        <Row className={styles.right}>
                            <Col className={styles.rightlable} span={24}>团态</Col>
                            <Col className={styles.rightstate} span={24} style={flowColor}>
                                {colDisplay(group.state, 'GroupState', data)}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

    const lookOver = () => {
        Modal.info({
            title: '旅客名单',
            width: 520,
            className: 'modal-confirm-body',
            icon: <></>,
            content: (
                <div className={styles.tourist}>
                    <Row className={styles.tableBorder}>
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
                    </Row>
                    <div className={styles.tableDiv}>
                        {data['原名单'] && data['原名单'].map((val: any, mdkey: number) => (
                            <Row className={styles.tableBorder} key={'名单' + mdkey}>
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
                            </Row>
                        ))}
                    </div>
                </div>
            ),
            onOk() { },
            okText: '关闭',
        });
    }

    const baseInfo = () => {
        const detail = data['订单信息'];
        return (
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
                            <Row>
                                <Col span={11}>
                                    订单人数： <span>{detail.num_of_people}人</span>
                                </Col>
                                <Col span={11}>
                                    <Button type='primary' size='small' onClick={() => lookOver()}>名单详情</Button>
                                </Col>
                            </Row>
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
        );
    }

    const nzInfo = () => {
        const detail = data['订单信息'];
        const settle_detail = data['应转费用'];
        return (
            <div className={[styles.childrenMod, 'clear'].join(' ')}>
                <div className={styles.ModTitle}>应转明细</div>
                <div className={styles.ModContent}>
                    <Row className={[styles.ModCell, 'clear'].join(' ')}>
                        <Col span={6}>转入对象： {detail.assitant}</Col>
                        <Col span={6}>应转金额： {detail.settle_amount}</Col>
                        <Col span={6}>已转金额： {detail.settled_amount}</Col>
                        <Col span={6}>未转金额： {detail.settle_amount - detail.settled_amount}</Col>
                        <span className={styles.detail} onClick={() => setOpen(!open)}> {open ? '收起' : '详情'}</span>
                    </Row>
                    <div className={styles.childrenother} style={open ? { display: 'block' } : { display: 'none' }}>
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
                            settle_detail && settle_detail.map((snap: any, yzIndex: number) => (
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
        );
    }

    const commentInfo = () => {
        return (
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
                            data['订单备注'] && data['订单备注'].map((val: any, cIndex: number) => (
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
        );
    }

    if (loading) {
        return (
            <PageHeaderWrapper
                title={cfg.title || ''}
                extra={renderHeaderBtns(btns)}
            >

            </PageHeaderWrapper>
        )
    }

    return (
        <PageHeaderWrapper
            title={cfg.title || ''}
            extra={renderHeaderBtns(btns)}
        >
            <Col className={styles.children}>
                {groupInfo()}
                {baseInfo()}
                {nzInfo()}
                {commentInfo()}

            </Col>
            <Col className={styles.approve}>
                <ApproveModal history={data['审批记录'] || []} passOk={passOk} rejectOk={rejectOk} />
            </Col>

        </PageHeaderWrapper>
    );
}

export default Page;
