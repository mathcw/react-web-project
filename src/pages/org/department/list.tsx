import React, { useEffect, useState } from "react";
import { Modal, message, Table } from "antd";
import PageHeaderWrapper, {
  Extra,
  Content
} from "@/components/PageHeaderWrapper";
import ModalForm from "@/components/ModalForm";

import { IModPageProps } from "@/viewconfig/ModConfig";
import {
  useListPage,
  useListPageBtn,
  useListPageSearch
} from "@/utils/ListPageHooks";

import {colDisplay, getModConfig } from "@/utils/utils";
import { submit, read } from "@/utils/req";
import Grid, { getCols, actionColWidth, renderRowBtns } from '@/components/Table/Grid';
import ActionModal from "@/components/Table/ActionModal";
import { ColumnProps } from "antd/es/table";
import styles from './list.less';

// 新增部门
const add = (reload: () => void) => () => {
  const modalRef = Modal.info({});
  const list = {
    company_id: { text: "公司名称", required: true, type: "Company" },
    name: { text: "部门名称", required: true }
  };
  const onSubmit = (data: any) => {
    submit("/org/Department/submit", data).then(r => {
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

// 修改部门
const edit = (reload: () => void) => (ref: any) => {
  const modalRef = Modal.info({});
  const list = {
    company_id: { text: "公司名称", required: true, type: "Company" },
    name: { text: "部门名称", required: true }
  };
  const onSubmit = (data: object | undefined) => {
    submit("/org/Department/submit", {id:ref.id,...data}).then(r => {
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
// 设置领导
const setLoader = (reload: () => void) => (ref: any) => {
  const modalRef = Modal.info({});
  const list = {
    leader_ids: { text: "领导", multi: true, type: "EmpAccount" }
  };
  const onSubmit = (data: object | undefined) => {
    submit("/org/Department/set_leader", {id:ref.id,...data}).then(r => {
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
    title: "设置部门领导",
    // eslint-disable-next-line max-len
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
const modalContent = (data: any[]) => {
  const columns = [
    {
      title: "字段名称",
      dataIndex: "field",
      width: 150
    },
    {
      title: "变更人",
      dataIndex: "employee_id",
      width: 100,
      render: (text: string) => <>{colDisplay(text, "Account", {})}</>
    },
    {
      title: "行为",
      dataIndex: "log_type",
      width: 100,
      render: (text: string) => <>{colDisplay(text, "LogType", {})}</>
    },
    {
      title: "修改时间",
      dataIndex: "last_update",
      width: 200
    },
    {
      title: "修改前",
      dataIndex: "before",
      width: 100
    },
    {
      title: "修改后",
      dataIndex: "after",
      width: 100
    }
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
  );
};
// 部门日志
const departmentLog = (reload: () => void) => (ref: any) => {
  read("/org/Department/read_log", { action: "部门修改日志" }, ref, {
    id: "id"
  }).then((res: any) => {
    const data = res["data"]["数据日志"];
    const modalRef = Modal.info({});
    modalRef.update({
      title: "日志",
      okText: "确定",
      content: modalContent(data),
      width: 750
    });
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
    新增部门: add(load),
    修改部门: edit(load),
    设置部门领导: setLoader(load),
    部门修改日志: departmentLog(load)
  };

  const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
  const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);
  const [opCol, setOpCol] = useState<ColumnProps<object>[]>([]);
  const cfg = getModConfig(viewConfig);
  useEffect(() => {
    load();
  }, [pageSize, current]);

  const pageNumChange = (page: number) => {
    setCurrent(page);
  };

  const pageSizeChange = (_Current: number, size: number) => {
    setPageSize(size);
  };

  useEffect(()=>{
    const rst:ColumnProps<object>[] = [
      {
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
      }
    ];
    setOpCol(rst);
  },[data])

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
