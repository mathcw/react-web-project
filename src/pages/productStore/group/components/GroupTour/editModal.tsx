import React, { useState,useRef } from 'react';
import GroupTour from './index';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tabs, Col, Input, InputNumber, Button, DatePicker, Select, Row, Divider, Tag } from 'antd';
import { colDisplay } from '@/utils/utils';

import styles from './editModal.less';
import moment from 'moment';
import { getEnum } from '@/utils/enum';
const defaultPng = require('@/assets/login-bg.png');

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

    const EditGroupTour = (groupInfo:any) => {
        const detail = groupInfo.data;
        let flowColor = {}
        switch (detail.state) {
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
            <Row
              className={styles.top}
            >
              <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
                <img src={detail.list_pic || defaultPng} className={styles.img} alt="产品图片"/>
                <span className={styles.imgText}>{`产品编号P0${detail.pd_id}`}</span>
              </Col>
              <Col xs={24} sm={24} md={18} lg={18}>
                <div className={styles.content}>
                  <Col span={24} className={styles.contentTop}>
                    <Tag color="blue">团队游</Tag>
                    <span className={[styles.name, 'text-overflow'].join(' ')}>
                      {detail.pd_name}
                    </span>
                  </Col>
                  <Col span={24} className={styles.contentCenter}>
                    <Col span={6}>
                      <div className={styles.cell}>
                        <span className={styles.lable}>出团日期：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.dep_date}</span>
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>回团日期：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.back_date}</span>{' '}
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>出发城市：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(detail.dep_city_id, 'City', detail)}</span>{' '}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className={styles.cell}>
                        <span className={styles.lable} style={{ display: 'inline-block', minWidth: '48px' }}>供应商：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.brand}</span>{' '}
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>团&nbsp;&nbsp;&nbsp;号：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.gp_num}</span>
                      </div>
                      <div className={styles.infoCell} style={{ margin: 0 }}>
                        <span className={styles.lable}>控团人： </span>
                        <span className={[styles.text, 'text-overflow'].join(' ')}>
                          {colDisplay(detail.saler_id, 'SupplierSales', detail)}
                        </span>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className={styles.cell}>
                        <span className={styles.lable}>同行价：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.peer_price}</span>
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>计划位：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.gp_total}</span>{' '}
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>库&nbsp;&nbsp;&nbsp;存：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.stock}</span>{' '}
                      </div>
      
      
                    </Col>
                    <Col span={6}>
                      <div className={styles.cell}>
                        <span className={styles.lable}>实报：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.confirmation_num}</span>
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>占位：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.reservation_num}</span>{' '}
                      </div>
                      <div className={styles.cell}>
                        <span className={styles.lable}>剩余：</span>{' '}
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{detail.remain}</span>{' '}
                      </div>
                    </Col>
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={3} lg={3}>
                <Row className={styles.left}>
                  <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                      <span className={styles.lable}></span>
                      <div className={[styles.text, 'text-overflow'].join(' ')}></div>
                  </Col>
                  <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                      <span className={styles.lable}>团态</span>
                      <div style={flowColor} className={[styles.text, 'text-overflow'].join(' ')}>
                        {colDisplay(detail.state, 'GroupState', detail)}
                      </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )
    }

    const priceTab = () => {
        return (
            <Row className='clear'>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>基准价格</Col>
                            </Col>
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>其他价格</Col>
                            </Col>
                            {info['价格明细'].map((row: any, index: number) => {
                                if (row.price_type == 2)
                                    return (
                                        <Row className={styles.modContent}>
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
                                        </Row>
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
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>


                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Col className={styles.modTitle}>
                                <Col className={styles.modTitleText}>其他价格</Col>
                            </Col>
                            <Row className={[styles.modContent, 'clear'].join(' ')}>
                                <Col span={8} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>价格名称</Col>
                                </Col>
                                <Col span={7} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>同行价</Col>
                                </Col>
                                <Col span={8} className={styles.cell} style={{ marginBottom: 0 }}>
                                    <Col className={styles.modLabel}>直客价</Col>
                                </Col>
                                <Col span={1} className={styles.cell}>
                                    <PlusCircleOutlined
                                        className="pointer"
                                        style={{ color: '#1890FF' }}
                                        onClick={() => addOtherPrice()} />
                                </Col>
                            </Row>
                            {data['其它价格'].map((row: any, index: number) => {
                                if (row.price_type == 2)
                                    return (
                                        <Row className={[styles.modContent, 'clear'].join(' ')} key={index}>
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
                                            <Col span={1} className={styles.cell}>
                                                <MinusCircleOutlined
                                                    className={styles.delete}
                                                    style={{ color: '#ff4d4f' }}
                                                    onClick={row => delOtherPrice(index)} />
                                            </Col>
                                        </Row>
                                    );
                                return null
                            })}

                        </Col>
                    </Col>
                </Col>
            </Row>
        );
    }

    const seatTab = () => {
        return (
            <Row>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>
                    </Col>
                </Col>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }

    const dateTab = () => {
        return (
            <Row>
                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>当前数据</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>
                    </Col>
                </Col>

                <Col sm={12} md={12} lg={12} className={styles.Mod} style={{ paddingRight: '8px' }}>
                    <Col className={styles.ModTitle}>本次修改</Col>
                    <Col className={[styles.ModContent, 'clear'].join(' ')}>
                        <Col className={[styles.mod, 'clear'].join(' ')}>
                            <Row className={styles.modContent}>
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
                            </Row>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }

    const stateTab = () => {
        return (
            <Row>
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
            </Row>
        )
    }

    return (
        <>
            <Divider style={{ margin: 0 }} />
            <EditGroupTour data={groupInfo} />
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
