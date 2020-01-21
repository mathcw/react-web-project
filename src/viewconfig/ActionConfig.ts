import OrgAction from "@/viewconfig/Action/OrgAction";
import ProductStoreAction from "@/viewconfig/Action/ProductStoreAction";
import ProductManageAction from "@/viewconfig/Action/ProductManageAction";
import SaleAction from "@/viewconfig/Action/SaleAction";
import CheckAction from "@/viewconfig/Action/CheckAction";
import { BasicLayoutProps as ProLayoutProps } from "@ant-design/pro-layout";

export interface IActionPageProps extends ProLayoutProps {
  route: ProLayoutProps["route"] & {
    authority: string;
  };
  location: ProLayoutProps["location"] & {
    state: {};
  };
}

export interface ActionConfigItem {
  [key: string]: {
    directlySubmit?: boolean;
    title?: string;
    confirm?: string;
    path?: string;
    read?: {
      url: string;
      data?: string | object;
    };
    submit?: {
      url: string;
      data?: string | object;
    };
    btns?: {
      [key: string]: {
        text?: string;
      };
    };
  };
}

export const config: ActionConfigItem = { ...OrgAction, ...ProductStoreAction,...ProductManageAction,...SaleAction,...CheckAction };
