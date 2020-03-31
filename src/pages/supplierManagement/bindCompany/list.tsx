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
import { message, Modal } from "antd";
import { submit } from "@/utils/req";
import { getModConfig } from "@/utils/utils";
import ModalForm from "@/components/ModalForm";
import styles from './list.less';

const bindDepart = (reload: () => void) => (ref:any) => {
    const modalRef = Modal.info({});
    const list = {
        retailer_name:{text:'绑定客户','editable':false},
        bind_dep_name:{text:'绑定部门','editable':false},
        bind_opinion:{text:'绑定意见',type:'BindOpinion',required:true}
    };
    const onSubmit = (data: any) => {
        submit("/SupplierManagement/Company/bind", {id:ref.id,...data}).then(r => {
            message.success(r.message);
            modalRef.destroy();
            reload();
        });
    };
    const onCancel = () => {
        modalRef.destroy();
    };
    modalRef.update({
        title: "绑定",
        icon: null,
        content: <ModalForm list={list} onSubmit={onSubmit} onCancel={onCancel} data={{ ...ref }}/>,
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
      绑定部门: bindDepart(load)
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
