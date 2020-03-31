import React, { useState, useEffect } from 'react';
import { IModPageProps } from '@/viewconfig/ModConfig';

import { Row, Col, Avatar, Button, Divider, Spin, Modal, Input, Upload, message } from 'antd';
import Link from 'umi/link';
import { rootAction, useRootState } from '@/rootState';
import { ActionType } from '@/rootState/rootAction';
import {Chart,Geom,Axis,Tooltip,Coord,Label,Legend,Guide} from 'bizcharts';
// @ts-ignore
import DataSet from '@antv/data-set';

import styles from './Supplier.less';
import { read, upload, submit } from '@/utils/req';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import GroupTour from '../sale/placeholder/components/GroupTour';
import { getBtnClickEvent } from '@/utils/utils';
const { Password } = Input;
const { Dragger } = Upload;
const defaultProfile = require('@/assets/profile.png');

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传 JPG/PNG 图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface pageData {
  msg: any[],
  msg_flow: any[],
  announce: any[],
  account: {
    type: string
    assoc_id: string
    name: string
    mobile: string
    superior_department_name: string
    superior_company_name: string
    photo: string
  },
  recently_data: {
    order_dep_nums: string
    order_back_nums: string
    tor_order_dep_nums: string
    tor_order_back_nums: string
  },
  recently_order: any[],
  account_check: {
    chart_1: any[],
    chart_2: any[],
  },
  profileModal: any,
  photoLoading: any,
  profile: string,
  photo: any,
  passWordModal: any,
  passWord: string,
  orderActive: any,
  announceModal: any,
  announceData: {
    title: string
    company_name: string
    department_name: string
    employee_name: string
    body_html: string
  }
}

