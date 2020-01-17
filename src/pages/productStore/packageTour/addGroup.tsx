import React, { useEffect, useState } from 'react';
import { Col, Icon, Divider, Button, Modal } from 'antd';
import { IActionPageProps } from '@/viewconfig/ActionConfig';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/actionPageHeader';
import renderHeaderBtns from '@/components/PageHeaderWrapper/headerBtns';
import CalendarUtil from '@/components/CalendarUtil';
import { useActionPage, useActionBtn } from '@/utils/ActionPageHooks';
import { colDisplay, colorfun } from '@/utils/utils';

import styles from './addGroup.less';
import Grid, { getCols } from '@/components/Table/Grid';
import { ColumnProps } from 'antd/es/table';
import { IModBtn } from '@/viewconfig/ModConfig';
import moment from 'moment';
import BatchModal from './batchModal';
import MorePrice from './morePrice';



const defaultPng = require('@/assets/login-bg.png');

const renderGroupInfo = (data: any) => {
  return (
    <React.Fragment>
      <Col className={styles.pd}>
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
              <span className={[styles.imgText, 'text-overflow'].join(' ')}>{`产品编号P0${data.main_pd_id}`}</span>
            </div>
          </Col>
          <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
            <Col className={styles.RTop}>
              <span className={styles.tag}>团队游</span>
              <span className={[styles.name, 'text-overflow'].join(' ')}>
                {data.pd_name}
              </span>
            </Col>
            <Col className={styles.RCenter}>
              <Col span={10} className={styles.RCenterL}>
                <div>
                  <span className={styles.lable}>发布商家： </span>{' '}
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.supplier_full_name}</span>
                  <span className={[styles.text2, 'text-overflow'].join(' ')}>{data.name}</span>
                </div>
                <div>
                  <span className={styles.lable}>产品属性：  </span>{' '}
                  {/* 城市 */}
                  <span>
                    {
                      `${colDisplay(data.dep_city_id, 'City', data)}出发`
                    }
                  </span>{'  '}  &nbsp;&nbsp;
                  <span>
                    {
                      `${data.days}天${data.nights}晚`
                    }
                  </span>{'  '}&nbsp;&nbsp;
                  <span>
                    {
                      data.own_expense === '1' && '有自费'
                    }
                    {
                      data.own_expense !== '1' && '无自费'
                    }
                  </span>{'  '}&nbsp;&nbsp;
                  <span>
                    {
                      data.shopping === '1' && '有购物'
                    }
                    {
                      data.shopping !== '1' && '无购物'
                    }
                  </span>{'  '}

                </div>
              </Col>
              <Col span={8} className={styles.RCenterR}>
                <div className={styles.infoCell}>
                  <span className={styles.lable}>在售中： </span>
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.saleing_group_number}</span>
                </div>
                <div className={styles.infoCell}>
                  <span className={styles.lable}>已过期： </span>
                  <span className={[styles.text, 'text-overflow'].join(' ')}>{data.timeout_group_number}</span>
                </div>
              </Col>

            </Col>

            <Col span={6} className={styles.approve}>
              <div className={styles.infoCell} style={{ fontSize: '14px' }}>
                <span className={styles.lable}>审核状态</span>
                <div
                  className={[styles.text, 'text-overflow'].join(' ')}
                  style={colorfun(data)}
                >
                  {
                    `${colDisplay(data.flow, 'Flow', data)}`
                  }
                </div>
              </div>
            </Col>

            <Col className={styles.RBtm} span={24}>
              <Col span={14} className={styles.RBtmL}>
                {/* 主题 */}
                {
                  data.theme_arr && data.theme_arr.map((tag: string, index: number) => (
                    index < 3 &&
                    <div key={`${tag}\${index}`}>
                      {colDisplay(tag, 'PdTheme', {})}
                    </div>
                  ))
                }
                {data.theme_arr && data.theme_arr.length < 4 && data.zj_theme_arr &&
                  data.zj_theme_arr.slice(0, 3 - (data.theme_arr.length)).map((tag: string, index: number) => (
                    index < 3 &&
                    <div key={`${tag}\${index}`}>
                      {tag}
                    </div>
                  ))
                }
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    </React.Fragment>
  );
}

