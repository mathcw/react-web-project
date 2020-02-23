import { IRouteValue } from "../routeConfig";
const routes: Array<IRouteValue> = [
  {
    parent: "/",
    routes: [
        {
            name: "产品班期",
            path: "/productStore",
            routes: [
              {
                path: "/productStore/product/list",
                name: "产品管理",
                authority: "产品管理",
                viewConfig:"产品管理",
                component: "./productStore/product/list"
              },
              {
                path: "/productStore/packageTour/add",
                name: "新增跟团游",
                authority: "新增跟团游",
                viewConfig:"新增跟团游",
                hideInMenu: true,
                component: "./productStore/packageTour/edit"
              },
              {
                path: "/productStore/packageTour/modify",
                name: "修改跟团游",
                authority: "修改跟团游",
                viewConfig:"修改跟团游",
                hideInMenu: true,
                component: "./productStore/packageTour/edit"
              },
              {
                path: "/productStore/packageTour/copy",
                name: "复制跟团游",
                authority: "复制跟团游",
                viewConfig:"复制跟团游",
                hideInMenu: true,
                component: "./productStore/packageTour/edit"
              },
              {
                path: "/productStore/packageTour/maintain",
                name: "维护跟团游",
                authority: "维护跟团游",
                viewConfig:"维护跟团游",
                hideInMenu: true,
                component: "./productStore/packageTour/edit"
              },
              {
                path: "/productStore/packageTour/read",
                name: "查看跟团游",
                authority: "查看跟团游",
                viewConfig: "查看跟团游",
                hideInMenu: true,
                component: "./productStore/packageTour/edit"
              },
              // 开团
              {
                path: "/productStore/packageTour/addGroup",
                name:"跟团游开团",
                authority:"跟团游开团",
                viewConfig:"跟团游开团",
                hideInMenu: true,
                component: "./productStore/packageTour/addGroup"
              },
              // 团期
              {
                path: "/productStore/group/list",
                name: "班期管理",
                authority: "班期管理",
                viewConfig: "班期管理",
                component: "./productStore/group/list"
              },
            ]
        },
        {
          name:'订单管理',
          path:'/sale',
          routes:[
            {
              path:"/sale/placeholder/list",
              name:"占位确认",
              authority:"占位管理",
              viewConfig:"占位管理",
              component:"./sale/placeholder/list"
            },
            {
              path:"/sale/order/list",
              name:"实报管理",
              authority:"实报管理",
              viewConfig:"实报管理",
              component:"./sale/order/list"
            },
            {
              path:"/sale/order/approve",
              name:"实报审批",
              authority:"审批订单",
              viewConfig:"审批订单",
              component:"./sale/order/approve",
              hideInMenu:true
            },
            {
              path:"/sale/orderChange/list",
              name:"变更管理",
              authority:"订单变更",
              viewConfig:"订单变更",
              component:"./sale/orderChange/list"
            },
            {
              path:"/sale/orderChange/check",
              name:"变更审批",
              authority:"确认变更",
              viewConfig:"报名确认变更",
              component:"./sale/orderChange/approve",
              hideInMenu:true
            },
            {
              path:"/sale/orderChange/jdCheck",
              name:"变更审批",
              authority:"确认变更",
              viewConfig:"接单确认变更",
              component:"./sale/orderChange/jdApprove",
              hideInMenu:true
            },
          ]
        },
        {
          name:'对账管理',
          path:'/saleCheck',
          routes:[
            {
              path:"/saleCheck/ysCheck/list",
              name:"应收对账",
              authority:"对账管理",
              viewConfig:"对账管理",
              component:"./saleCheck/ysCheck/list"
            },
            {
              path:"/saleCheck/yzCheck/list",
              name:"内转对账",
              authority:"应转对账管理",
              viewConfig:"应转对账管理",
              component:"./saleCheck/yzCheck/list"
            },
          ]
        },
    ]
  }
];

export default routes;