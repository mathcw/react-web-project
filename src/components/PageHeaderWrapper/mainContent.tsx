import React from "react";
import {
  Button,
  Input,
  Select,
  Divider,
  Col,
  Row,
  Tooltip,
  Icon,
  Form,
  Modal,
  DatePicker
} from "antd";
import * as PropTypes from "prop-types";

import { getEnum, IEnumCfg } from "@/utils/enum";
import { IModBtn } from "@/viewconfig/ModConfig";
import styles from "./index.less";
import moment from "moment";

const InputGroup = Input.Group;
const SelectOption = Select.Option;

const renderHeaderBtns = (btns?: IModBtn[]) => {
  if (btns) {
    return (
      <div
        className={[styles.HeaderOperator, btns.length > 0 ? "" : "hide"].join(
          " "
        )}
      >
        {btns.map(btn => (
          <div key={btn.authority} className="dib">
            <Button
              icon={btn.icon}
              type={btn.type}
              size={btn.size}
              onClick={() => {
                if (!btn.onClick) {
                  Modal.error({
                    title: `${btn.text}未配置`,
                    content: `${btn.text}未配置`
                  });
                  return;
                }
                btn.onClick();
              }}
            >
              {btn.text || ""}
            </Button>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

class MainContent extends React.Component<
  PropTypes.InferProps<typeof MainContent.propTypes>,
  {
    curType: string;
    more: boolean;
    textQueryType: string;
    textQuery: string;
  }
  > {
  static propTypes: {
    headerButton: PropTypes.Requireable<IModBtn[]>;
    dropDownSearch: PropTypes.Requireable<object>;
    textSearch: PropTypes.Requireable<object>;
    reload: PropTypes.Requireable<() => void>;
    query: PropTypes.Requireable<object>;
    setQuery: PropTypes.Requireable<
      React.Dispatch<React.SetStateAction<object>>
    >;
    mod: PropTypes.Requireable<string>;
  };

  static defaultProps = {
    headerButton: [],
    dropDownSearch: {},
    textSearch: {},
    reload: () => { },
    query: {},
    setQuery: (e: any) => { },
    mod: ""
  };

  constructor(props: PropTypes.InferProps<typeof MainContent.propTypes>) {
    super(props);
    this.state = {
      curType: "lg",
      more: false,
      textQueryType: "",
      textQuery: ""
    };

    this.toggleMore = this.toggleMore.bind(this);

    this.searchReset = this.searchReset.bind(this);
    this.textSearchTypeChange = this.textSearchTypeChange.bind(this);
    this.textSearchChange = this.textSearchChange.bind(this);
    this.resizePageSize = this.resizePageSize.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizePageSize);
    this.resizePageSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizePageSize);
  }

  resizePageSize = () => {
    // 根据basiclayout来确定媒体查询范围.再根据底下配置的span来确定每个范围每个input的占比.
    // xs=24 sm=12 md=6 lg=6
    const curWidth = window.innerWidth;
    let curType = "";
    if (curWidth <= 1599) {
      curType = "xl";
    } else {
      curType = "xxl";
    }
    if (curWidth <= 1199) {
      curType = "lg";
    }
    if (curWidth <= 991) {
      curType = "md";
    }
    if (curWidth <= 767) {
      curType = "sm";
    }
    if (curWidth <= 575) {
      curType = "xs";
    }
    this.setState({ curType });
  };

  refresh = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { reload } = this.props;
    if (reload) reload();
  };

  searchReset = () => {
    const { setQuery } = this.props;
    if (setQuery) setQuery({});
  };

  textSearchTypeChange = (val: any) => {
    const { setQuery } = this.props;
    const { textQueryType } = this.state;
    this.setState({ textQueryType: val });
    if (setQuery) {
      setQuery((preQuery: any) => {
        const newQuery = { ...preQuery };
        if (newQuery[textQueryType]) {
          delete newQuery[textQueryType];
        }
        return newQuery;
      });
    }
  };

  textSearchChange = (e: { target: { value: any } }) => {
    const { setQuery } = this.props;
    const { textQueryType } = this.state;

    const val = e.target.value;
    this.setState({ textQuery: val });
    if (setQuery) {
      setQuery((preQuery: any) => {
        const newQuery = { ...preQuery };
        newQuery[textQueryType] = val;
        return newQuery;
      });
    }
  };

  onDropDownChange = (field: React.ReactText, value: any) => {
    const { setQuery } = this.props;
    if (setQuery) {
      setQuery((preQuery: any) => {
        const newQuery = { ...preQuery };
        newQuery[field] = value;
        return newQuery;
      });
    }
  };

  onDateChange = (field:React.ReactText,value:any) => {
    const { setQuery } = this.props;
    if (setQuery) {
      setQuery((preQuery: any) => {
        const newQuery = { ...preQuery };
        newQuery[field] = value;
        return newQuery;
      });
    }
  }

  toggleMore = () => {
    const { more } = this.state;
    this.setState({
      more: !more
    });
  };

  renderSelect = (cfg: IEnumCfg, field: React.ReactText) => {
    const { query } = this.props;
    if (query) {
      if (cfg.type === 'date') {
        const suffixIcon = <React.Fragment></React.Fragment>;
        if(query[field] && query[field] !== '' && moment.isMoment(moment(query[field]))){
          return (
            <DatePicker
              style={{marginTop:'5px'}}
              placeholder={cfg.text}
              size="small"
              format="YYYY-MM-DD"
              suffixIcon={suffixIcon}
              value={moment(query[field])}
              onChange={(date: moment.Moment | null, value: string) => this.onDateChange(field,value)}
            />
          )
        }
        return (
          <DatePicker
            style={{marginTop:'5px'}}
            placeholder={cfg.text}
            size="small"
            format="YYYY-MM-DD"
            suffixIcon={suffixIcon}
            value={null}
            onChange={(date: moment.Moment | null, value: string) => this.onDateChange(field,value)}
          />
        )
      }

      const Enum = getEnum(cfg, query || {}) || {};
      return (
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          value={query[field]}
          onChange={(value: any) => this.onDropDownChange(field, value)}
          placeholder={cfg.text}
          style={{marginTop:'5px'}}
        >
          {Object.keys(Enum).map(key => (
            <SelectOption key={key} value={key}>
              {Enum[key]}
            </SelectOption>
          ))}
        </Select>
      );
    }
    return null;
  };

  renderMoreSerach = () => {
    const { dropDownSearch } = this.props;
    if (!dropDownSearch) {
      return null;
    }
    const rKeys = Object.keys(dropDownSearch);
    if (rKeys.length === 0) {
      return null;
    }

    const { curType, more } = this.state;

    let rowColumns = 4;
    let showDownIcon = false;
    switch (curType) {
      case "xs":
        rowColumns = 1;
        break;
      case "sm":
        rowColumns = 2;
        break;
      default:
        rowColumns = 4;
    }
    if (rKeys.length > rowColumns) {
      showDownIcon = true;
    }
    const moreTrueStyle = {
      padding: 0,
      height: "32px",
      overflow: "hidden"
    };
    return (
      <Row gutter={16}>
        <Form onSubmit={this.refresh} layout="inline">
          <Col
            xs={24}
            sm={18}
            md={18}
            lg={18}
            style={more ? { padding: 0 } : moreTrueStyle}
          >
            {rKeys &&
              rKeys.map((key: string | number, index) => (
                <React.Fragment key={key}>
                  {
                    more && <Col xs={24} sm={12} md={6} lg={6} >
                      {this.renderSelect(dropDownSearch[key], key)}
                    </Col>
                  }
                  {
                    !more && (index <= rowColumns - 1) && <Col xs={24} sm={12} md={6} lg={6}>
                      {this.renderSelect(dropDownSearch[key], key)}
                    </Col>
                  }
                </React.Fragment>
              ))}
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} style={{ lineHeight: "32px" }}>
            {showDownIcon && !more && (
              <Tooltip placement="top" title="展开">
                <Button
                  onClick={this.toggleMore}
                  size="small"
                  icon="down"
                  shape="circle"
                  style={{ marginRight: 8 }}
                />
              </Tooltip>
            )}
            {showDownIcon && more && (
              <Tooltip placement="top" title="收起">
                <Button
                  onClick={this.toggleMore}
                  size="small"
                  icon="up"
                  shape="circle"
                  style={{ marginRight: 8 }}
                />
              </Tooltip>
            )}
            <Tooltip placement="top" title="搜索">
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                shape="circle"
                icon="search"
                onClick={this.refresh}
              />
            </Tooltip>
            <Tooltip placement="top" title="重置">
              <Button
                onClick={this.searchReset}
                size="small"
                icon="close"
                shape="circle"
                style={{ marginLeft: 8 }}
              />
            </Tooltip>
          </Col>
        </Form>
      </Row>
    );
  };

  render() {
    const { headerButton, textSearch } = this.props;
    const { textQueryType, textQuery } = this.state;
    return (
      <div>
        <Divider style={{ margin: 0 }} />
        {headerButton && renderHeaderBtns(headerButton)}
        <Divider style={{ margin: 0 }} />
        <div className={[styles.HeaderForm, "clear"].join(" ")}>
          <Col xs={24} sm={24} md={16} lg={16}>
            {this.renderMoreSerach()}
          </Col>
          <Col className={styles.rightSearch}>
            <Col>
              <InputGroup compact size="small">
                {textSearch && (
                  <Select
                    defaultValue={textQueryType}
                    size="small"
                    onChange={this.textSearchTypeChange}
                  >
                    {Object.keys(textSearch).map((key: string | number) => (
                      <SelectOption value={key} key={key}>
                        {textSearch[key].text}
                      </SelectOption>
                    ))}
                  </Select>
                )}
                <Input
                  style={{ width: "50%" }}
                  value={textQuery}
                  onChange={this.textSearchChange}
                  placeholder="请输入搜索条件"
                  allowClear
                />
                <Button type="primary" size="small" onClick={this.refresh}>
                  搜索
                </Button>
              </InputGroup>
            </Col>
            <Col className={styles.Icon} style={{ color: "#3FB50B" }}>
              <Tooltip placement="top" title="刷新">
                <Icon type="sync" onClick={this.refresh} />
              </Tooltip>
            </Col>
          </Col>
        </div>
      </div>
    );
  }
}

export default MainContent;
