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
  };

  const { headerBtns, rowBtns } = useListPageBtn(authority, actionMap);
  const { dropDownSearch, textSearch } = useListPageSearch(authority);
  const [opCol, setOpCol] = useState<ColumnProps<object>[]>([]);
  
  const cfg = getModConfig(authority);
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
