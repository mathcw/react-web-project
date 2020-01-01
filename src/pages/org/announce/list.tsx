import React, { useEffect, useState } from "react";
import PageHeaderWrapper, {
  Extra,
  Content
} from "@/components/PageHeaderWrapper";

import { IModPageProps, IModBtn } from "@/viewconfig/ModConfig";
import {
  useListPage,
  useListPageBtn,
  useListPageSearch
} from "@/utils/ListPageHooks";

import styles from "./list.less";
import { Col, Button } from "antd";
import { getRowBtnArray,colorfun, colDisplay } from "@/utils/utils";

const IconPng = require('@/assets/Notification.png');

interface IAnnouncement {
  title: string;
  id: string;
  company_name: string;
  department_name: string;
  employee_name: string;
  submit_at?:string;
  publish_at?:string;
  publish_state:string;
  flow:string;
  [key: string]: any;
}

interface IAnnouncementProps {
  data: IAnnouncement;
  btns: IModBtn[];
  load: ()=>void
}

const Announcement:React.FC<IAnnouncementProps> = ({data,btns,load}) =>{
    return (
        <Col className={styles.container}>
        <Col span={4} className={styles.left}>
          <img src={IconPng} alt="icon" className={styles.img} />    
          <div className={styles.text}>公告通知</div>
        </Col>
        <Col span={15} className={styles.middle}>
          <Col span={24} className={styles.top}>
            <span className={styles.lable}>{data.title}</span>
          </Col>
          <Col span={16} className={styles.centerL}>
            <div>
              <span className={styles.lable}>提交部门：  </span>{' '}
              <span className={[styles.text, 'text-overflow'].join(' ')}>{data.company_name} </span>
              <span className={[styles.text, 'text-overflow'].join(' ')}>{data.department_name} </span>
              <span className={[styles.text, 'text-overflow'].join(' ')}>{data.employee_name}</span>
            </div>
            <div>
              <span className={styles.lable}>提交时间：  </span>{' '}
              {
                  data.submit_at && <>
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.submit_at.split(' ')[0]} </span>
                        <span className={[styles.text, 'text-overflow'].join(' ')}>{data.submit_at.split(' ')[1]}</span>
                    </>
              }
            </div>
            <div>
              <span className={styles.lable}>发布时间：  </span>{' '}
              {
                  data.publish_at && <>
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.publish_at.split(' ')[0]} </span>
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.publish_at.split(' ')[1]}</span>
                  </>
              }
            </div>
          </Col>
        </Col>
        <Col span={5} className={styles.right}>
          <div className={styles.rightL}>
            <div className={styles.head}>
              <span className={styles.lable}>审核状态</span>
            </div>
            <div className={styles.state}>
              <span style={colorfun(data)} className={[styles.text, 'text-overflow'].join(' ')}>
                {colDisplay(data.flow,'Flow',data)}
              </span>
            </div>
          </div>
          <div className={styles.rightR}>
            <div className={styles.head}>
              <span className={styles.lable}>发布状态</span>
            </div>
            <div className={styles.state}>
              <span className={[styles.text, 'text-overflow'].join(' ')}>
                {
                    colDisplay(data.publish_state,'PublishState',data)
                }
              </span>
            </div>
          </div>
        </Col>
        <Col className={styles.btn}>
          <div className={styles.button}>
            {btns.map(btn => (
                <Button
                    className={styles.approval}
                    type="primary"
                    size="small"
                    key={btn.text}
                    onClick={() => {
                    if (btn.onClick) btn.onClick(data,load);
                    }}
                >
                    {btn.text || ""}
                </Button>
                ))}
          </div>
        </Col>
      </Col>
    )
} 

const list: React.FC<IModPageProps> = ({ route }) => {
  const { authority } = route;
  const {
    setCurrent,
    setPageSize,
    load,
    pageSize,
    current,
    pageSizeOptions,
    total,
    query,
    setQuery,
    data
  } = useListPage(authority);

  const actionMap = {
  };

  const { headerBtns, rowBtns } = useListPageBtn(authority, actionMap);
  const { dropDownSearch, textSearch } = useListPageSearch(authority);

  useEffect(() => {
    load();
  }, [pageSize, current]);

  const pageNumChange = (page: number) => {
    setCurrent(page);
  };

  const pageSizeChange = (_Current: number, size: number) => {
    setPageSize(size);
  };

  return (
    <PageHeaderWrapper
      extra={Extra(
        pageSize,
        pageSizeOptions,
        total,
        current,
        pageNumChange,
        pageSizeChange
      )}
      content={Content(
        query,
        setQuery,
        load,
        headerBtns,
        dropDownSearch,
        textSearch
      )}
    >
        {data.map((item: any) => (
            <Announcement
                data={item}
                btns={getRowBtnArray(item, rowBtns)}
                load={load}
                key={item["id"]}
            />
      ))}
    </PageHeaderWrapper>
  );
};

export default list;