const page: React.FC<IModPageProps> = ({ route }) => {
  const [data, setData] = useState<pageData>({
    msg: [],
    msg_flow: [],
    announce: [],
    account: {
      type: '',
      assoc_id: '',
      name: '',
      mobile: '',
      superior_department_name: '',
      superior_company_name: '',
      photo: ''
    },
    recently_data: {
      order_dep_nums: '',
      order_back_nums: '',
      tor_order_dep_nums: '',
      tor_order_back_nums: '',
    },
    recently_order: [],
    account_check: {
      chart_1: [],
      chart_2: []
    },
    profileModal: false,
    photoLoading: false,
    profile: '',
    photo: defaultProfile,
    passWordModal: false,
    passWord: '',
    orderActive: 0,
    announceModal: false,
    announceData: {
      title: '',
      company_name: '',
      department_name: '',
      employee_name: '',
      body_html: ''
    }
  });
  useEffect(() => {
    read('/Home/Supplier/read_home', { mod: '供应商首页' }).then(res => {
      setData({ ...res.data });
    })
  }, []);

  const { loading } = useRootState();

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      data.photoLoading = true;
      setData({ ...data });
      return;
    }
    if (info.file.status === 'done') {
      data.photoLoading = false;
      data.profile = info.file.url;
      setData({ ...data });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  const handleCustomRequest = (r: any) => {
    const uploadType = 'photo';
    const formData = new FormData();
    formData.append('file', r.file);
    upload(formData, uploadType).then(res => {
      if (res.success && res.save_path) {
        const fileinfo = { file: { status: 'done', url: res.save_path } }
        handleChange(fileinfo);
      } else {
        handleChange({ file: { status: 'error', name: r.file.name } });
      }
    }, () => {
      handleChange({ file: { status: 'error', name: r.file.name } });
    })
  };
  const modifyProfile = () => {
    data.profileModal = true;
    setData({ ...data });
  }

  const modalProfileOk = () => {
    submit('/org/Account/set_emp_profile_photo', { 'profile': data.profile }).then((r) => {
      data.profileModal = false;
      setData({ ...data });
      message.success(r.message);
    })
  }

  const modalProfileCancel = () => {
    data.profileModal = false;
    data.profile = '';
    setData({ ...data });
  }

  const uploadButton = (
    <div>
      <p className="ant-upload-drag-icon">
        {
          data.photoLoading && <LoadingOutlined />
        }
        {
          !data.photoLoading && <PlusOutlined />
        }
      </p>
      <p className="ant-upload-text">点击或者拖拽到本区域进行上传</p>
    </div>
  );

  const modifyPassWord = () => {
    data.passWordModal = true;
    setData({ ...data });
  }

  const modalOk = () => {
    submit('/org/Account/set_password', { 'passWord': data.passWord }).then((r) => {
      data.passWordModal = false;
      setData({ ...data });
      message.success(r.message);
    })
  }

  const modalCancel = () => {
    data.passWordModal = false;
    data.passWord = '';
    setData({ ...data });
  }

  const changePassWord = (passWord: any) => {
    data.passWord = passWord;
    setData({ ...data });
  }

  const logout = () => {
    rootAction(ActionType.LAYOUT);
  }

  const changeActive = (index: any) => {
    read('/Home/Supplier/read_home', { mod: '供应商首页', order_active: index }).then(r => {
      data.recently_order = r.data.recently_order;
      data.orderActive = index;
      setData({ ...data });
    })
  }

  const renderOrder = (order: any) => {
    if (order.type === '1') {
      return (
        <GroupTour data={order} key={order.id} />
      )
    }
    return null;
  }

  const handleClick = (data: any) => {
    getBtnClickEvent('查看公告公告通知')({ id: data['id'] });
  }

  const bizchartsRender = () => {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const flow_data = Object.keys(data.account_check.chart_1).length > 0 ? [
      {
        item: '已对账',
        count: data.account_check.chart_1 ? data.account_check.chart_1['已对账订单'] : 0
      },
      {
        item: '待审批',
        count: data.account_check.chart_1 ? data.account_check.chart_1['待审批对账'] : 0
      },
      {
        item: '未对账',
        count: data.account_check.chart_1 ? data.account_check.chart_1['未对账订单'] : 0
      }
    ] : [
        {
          item: '无对账',
          count: 100
        }
      ];
    const amount_data = Object.keys(data.account_check.chart_2).length > 0 ? [
      {
        item: '已结账款',
        count: data.account_check.chart_2 ? data.account_check.chart_2['已结账款'] : 0,
      },
      {
        item: '未结账款',
        count: data.account_check.chart_2 ? data.account_check.chart_2['未结账款'] : 0,
      }
    ] : [
        {
          item: '无结账',
          count: 100
        }
      ];
    const dv = new DataView();
    dv.source(flow_data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = `${(val * 100).toFixed()}%`;
          return val;
        },
      },
    };
    const dv1 = new DataView();
    dv1.source(amount_data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols1 = {
      percent: {
        formatter: val => {
          val = `${(val * 100).toFixed()}%`;
          return val;
        },
      },
    };
    return (
      <Col>
        {[1].map((item, index) => (
          <Col span={12} key={`hartsRender${index}`}>
            <Chart className={styles.chart} height={140} data={dv} scale={cols} padding={[0, 80, 0, 0]} forceFit>
              <Coord type="theta" radius={0.9} />
              <Axis name="percent" />
              <Legend position="right" offsetY={0} offsetX={0} />
              <Tooltip
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  'item*percent',
                  (item, percent) => {
                    percent = `${(percent * 100).toFixed()}%`;
                    return {
                      name: item,
                      value: percent,
                    };
                  },
                ]}
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
              >
                <Label
                  content="percent"
                  offset={-10}
                  formatter={(val, item) => {
                    if (item.point.item === '无对账') {
                      return 0;
                    }
                    return val !== '0%' ? val : '';

                  }}
                />
              </Geom>
            </Chart>
            <Chart className={styles.chart1} height={140} data={dv1} scale={cols1} padding={[0, 80, 0, 0]} forceFit>
              <Coord type="theta" radius={0.9} />
              <Axis name="percent" />
              <Legend position="right" offsetY={0} offsetX={0} />
              <Tooltip
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  'item*percent',
                  (item, percent) => {
                    percent = `${(percent * 100).toFixed()}%`;
                    return {
                      name: item,
                      value: percent,
                    };
                  },
                ]}
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
              >
                <Label
                  content="percent"
                  offset={-10}
                  formatter={(val, item) => {
                    if (item.point.item === '无结账') {
                      return 0;
                    }
                    return val !== '0%' ? val : '';

                  }}
                />
              </Geom>
            </Chart>
          </Col>
        ))}
      </Col>
    );
  };

  return <React.Fragment>
    <div className={[loading ? '' : 'hide', 'Spin-box'].join(' ')}>
      <Spin tip="Loading..." />
    </div>
    <Row className={styles.TopContent}>
      {/* 个人信息 */}
      <Col xl={8} lg={8} md={24} sm={24} xs={24} className={styles.infos}>
        <Row className={styles.block}>
          <Row className={styles['mod-title']}>
            <Col className="mod-text">个人信息</Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row className={styles.content}>
            <Col span={6} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Col>
                <Avatar
                  src={data.account.photo || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                  size={64} />
              </Col>
              <Col className={styles['left-text']}>{data.account.name}</Col>
            </Col>
            <Col span={18} className={styles['content-right']}>
              <Col className={styles.title}>{data.account.superior_company_name}</Col>
              <Col className={styles.brand}>{data.account.superior_department_name}</Col>
              <Col className={styles.brand}>{data.account.name}--{data.account.mobile}</Col>
              <Col className={styles.brand} style={{ display: 'flex', justifyContent: 'space-around', padding: 0, marginTop: '12px' }}>
                <Button size="small" style={{ fontSize: '12px', padding: '0 4px' }} onClick={modifyProfile}>修改头像</Button>
                <Button size="small" style={{ fontSize: '12px', padding: '0 4px' }} onClick={modifyPassWord}>修改密码</Button>
                <Button size="small" style={{ fontSize: '12px', padding: '0 4px' }} onClick={logout}>退出登录</Button>
              </Col>
            </Col>
          </Row>
        </Row>
      </Col>
      {/* 最近订单 */}
      <Col xl={6} lg={6} md={24} sm={24} xs={24} className={`${styles.infos} ${styles.NoticeAndActivity}`}>
        <Row className={styles.block}>
          <Col className={styles['mod-title']}>
            <Col className="mod-text">最近订单</Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={styles.content} style={{ padding: '0' }}>
            <Col span={12} className={styles.c2item}>
              <Col className={[styles.c2item1, styles.center].join(' ')}>
                <div>今日出团</div>
                <span>{data.recently_data.order_dep_nums}</span>
              </Col>
            </Col>
            <Col span={12} className={styles.c2item}>
              <Col className={[styles.c2item2, styles.center].join(' ')}>
                <div>今日回团</div>
                <span>{data.recently_data.order_back_nums}</span>
              </Col>
            </Col>
            <Col span={12} className={styles.c2item}>
              <Col className={[styles.c2item3, styles.center].join(' ')}>
                <div>明日出团</div>
                <span>{data.recently_data.tor_order_dep_nums}</span>
              </Col>
            </Col>
            <Col span={12} className={styles.c2item}>
              <Col className={[styles.c2item4, styles.center].join(' ')}>
                <div>明日回团</div>
                <span>{data.recently_data.tor_order_back_nums}</span>
              </Col>
            </Col>
          </Col>
        </Row>
      </Col>
      {/* 对账结算 */}
      <Col xl={10} lg={10} md={24} sm={24} xs={24} className={styles.infos}>
        <Row className={styles.block}>
          <Col className="mod-title">
            <Col className="mod-text">对账结算</Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={styles.content}>
            {bizchartsRender()}
          </Col>
        </Row>
      </Col>
    </Row>

    <Row className={styles.TopContent}>
      {/* 消息通知 */}
      <Col xl={14} lg={14} md={24} sm={24} xs={24} className={styles.infos}>
        <Row className={styles.block}>
          <Col className={styles['mod-title']}>
            <Col span={22} className="mod-text">消息通知</Col>
            <Col span={2} className="mod-more">
              <Link to="/office/msg/list" className={styles['text-right']}>更多></Link>
            </Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={`${styles.content} ${styles.contentc}`} style={{ height: 'auto' }}>
            {data.msg.map((item, index) => (
              <Row key={index}>
                <Col span={8} className={styles['times']}>
                  {item.create_at}
                </Col>
                <Col span={16} className={['text-overflow'].join(' ')}>
                  {item.title}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>

      </Col>
      {/* 平台公告 */}
      <Col xl={10} lg={10} md={24} sm={24} xs={24} className={`${styles.infos} ${styles.NoticeAndActivity}`}>
        <Row className={styles.block}>
          <Col className={styles['mod-title']}>
            <Col span={22} className="mod-text">平台公告</Col>
            <Col span={2} className="mod-more">
              <Link to="/office/announcement/list" className={styles['text-right']}>更多></Link>
            </Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={`${styles.content} ${styles.contentc}`} style={{ height: 'auto' }}>
            {data.announce.map((item, index) => (
              <Row key={index}>
                <Col span={8} className={styles['item-left']}>
                  {item.create_at.split(' ')[0]}
                </Col>
                <Col span={16} className={[styles.itemcentertwo, 'text-overflow', styles.itemfocus].join(' ')} onClick={e => handleClick(item)}>
                  {item.title}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>

    {/* 最近订单 */}
    <Row>
      <Col className={styles.RecentOrder}>
        <Col className="mod-title-one" style={{ marginLeft: '8px', marginRight: '8px' }}>
          <Col span={22} className="mod-text">
            最近订单
              <div className={styles.headerTags}>
              <span
                className={[styles.itemTag, data.orderActive === 0 ? styles.headerActive : ''].join(
                  ' '
                )}
                onClick={e => changeActive(0)}
              >
                全部
                </span>
              <span
                className={[styles.itemTag, data.orderActive === 1 ? styles.headerActive : ''].join(
                  ' '
                )}
                onClick={e => changeActive(1)}
              >
                占位待确认
                </span>
              <span
                className={[styles.itemTag, data.orderActive === 2 ? styles.headerActive : ''].join(
                  ' '
                )}
                onClick={e => changeActive(2)}
              >
                实报待确认
                </span>
              <span
                className={[styles.itemTag, data.orderActive === 3 ? styles.headerActive : ''].join(
                  ' '
                )}
                onClick={e => changeActive(3)}
              >
                变更待确认
                </span>
            </div>
          </Col>
          <Col span={2} className="mod-more">
            <Link to="/Sale/Placeholder/List">
              更多>
              </Link>
          </Col>
        </Col>

        <Col className={styles.List}>
          <Col className={styles.itemBox}>{data.recently_order.map(item => renderOrder(item))}</Col>
        </Col>
      </Col>
    </Row>

    <Modal
      title="修改密码"
      visible={data.passWordModal}
      onOk={modalOk}
      onCancel={modalCancel}
    >
      <Password
        placeholder="请输入密码"
        onChange={e => changePassWord(e.target.value)}
      />
    </Modal>
    <Modal
      title="修改头像"
      visible={data.profileModal}
      onOk={modalProfileOk}
      onCancel={modalProfileCancel}
    >
      <Dragger
        name="photo"
        multiple={false}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={info => handleChange(info)}
        customRequest={({ file }) => handleCustomRequest({ file })}
      >
        {data.profile ? <img src={data.profile} alt="图片" className={styles.upload} /> : uploadButton}
      </Dragger>
    </Modal>
  </React.Fragment>
}

export default page