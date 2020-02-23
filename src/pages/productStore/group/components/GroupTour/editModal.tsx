import React, { useState,useRef } from 'react';
import GroupTour from './index';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tabs, Col, Input, InputNumber, Button, DatePicker, Select } from 'antd';

import styles from './editModal.less';
import moment from 'moment';
import { getEnum } from '@/utils/enum';

const { TabPane } = Tabs;
const { Option } = Select;

interface IModal {
    info: any,
    onOk: (p:any) => void,
    onCancel: () => void
}

const Modal: React.FC<IModal> = ({ info, onOk, onCancel }) => {

    const groupInfo = info['团队信息'] || {};
    const priceDetail = info['价格明细'] || [];

    const [data, setData] = useState({
        price_comment: groupInfo.price_comment
        , peer_price: groupInfo.peer_price, retail_price: groupInfo.retail_price
        , gp_total: groupInfo.gp_total, stock: groupInfo.stock
        , person_limit: groupInfo.person_limit, dep_date: groupInfo.dep_date
        , back_date: groupInfo.back_date, state: groupInfo.state
        , '其它价格': [...priceDetail]
    });

    const ref = useRef<HTMLDivElement>(null);

    const inputChange = (value: any, field: string) => {
        const rst = { ...data }
        rst[field] = value;
        setData(rst);
    }

    const otherDetailChange = (value: any, field: string, index: number) => {
        const rst = { ...data }
        rst['其它价格'][index][field] = value;
        setData(rst);
    }

    const addOtherPrice = () => {
        const rst = { ...data }
        rst['其它价格'].push({
            price_type: 2
        })
        setData(rst);
    }

    const delOtherPrice = (index: number) => {
        const rst = { ...data };
        rst['其它价格'].splice(index, 1);
        setData(rst)
    }

    const cancel = () => {
        if(onCancel){
            onCancel()
        }
    }

    const ok = () => {
        if(onOk){
            onOk(data)
        }
    }

    const priceTab = () => {
        return (
            <Col className='clear'>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>基准价格</Col>
                            </Col>
                            <Col className={styles.modContent}>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>价格名称</Col>
                                    <Col className={styles.modValue}>
                                        <Input value={groupInfo.price_comment} disabled />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>同行价</Col>
                                    <Col className={styles.modValue}>
                                        <Input value={groupInfo.peer_price} disabled />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>直客价</Col>
                                    <Col className={styles.modValue}>
                                        <Input value={groupInfo.retail_price} disabled />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>其他价格</Col>
                            </Col>
                            {info['价格明细'].map((row: any, index: number) => {
                                if (row.price_type == 2)
                                    return (
                                        <Col className={styles.modContent}>
                                            <Col span={8} className={styles.cell}>
                                                <Col className={styles.modLabel}>价格名称</Col>
                                                <Col className={styles.modValue}>
                                                    <Input value={row.price_comment} disabled />
                                                </Col>
                                            </Col>
                                            <Col span={8} className={styles.cell}>
                                                <Col className={styles.modLabel}>同行价</Col>
                                                <Col className={styles.modValue}>
                                                    <InputNumber value={row.peer_price} disabled />
                                                </Col>
                                            </Col>
                                            <Col span={8} className={styles.cell}>
                                                <Col className={styles.modLabel}>直客价</Col>
                                                <Col className={styles.modValue}>
                                                    <InputNumber value={row.retail_price} disabled />
                                                </Col>
                                            </Col>
                                        </Col>
                                    );
                                return null
                            })}

                        </Col>
                    </Col>
                </Col>

                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingLeft: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>基准价格</Col>
                            </Col>
                            <Col className={styles.modContent}>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>价格名称</Col>
                                    <Col className={styles.modValue}>
                                        <Input value={data.price_comment} onChange={e => inputChange(e.target.value, 'price_comment')} />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>同行价</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={data.peer_price} onChange={v => inputChange(v, 'peer_price')} />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>直客价</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={data.retail_price} onChange={v => inputChange(v, 'retail_price')} />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>


                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>其他价格</Col>
                            </Col>
                            <Col className={[styles.modContent, 'clear'].join(' ')}>
                                <Col span={8} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>价格名称</Col>
                                </Col>
                                <Col span={7} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>同行价</Col>
                                </Col>
                                <Col span={8} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>直客价</Col>
                                </Col>
                                <Col span={1} className={styles.add}>
                                    <PlusCircleOutlined
                                        className="pointer"
                                        style={{ color: '#1890FF' }}
                                        onClick={() => addOtherPrice()} />
                                </Col>
                            </Col>
                            {data['其它价格'].map((row: any, index: number) => {
                                if (row.price_type == 2)
                                    return (
                                        <Col className={[styles.modContent, 'clear'].join(' ')} key={index}>
                                            <Col span={8} className={styles.cell}>
                                                <Col className={styles.modValue}>
                                                    <Input value={row.price_comment} onChange={e => otherDetailChange(e.target.value, 'price_comment', index)} />
                                                </Col>
                                            </Col>
                                            <Col span={7} className={styles.cell}>
                                                <Col className={styles.modValue}>
                                                    <InputNumber value={row.peer_price} onChange={value => otherDetailChange(value, 'peer_price', index)} />
                                                </Col>
                                            </Col>
                                            <Col span={8} className={styles.cell}>
                                                <Col className={styles.modValue}>
                                                    <InputNumber value={row.retail_price} onChange={value => otherDetailChange(value, 'retail_price', index)} />
                                                </Col>
                                            </Col>
                                            <Col span={1} className={styles.minus}>
                                                <MinusCircleOutlined
                                                    className={styles.delete}
                                                    style={{ color: '#ff4d4f' }}
                                                    onClick={row => delOtherPrice(index)} />
                                            </Col>
                                        </Col>
                                    );
                                return null
                            })}

                        </Col>
                    </Col>
                </Col>
            </Col>
        );
    }

    const seatTab = () => {
        return (
            <Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>计划总位</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={groupInfo.gp_total} disabled />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>库存剩余</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={groupInfo.stock} disabled />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>成团人数</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={groupInfo.person_limit} disabled />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>计划总位</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={data.gp_total} onChange={val => inputChange(val, 'gp_total')} />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>库存剩余</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={data.stock} onChange={val => inputChange(val, 'stock')} />
                                    </Col>
                                </Col>
                                <Col span={8} className={styles.cell}>
                                    <Col className={styles.modLabel}>成团人数</Col>
                                    <Col className={styles.modValue}>
                                        <InputNumber value={data.person_limit} onChange={val => inputChange(val, 'person_limit')} />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Col>
        )
    }

    const dateTab = () => {
        return (
            <Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={12} className={styles.cell}>
                                    <Col className={styles.modLabel}>出团日期</Col>
                                    <Col className={styles.modValue}>
                                        <DatePicker value={moment(groupInfo.dep_date)} disabled />
                                    </Col>
                                </Col>
                                <Col span={12} className={styles.cell}>
                                    <Col className={styles.modLabel}>回团日期</Col>
                                    <Col className={styles.modValue}>
                                        <DatePicker value={moment(groupInfo.back_date)} disabled />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>

                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={12} className={styles.cell}>
                                    <Col className={styles.modLabel}>出团日期</Col>
                                    <Col className={styles.modValue}>
                                        <DatePicker value={moment(data.dep_date)} getPopupContainer={(node) => ref.current as HTMLElement} onChange={(date, dateString) => inputChange(dateString, 'dep_date')} />
                                    </Col>
                                </Col>
                                <Col span={12} className={styles.cell}>
                                    <Col className={styles.modLabel}>回团日期</Col>
                                    <Col className={styles.modValue}>
                                        <DatePicker value={moment(data.back_date)} getPopupContainer={(node) => ref.current as HTMLElement} onChange={(date, dateString) => inputChange(dateString, 'back_date')} />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Col>
        )
    }

    const stateTab = () => {
        return (
            <Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={24} className={styles.cell}>
                                    <Col className={styles.modLabel}>团态</Col>
                                    <Col className={styles.modValue}>
                                        <Input value={getEnum('GroupState')[groupInfo.state]} disabled />
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modContent}>
                                <Col span={24} className={styles.cell}>
                                    <Col className={styles.modLabel}>团态</Col>
                                    <Col className={styles.modValue}>
                                        <Select
                                            getPopupContainer={(node) => node as HTMLElement}
                                            value={data.state}
                                            style={{ width: '100%' }}
                                            placeholder="团态"
                                            defaultValue={getEnum('GroupState')[data.state]}
                                            onChange={(val: any) => inputChange(val, 'state')}
                                        >
                                            {Object.keys(getEnum('GroupStateEdit')).map((key) =>
                                                <Option key={key} value={key}>{getEnum('GroupStateEdit')[key]}</Option>
                                            )}
                                        </Select>
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Col>
        )
    }

    return (
        <>
            <GroupTour data={groupInfo} />
            <div ref={ref}>
            <Tabs defaultActiveKey="price">
                <TabPane tab="修改价格" key="price">
                    {priceTab()}
                </TabPane>
                <TabPane tab="修改库存" key="seat">
                    {seatTab()}
                </TabPane>
                <TabPane tab="修改团期" key="date">
                    {dateTab()}
                </TabPane>
                <TabPane tab="修改团态" key="state">
                    {stateTab()}
                </TabPane>
            </Tabs>
            </div>
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
                    确定
                </Button>
            </Col>
        </>
    );
}

export default Modal;
