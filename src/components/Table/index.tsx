import React, { ReactNodeArray } from "react";
import { Table, Button, Modal } from "antd";
import Cell from "./Cell";
import ActionModal from "./ActionModal";
import styles from "./index.less";
import { IModBtn, ICol } from "@/viewconfig/ModConfig";
import colDisplay, { getRowBtnArray } from "@/utils/utils";

export interface IGrid {
  list: { [field: string]: ICol };
  dataSource: any[];
  btns: IModBtn[];
  updateData?: () => {};
  btnRender?: (
    btns: IModBtn[],
    data: object,
    rs?: () => void
  ) => ReactNodeArray;
  [propName: string]: any;
}

// cell disply
const display = (
  record: object,
  value: string | number,
  dataIndex: string | number,
  type: string
) => {
  if (
    typeof value === undefined ||
    typeof value === null ||
    (typeof value === "string" && value.length === 0)
  ) {
    return <span style={{ minHeight: "30px" }} />;
  }
  if (type) {
    return (
      <span style={{ minHeight: "30px" }}>
        {colDisplay(value, type, record)}
      </span>
    );
  }
  return <span style={{ minHeight: "30px" }}>{value}</span>;
};
// column
const getCols = (
  list: { [field: string]: ICol },
  cellRender: (
    record: object,
    value: string | number,
    dataIndex: string | number,
    type: string
  ) => JSX.Element = display
) => {
  const rst: any[] = [];
  let colWidth: number = 0;

  const windowWidth = window.innerWidth;
  if (Object.keys(list).length > 4) {
    colWidth = (windowWidth - 80) / 4;
  } else {
    colWidth = (windowWidth - 80) / Object.keys(list).length;
  }
  Object.keys(list).forEach(v => {
    const colCfg = list[v];
    // 设置column基础属性
    const col = {
      title: colCfg.text,
      dataIndex: v,
      key: v,
      bordered: true,
      width: colCfg.width ? colCfg.width : colWidth,
      onCell: (record: object, rowIndex: string) => ({
        record,
        initValue: record[v],
        editable: colCfg.editable,
        dataIndex: v,
        rowIndex,
        required: colCfg.required,
        title: colCfg.text,
        type: colCfg.type,
        render: cellRender
      }),
      sorter: (a: object, b: object) => (a[v] > b[v] ? 1 : -1)
    };
    if (colCfg.type) {
      col["type"] = colCfg.type;
    }
    rst.push(col);
  });
  return rst;
};
// row
const defaultRow = ({ ...props }) => <tr {...props} />;
// map props to table props
const getTableProps = (
  list: { [field: string]: ICol } = {},
  dataSource: any[],
  updateData: (
    row: number,
    dataIndex: string | number,
    value: string | number
  ) => void
) => {
  const columns = getCols(list);
  const components = {
    body: {
      row: defaultRow,
      cell: (props: any) => Cell({ update: updateData, ...props })
    }
  };
  let tableWidth = 0;
  if (columns) {
    tableWidth = columns.reduce((acc, cur) => acc + cur.width, 0);
  }
  const scroll = { x: 100 + tableWidth };
  // 列配置 / tr td  /data /默认样式
  return {
    columns,
    components,
    dataSource,
    className: styles.TableStyle,
    scroll
  };
};
// row btn show filter
const btnShowFilter = (btns: IModBtn[], data: any[]) => {
  if (!Array.isArray(data) || !data[0]) {
    return [];
  }
  const rst = [];
  rst.push(data[0]);
  if (!btns) {
    return [];
  }
  const show = new Set<string>();
  btns.forEach(btn => {
    if (btn.show) {
      Object.keys(btn.show).forEach(v => {
        show.add(v);
      });
    }
  });
  const filter = {};
  show.forEach(k => {
    filter[k] = [];
  });
  let flag = false;
  data.forEach(item => {
    flag = false;
    show.forEach(k => {
      if (!filter[k].includes(item[k])) {
        filter[k].push(data[k]);
        flag = true;
      }
    });
    if (flag) {
      rst.push(data);
      flag = false;
    }
  });
  return rst;
};
// get action col width
const actionColWidth = (btns: IModBtn[], dataSource: Object[]) => {
  let width = 0;
  const needToCalc = btnShowFilter(btns, dataSource);

  needToCalc.forEach(data => {
    const rst = getRowBtnArray(data, btns);

    if (rst.length) {
      const rWidth = rst
        .map((action, i) => {
          if (action.text) {
            return action.text.length * 16 + 2 + 30 + (i === 0 ? 0 : 8);
          }
          return 0;
        })
        .reduce((total, cur) => total + cur);
      if (rWidth > width) {
        width = rWidth;
      }
    }
  });
  return width + 16 + 2;
};
// default rowbtns modal render
const renderRowBtns = (btns: IModBtn[], data: any, rs?: () => void) => {
  const rst = getRowBtnArray(btns, data);
  return rst.map((item, index) => (
    <div key={item.authority} className="dib">
      <Button
        icon={item.icon || ""}
        onClick={() => {
          if (!item.onClick) {
            Modal.error({
              title: `${item.text}未配置`,
              content: `${item.text}未配置`
            });
            return;
          }
          item.onClick(data, rs);
        }}
      >
        {item.text || ""}
      </Button>
      {index !== rst.length - 1 && (
        <span style={{ width: "8px", display: "inline-block" }} />
      )}
    </div>
  ));
};
// table
const Grid: (p: IGrid) => any = props => {
  const {
    list,
    dataSource,
    updateData = () => {},
    btns = [],
    btnRender = renderRowBtns,
    ...rst
  } = props;
  const tableProps = getTableProps(list, dataSource, updateData);
  if (Object.keys(btns).length > 0) {
    const col = {
      title: "操作",
      key: "action",
      fixed: "right",
      className: "noOver",
      width: 80,
      onCell: (record: object, rowIndex: number) => ({
        record,
        rowIndex,
        isOp: true,
        render: (data: object) => {
          return (
            <ActionModal
              btns={btns}
              data={data}
              width={actionColWidth(btns, dataSource)}
              renderRowBtns={() => btnRender(btns, data)}
            />
          );
        }
      })
    };
    tableProps.columns.push(col);
  }
  return <Table {...tableProps} {...rst} />;
};

// listTable

export const ListTable: (
  p: IGrid & {
    load: () => void;
  }
) => any = props => {
  const {
    list,
    dataSource,
    load,
    updateData = () => {},
    btns = [],
    btnRender = renderRowBtns,
    ...rst
  } = props;
  const tableProps = getTableProps(list, dataSource, updateData);
  if (Object.keys(btns).length > 0) {
    const col = {
      title: "操作",
      key: "action",
      fixed: "right",
      className: "noOver",
      width: 80,
      onCell: (record: object, rowIndex: number) => ({
        record,
        rowIndex,
        isOp: true,
        render: (data: object) => {
          return (
            <ActionModal
              btns={btns}
              data={data}
              width={actionColWidth(btns, dataSource)}
              renderRowBtns={() => btnRender(btns, data, load)}
            />
          );
        }
      })
    };
    tableProps.columns.push(col);
  }
  return <Table {...tableProps} {...rst} />;
};

export default Grid;
