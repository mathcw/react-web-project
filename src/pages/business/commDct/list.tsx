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
import styles from './list.less';

// 新增数据字典
const add = (reload: () => void) => () => {
  const modalRef = Modal.info({});
  const list = {
    type_id: { text: "数据类型", required: true, type: "Dict" },
    name: { text: "名称", required: true }
  };
  const onSubmit = (data: any) => {
    submit("/business/CommDct/submit", data).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "新增数据字典",
    icon: null,
    content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} />,
    okButtonProps: { className: "hide" },
    cancelButtonProps: { className: "hide" }
  });
};

// 修改数据字典
const edit = (reload: () => void) => (ref: any) => {
  const modalRef = Modal.info({});
  const list = {
    type_id: { text: "数据类型", required: true, type: "Dict" },
    name: { text: "名称", required: true }
  };
  const onSubmit = (data: object | undefined) => {
    submit("/business/CommDct/submit", {id:ref.id,...data}).then(r => {
      message.success(r.message);
      modalRef.destroy();
      reload();
    });
  };
  const onCancel = () => {
    modalRef.destroy();
  };
  modalRef.update({
    title: "修改数据字典",
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

// 启停数据字典
const toggle = (reload: () => void) => (ref: any) => {
  submit("/business/CommDct/toggle/state", { id:ref.id,state:ref.state }).then(r => {
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
    新增数据字典: add(load),
    修改数据字典: edit(load),
    启停数据字典: toggle(load),
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
