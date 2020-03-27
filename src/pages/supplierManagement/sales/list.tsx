import React, { useEffect } from 'react';
import { IModPageProps, IModBtn } from '@/viewconfig/ModConfig';
import {
    useListPage,
    useListPageBtn,
    useListPageSearch
} from "@/utils/ListPageHooks";

import PageHeaderWrapper, {
    Extra,
    Content
} from "@/components/PageHeaderWrapper";
import { getRowBtnArray, colDisplay } from '@/utils/utils';

import styles from './list.less';
import { get,submit } from "@/utils/req";
import { Col, Button,message, Row, Modal } from 'antd';
import ModalForm from "@/components/ModalForm";

const defaultPng = require('@/assets/login-bg.png');

function renderImg(photo?: string) {
    return (
        <div className={styles.imgWrapper}>
            <img src={photo || defaultPng} className={styles.img} alt="头像" />
        </div>
    );
}

interface ISalerItem {
    photo?:string;
    supplier_full_name:string;
    brand:string;
    name:string;
    gender:string;
    mobile:string;
    supplier_department_name:string;
    auth_id:string;
    online:string;
    [key: string]: any;
}

interface ISalerProps {
    data: ISalerItem;
    btns: IModBtn[];
    load: () => void
}


const Saler: React.FC<ISalerProps> = ({ data, btns, load }) => {
    const stateColor = (item: any) => {
        let Color = {}
        switch (item.state) {
            case '0':
                Color = { color: 'red' }
                break;
              case '1':
                Color = { color: '#00A36A' }
                break;
            default:
                Color = { color: '#333' }
        }
        return Color;
    }
    const onlineColor = (item: any) => {
        let Color = {}
        switch (item.online) {
            case '0':
                Color = { color: '#F1830D' }
                break;
              case '1':
                Color = { color: '#00A36A' }
                break;
            default:
                Color = { color: '#333' }
        }
        return Color;
    }

    return (
        <React.Fragment>
        <Col className={styles.Org}>
            <Col className={styles.top}>
                <Col span={2} className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
                    {renderImg(data["photo"])}
                </Col>
                <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
                    <Col span={20} className={styles.RTop}>
                        <span className={[styles.name, 'text-overflow'].join(' ')}>{data.supplier_full_name}——{data.brand}</span>
                    </Col>
                    <Col span={17} className={styles.RCenter}>
                        <Col span={10} className={styles.RCenterL}>
                            <div>
                                <span className={styles.lable}>姓名：  </span>{' '}
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.name}</span>
                            </div>
                            <div>
                                <span className={styles.lable}>性别：  </span>{' '}
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{colDisplay(data.gender, 'Gender', data)}</span>
                            </div>
                            <div>
                                <span className={styles.lable}>手机：  </span>{' '}
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.mobile}</span>
                            </div>
                        </Col>
                        <Col span={10} className={styles.RCenterL}>
                            <div>
                                <span className={styles.lable}>所属部门：  </span>{' '}
                                <span className={[styles.text, 'text-overflow'].join(' ')}>{data.supplier_department_name}</span>
                            </div>
                            <div>
                                <span className={styles.lable}>账号权限：  </span>{' '}
                                <span className={[styles.text, 'text-overflow'].join(' ')}>
                                    {colDisplay(data.auth_id, 'SuppAuth', data)}
                                </span>
                            </div>
                        </Col>
                    </Col>
                    <Col span={7} className={styles.Approval}>
                        <Row>
                            <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                <span className={styles.lable}>线上接单</span>
                                <div style={onlineColor(data)} className={[styles.text, "text-overflow"].join(" ")}>
                                    {colDisplay(data.online, 'YesNo', data)}
                                </div>
                            </Col>
                            <Col span={12} className={styles.infoCell} style={{ textAlign: 'center' }}>
                                <span className={styles.lable}>账号状态</span>
                                <div style={stateColor(data)} className={[styles.text, "text-overflow"].join(" ")}>
                                    {colDisplay(data.state, 'State', data)}
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
                </Col>
            </Col>
        </Col>
        </React.Fragment>
    )
}


const add = (reload: () => void) => () => {
    const modalRef = Modal.info({});
    const list = {
        supplier_id:{text:'所属商家',required: true,type:'FullSupplier'},
        department_id:{text:'所属部门',required: true,type:'SupplierDepartment',cascade:'supplier_id'},
        name:{text:'姓名',required: true},
        gender:{text:"性别",required:true,type:"Gender"},
        mobile:{text:'电话',required:true},
        account:{text:'账号',required:true},
        password:{text:'密码',required:true}
    };
    const onSubmit = (data: any) => {
      submit("/SupplierManagement/Sales/submit", data).then(r => {
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
  
const edit = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        supplier_id:{text:'所属商家',required: true,type:'FullSupplier'},
        department_id:{text:'所属部门',required: true,type:'SupplierDepartment',cascade:'supplier_id'},
        name:{text:'姓名',required: true},
        gender:{text:"性别",required:true,type:"Gender"},
        mobile:{text:'电话',required:true},
        account:{text:'账号',required:true}
    };
    const onSubmit = (data: object | undefined) => {
        submit("/SupplierManagement/Sales/edit", {id:ref.id,...data}).then(r => {
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

// 设置权限
const setAuth = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        auth_id: {text:"权限", required: true, type:"PairEdit", edit_path:'可选权限'},
        online: { text:'是否开启线上接单',required: true, type:'OpenOrClose'}
    };
    const onSubmit = (data: object | undefined) => {
        submit("/SupplierManagement/Sales/set_auth", {id:ref.id,...data}).then(r => {
            message.success(r.message);
            modalRef.destroy();
            reload();
        });
    };
    const onCancel = () => {
        modalRef.destroy();
    };

    get("/SupplierManagement/Sales/read_auth", { id: ref.id }).then(res => {
        modalRef.update({
            title: "设置权限",
            icon: null,
            content: (
                <ModalForm
                    list={list}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    data={{ ...res.data }}
                />
            ),
            okButtonProps: { className: "hide" },
            cancelButtonProps: { className: "hide" }
        });
    });
};

const list: React.FC<IModPageProps> = ({ route }) => {
    const { viewConfig } = route;
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
    } = useListPage(viewConfig);

    useEffect(() => {
        load();
    }, [pageSize, current]);

    const pageNumChange = (page: number) => {
        setCurrent(page);
    };

    const pageSizeChange = (_Current: number, size: number) => {
        setPageSize(size);
    };

    const actionMap = {
        新增供应商账号:add(load),
        修改供应商账号:edit(load),
        设置供应商权限:setAuth(load)
    };

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);

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
                    <Saler
                        data={item}
                        btns={getRowBtnArray(item, rowBtns)}
                        load={load}
                        key={item["id"]}
                    />
                ))}
            </div>
        </PageHeaderWrapper>
    )
};

export default list;