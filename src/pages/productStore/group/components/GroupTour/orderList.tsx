import React, { useState } from 'react';
import { get } from '@/utils/req';
import { Row, Col, Modal, Avatar } from 'antd';

import styles from './orderList.less';
import ActionModal from '@/components/Table/ActionModal';
import { IModBtn } from '@/viewconfig/ModConfig';
import { actionColWidth, renderRowBtns } from '@/components/Table/Grid';

export interface IOrder {
    [key: string]: any
}

interface IOrderList {
    data: IOrder[],
    btns:IModBtn[],
    load?: () => void,
}

interface IModalContent{
    photo?:string,
    retailer_name?:string,
    company_name?:string,
    department_name?:string,
    name?:string,
    mobile?:string,
    supplier_department_name?:string
}

const list: React.FC<IOrderList> = ({ data,btns,load }) => {
    const [modalVisible, setVisible] = useState(false);
    const [modalKind, setModalKind] = useState(0);
    const [modalContent, setContent] = useState<IModalContent>({});

    const stringSplit = (str:string, index:number, split:string) => (str.split && str.split(split)[index]) ? str.split(split)[index] : str;
    const showDetail = (type:number, id:string) => {
        if (type === 1) {
            get('/api/Sale/Order/read_creator_detail', { 'id': id }).then(r => {
                const { data: res } = r;
                setContent(res);
                setModalKind(1);
                setVisible(true);
            })
        } else if (type === 2) {
            get('/api/Sale/Order/read_saler_detail', { 'id': id }).then(r => {
                const { data: res } = r;
                setContent(res);
                setModalKind(2);
                setVisible(true);
            })
        } else {
            get('/api/Sale/Order/read_assitant_detail', { 'id': id }).then(r => {
                const { data: res } = r;
                setContent(res);
                setModalKind(3);
                setVisible(true);
            })
        }
    }

    const modalOk = () => {
        setVisible(false);
    }

    const modalCancel = () => {
        setVisible(false)
    }

    const creatorDetail = () => (
        <Row>
            <Col span={8}>
                <Avatar
                    src={modalContent.photo || ''}
                    size={78}
                    style={{ marginLeft: '15%' }}
                />
            </Col>
            <Col span={15}>
                <div style={{ display: 'flex', lineHeight: '27px' }}>
                    <span className='text-overflow' style={{ display: 'inline-block' }}>{modalContent.retailer_name}</span>
                </div>
                <div style={{ display: 'flex', lineHeight: '27px' }}>
                    <span className='text-overflow' style={{ display: 'inline-block' }}>{modalContent.company_name}-{modalContent.department_name}</span>
                </div>
                <div style={{ display: 'flex', lineHeight: '27px' }}>
                    <span className='text-overflow' style={{ display: 'inline-block' }}>{modalContent.name}-{modalContent.mobile}</span>
                </div>
            </Col>
        </Row>
    )

    const salerDetail = () => (
        <Row>
            <Col span={8}>
                <Avatar
                    src={modalContent.photo || ''}
                    size={78}
                    style={{ marginLeft: '15%' }}
                />
            </Col>
            <Col span={15} style={{ marginLeft: '4%' }}>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.company_name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.supplier_department_name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.name}-{modalContent.mobile}</span>
                </div>
            </Col>
        </Row>
    )

    const assitantDetail = () => (
        <Row>
            <Col span={8}>
                <Avatar
                    src={modalContent.photo || ''}
                    size={78}
                    style={{ marginLeft: '15%' }}
                />
            </Col>
            <Col span={15} style={{ marginLeft: '4%' }}>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.retailer_name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.company_name}-{modalContent.department_name}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <span className='text-overflow' style={{ display: 'inline-block', lineHeight: '27px' }}>{modalContent.name}-{modalContent.mobile}</span>
                </div>
            </Col>
        </Row>
    )

    const contentRender = () => {
        if (modalKind === 1) {
            return creatorDetail()
        }
        if (modalKind === 2) {
            return salerDetail()
        }
        return assitantDetail();
    }

    return (
        <React.Fragment>
            <Col className={styles.titleopen}>
                <Col className={styles.titleone} style={{ width: '8%' }}>订单号</Col>
                <Col className={styles.titleone} style={{ width: '14%' }}>提交时间</Col>
                <Col className={styles.titleone} style={{ width: '10%' }}>客户简称</Col>
                <Col className={styles.titleone} style={{ width: '8%' }}>报名人</Col>
                <Col className={styles.titleone} style={{ width: '8%' }}>确认人</Col>
                <Col className={styles.titleone} style={{ width: '8%' }}>接单人</Col>
                <Col className={styles.titleone} style={{ width: '8%' }}>人数</Col>
                <Col className={styles.titleone} style={{ width: '10%' }}>金额</Col>
                <Col className={styles.titleone} style={{ width: '10%' }}>订单状态</Col>
                <Col className={styles.titleone} style={{ width: '12%' }}>操作</Col>
            </Col>
            {
                data.map(order =>
                    <Col className={styles.contentopen} key={order.id}>
                        <Col className={styles.titleone} style={{ width: '8%' }}>{order.retailer_order_id}</Col>
                        <Col className={styles.titleone} style={{ width: '14%' }}>{order.create_at}</Col>
                        <Col className={styles.titleone} style={{ width: '10%' }}>{order.retailer_name}</Col>
                        <Col className={styles.titleone} onClick={() => { showDetail(1, order.id) }} style={{ width: '8%', color: '#40A9FF', cursor: 'pointer' }}>{stringSplit(order.creator, 2, '-')}</Col>
                        <Col className={styles.titleone} onClick={() => { showDetail(2, order.id) }} style={{ width: '8%', color: '#40A9FF', cursor: 'pointer' }}>{order.name}</Col>
                        <Col className={styles.titleone} onClick={() => { showDetail(3, order.id) }} style={{ width: '8%', color: '#40A9FF', cursor: 'pointer' }}>{stringSplit(order.assitant, 2, '-')}</Col>
                        {order.num_of_people_change > 0 && <Col className={styles.titleone} style={{ width: '8%' }}>{order.num_of_people}<span className={styles.fontgreen}>+{order.num_of_people_change}</span></Col>}
                        {order.num_of_people_change === '0' && <Col className={styles.titleone} style={{ width: '8%' }}>{order.num_of_people}</Col>}
                        {order.num_of_people_change < 0 && <Col className={styles.titleone} style={{ width: '8%' }}>{order.num_of_people}<span className={styles.fontred}>{order.num_of_people_change}</span></Col>}
                        <Col className={styles.titleone} style={{ width: '10%' }}>{order.payable}</Col>
                        <Col className={styles.titleone} style={{ width: '10%' }}>{order.state}</Col>
                        <Col className={styles.titleone} style={{ width: '12%' }}>
                        <ActionModal
                            btns={btns}
                            data={data}
                            width={actionColWidth(btns, data)}
                            renderRowBtns={() => renderRowBtns(btns, data,load)}
                        />
                        </Col>
                    </Col>
                )
            }
            <Modal
                wrapClassName="business-card"
                visible={modalVisible}
                onOk={modalOk}
                onCancel={modalCancel}
                footer={null}
                destroyOnClose
            >
                {contentRender()}
            </Modal>

        </React.Fragment>
    )
}

export default list;