import { BasicLayoutProps as ProLayoutProps } from "@ant-design/pro-layout";
import { ButtonType, ButtonSize } from "antd/lib/button";

import OfficeMod from "@/viewconfig/Mod/OfficeMod";
import OrgMod from "@/viewconfig/Mod/OrgMod";
import SupplierManagementMod from "@/viewconfig/Mod/SupplierManagementMod";
import ProductStoreMod from "@/viewconfig/Mod/ProductStoreMod";

export interface IModBtn {
  authority: string;
  text?: string;
  icon?: string;
  type?: ButtonType;
  size?: ButtonSize;
  show?: object;
  onClick?: (data?: object, rs?: () => void) => void;
}

export interface IModPageProps extends ProLayoutProps {
  route: ProLayoutProps["route"] & {
    authority: string;
  };
}

export interface ICol {
  text: string;
  editable?: boolean;
  required?: boolean;
  type?: string;
  width?: number;
}

export interface ModConfigItem {
  [key: string]: {
    read?: {
      url: string;
      data?: string[];
    };
    title?: string;
    textSearch?: object;
    dropDownSearch?: object;
    headerButtons?: object;
    rowButtons?: object;
    pageSizeOptions?: Array<string>;
    pageSize?: number;
    list?: { [field: string]: ICol };
  };
}

export const config: ModConfigItem = { ...OfficeMod, ...OrgMod, ...SupplierManagementMod, ...ProductStoreMod };

export function authMetaInit(authData: string[]) {
  // eslint-disable-next-line array-callback-return
  Object.keys(config).map(mod => {
    if (authData.indexOf(mod) === -1) {
      delete config[mod];
      return;
    }

    if (config[mod].headerButtons) {
      const headerBtn = {};
      const btns = { ...config[mod].headerButtons };
      // eslint-disable-next-line array-callback-return
      Object.keys(btns).map(btn => {
        if (authData.indexOf(btn) === -1) {
          return;
        }
        headerBtn[btn] = btns[btn];
      });
      config[mod].headerButtons = { ...headerBtn };
    }
    if (config[mod].rowButtons) {
      const rowBtn = {};
      const btns = { ...config[mod].rowButtons };
      // eslint-disable-next-line array-callback-return
      Object.keys(btns).map(btn => {
        if (authData.indexOf(btn) === -1) {
          return;
        }
        rowBtn[btn] = btns[btn];
      });
      config[mod].rowButtons = { ...rowBtn };
    }
  });
}
