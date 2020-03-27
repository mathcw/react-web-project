import React, { useEffect, useState } from "react";
import PageHeaderWrapper, {
  Extra,
  Content
} from "@/components/PageHeaderWrapper";

import { IModPageProps } from "@/viewconfig/ModConfig";
import {
    useListPage,
    useListPageBtn,
    useListPageSearch
} from "@/utils/ListPageHooks";

import Grid, { getCols, actionColWidth, renderRowBtns } from '@/components/Table/Grid';
import ActionModal from "@/components/Table/ActionModal";
import { ColumnProps } from "antd/es/table";
import { getModConfig } from "@/utils/utils";
import { submit } from "@/utils/req";
import {  message, Modal } from "antd";
import ModalForm from "@/components/ModalForm";
import styles from './list.less';

const add = (reload: () => void) => () => {
    const modalRef = Modal.info({});
    const list = {
        supplier_id: {text:'选择商家',required: true,type:'FullSupplier'},
        name:{text:'部门名称',required: true}
    };
    const onSubmit = (data: any) => {
      submit("/SupplierManagement/Department/submit", data).then(r => {
            message.success(r.message);
            modalRef.destroy();
            reload();
      });
    };
    const onCancel = () => {
        modalRef.destroy();
    };
    modalRef.update({
        title: "新增部门",
        icon: null,
        content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} />,
        okButtonProps: { className: "hide" },
        cancelButtonProps: { className: "hide" }
    });
};

const edit = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        supplier_id: {text:'选择商家',required: true,type:'FullSupplier'},
        name:{text:'部门名称',required: true}
    };
    const onSubmit = (data: object | undefined) => {
        submit("/SupplierManagement/Department/submit", {id:ref.id,...data}).then(r => {
            message.success(r.message);
            modalRef.destroy();
            reload();
        });
    };
    const onCancel = () => {
        modalRef.destroy();
    };
    modalRef.update({
        title: "修改部门",
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

const setLeader = (reload: () => void) => (ref: any) => {
    const modalRef = Modal.info({});
    const list = {
        supplier_id:  { text:'公司名称',type:'FullSupplier',editable:false },
        leader_ids:   { text:'领导',multi:true,type:'SupplierAccount',cascade:'supplier_id'}
    };
    const onSubmit = (data: object | undefined) => {
        submit("/SupplierManagement/Department/set_leader", data).then(r => {
            message.success(r.message);
            modalRef.destroy();
            reload();
        });
    };
    const onCancel = () => {
        modalRef.destroy();
    };
    
    let formData = { ...ref };
    if (ref.leader_ids) {
        const leaders = JSON.parse(ref.leader_ids);
        formData = { ...formData, leader_ids: leaders };
    }
    modalRef.update({
        title: "设置领导",
        icon: null,
        content: (
            <ModalForm
                list={list}
                onSubmit={onSubmit}
                onCancel={onCancel}
                data={{ ...formData }}
            />
        ),
        okButtonProps: { className: "hide" },
        cancelButtonProps: { className: "hide" }
    });
};


const list: React.FC<IModPageProps> = ({ route }) => {
    const { authority,viewConfig } = route;
    const {setCurrent,setPageSize,load,pageSize,current,pageSizeOptions,total,query,setQuery,data } = useListPage(authority,viewConfig);
    const actionMap = {
        新增供应商部门: add(load),
        修改供应商部门: edit(load),
        设置供应商部门领导: setLeader(load)
    };

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);
    const [opCol, setOpCol] = useState<ColumnProps<object>[]>([]);
    
    const cfg = getModConfig(viewConfig);
    useEffect(() => {
        load();
    }, [pageSize, current]);

    useEffect(()=>{
        const rst:ColumnProps<object>[] = [{
            title: "操作",
            key: "action",
            fixed: "right",
            className: "noOver",
            width: 80,
            onCell: (record: object, rowIndex: number) => ({
                record,
                rowIndex,
                isOp: true,
                render: (item: object) => {
                    return (
                        <ActionModal
                          btns={rowBtns}
                          data={item}
                          width={actionColWidth(rowBtns, data)}
                          renderRowBtns={() => renderRowBtns(rowBtns, item,load)}
                        />
                    );
                }
            })
        }];
        setOpCol(rst);
    },[data])

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
                <Grid
                    columns={getCols(cfg.list||{})}
                    dataSource={data}
                    rowKey="id"
                    pagination={false}
                    className={'ListTableStyle'}
                    specCol={opCol}
                />
            </div>
        </PageHeaderWrapper>
    );
};

export default list;
