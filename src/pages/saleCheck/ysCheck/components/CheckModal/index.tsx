import React, { useState } from 'react';
import { MinusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Col, Input, InputNumber, Button, Select, Row, Divider } from 'antd';

import styles from './index.less';
import AppConst from '@/utils/AppConst';

interface IModal {
    info: any,
    onOk: (p: any) => void,
    onSubmit:(p:any)=>void,
    onCancel: () => void
}

interface IDzItem {
    type: string | number,
    xy_id?: number,
    amount?: number,
    comment?: string
}

const Modal: React.FC<IModal> = ({ info, onOk, onCancel,onSubmit }) => {

    const suppdct = info['suppdct'] || {}
    const xy: {
        'type': { [key: number]: string },
        'amount': { [key: number]: string }
    } = info['协议'] || {}

    const [data, setData] = useState<{
        '订单对账明细': IDzItem[],
        '订单对账总览': any[]
    }>({
        '订单对账明细': info['订单对账明细'] || [],
        '订单对账总览': info['订单对账总览'] || []
    });

    const change = (value: any, field: string, index: number) => {
        const rst = { ...data }
        rst['订单对账明细'][index][field] = value;

        const { settle_amount, num_of_people } = rst['订单对账总览'][0];

        let dzAccount = 0;
        const detail = rst['订单对账明细'].map((item) => {
            if (item.type == 2) {
                if (item.amount) {
                    dzAccount += item.amount;
                }
                return { ...item };
            }
            if (item.xy_id) {
                let amount = 0;
                const xyType = xy.type[item.xy_id];
                const xyAmount = xy.type[item.xy_id];
                if (xyType === '1') {
                    amount = Number((parseFloat(settle_amount) * (parseFloat(xyAmount) / 100)).toFixed(2));
                }
                if (xyType === '2') { // 人头立减
                    amount = Number((parseFloat(num_of_people) * parseFloat(xyAmount)).toFixed(2));
                }
                dzAccount += amount;
                return { ...item, amount: amount };
            }

            return { ...item };
        })
        rst['订单对账明细'] = detail;

        rst['订单对账总览'][0].dz_account = dzAccount.toFixed(2);
        rst['订单对账总览'][0].account = parseFloat(settle_amount) - dzAccount;

        setData(rst);
    }

    const deleteRow = (index: number) => {
        const rst = { ...data };
        rst['订单对账明细'].splice(index, 1);
        setData(rst);
    }

    const cancel = () => {
        if (onCancel) {
            onCancel()
        }
    }

    const ok = () => {
        if (onOk) {
            onOk(data)
        }
    }

    const submit = () => {
        if (onSubmit) {
            onSubmit(data)
        }
    }

    const addZc = () => {
        const rst = { ...data };
        rst['订单对账明细'].push({ type: AppConst.Dz_Zc });
        setData(rst);
    }

    const addSd = () => {
        const rst = { ...data };
        rst['订单对账明细'].push({ type: AppConst.Dz_Sd });
        setData(rst);
    }

    return <>
        <Col className={['clear', styles.ModBox].join(' ')}>
            <Col className={styles.title}>
                <Col span={23}>
                    <UnorderedListOutlined style={{ color: '#1890FF', marginRight: 8 }} />
                    对账明细
                <Button
                        size='small'
                        ghost
                        type="primary"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            addZc();
                        }}
                    >
                        添加协议政策
                </Button>
                    <Button
                        size='small'
                        ghost
                        type="primary"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            addSd();
                        }}
                    >
                        添加手动调整
                </Button>
                </Col>
            </Col>
            {
                ['类型', '扣除金额', '备注'].map(item =>
                    <Col key={item} span={8} className={styles.header}>{item}</Col>)
            }
            {data['订单对账明细'].map((row, index) => (
                <Row align="middle" className={[styles.content, 'clear'].join(' ')} key={index}>
                    <Col span={23}>
                        {
                            row.type == AppConst.Dz_Sd && <Col span={8} style={{ paddingTop: '10px', paddingLeft: '10px' }}>手动调整</Col>
                        }
                        {
                            row.type == AppConst.Dz_Zc &&
                            <Col span={8} style={{ padding: '2px' }}>
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    style={{ padding: '0 4px', width: '100%' }}
                                    getPopupContainer={(node) => node}
                                    onChange={(value: any) => change(value, 'xy_id', index)}
                                    value={row.xy_id}
                                >
                                    {Object.keys(suppdct).map(key => (
                                        <Select.Option key={key} value={key}>
                                            {suppdct[key]}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        }
                        <Col span={8} style={{ padding: '2px' }}>
                            <InputNumber
                                style={{ width: '100%' }}
                                onChange={(v) => change(v, 'amount', index)}
                                disabled={row.type == AppConst.Dz_Zc}
                                value={row.amount}
                            />
                        </Col>
                        <Col span={8} style={{ padding: '2px' }}>
                            <Input
                                onChange={(e) => change(e.target.value, 'comment', index)}
                                value={row.comment}
                            />
                        </Col>
                    </Col>
                    <Col span={1} className="text-center" style={{ paddingTop: '5px' }}>
                        <MinusCircleOutlined
                            className="pointer"
                            style={{ color: '#ff4d4f' }}
                            onClick={() => {
                                deleteRow(index)
                            }} />
                    </Col>
                </Row>
            ))}
            <Divider style={{ marginTop: 0 }} />
        </Col>

        <Col className={['clear', styles.ModBox].join(' ')}>
            <Col className={styles.title}>
                <Col span={23}>
                    <UnorderedListOutlined style={{ color: '#1890FF', marginRight: 8 }} />
                    最终结算
              </Col>
            </Col>
            {
                ['门店应转', '对账扣除', '实际结算'].map(item =>
                    <Col key={item} span={8} className={styles.header}>{item}</Col>)
            }
            {data['订单对账总览'].map((row, index) => (
                <Row align="middle" className={[styles.content, 'clear'].join(' ')} key={index}>
                    <Col span={23}>
                        <Col span={8} style={{ padding: '2px' }}>
                            <Input
                                readOnly
                                value={row.settle_amount}
                            />
                        </Col>
                        <Col span={8} style={{ padding: '2px' }}>
                            <Input
                                readOnly
                                value={row.dz_account}
                            />
                        </Col>
                        <Col span={8} style={{ padding: '2px' }}>
                            <Input
                                readOnly
                                value={row.account}
                            />
                        </Col>
                    </Col>
                </Row>
            ))}
            <Divider style={{ marginTop: 0 }} />
            <Col className={styles.footerBtns}>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={e => {
                        cancel();
                    }}
                >
                    取消
                </Button>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={e => {
                        ok();
                    }}
                >
                    保存
                </Button>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={e => {
                        submit();
                    }}
                >
                    提交
                </Button>
            </Col>
        </Col>

    </>;
}

export default Modal;
