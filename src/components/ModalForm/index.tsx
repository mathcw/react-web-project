import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  TimePicker,
  Col,
  InputNumber,
  Button
} from "antd";
import { getEnum } from "@/utils/enum";

import styles from "./index.less";
import { ModeOption } from "antd/lib/select";
import { FormItemProps } from "antd/lib/form";

const { Option } = Select;

interface ICfg {
  text: string; //label 名
  editable?: boolean; // 可否编辑
  required?: boolean; // 是否必填
  type?: string; // 类型
  width?: number; // 宽度
}

interface IModalForm {
  list: {
    [field: string]: ICfg;
  };
  data?: object;
  onSubmit?: (p: any) => void;
  onCancel?: () => void;
  change?: (field: string, val: any, rst: any) => object;
}

const initFormItemMap = (list: { [field: string]: ICfg }) => {
  const rst: { [field: string]: FormItemProps } = {};
  Object.keys(list).forEach(field => {
    rst[field] = {
      label: (
        <label className={list[field].required ? "ant-form-item-required" : ""}>
          {list[field].text}
        </label>
      )
    };
  });
  return rst;
};

const ModalForm: React.FC<IModalForm> = ({
  list,
  data: ref,
  onSubmit,
  onCancel,
  change
}) => {
  const [data, setData] = useState(ref || {});
  const [formItemMap, setFormItemMap] = useState(initFormItemMap(list));

  const check = () => {
    const checkMap = { ...formItemMap };
    let rst = true;
    Object.keys(list).forEach(field => {
      if (list[field].required && !data[field]) {
        checkMap[field] = {
          ...checkMap[field],
          validateStatus: "error",
          help: `请输入${list[field].text} !`
        };
        rst = false;
      } else {
        checkMap[field] = {
          ...checkMap[field],
          validateStatus: "",
          help: null
        };
      }
    });
    setFormItemMap({ ...checkMap });
    return rst;
  };

  const onSelectChange = (field: string, val: any) => {
    let afterCusChange: object | undefined = undefined;
    const rst: any = { ...data };
    rst[field] = val;
    if (change) {
      afterCusChange = change(field, val, { ...rst });
      setData({ ...afterCusChange });
    } else {
      setData({ ...rst });
    }
  };

  const onChange = (field: string, val: any) => {
    const rst: any = { ...data };
    rst[field] = val;
    let afterCusChange: object | undefined = undefined;
    if (change) {
      afterCusChange = change(field, val, rst);
      setData({ ...afterCusChange });
    } else {
      setData({ ...rst });
    }
  };

  const onBlur = () => {
    check();
  };

  const renderArraySelect = (
    cfg: any,
    field: string,
    disabled: boolean = false
  ) => {
    const Enum = getEnum(cfg, data) || [];
    let mode: ModeOption = "default";
    if (cfg.multi) {
      mode = "multiple";
    }
    return (
      <Select
        showSearch
        optionFilterProp="children"
        mode={mode}
        onChange={(val: any) => onSelectChange(field, val)}
        getPopupContainer={node => node}
        disabled={disabled}
        value={data[field]}
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={Enum[key]}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  const renderEnumSelect = (
    cfg: any,
    field: string,
    disabled: boolean = false
  ) => {
    const Enum = getEnum(cfg, data) || {};
    let mode: ModeOption = "default";
    if (cfg.multi) {
      mode = "multiple";
    }
    return (
      <Select
        showSearch
        optionFilterProp="children"
        mode={mode}
        onChange={(val: any) => onSelectChange(field, val)}
        getPopupContainer={node => node}
        disabled={disabled}
        value={data[field]}
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={key}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  const submit = () => {
    const rst = check();
    if (rst && onSubmit) {
      onSubmit(data);
    }
  };

  const cancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <React.Fragment>
      <Col className={styles.ModalForm}>
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
          {Object.keys(list).map(field => (
            <>
              {list[field].editable === false && !list[field].type && (
                <Form.Item
                  style={{ margin: "12px 0" }}
                  label={list[field].text}
                  key={field}
                  {...formItemMap[field]}
                >
                  <Input value={data[field] || ""} readOnly />
                </Form.Item>
              )}
              {list[field].editable === false &&
                list[field].type &&
                (list[field].type === "number" ||
                  list[field].type === "date" ||
                  list[field].type === "time") && (
                  <Form.Item
                    style={{ margin: "12px 0" }}
                    label={list[field].text}
                    key={field}
                    {...formItemMap[field]}
                  >
                    <Input value={data[field] || ""} readOnly />
                  </Form.Item>
                )}
              {list[field].editable === false &&
                list[field].type &&
                list[field].type === "ArrayEdit" && (
                  <Form.Item
                    style={{ margin: "12px 0" }}
                    label={list[field].text}
                    key={field}
                    {...formItemMap[field]}
                  >
                    {renderArraySelect(list[field], field, true)}
                  </Form.Item>
                )}
              {list[field].editable === false &&
                list[field].type &&
                list[field].type !== "number" &&
                list[field].type !== "date" &&
                list[field].type !== "time" &&
                list[field].type !== "ArrayEdit" && (
                  <Form.Item
                    style={{ margin: "12px 0" }}
                    label={list[field].text}
                    key={field}
                    {...formItemMap[field]}
                  >
                    {renderEnumSelect(list[field], field, true)}
                  </Form.Item>
                )}
              {list[field].editable !== false && !list[field].type && (
                <Form.Item
                  style={{ margin: "12px 0" }}
                  label={list[field].text}
                  key={field}
                  {...formItemMap[field]}
                >
                  <Input
                    value={data[field] || ""}
                    onBlur={onBlur}
                    onChange={e => onChange(field, e.target.value)}
                  />
                </Form.Item>
              )}
              {list[field].editable !== false && list[field].type === "number" && (
                <Form.Item
                  style={{ margin: "12px 0" }}
                  label={list[field].text}
                  key={field}
                  {...formItemMap[field]}
                >
                  <InputNumber
                    value={data[field] || ""}
                    onBlur={onBlur}
                    onChange={val => onChange(field, val)}
                  />
                </Form.Item>
              )}
              {list[field].editable !== false && list[field].type === "date" && (
                <Form.Item
                  style={{ margin: "12px 0" }}
                  label={list[field].text}
                  key={field}
                  {...formItemMap[field]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    onChange={val => onChange(field, val)}
                  />
                </Form.Item>
              )}
              {list[field].editable !== false && list[field].type === "time" && (
                <Form.Item
                  style={{ margin: "12px 0" }}
                  label={list[field].text}
                  key={field}
                  {...formItemMap[field]}
                >
                  <TimePicker
                    style={{ width: "100%" }}
                    format="HH:mm"
                    onChange={val => onChange(field, val)}
                  />
                </Form.Item>
              )}
              {list[field].editable !== false &&
                list[field].type === "ArrayEdit" && (
                  <Form.Item
                    style={{ margin: "12px 0" }}
                    label={list[field].text}
                    key={field}
                    {...formItemMap[field]}
                  >
                    {renderArraySelect(list[field], field)}
                  </Form.Item>
                )}
              {list[field].editable !== false &&
                list[field].type &&
                list[field].type !== "text" &&
                list[field].type !== "number" &&
                list[field].type !== "date" &&
                list[field].type !== "time" &&
                list[field].type !== "ArrayEdit" &&
                list[field].type !== "PairEdit" && (
                  <Form.Item
                    style={{ margin: "12px 0" }}
                    label={list[field].text}
                    key={field}
                    {...formItemMap[field]}
                  >
                    {renderEnumSelect(list[field], field)}
                  </Form.Item>
                )}
            </>
          ))}
        </Form>
      </Col>
      <Col className={styles.footerBtnBox}>
        <Form.Item key="cancel" className={styles.footerBtn}>
          <Button
            type="primary"
            onClick={() => {
              cancel();
            }}
          >
            取消
          </Button>
        </Form.Item>
        <Form.Item key="submit" className={styles.footerBtn}>
          <Button
            type="primary"
            onClick={() => {
              submit();
            }}
          >
            确定
          </Button>
        </Form.Item>
      </Col>
    </React.Fragment>
  );
};

export default ModalForm;
