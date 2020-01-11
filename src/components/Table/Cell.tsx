import React, { useEffect, useRef } from "react";
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
  update,
  title,
  type,
  render,
  isOp = false
}) => {
  const [value, setValue] = React.useState(initValue);
  const [error, setError] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const [openShow,setOpenShow] = React.useState(true); //select open /close 状态

  const [initOpenPickerStatus,setInitOpenPickerStatus] = React.useState(true);//picker 的初始open状态
  const [openPicker,setOpenPicker] = React.useState(false);
  const CellRef = useRef<HTMLTableDataCellElement>(null);

  const oldRef = useRef<string | number | undefined>();
  useEffect(() => {
    oldRef.current = value;
  });
  const oldValue = oldRef.current;

  const intputRef = useRef<any>(null);
  const message = `${title}是必填项`;

  const onChange = (newValue?: string | number) => {
    setValue(newValue);
  };

  const errorCheck = () => {
    if (required && !value) {
      return true;
    }
    if (type) {
      switch (type) {
        case 'date':
        case 'time':
          return !moment(value).isValid();
      }
    }
    return false;
  };

  const toggleEdit = () => {
    setEditing(true);
  }

  useEffect(() => {
    if (oldValue !== value) {
      const rest = errorCheck()
      setError(rest);
    }
  }, [value])

  useEffect(() => {
    if (editing) {
      intputRef.current.focus();
    }
  }, [editing])

  useEffect(() => {
    const clickListen = (e: { target: any }) => {
      if(editing){
        if(type){
          if (CellRef.current && CellRef.current !== e.target && !CellRef.current.contains(e.target)) {
            if((type ==='date' ||type === 'time')){
              if(!initOpenPickerStatus && !openPicker){
                setEditing(false);
                if (update) update(rowIndex, dataIndex, value);
              }
            }else if(!openShow){
              setEditing(false);
              if (update) update(rowIndex, dataIndex, value);
            }
          }
        }else if(CellRef.current && CellRef.current !== e.target && !CellRef.current.contains(e.target)){
          setEditing(false);
          if (update) update(rowIndex, dataIndex, value);
        }
      }
    };

    document.addEventListener("click", clickListen, true);

    return () => {
      document.removeEventListener("click", clickListen, true);
    };
  }, [openPicker,initOpenPickerStatus,openShow,editing,type,value,update]);

  const renderEditing = () => {
    if (type) {
      switch (type) {
        case 'date':
          return (
              <DatePicker
                open={initOpenPickerStatus}
                format="YYYY-MM-DD"
                onChange={(date: moment.Moment | null, v: string) => onChange(v)}
                value={moment(value)}
                ref={intputRef}
                onOpenChange={(status:boolean)=>{setOpenPicker(status) ; setInitOpenPickerStatus(status)}}
              />
          )
        case 'time':
          return (
            <TimePicker
              open={initOpenPickerStatus}
              format="HH:mm:ss"
              placeholder="请选择时间"
              onChange={(time: moment.Moment, v: string) => onChange(v)}
              value={moment(value)}
              ref={intputRef}
              onOpenChange={(status:boolean)=>{setOpenPicker(status) ; setInitOpenPickerStatus(status)}}
            />
          )
        case 'intNumber':
          return (
            <InputNumber
              style={{ width: "100%" }}
              onChange={(v: number | undefined) => onChange(v)}
              value={value as number}
              ref={intputRef}
            />
          )
        case 'number':
          return (
            <InputNumber
              step={0.01}
              style={{ width: "100%" }}
              onChange={(v: number | undefined) => onChange(v)}
              value={value as number}
              ref={intputRef}
            />
          )
        default:
          let Enum = getEnum(type, record);
          if (!Enum) {
            Enum = {};
          }
          return (
            <Select
              style={{ width: "100%" }}
              value={value}
              optionFilterProp="children"
              showSearch
              onChange={(v: string | number) => onChange(v)}
              onDropdownVisibleChange={(status:boolean) =>setOpenShow(status)}
              ref={intputRef}
            >
              {Object.keys(Enum).map(key => (
                <Option key={key} value={key}>
                  {Enum[key]}
                </Option>
              ))}
            </Select>
          );
      }
    }

    return (
      <>
        <Input
          style={{ width: "100%" }}
          onChange={e => onChange(e.target.value)}
          value={value}
          ref={intputRef}
        ></Input>
      </>
    );
  }

  return (
    <td className={styles.td} ref={CellRef}>
      {
        isOp && render(record, dataIndex, type, value)
      }
      {
        !isOp && !editable && <div className={styles.noEditble}>
          {render(record, dataIndex, type, value)}
        </div>
      }
      {
        editable && editing && <div className={styles.editing}>
          {renderEditing()}
        </div>
      }
      {
        editable && !editing && <div className={styles.noEditing} onClick={toggleEdit}>
          {render(record, dataIndex, type, value)}
        </div>
      }
      {error && <span className={styles.ErrorMsg}>{message}</span>}
    </td>

  )
};

export default Cell;
