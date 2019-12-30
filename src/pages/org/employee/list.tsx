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
import { get } from "@/utils/req";
import { Col, Button } from "antd";
import { getEnum } from "@/utils/enum";
import { getRowBtnArray } from "@/utils/utils";

const defaultPng = require("@/assets/login-bg.png");

function renderImg(photo: string) {
  return (
    <div className={styles.imgWrapper}>
      <img src={photo || defaultPng} className={styles.img} alt="头像" />
    </div>
  );
}
interface IEmployeeItem {
  state: string;
  id: string;
  company_name: string;
  department_name: string;
  name: string;
  gender: string;
  mobile: string;
  superior_id: string;
  [key: string]: any;
}

interface IEmployeeProps {
  data: IEmployeeItem;
  btns: IModBtn[];
}

const Employee: React.FC<IEmployeeProps> = ({ data, btns }) => {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState([]);
  let flowColor = {};
  switch (data.state) {
    case "0":
      flowColor = { color: "red" };
      break;
    case "1":
      flowColor = { color: "green" };
      break;
    default:
      flowColor = { color: "#333" };
  }
  const showDetail = () => {
    if (!show) {
      get("/api/org/Employee/read_log", { id: data.id }).then(r => {
        setDetail(r.data["数据日志"]);
        setShow(true);
      });
    } else {
      setShow(false);
    }
  };

  return (
    <Col className={styles.all}>
      <Col className={styles.container}>
        <Col span={4} className={styles.left}>
          {renderImg(data["photo"])}
        </Col>
        <Col span={14} className={styles.middle}>
          <Col span={24} className={styles.top}>
            <span className={styles.lable}>{data.company_name}</span> ——
            <span className={styles.lable}>{data.department_name}</span>
          </Col>
          <Col span={9} className={styles.centerL}>
            <div>
              <span className={styles.lable}>姓名： </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {data.name}
              </span>
            </div>
            <div>
              <span className={styles.lable}>性别： </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {getEnum("Gender")[data.gender]}
              </span>
            </div>
            <div>
              <span className={styles.lable}>手机： </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {data.mobile}
              </span>
            </div>
          </Col>
          <Col span={9} className={styles.centerR}>
            <div>
              <span className={styles.lable}>部门名称： </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {data.department_name}
              </span>
            </div>
            <div>
              <span className={styles.lable}>上级领导： </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {getEnum("Account")[data.superior_id]}
              </span>
            </div>
            <div>
              <span className={styles.lable}>
                职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：
              </span>{" "}
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {data.department_name}
              </span>
            </div>
          </Col>
        </Col>
        <Col span={6} className={styles.right}>
          <Col span={12} className={styles.rightL}>
            <div className={styles.head}>
              <span className={styles.lable}>账号权限</span>
            </div>
            <div className={styles.state}>
              <span className={[styles.text, "text-overflow"].join(" ")}>
                {data.auth_name}
              </span>
            </div>
          </Col>
          <Col span={12} className={styles.rightR}>
            <div className={styles.head}>
              <span className={styles.lable}>账号状态</span>
            </div>
            <div className={styles.state}>
              <span
                style={flowColor}
                className={[styles.text, "text-overflow"].join(" ")}
              >
                {getEnum("State")[data.state]}
              </span>
            </div>
          </Col>
          <Col span={24} className={styles.button}>
            {btns.map(btn => (
              <Button
                className={styles.approval}
                type="primary"
                size="small"
                key={btn.text}
                onClick={() => {
                  if (btn.onClick) btn.onClick(data);
                }}
              >
                {btn.text || ""}
              </Button>
            ))}
            <Button
              className={styles.approval}
              type="primary"
              size="small"
              onClick={() => showDetail()}
            >
              {" "}
              {!show ? "日志" : "收起"}
            </Button>
          </Col>
        </Col>
      </Col>
      {show && (
        <Col className={styles.addMod}>
          <Col className={styles.title}>
            <Col className={styles.text}>日志明细</Col>
          </Col>
          <Col className={styles.content}>
            <Col className={styles.menu}>
              <Col span={4} className={styles.name}>
                日志类型
              </Col>
              <Col span={4} className={styles.name}>
                操作时间
              </Col>
              <Col span={4} className={styles.name}>
                操作人
              </Col>
              <Col span={4} className={styles.name}>
                变动字段
              </Col>
              <Col span={4} className={styles.name}>
                变更前
              </Col>
              <Col span={4} className={styles.name}>
                变更后
              </Col>
            </Col>
            {detail &&
              detail.map(item => (
                <Col className={styles.information}>
                  <Col span={4} className={styles.text}>
                    {getEnum("LogType")[item["log_type"]]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {item["last_update"]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {getEnum("Account")[item["employee_id"]]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {item["field"]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {item["before"]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {item["after"]}
                  </Col>
                </Col>
              ))}
          </Col>
        </Col>
      )}
    </Col>
  );
};

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

  const actionMap = {};

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
        <Employee
          data={item}
          btns={getRowBtnArray(item, rowBtns)}
          key={item["id"]}
        />
      ))}
    </PageHeaderWrapper>
  );
};

export default list;
