import React, { useState } from 'react';
import { Col, Spin, Icon, Button, Tag } from 'antd';

import styles from './index.less';
import { IModBtn } from '@/viewconfig/ModConfig';
import { get } from '@/utils/req';
import { colDisplay } from '@/utils/utils';
import OrderListComp, { IOrder } from './orderList';

const defaultPng = require('@/assets/login-bg.png');

interface GroupTourProps {
  data: {
    type: string;
    [key: string]: any
  },
  btns?: IModBtn[],
  orderbtns?:IModBtn[],
  load?: () => void,
}

const GroupTour: React.FC<GroupTourProps> = ({ data, btns = [],orderbtns=[], load }) => {
  const [packStatus, setPackStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderListData, setOrderList] = useState<IOrder[]>([]);

  const loadMore = () => {

    if (!packStatus) {
      setLoading(true);
      get('/b2b-back/Group/Group/read_order_detail', { 'id': data.main_group_id }).then(r => {
        setLoading(false);
        setPackStatus(true);
        if (r.data) {
          setOrderList([...r.data]);
        }
      })
    } else {
      setPackStatus(false);
    }
  }

  let flowColor = {}
  switch (data.state) {
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
    <Col className={styles.Schedule}>
      <Col
        className={styles.top}
      >
        <Col className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
          <div className={styles.imgWrapper}>
            <img
              src={data.list_pic || defaultPng}
              className={styles.img}
              alt="产品图片"
            />
            <span className={[styles.imgText, 'text-overflow'].join(' ')}>{`产品编号P0${data.pd_id}`}</span>
          </div>
        </Col>
        <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
          <Col className={styles.RTop}>
            <Tag color="blue">团队游</Tag>
            <span className={[styles.name, 'text-overflow'].join(' ')}>
              {data.pd_name}
            </span>

          </Col>
          <Col className={styles.RCenter}>
            <Col span={18} className={styles.RCenterL}>
              <Col span={6}>
                <div className={styles.cell}>
                  <span className={styles.lable}>出团日期：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.dep_date}</span>
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>回团日期：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.back_date}</span>{' '}
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>出发城市：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(data.dep_city_id, 'City', data)}</span>{' '}
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.cell}>
                  <span className={styles.lable} style={{ display: 'inline-block', minWidth: '48px' }}>供应商：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.brand}</span>{' '}
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>团&nbsp;&nbsp;&nbsp;号：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.gp_num}</span>
                </div>
                <div className={styles.infoCell} style={{ margin: 0 }}>
                  <span className={styles.lable}>控团人： </span>
                  <span className={[styles.text, 'text-overflow'].join(' ')}>
                    {colDisplay(data.saler_id, 'SupplierSales', data)}
                  </span>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.cell}>
                  <span className={styles.lable}>同行价：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.peer_price}</span>
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>计划位：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.gp_total}</span>{' '}
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>库&nbsp;&nbsp;&nbsp;存：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.stock}</span>{' '}
                </div>


              </Col>
              <Col span={6}>
                <div className={styles.cell}>
                  <span className={styles.lable}>实报：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.confirmation_num}</span>
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>占位：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.reservation_num}</span>{' '}
                </div>
                <div className={styles.cell}>
                  <span className={styles.lable}>剩余：</span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.remain}</span>{' '}
                </div>
              </Col>
            </Col>
          </Col>
          <Col span={6} className={styles.RCenterR}>
            <Col span={24} className={styles.infoRow}>
              <Col className={styles.infoCell} style={{ margin: 0 }}>
                <div className={styles.lable}>团态 </div>
                <div style={flowColor} className={[styles.text, 'text-overflow'].join(' ')}>
                  {colDisplay(data.state, 'GroupState', data)}
                </div>
              </Col>
            </Col>
            <Col className={styles.btns}>
                <Col
                  className={btns ? '' : 'hide'}
                >
                  <div>
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
                  </div>
                </Col>
              </Col>
          </Col>

          <Col span={4} className="text-center" style={{ position: 'relative', left: '61%' }}>
            <Col
              className={[styles.openIconBox, 'dib', loading ? 'hide' : ''].join(' ')}
              onClick={() => { loadMore() }}
            >
              {packStatus ? "收起详情" : "展开详情"}
              {
                !packStatus && <Icon
                  type="double-left"
                  className={styles.close}
                />
              }
              {
                packStatus && <Icon
                  type="double-left"
                  className={styles.open}
                />
              }
            </Col>
          </Col>
        </Col>
      </Col>
      {
        packStatus && <OrderListComp data={orderListData} btns={orderbtns} load={load} />
      }
    </Col>
  );
}

export default GroupTour;