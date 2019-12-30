import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
  新增权限: {
    title: "新增权限",
    path: "/org/auth/add",
    read: { url: "/api/org/Auth/read_new" },
    submit: { url: "/api/org/Auth/submit", data: "auth" },
    btns: {
      关闭: { text: "取消" },
      提交: { text: "提交" }
    }
  },
  编辑权限: {
    title: "编辑权限",
    path: "/org/auth/edit",
    read: { url: "/api/org/Auth/read_modify", data: { id: "id" } },
    submit: { url: "/api/org/Auth/submit", data: "auth" },
    btns: {
      关闭: { text: "取消" },
      提交: { text: "提交" }
    }
  },
  // 公司
  启停公司: {
    directlySubmit: true,
    submit: {
      url: "/api/org/Company/toggle/state",
      data: { id: "id", state: "state" }
    }
  }
};

export default config;
