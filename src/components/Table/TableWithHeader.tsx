import React from "react";
import { Col, Divider, Button, Modal } from "antd";
import Grid, { IGrid } from "./index";
import styles from "./TableWithHeader.less";
import { IModBtn } from "@/viewconfig/ModConfig";

const renderHeaderBtns = (btns: IModBtn[]) => (
  <div className={[styles.HeaderOp, btns.length > 0 ? "" : "hide"].join(" ")}>
    {btns.map(btn => (
      <div key={btn.authority} className="dib">
        <Button
          icon={btn.icon}
          type={btn.type}
          size={btn.size}
          onClick={() => {
            if (!btn.onClick) {
              Modal.error({
                title: `${btn.text || ""}未配置`,
                content: `${btn.text || ""}未配置`
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

const renderHeader = (title: string, headerBtns: IModBtn[]) => (
  <Col className={styles.title}>
    <Col className={styles.text}> {title} </Col>
    {renderHeaderBtns(headerBtns)}
  </Col>
);

interface IBlock extends IGrid {
  title: string;
  headerBtns: IModBtn[];
}
const Block: (p: IBlock) => JSX.Element = ({
  title,
  headerBtns = [],
  ...tableProps
}) => (
  <Col className={styles.Header}>
    <Col> {renderHeader(title, headerBtns)} </Col>
    <Divider style={{ margin: 0 }} />
    <Grid {...tableProps} />
  </Col>
);

export default Block;
