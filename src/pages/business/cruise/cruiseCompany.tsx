import React, { useEffect, useState } from "react";
import { Modal, message, Table } from "antd";
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

import { colDisplay, getModConfig } from "@/utils/utils";
import ModalForm from "@/components/ModalForm";
import { submit, read } from "@/utils/req";
import styles from './list.less';

// 新增邮轮公司
const add = (reload: () => void) => () => {
  const modalRef = Modal.info({});
  const list = {
    name: { text: "邮轮公司名称", required: true }
  };
  const onSubmit = (data: any) => {
    submit("/business/CruiseCompany/submit", data).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "新增邮轮公司",
    icon: null,
    content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} />,
    okButtonProps: { className: "hide" },
    cancelButtonProps: { className: "hide" }
  });
};

// 修改邮轮公司
const edit = (reload: () => void) => (ref: any) => {
  const modalRef = Modal.info({});
  const list = {
    name: { text: "邮轮公司名称", required: true }
  };
  const onSubmit = (data: object | undefined) => {
    submit("/business/CruiseCompany/submit", {id:ref.id,...data}).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "修改邮轮公司",
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

// 邮轮公司日志
const cruiselog = (reload: () => void) => (ref: any) => {
  read("/business/CruiseCompany/read_log", { action: "邮轮公司日志" }, ref, {
    id: "id"
  }).then((res: any) => {
    const data = res["data"];
    const modalRef = Modal.info({});
    modalRef.update({
      title: "日志",
      okText: "确定",
      content: modalContent(data),
      width: 750
    });
  });
};

const modalContent = (data: any[]) => {
  const columns = [
    {
      title: "操作人",
      dataIndex: "account_id",
      width: 100,
      render: (text: string) => <>{colDisplay(text, "Account", {})}</>
    },
    {
      title: "操作时间",
      dataIndex: "create_at",
      width: 200
    },
    {
      title: "动作",
      dataIndex: "action",
      width: 100,
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

  const actionMap = {
    新增邮轮公司: add(load),
    修改邮轮公司: edit(load),
    邮轮公司日志: cruiselog(load),
  };

  const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
  const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);
  const [opCol, setOpCol] = useState<ColumnProps<object>[]>([]);
  
  const cfg = getModConfig(viewConfig);
  useEffect(() => {
    load();
  }, [pageSize, current]);

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
