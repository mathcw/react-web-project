import React, { useEffect } from "react";
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

import { ListTable } from "@/components/Table";
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
  const cfg = getModConfig(authority);
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
      <ListTable
        list={cfg.list || {}}
        dataSource={data}
        rowKey="id"
        btns={rowBtns}
        load={load}
        pagination={false}
      />
    </PageHeaderWrapper>
  );
};

export default list;
