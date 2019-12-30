import React, { useState, useEffect, useRef, ReactNodeArray } from "react";
import { Icon } from "antd";

import { IModBtn } from "@/viewconfig/ModConfig";

import styles from "./ActionModal.less";
import "animate.css";

interface IActionModal {
  btns: IModBtn[];
  data: object;
  renderRowBtns: (btns: IModBtn[], data: object) => ReactNodeArray;
  width: number;
}

const ActionModal: React.FC<IActionModal> = ({
  btns,
  data,
  renderRowBtns,
  width
}) => {
  const [packUp, setPackUp] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);
  const clickListen = (e: { target: any }) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setPackUp(true);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickListen, true);

    return () => {
      document.removeEventListener("click", clickListen, true);
    };
  }, []);

  return (
    <div className={styles.actionBox}>
      <Icon
        className={styles.actionIcon}
        type="menu"
        onClick={() => setPackUp(!packUp)}
      />
      {!packUp && (
        <span
          className={[
            !packUp ? "animated fadeInRight" : "animated fadeOutRight hide",
            styles.actionModal,
            "modalBtns"
          ].join(" ")}
          style={{ left: -width }}
          ref={ref}
        >
          {renderRowBtns(btns, data)}
          <div className={styles.triangle} />
        </span>
      )}
    </div>
  );
};

export default ActionModal;
