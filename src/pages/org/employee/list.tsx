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
import { get, submit } from "@/utils/req";
import { Col, Button, message, Modal } from "antd";
import { getRowBtnArray,colDisplay } from "@/utils/utils";
import ModalForm from "@/components/ModalForm";

const defaultPng = require("@/assets/login-bg.png");

function renderImg(photo?: string) {
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
  load: ()=>void
}

const Employee: React.FC<IEmployeeProps> = ({ data, btns,load }) => {
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
      get("/org/Employee/read_log", { id: data.id }).then(r => {
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
                {colDisplay(data.gender,'Gender',data)}
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
                {colDisplay(data.superior_id,'Account',data)}
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
                {colDisplay(data.State,'State',data)}
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
                  if (btn.onClick) btn.onClick(data,load);
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
                        {colDisplay(data.log_type,'LogType',data)}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {item["last_update"]}
                  </Col>
                  <Col span={4} className={styles.text}>
                    {colDisplay(data.employee_id,'Account',data)}
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

// 新增员工
const add = (reload: () => void) => () => {
    const modalRef = Modal.info({});
    const list = {
      company_id: { text: "公司名称", required: true, type: "Company" },
      department_id:{ text:"部门名称",required:true,type:"Department",cascade:"company_id"},
      name: { text: "姓名", required: true },
      gender:{text:"性别",required:true,type:"Gender"},
      mobile:{text:'电话',required:true},
      account:{text:'账号',required:true}
    };
    const onSubmit = (data: any) => {
      submit("/org/Employee/submit", data).then(r => {
        message.success(r.message);
        modalRef.destroy();
        reload();
      });
    };
    const onCancel = () => {
      modalRef.destroy();
    };
    modalRef.update({
      title: "新增员工",
      icon: null,
      content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} />,
      okButtonProps: { className: "hide" },
      cancelButtonProps: { className: "hide" }
    });
};
  
// 修改员工
const edit = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        company_id: { text: "公司名称", required: true, type: "Company" },
        department_id:{ text:"部门名称",required:true,type:"Department",cascade:"company_id"},
        name: { text: "姓名", required: true },
        gender:{text:"性别",required:true,type:"Gender"},
        mobile:{text:'电话',required:true},
        account:{text:'账号',required:true}
    };
    const onSubmit = (data: object | undefined) => {
      submit("/org/Employee/submit", data).then(r => {
        message.success(r.message);
        modalRef.destroy();
        reload();
      });
    };
    const onCancel = () => {
      modalRef.destroy();
    };
    modalRef.update({
      title: "修改员工",
      // eslint-disable-next-line max-len
      icon: null,
      content: (
        <ModalForm
          list={list}
          onSubmit={onSubmit}
          onCancel={onCancel}
          data={{ ...ref }}
        />
      ),
      okButtonProps: { className: "hide" },
      cancelButtonProps: { className: "hide" }
    });
};

// 设置员工权限
const setAuth = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        auth_id: { text: "权限", required: true, type: "EmpAuth" },
    };
    const onSubmit = (data: object | undefined) => {
      submit("/org/Employee/set_auth", data).then(r => {
        message.success(r.message);
        modalRef.destroy();
        reload();
      });
    };
    const onCancel = () => {
      modalRef.destroy();
    };
    modalRef.update({
      title: "设置权限",
      // eslint-disable-next-line max-len
      icon: null,
      content: (
        <ModalForm
          list={list}
          onSubmit={onSubmit}
          onCancel={onCancel}
          data={{ ...ref }}
        />
      ),
      okButtonProps: { className: "hide" },
      cancelButtonProps: { className: "hide" }
    });
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

  const actionMap = {
    新增员工: add(load),
    修改员工: edit(load),
    设置员工权限:setAuth(load)
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
        <Employee
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
