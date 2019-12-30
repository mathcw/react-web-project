import { ModConfigItem } from "@/viewconfig/ModConfig";

const config: ModConfigItem = {
  权限管理: {
    read: { url: "/api/org/Auth/read" },
    title: "权限设置",
    textSearch: {
      name: { text: "权限名称" },
      members: { text: "角色成员" }
    },
    dropDownSearch: {
      state: { text: "启停状态", type: "State" }
    },
    headerButtons: {
      新增权限: { text: "新增" }
    },
    rowButtons: {
      编辑权限: { text: "编辑" }
    },
    pageSizeOptions: ["10", "20", "30", "50", "100"],
    pageSize: 100
  },
  公司管理: {
    read: { url: "/api/org/Company/read" },
    title: "公司管理",
    textSearch: {
      name: { text: "名称" }
    },
    dropDownSearch: {},
    headerButtons: {
      新增公司: { text: "新增" }
    },
    rowButtons: {
      修改公司: { text: "修改" },
      删除公司: { text: "删除" },
      启停公司: { text: "启停" },
      设置公司领导: { text: "设置领导" },
      公司修改日志: { text: "日志" }
    },
    list: {
      name: { text: "公司名称", width: 200 },
      leader_names: { text: "公司领导", width: 300 },
      employee_name: { text: "创建人", width: 200 },
      dep_num: { text: "旗下部门", width: 200 },
      state: { text: "启停状态", type: "State" }
    }
  },
  部门管理: {
    read: { url: "/api/org/Department/read" },
    title: "部门管理",
    textSearch: {
      name: { text: "名称" }
    },
    dropDownSearch: {
      company_id: { text: "公司", type: "Company" }
    },
    headerButtons: {
      新增部门: { text: "新增" }
    },
    rowButtons: {
      修改部门: { text: "修改" },
      删除部门: { text: "删除" },
      设置部门领导: { text: "设置领导" },
      部门修改日志: { text: "日志" }
    },
    list: {
      company_name: { text: "公司名称", width: 200 },
      name: { text: "部门名称", width: 300 },
      leader_names: { text: "部门领导", width: 300 },
      emp_num: { text: "旗下员工", width: 200 },
      employee_name: { text: "创建人", width: 200 },
      state: { text: "启停状态", type: "State" }
    }
  },
  员工管理: {
    read: { url: "/api/org/Employee/read" },
    title: "员工管理",
    textSearch: {
      company_name: { text: "公司全称" },
      department_name: { text: "部门名称" }
    },
    dropDownSearch: {
      company_id: { text: "创建公司", type: "Company" },
      department_id: { text: "创建部门", type: "Department" },
      employee_id: { text: "创建人", type: "Employee" }
    },
    headerButtons: {
      新增员工: { text: "新增" }
    },
    rowButtons: {
      修改员工: { text: "修改" },
      启停员工: { text: "启停" },
      设置员工权限: { text: "设置" },
      重置员工账号密码: { text: "重置" }
    }
  }
};

export default config;
