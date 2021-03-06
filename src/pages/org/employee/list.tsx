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
import { Col, Button, message, Modal, Row } from "antd";
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
        <React.Fragment>
        <Col className={styles.Org}>
            <Col className={styles.top}>
                <Col span={2} className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                    {renderImg(data["photo"])}
                </Col>
                <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                    <Col span={20} className={styles.RTop}>
                        <span className={[styles.name, 'text-overflow'].join(' ')}>{data.company_name}——{data.department_name}</span>
                    </Col>
                    <Col span={17} className={styles.RCenter}>
                        <Col span={10} className={styles.RCenterL}>
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
                        <Col span={10} className={styles.RCenterL}>
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
                    <Col span={7} className={styles.Approval}>
                        <Row>
                            <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                <span className={styles.lable}>账号权限</span>
                                <div className={[styles.text, "text-overflow"].join(" ")}>
                                    {data.auth_name}
                                </div>
                            </Col>
                            <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                <span className={styles.lable}>账号状态</span>
                                <div style={flowColor} className={[styles.text, "text-overflow"].join(" ")}>
                                    {colDisplay(data.state,'State',data)}
                                </div>
                            </Col>
                        </Row>
                    </Col>
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
                    <Button
                        className={styles.button}
                        type="primary"
                        size="small"
                        onClick={() => showDetail()}
                        >
                        {" "}
                        {!show ? "日志" : "收起"}
                    </Button>
                </Col>
            </Col>
            {show && (
            <Col className={styles.addMod}>
                <Col className={styles.title}>
                    <Col className={styles.text}>日志明细</Col>
                </Col>
                <Col className={styles.content}>
                    <Row className={styles.menu}>
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
                    </Row>
                    {detail &&
                    detail.map(item => (
                        <Row className={styles.information}>
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
                        </Row>
                    ))}
                </Col>
            </Col>
            )}
        </Col>
        </React.Fragment>
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
        submit("/org/Employee/submit", {id:ref.id,...data}).then(r => {
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
        submit("/org/Employee/set_auth", {id:ref.id, ...data}).then(r => {
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
    const { authority,viewConfig } = route;
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
    } = useListPage(authority,viewConfig);

    const actionMap = {
        新增员工: add(load),
        修改员工: edit(load),
        设置员工权限:setAuth(load)
    };

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);

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
            <div className={styles.ScrollHight}>
                {data.map((item: any) => (
                    <Employee
                    data={item}
                    btns={getRowBtnArray(item, rowBtns)}
                    load={load}
                    key={item["id"]}
                    />
                ))}
            </div>
        </PageHeaderWrapper>
    );
};

export default list;
