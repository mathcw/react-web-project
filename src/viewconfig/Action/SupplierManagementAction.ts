import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    新增供应商公司:{
        title: "新增供应商",
        path:"/supplierManagement/company/add",
        submit: { url: "/SupplierManagement/Company/submit"},
        btns: {
          关闭: { text: "关闭" },
          提交: { text: "提交" }
        }
    },
    修改供应商公司:{
        title:"修改供应商",
        path:"/supplierManagement/company/modify",
        read: { url: "/SupplierManagement/Company/read_supp", data: { id: 'id' } },
        submit: { url: "/SupplierManagement/Company/submit"},
        btns: {
          关闭: { text: "关闭" },
          提交: { text: "提交" }
        }
    }
};

export default config;