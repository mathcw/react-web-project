import React, { useEffect } from "react";
import { Input, Select, DatePicker, TimePicker, InputNumber } from "antd";

import { getEnum } from "@/utils/enum";
import moment from "moment";

import styles from './Cell.less';

const { Option } = Select;

interface ICell {
  initValue?: string | number;
  record: object;
  rowIndex: number;
  dataIndex: string | number;
  required: boolean;
  editable: boolean;
  tableEditable: boolean;
  update?: (
    row: number,
    dataIndex: string | number,
    value?: string | number
  ) => void;
  title: string | number;
  type: string;
  render: (
    record: object,
    dataIndex: string | number,
    type: string,
    value?: string | number,
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
  tableEditable = false,
  update,
  title,
  type,
  render,
  isOp = false
}) => {
  const [value, setValue] = React.useState(initValue);
  const [error, setError] = React.useState(required && !initValue);
  const message = `${title}是必填项`;

  const onChange = (newValue?: string | number) => {
    setValue(newValue);
  };

  const errorCheck = () => {
    if (required && !value) {
      return true;
    }
    if(type){
      switch(type){
        case 'date':
        case 'time':
          return !moment(value).isValid();
      }
    }
    return false;
  };

  useEffect(()=>{
    const rest = errorCheck()
    setError(rest);
  },[value])

  const save = () => {
    if (update) update(rowIndex, dataIndex, value);
  };

  const pickerChange = (v:string) =>{
    setValue(v);
    if(update) update(rowIndex, dataIndex, v);
  }

  if (isOp) {
    return <td>{render(record, dataIndex, type, value)}</td>;
  }
  // 不可编辑
  if (!tableEditable || !editable) {
    return <td>{render(record, dataIndex, type, value)}</td>;
  }
  if (type) {
    switch (type) {
      case 'date':
        return (
          <td>
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment | null, v: string) => pickerChange(v)}
              value={moment(value)}
            />
            {error && <span className={styles.ErrorMsg}>{message}</span>}
          </td>
        )
      case 'time':
        return (
          <td>
            <TimePicker
              format="HH:mm:ss"
              placeholder="请选择时间"
              onChange={(time: moment.Moment, v: string) => pickerChange(v)}
              value={moment(value)}
            />
            {error && <span className={styles.ErrorMsg}>{message}</span>}
          </td>
        )
      case 'intNumber':
        return (
          <td>
            <InputNumber
              style={{ width: "100%" }}
              onBlur={save}
              onChange={(v: number | undefined) => onChange(v)}
              value={value as number}
            />
            {error && <span className={styles.ErrorMsg}>{message}</span>}
          </td>
        )
      case 'number':
        return (
          <td>
            <InputNumber
              step={0.01}
              style={{ width: "100%" }}
              onBlur={save}
              onChange={(v: number | undefined) => onChange(v)}
              value={value as number}
            />
            {error && <span className={styles.ErrorMsg}>{message}</span>}
          </td>
        )
      default:
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
            {error && <span className={styles.ErrorMsg}>{message}</span>}
          </td>
        );
    }
  }

  return (
    <td>
      <Input
        style={{ width: "100%" }}
        onBlur={save}
        onChange={e => onChange(e.target.value)}
        value={value}
      ></Input>
      {error && <span className={styles.ErrorMsg}>{message}</span>}
    </td>
  );
};

export default Cell;