interface IGroupType {
  dep_date?: string,
  back_date?: string,
  gp_total?: string,
  stock?: string,
  person_limit?: string,
  price_comment?: string,
  peer_price?: string,
  retail_price?: string,
}

const Page: React.FC<IActionPageProps> = ({ route, location }) => {
  const { viewConfig } = route;
  const { state: ref } = location;

  const initData: {
    跟团游开团团期详情: IGroupType[],
    [key: string]: any
  } = {
    跟团游开团团期详情: []
  }

  const { data, setData, load, onOk, onCancel, cfg } = useActionPage<typeof initData>(viewConfig, initData, ref);
  const [calendarModal, setCalendarModal] = useState(false);
  const [selectedRowKeys,setSelectedRowKeys] = useState<string[]>([]);
  const actionMap = {
    提交: onOk,
    关闭: onCancel,
  }

  const { btns } = useActionBtn(viewConfig, actionMap);

  useEffect(() => {
    load().then((loadedData: typeof initData) => {
      setData({ ...data, ...loadedData });
    });
  }, [])

  const rowSelChange = (keys:string[]) =>{
    setSelectedRowKeys(keys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys:string[]|number[]) => rowSelChange(keys as string[])
  }; 

  const list = {
    dep_date: { text: '出团日期', type: 'date', width: 180, editable: true },
    back_date: { text: '回团日期', type: 'date', width: 180, editable: true },
    gp_total: { text: '计划总位', width: 80, editable: true, required: true },
    stock: { text: '库存剩余', type: 'intNumber', width: 80, editable: true },
    person_limit: { text: '成团人数', type: 'intNumber', width: 80, editable: true },
    price_comment: { text: '价格名称', width: 150, editable: true },
    peer_price: { text: '基准同行价', type: 'number', width: 80, editable: true },
    retail_price: { text: '建议直客价', type: 'number', width: 80, editable: true },
  };

  const tableBtns: IModBtn[] = [
    {
      text: '批量新增',
      viewConfig: '批量新增团期',
      onClick: () => {
        setCalendarModal(true);
      }
    },
    {
      text: '批量填充',
      viewConfig: '批量填充团期',
      onClick: () => {
        if(selectedRowKeys.length === 0 ){
          Modal.error({
            content:'您还没有勾选团期数据',
            title:'请勾选团期数据'
          })
          return;
        }
        const modalRef = Modal.info({});
        const onSubmit = (submitData: any) => {
          const rst = {...data};
          rst['跟团游开团团期详情'] = rst['跟团游开团团期详情'].map((item,index:any)=>{
            if(selectedRowKeys.includes(index+'')){
              item.gp_total = submitData['团期库存信息'][0].gp_total || 0;
              item.stock = submitData['团期库存信息'][0].stock || 0;
              item.person_limit = submitData['团期库存信息'][0].person_limit || 0;
              item.peer_price = submitData['团期基准价格'][0].peer_price || 0;
              item.retail_price = submitData['团期基准价格'][0].retail_price || 0;
              item.price_comment = submitData['团期基准价格'][0].price_comment || 0;
              
              item['团期其他价格'] = [];
              submitData['团期其他价格'].forEach((otherPrice:any)=>{
                  item['团期其他价格'].push({...otherPrice});
              })
            }
            return item;
          })
          setData(rst);
          modalRef.destroy();
        };
        const onCancel = () => {
          modalRef.destroy();
        };
        modalRef.update({
          title: "填写团期数据",
          icon: null,
          content: <BatchModal OnOk={onSubmit} OnCancel={onCancel} />,
          okButtonProps: { className: "hide" },
          cancelButtonProps: { className: "hide" }
        });
      }
    },
    {
      text: '批量删除',
      viewConfig: '批量删除团期',
      onClick: () => {
        if(selectedRowKeys.length === 0 ){
          Modal.error({
            content:'勾选团期数据',
            title:'勾选团期数据'
          })
          return;
        }
        const rst = {...data};
        rst['跟团游开团团期详情'] = rst['跟团游开团团期详情'].filter((v,index)=>{
          return !selectedRowKeys.includes(index+'')
        })
        setSelectedRowKeys([]);
        setData(rst);
      }
    },
  ];

  const addGroupDone = (dateArr:string[]) =>{
    setCalendarModal(false);
    const rst = {...data};
    dateArr.forEach( date =>{
      const { days} = rst;
      const backDate = moment(date).add(days,'days').format("YYYY-MM-DD");
      if (rst['跟团游开团团期详情'].find(cell => cell.dep_date === date)) {
        return false;
      }
      rst['跟团游开团团期详情'].push({ dep_date: date ,back_date: backDate});
      return true;
    })
    setData(rst);
  }

  const closeModal = () =>{
    setCalendarModal(false);
  }

  const addRow = () => {
    const rst = { ...data };
    rst['跟团游开团团期详情'].push({});
    setData(rst);
  }

  const deleteRow = (index: number) => {
    const rst = { ...data };
    rst['跟团游开团团期详情'].splice(index, 1);
    setData(rst);
  }

  const morePrice = (record:object,rowIndex:number) =>{
    const modalRef = Modal.info({});
    const onSubmit = (submitData: any) => {
      const rst = {...data};

      rst['跟团游开团团期详情'][rowIndex].peer_price = submitData['团期基准价格'][0].peer_price || 0;
      rst['跟团游开团团期详情'][rowIndex].retail_price = submitData['团期基准价格'][0].retail_price || 0;
      rst['跟团游开团团期详情'][rowIndex].price_comment = submitData['团期基准价格'][0].price_comment || 0;
      rst['跟团游开团团期详情'][rowIndex]['团期其他价格'] = submitData['团期其他价格'];

      setData(rst);
      modalRef.destroy();
    };
    const onCancel = () => {
      modalRef.destroy();
    };
    modalRef.update({
      title: "填写团期数据",
      icon: null,
      content: <MorePrice data={record} OnOk={onSubmit} OnCancel={onCancel} />,
      okButtonProps: { className: "hide" },
      cancelButtonProps: { className: "hide" }
    });
  }

  const opCol: ColumnProps<IGroupType>[] = [
    {
      title: '操作',
      key: 'operation',
      fixed: "right",
      width: 100,
      onCell: (record: object, rowIndex: number) => ({
        record,
        rowIndex,
        isOp: true,
        render: (data: object) => {
          return (
            <a onClick={() => { morePrice(data,rowIndex) }}>更多价格</a>
          );
        }
      })
    },
    {
      title: (
        <Icon
          type="plus-circle"
          theme="filled"
          className={styles.iconPlus}
          onClick={() => {
            addRow()
          }}
        />),
      key: 'icon',
      fixed: "right",
      width: 50,
      onCell: (record: object, rowIndex: number) => ({
        record,
        rowIndex,
        isOp: true,
        render: (data: object) => {
          return (
            <Icon
              type="minus-circle"
              theme="filled"
              className={styles.iconMinus}
              onClick={() => {
                deleteRow(rowIndex)
              }}
            />
          );
        }
      })
    },
  ]

  const update = (row: number,
    dataIndex: string | number,
    value?: string | number) => {
    const rst = { ...data };
    rst['跟团游开团团期详情'][row][dataIndex] = value;
    setData(rst);
  }

  return (
    <PageHeaderWrapper
      title={cfg.title || ''}
      extra={renderHeaderBtns(btns)}
    >
      {renderGroupInfo(data)}

      <Col className={styles.title}>
        <Col className={styles.text}>团期价格</Col>
        <Col className={styles.btns}>
          {tableBtns.map(btn => (
            <div key={btn.viewConfig} className="dib" style={{ marginLeft: 8 }}>
              <Button
                icon={btn.icon}
                type='primary'
                size='small'
                onClick={() => {
                  if (btn.onClick) btn.onClick();
                }}
              >
                {btn.text || ""}
              </Button>
            </div>
          ))}
        </Col>
      </Col>
      <Divider style={{ margin: 0 }} />
      <Grid<IGroupType>
        columns={getCols<IGroupType>(list, update)}
        dataSource={data['跟团游开团团期详情']}
        className={'OpTableStyle'}
        pagination={false}
        resizeable={true}
        specCol={opCol}
        rowKey={(record: IGroupType, index: number) => {
          return index + '';
        }}
        rowSelection={rowSelection}
      />
      <CalendarUtil title="新增团期"
        width={800}
        visible={calendarModal}
        onOk={addGroupDone}
        onCancel={closeModal}
      />
    </PageHeaderWrapper>
  )
}

export default Page;
