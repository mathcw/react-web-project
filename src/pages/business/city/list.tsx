import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
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

import Grid, { getCols, actionColWidth, renderRowBtns } from '@/components/Table/Grid';
import ActionModal from "@/components/Table/ActionModal";
import { ColumnProps } from "antd/es/table";

import { getModConfig } from "@/utils/utils";
import { submit } from "@/utils/req";

// 新增城市
const add = (reload: () => void) => () => {
  const modalRef = Modal.info({});
  const list = {
    country: { text: "国家", required: true, type: "Country" },
    name: { text: "名称", required: true }
  };
  const onSubmit = (data: any) => {
    submit("/business/City/submit", data).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "新增城市",
    icon: null,
    content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} />,
    okButtonProps: { className: "hide" },
    cancelButtonProps: { className: "hide" }
  });
};

// 修改城市
const edit = (reload: () => void) => (ref: any) => {
  const modalRef = Modal.info({});
  const list = {
    country: { text: "国家", required: true, type: "Country" },
    name: { text: "名称", required: true }
  };
  const onSubmit = (data: object | undefined) => {
    submit("/business/City/submit", data).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "修改城市",
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

// 删除城市
const destroy = (reload: () => void) => (ref: any) => {
  submit("/business/City/destroy", { id:ref.id}).then(r => {
    message.success(r.message);
    reload();
  });
};

// 启停城市
const toggle = (reload: () => void) => (ref: any) => {
  submit("/business/City/toggle/state", { id:ref.id,state:ref.state }).then(r => {
    message.success(r.message);
    reload();
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

  const actionMap = {
    新增城市: add(load),
    修改城市: edit(load),
    删除城市: destroy(load),
    启停城市: toggle(load),
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
      <Grid
        columns={getCols(cfg.list||{})}
        dataSource={data}
        rowKey="id"
        pagination={false}
        className={'ListTableStyle'}
        specCol={opCol}
      />
    </PageHeaderWrapper>
  );
};

export default list;