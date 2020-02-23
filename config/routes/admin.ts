import { IRouteValue } from "../routeConfig";
const routes: Array<IRouteValue> = [
  {
    parent: "/",
    routes: [
      {
        name: "办公中心",
        path: "/office",
        routes: [
          {
            path: "/office/msg/list",
            name: "我的消息",
            authority: "我的消息",
            viewConfig: "我的消息",
            component: "./office/msg/list"
          },
          {
            path: "/office/announcement/list",
            name: "公告通知",
            authority: "公告通知",
            viewConfig: "公告通知",
            component: "./office/announcement/list"
          },
          {
            path:"/office/announcement/see",
            name:"查看公告",
            viewConfig:"查看公告公告通知",
            hideInMenu:true,
            component:"./org/announce/see",
          },
          {
            path: "/office/msgflow/list",
            name: "审批任务",
            authority: "审批任务",
            viewConfig: "审批任务",
            component: "./office/msgflow/list"
          }
        ]
      },
      {
        name: "行政管理",
        path: "/org",
        routes: [
          {
            path: "/org/company/list",
            name: "公司管理",
            authority: "公司管理",
            viewConfig: "公司管理",
            component: "./org/company/list"
          },
          {
            path: "/org/department/list",
            name: "部门管理",
            authority: "部门管理",
            viewConfig:"部门管理",
            component: "./org/department/list"
          },
          {
            path: "/org/employee/list",
            name: "员工管理",
            authority: "员工管理",
            viewConfig: "员工管理",
            component: "./org/employee/list"
          },
          {
            path: "/org/auth/list",
            name: "权限管理",
            authority: "权限管理",
            viewConfig: "权限管理",
            component: "./org/auth/list"
          },
          {
            path: "/org/auth/add",
            name: "新增权限",
            authority: "新增权限",
            viewConfig:"新增权限",
            hideInMenu: true,
            component: "./org/auth/edit"
          },
          {
            path: "/org/auth/edit",
            name: "编辑权限",
            authority: "编辑权限",
            viewConfig:"编辑权限",
            hideInMenu: true,
            component: "./org/auth/edit"
          },

          {
            path: "/org/announce/list",
            name: "公告管理",
            authority: "公告管理",
            viewConfig: "公告管理",
            component: "./org/announce/list"
          },
          {
            path: "/org/announce/add",
            name: "新增公告",
            authority: "新增公告",
            viewConfig: "新增公告",
            hideInMenu: true,
            component: "./org/announce/edit"
          },
          {
            path: "/org/announce/edit",
            name: "修改公告",
            authority: "修改公告",
            viewConfig:"修改公告",
            hideInMenu: true,
            component: "./org/announce/edit"
          },
          {
            path:"/org/announce/see",
            name:"查看公告",
            viewConfig:"查看公告",
            hideInMenu:true,
            component:"./org/announce/see",
          },
          {
            path:"/org/announce/approve",
            name:"公告审批",
            authority:"公告审批",
            viewConfig:"公告审批",
            hideInMenu:true,
            component:"./org/announce/approve",
          },
          {
            path: "/org/photo/list",
            name: "头像审批",
            authority: "管理员头像审批",
            viewConfig: "管理员头像审批",

            component: "./org/photo/list"
          },
          {
            path: "/org/photo/approve",
            name: "头像审核",
            authority: "审批管理员头像",
            viewConfig:"审批管理员头像",
            hideInMenu:true,
            component: "./org/photo/approve"
          },
        ]
      },
      {
        name: "商家管理",
        path: "/supplierManagement",
        routes: [
          {
            path: "/supplierManagement/tbCompany/list",
            name: "提报处理",
            authority: "提报供应商管理",
            viewConfig: "提报供应商管理",

            component: "./supplierManagement/tbCompany/list"
          },
          // 提报相关action to do
          {
            path: "/supplierManagement/xnCompany/list",
            name: "吸纳审核",
            authority: "吸纳供应商管理",
            viewConfig: "吸纳供应商管理",
            component: "./supplierManagement/xnCompany/list"
          },
          // 吸纳相关action to do
          {
            path: "/supplierManagement/company/list",
            name: "公司管理",
            authority: "供应商公司管理",
            viewConfig: "供应商公司管理",
            component: "./supplierManagement/company/list"
          },
          // 供应商公司管理相关 action to do
          {
            path: "/supplierManagement/department/list",
            name: "部门管理",
            authority: "供应商部门管理",
            viewConfig: "供应商部门管理",
            component: "./supplierManagement/department/list"
          },
          // 供应商部门相关 action to do
          {
            path: "/supplierManagement/sales/list",
            name: "账号管理",
            authority: "供应商账号管理",
            viewConfig: "供应商账号管理",
            component: "./supplierManagement/sales/list"
          },
          // 供应商员工相关 action to do
          {
            path: "/supplierManagement/auth/list",
            name: "权限管理",
            authority: "供应商权限管理",
            viewConfig: "供应商权限管理",
            component: "./supplierManagement/auth/list"
          },
          // 供应商权限相关 action to do
          {
            path: "/supplierManagement/bindCompany/list",
            name: "绑定管理",
            authority: "供应商绑定管理",
            viewConfig: "供应商绑定管理",
            component: "./supplierManagement/bindCompany/list"
          },
          // 供应商绑定相关 action to do
          {
            path:"/supplierManagement/profilePhoto/list",
            name:"头像审批",
            authority:"供应商头像审批",
            viewConfig:"供应商头像审批",
            component:"./supplierManagement/profilePhoto/list"
          }
        ]
      },
      {
        name: "产品管理",
        path: "/productManage",
        routes: [
          {
            path: "/productManage/productCheck/list",
            name: "产品审核",
            authority: "产品审核",
            viewConfig: "产品审核",
            component: "./productManage/productCheck/list"
          },
          {
            path: "/productManage/productCheck/GroupTourCheck",
            name: "跟团游审批",
            authority: "审核产品",
            viewConfig:"跟团游审批",
            hideInMenu:true,
            component: "./productManage/productCheck/GroupTourCheck"
          },
          {
            path: "/productManage/productMaintain/list",
            name: "产品维护",
            authority: "产品维护",
            viewConfig: "产品维护",
            component: "./productManage/productMaintain/list"
          },
          {
            path: "/productManage/productMaintain/GroupTourMaintain",
            name: "跟团游维护",
            authority: "维护产品",
            viewConfig: "跟团游维护",
            hideInMenu:true,
            component: "./productManage/productMaintain/GroupTourMaintain"
          },
        ]
      },
      {
        name: "业务配置",
        path: "/business",
        routes: [
          {
            path: "/business/packagetourNav/primaryNavList",
            name: "一级导航",
            authority: "跟团游导航",
            viewConfig:"一级导航",
            component: "./business/packagetourNav/primaryNavList"
          },
          {
            path: "/business/packagetourNav/secondaryNavList",
            name: "二级导航",
            authority: "跟团游导航",
            viewConfig:"二级导航",
            component: "./business/packagetourNav/secondaryNavList"
          },
          {
            path: "/business/cruise/cruiseCompany",
            name: "邮轮公司",
            authority: "邮轮游导航",
            viewConfig:"邮轮公司",
            component: "./business/cruise/cruiseCompany"
          },
          {
            path: "/business/cruise/cruiseShip",
            name: "船舶名称",
            authority: "邮轮游导航",
            viewConfig:"船舶名称",
            component: "./business/cruise/cruiseShip"
          },
          {
            path: "/business/cruise/cruiseLine",
            name: "邮轮航线",
            authority: "邮轮游导航",
            viewConfig:"邮轮航线",
            component: "./business/cruise/cruiseLine"
          },
          {
            path: "/business/productTheme/list",
            name: "特色标签",
            authority: "特色标签",
            viewConfig:"特色标签",
            component: "./business/productTheme/list"
          },
          {
            path: "/business/commDct/list",
            name: "数据字典",
            authority: "数据字典",
            viewConfig:"数据字典",
            component: "./business/commDct/list"
          },
          {
            path: "/business/city/list",
            name: "城市设置",
            authority: "城市设置",
            viewConfig:"城市设置",
            component: "./business/city/list"
          },
          {
            path: "/business/suppDct/list",
            name: "协议设置",
            authority: "协议设置",
            viewConfig:"协议设置",
            component: "./business/suppDct/list"
          },
        ]
      },
      {
        name: "系统设置",
        path: "/sys",
        routes: [
          {
            path: "/sys/flow/list",
            name: "业务流程",
            authority: "业务流程",
            viewConfig: "业务流程",
            component: "./sys/flow/list"
          },
          {
            path: "/sys/api/list",
            name: "api管理",
            authority: "api管理",
            viewConfig: "api管理",
            component: "./sys/api/list"
          },
          {
            path: "/sys/config/setting",
            name: "参数设置",
            authority: "系统参数设置",
            viewConfig: "系统参数设置",
            component: "./sys/config/setting"
          },
        ]
      },
    ]
  }
];

export default routes;
