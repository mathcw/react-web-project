import React, { useState } from 'react';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Col, Button, Tag, Row } from 'antd';

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
  orderbtns?: IModBtn[],
  load?: () => void,
}

const GroupTour: React.FC<GroupTourProps> = ({ data, btns = [], orderbtns = [], load }) => {
  const [packStatus, setPackStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderListData, setOrderList] = useState<IOrder[]>([]);

  const loadMore = () => {

    if (!packStatus) {
      setLoading(true);
      get('/Group/Group/read_order_detail', { 'id': data.main_group_id }).then(r => {
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
    <div className={styles.Schedule}>
      <Row
        className={styles.top}
      >
        <Col className={styles.imgBox} xs={24} sm={24} md={3} lg={3}>
          <img src={data.list_pic || defaultPng} className={styles.img} alt="产品图片"/>
          <span className={styles.imgText}>{`产品编号P0${data.pd_id}`}</span>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18}>
          <div className={styles.content}>
            <Col span={24} className={styles.contentTop}>
              <Tag color="blue">团队游</Tag>
              <span className={[styles.name, 'text-overflow'].join(' ')}>
                {data.pd_name}
              </span>
            </Col>
            <Col span={24} className={styles.contentCenter}>
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
            <Col span={24} className="text-center">
              <div
                className={[styles.openIconBox, 'dib', loading ? 'hide' : ''].join(' ')}
                onClick={() => { loadMore() }}
              >
                {packStatus ? "收起详情" : "展开详情"}
                {
                  !packStatus && <DoubleLeftOutlined className={styles.close} />
                }
                {
                  packStatus && <DoubleLeftOutlined className={styles.open} />
                }
              </div>
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
                  {colDisplay(data.state, 'GroupState', data)}
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
        packStatus && <OrderListComp data={orderListData} btns={orderbtns} load={load} />
      }
    </div>
  );
}

export default GroupTour;