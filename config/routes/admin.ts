import { IRouteValue } from "../routeConfig";
const routes: Array<IRouteValue> = [
  {
    parent: "/",
    routes: [
      {
        name: "办公中心",
        icon: "sitemap",
        path: "/office",
        routes: [
          {
            path: "/office/msg/list",
            name: "我的消息",
            authority: "我的消息",
            component: "./office/msg/list"
          },
          {
            path: "/office/announcement/list",
            name: "公告管理",
            authority: "公告通知",
            component: "./office/announcement/list"
          },
          {
            path: "/office/msgflow/list",
            name: "审批任务",
            authority: "审批任务",
            component: "./office/msgflow/list"
          }
        ]
      },
      {
        name: "行政管理",
        icon: "sitemap",
        path: "/org",
        routes: [
          {
            path: "/org/company/list",
            name: "公司管理",
            authority: "公司管理",
            component: "./org/company/list"
          },
          {
            path: "/org/department/list",
            name: "部门管理",
            authority: "部门管理",
            component: "./org/department/list"
          },
          {
            path: "/org/employee/list",
            name: "员工管理",
            authority: "员工管理",
            component: "./org/employee/list"
          },
          {
            path: "/org/auth/list",
            name: "权限管理",
            authority: "权限管理",
            component: "./org/auth/list"
          },
          {
            path: "/org/auth/add",
            name: "新增权限",
            authority: "新增权限",
            hideInMenu: true,
            component: "./org/auth/edit"
          },
          {
            path: "/org/auth/edit",
            name: "编辑权限",
            authority: "编辑权限",
            hideInMenu: true,
            component: "./org/auth/edit"
          },

          {
            path: "/org/announce/list",
            name: "公告管理",
            authority: "公告管理",
            component: "./org/announce/list"
          },
          {
            path: "/org/announce/add",
            name: "新增公告",
            authority: "新增公告",
            hideInMenu: true,
            component: "./org/announce/edit"
          },
          {
            path: "/org/announce/edit",
            name: "修改公告",
            authority: "修改公告",
            hideInMenu: true,
            component: "./org/announce/edit"
          },
          {
            path:"/org/announce/see",
            name:"查看公告",
            authority:"查看公告",
            hideInMenu:true,
            component:"./org/announce/see",
          },
          {
            path:"/org/announce/approve",
            name:"公告审批",
            authority:"公告审批",
            hideInMenu:true,
            component:"./org/announce/approve",
          },
          {
            path: "/org/photo/list",
            name: "头像审批",
            authority: "管理员头像审批",
            component: "./org/photo/list"
          },
          {
            path: "/org/photo/approve",
            name: "头像审核",
            authority: "审批管理员头像",
            hideInMenu:true,
            component: "./org/photo/approve"
          },
        ]
      },
      {
        name: "商家管理",
        icon: "sitemap",
        path: "/supplierManagement",
        routes: [
          {
            path: "/supplierManagement/tbCompany/list",
            name: "提报处理",
            authority: "提报供应商管理",
            component: "./supplierManagement/tbCompany/list"
          },
          // 提报相关action to do
          {
            path: "/supplierManagement/xnCompany/list",
            name: "吸纳审核",
            authority: "吸纳供应商管理",
            component: "./supplierManagement/xnCompany/list"
          },
          // 吸纳相关action to do
          {
            path: "/supplierManagement/company/list",
            name: "公司管理",
            authority: "供应商公司管理",
            component: "./supplierManagement/company/list"
          },
          // 供应商公司管理相关 action to do
          {
            path: "/supplierManagement/department/list",
            name: "部门管理",
            authority: "供应商部门管理",
            component: "./supplierManagement/department/list"
          },
          // 供应商部门相关 action to do
          {
            path: "/supplierManagement/sales/list",
            name: "账号管理",
            authority: "供应商账号管理",
            component: "./supplierManagement/sales/list"
          },
          // 供应商员工相关 action to do
          {
            path: "/supplierManagement/auth/list",
            name: "权限管理",
            authority: "供应商权限管理",
            component: "./supplierManagement/auth/list"
          },
          // 供应商权限相关 action to do
          {
            path: "/supplierManagement/bindCompany/list",
            name: "绑定管理",
            authority: "供应商绑定管理",
            component: "./supplierManagement/bindCompany/list"
          },
          // 供应商绑定相关 action to do
          {
            path:"/supplierManagement/profilePhoto/list",
            name:"头像审批",
            authority:"供应商头像审批",
            component:"./supplierManagement/profilePhoto/list"
          }
        ]
      },
    ]
  }
];

export default routes;
