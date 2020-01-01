import React, { useState } from 'react';
import { Row, Modal, Col, Input, Button } from 'antd';

import styles from './index.less';
import { getEnum } from '@/utils/enum';

interface IModalProps {
    history: any[],
    passOk: (v: string) => void,
    passCancel?: () => void,
    rejectOk: (v: string) => void,
    rejectCancel?: () => void
}

const renderFlow = (history: any[]) => {
    return (
        <Col >
            <Col className={styles.content}>
                {history.map(item => (
                    <Col xs={24} sm={24} md={24} lg={24} style={{ lineHeight: '36px' }}>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            操作人:{getEnum({ type: 'Account' })[item.account_id]}
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            审批意见:{getEnum({ type: 'Opinion' })[item.opinion]}
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            时间:{item.create_at}
                        </Col>
                        <Col span={24}>备注:{item.comment}</Col>
                    </Col>
                ))}
            </Col>
        </Col>
    );
};

export const ApproveModal: React.FC<IModalProps> = ({ history, passOk, passCancel, rejectOk, rejectCancel }) => {
    const [comment, setComment] = useState('');
    const [passModal, setPassModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const passModalOk = () => {
        setPassModal(false);
        passOk(comment);
    }

    const passModalCancel = () => {
        setPassModal(false);
        if (passCancel)
            passCancel();
    }

    const rejectModalOk = () => {
        setRejectModal(false);
        rejectOk(comment);
    }

    const rejectModalCancel = () => {
        setRejectModal(false);
        if (rejectCancel)
            rejectCancel();
    }

    const pass = () => {
        setPassModal(true);
    }

    const reject = () => {
        setRejectModal(true);
    }

    return (<>
        <Col span={24} className={styles.title}>审批记录:</Col>
        <Col>{renderFlow(history)}</Col>
        <Col span={24} className={styles.title}>本次备注信息:</Col>
        <Col className={styles.content}>
            <Input.TextArea
                value={comment}
                placeholder="请输入审批备注"
                autoSize={{ minRows: 4, maxRows: 8 }}
                onChange={e => setComment(e.target.value)}
            />
            <Col className={styles.footerBtn}>
                <Button className={styles.confirm} onClick={() => pass()}>通过</Button>
                <Button className={styles.reject} onClick={() => reject()}>不通过</Button>
            </Col>
        </Col>
        <Modal
            title="审批通过"
            visible={passModal}
            onOk={passModalOk}
            onCancel={passModalCancel}
        >
            <p>请确认是否审批通过</p>
        </Modal>
        <Modal
            title="拒绝审批"
            visible={rejectModal}
            onOk={rejectModalOk}
            onCancel={rejectModalCancel}
        >
            <p>请确认是否拒绝审批</p>
        </Modal>
    </>)
}

