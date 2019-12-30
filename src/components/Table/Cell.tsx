import React, { ReactNodeArray } from "react";
import { Input, Select } from "antd";

import { getEnum } from "@/utils/enum";

const { Option } = Select;

interface ICell {
  initValue: string | number;
  record: object;
  rowIndex: number;
  dataIndex: string | number;
  required: boolean;
  editable: boolean;
  update: (
    row: number,
    dataIndex: string | number,
    value: string | number
  ) => void;
  title: string | number;
  type: string;
  render: (
    record: object,
    value: string | number,
    dataIndex: string | number,
    type: string
  ) => JSX.Element;
  isOp: boolean;
}

const Cell: React.FC<ICell> = ({
  initValue,
  record,
  rowIndex,
  dataIndex,
  required = false,
  editable = false,
  update,
  title,
  type,
  render,
  isOp = false
}) => {
  const [value, setValue] = React.useState(initValue);
  const [error, setError] = React.useState(required && !initValue);
  const message = `${title}是必填项`;

  const onChange = (newValue: string | number) => {
    setValue(newValue);
  };

  const errorCheck = () => {
    if (required && !value) {
      return true;
    }
    return false;
  };

  const save = () => {
    setError(errorCheck());
    if (!error && update) update(rowIndex, dataIndex, value);
  };

  if (isOp) {
    return <td>{render(record, value, dataIndex, type)}</td>;
  }
  // 不可编辑
  if (!editable) {
    return <td>{render(record, value, dataIndex, type)}</td>;
  }
  if (type) {
    let Enum = getEnum(type, record);
    if (!Enum) {
      Enum = {};
    }
    return (
      <td>
        <Select
          style={{ width: "100%" }}
          getPopupContainer={node => node}
          value={value}
          optionFilterProp="children"
          showSearch
          onBlur={save}
          onChange={(v: string | number) => onChange(v)}
        >
          {Object.keys(Enum).map(key => (
            <Option key={key} value={key}>
              {Enum[key]}
            </Option>
          ))}
        </Select>
        {error && <span>{message}</span>}
      </td>
    );
  }

  return (
    <td>
      <Input
        style={{ width: "100%" }}
        onBlur={save}
        onChange={e => onChange(e.target.value)}
        value={value}
      ></Input>
      {error && <span>{message}</span>}
    </td>
  );
};

export default Cell;
