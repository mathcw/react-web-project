import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/xsp/www/react-web-project/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BlankLayout" */ '../../layouts/BlankLayout'),
        })
      : require('../../layouts/BlankLayout').default,
    routes: [
      {
        path: '/user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
            })
          : require('../../layouts/UserLayout').default,
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__user__login" */ '../user/login'),
                })
              : require('../user/login').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BlankLayout" */ '../../layouts/BlankLayout'),
        })
      : require('../../layouts/BlankLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
            })
          : require('../../layouts/SecurityLayout').default,
        routes: [
          {
            path: '/',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
                })
              : require('../../layouts/BasicLayout').default,
            routes: [
              {
                path: '/',
                redirect: '/welcome',
                exact: true,
              },
              {
                name: '办公中心',
                icon: 'sitemap',
                path: '/office',
                routes: [
                  {
                    path: '/office/msg/list',
                    name: '我的消息',
                    authority: '我的消息',
                    viewConfig: '我的消息',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../office/msg/list'),
                        })
                      : require('../office/msg/list').default,
                    exact: true,
                  },
                  {
                    path: '/office/announcement/list',
                    name: '公告通知',
                    authority: '公告通知',
                    viewConfig: '公告通知',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../office/announcement/list'),
                        })
                      : require('../office/announcement/list').default,
                    exact: true,
                  },
                  {
                    path: '/office/msgflow/list',
                    name: '审批任务',
                    authority: '审批任务',
                    viewConfig: '审批任务',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../office/msgflow/list'),
                        })
                      : require('../office/msgflow/list').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: '行政管理',
                icon: 'sitemap',
                path: '/org',
                routes: [
                  {
                    path: '/org/company/list',
                    name: '公司管理',
                    authority: '公司管理',
                    viewConfig: '公司管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/company/list'),
                        })
                      : require('../org/company/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/department/list',
                    name: '部门管理',
                    authority: '部门管理',
                    viewConfig: '部门管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/department/list'),
                        })
                      : require('../org/department/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/employee/list',
                    name: '员工管理',
                    authority: '员工管理',
                    viewConfig: '员工管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/employee/list'),
                        })
                      : require('../org/employee/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/auth/list',
                    name: '权限管理',
                    authority: '权限管理',
                    viewConfig: '权限管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/auth/list'),
                        })
                      : require('../org/auth/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/auth/add',
                    name: '新增权限',
                    authority: '新增权限',
                    viewConfig: '新增权限',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/auth/edit'),
                        })
                      : require('../org/auth/edit').default,
                    exact: true,
                  },
                  {
                    path: '/org/auth/edit',
                    name: '编辑权限',
                    authority: '编辑权限',
                    viewConfig: '编辑权限',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/auth/edit'),
                        })
                      : require('../org/auth/edit').default,
                    exact: true,
                  },
                  {
                    path: '/org/announce/list',
                    name: '公告管理',
                    authority: '公告管理',
                    viewConfig: '公告管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/announce/list'),
                        })
                      : require('../org/announce/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/announce/add',
                    name: '新增公告',
                    authority: '新增公告',
                    viewConfig: '新增公告',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/announce/edit'),
                        })
                      : require('../org/announce/edit').default,
                    exact: true,
                  },
                  {
                    path: '/org/announce/edit',
                    name: '修改公告',
                    authority: '修改公告',
                    viewConfig: '修改公告',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/announce/edit'),
                        })
                      : require('../org/announce/edit').default,
                    exact: true,
                  },
                  {
                    path: '/org/announce/see',
                    name: '查看公告',
                    authority: '查看公告',
                    viewConfig: '查看公告',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/announce/see'),
                        })
                      : require('../org/announce/see').default,
                    exact: true,
                  },
                  {
                    path: '/org/announce/approve',
                    name: '公告审批',
                    authority: '公告审批',
                    viewConfig: '公告审批',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/announce/approve'),
                        })
                      : require('../org/announce/approve').default,
                    exact: true,
                  },
                  {
                    path: '/org/photo/list',
                    name: '头像审批',
                    authority: '管理员头像审批',
                    viewConfig: '管理员头像审批',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/photo/list'),
                        })
                      : require('../org/photo/list').default,
                    exact: true,
                  },
                  {
                    path: '/org/photo/approve',
                    name: '头像审核',
                    authority: '审批管理员头像',
                    viewConfig: '审批管理员头像',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../org/photo/approve'),
                        })
                      : require('../org/photo/approve').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: '商家管理',
                icon: 'sitemap',
                path: '/supplierManagement',
                routes: [
                  {
                    path: '/supplierManagement/tbCompany/list',
                    name: '提报处理',
                    authority: '提报供应商管理',
                    viewConfig: '提报供应商管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/tbCompany/list'),
                        })
                      : require('../supplierManagement/tbCompany/list').default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/xnCompany/list',
                    name: '吸纳审核',
                    authority: '吸纳供应商管理',
                    viewConfig: '吸纳供应商管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/xnCompany/list'),
                        })
                      : require('../supplierManagement/xnCompany/list').default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/company/list',
                    name: '公司管理',
                    authority: '供应商公司管理',
                    viewConfig: '供应商公司管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/company/list'),
                        })
                      : require('../supplierManagement/company/list').default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/department/list',
                    name: '部门管理',
                    authority: '供应商部门管理',
                    viewConfig: '供应商部门管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/department/list'),
                        })
                      : require('../supplierManagement/department/list')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/sales/list',
                    name: '账号管理',
                    authority: '供应商账号管理',
                    viewConfig: '供应商账号管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/sales/list'),
                        })
                      : require('../supplierManagement/sales/list').default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/auth/list',
                    name: '权限管理',
                    authority: '供应商权限管理',
                    viewConfig: '供应商权限管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/auth/list'),
                        })
                      : require('../supplierManagement/auth/list').default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/bindCompany/list',
                    name: '绑定管理',
                    authority: '供应商绑定管理',
                    viewConfig: '供应商绑定管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/bindCompany/list'),
                        })
                      : require('../supplierManagement/bindCompany/list')
                          .default,
                    exact: true,
                  },
                  {
                    path: '/supplierManagement/profilePhoto/list',
                    name: '头像审批',
                    authority: '供应商头像审批',
                    viewConfig: '供应商头像审批',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../supplierManagement/profilePhoto/list'),
                        })
                      : require('../supplierManagement/profilePhoto/list')
                          .default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: '产品管理',
                icon: 'sitemap',
                path: '/productManage',
                routes: [
                  {
                    path: '/productManage/productCheck/list',
                    name: '产品审核',
                    authority: '产品审核',
                    viewConfig: '产品审核',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productManage/productCheck/list'),
                        })
                      : require('../productManage/productCheck/list').default,
                    exact: true,
                  },
                  {
                    path: '/productManage/productCheck/GroupTourCheck',
                    name: '跟团游审批',
                    authority: '审核产品',
                    viewConfig: '跟团游审批',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productManage/productCheck/GroupTourCheck'),
                        })
                      : require('../productManage/productCheck/GroupTourCheck')
                          .default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: '产品班期',
                icon: 'sitemap',
                path: '/productStore',
                routes: [
                  {
                    path: '/productStore/product/list',
                    name: '产品管理',
                    authority: '产品管理',
                    viewConfig: '产品管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/product/list'),
                        })
                      : require('../productStore/product/list').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/add',
                    name: '新增跟团游',
                    authority: '新增跟团游',
                    viewConfig: '新增跟团游',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/edit'),
                        })
                      : require('../productStore/packageTour/edit').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/modify',
                    name: '修改跟团游',
                    authority: '修改跟团游',
                    viewConfig: '修改跟团游',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/edit'),
                        })
                      : require('../productStore/packageTour/edit').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/copy',
                    name: '复制跟团游',
                    authority: '复制跟团游',
                    viewConfig: '复制跟团游',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/edit'),
                        })
                      : require('../productStore/packageTour/edit').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/maintain',
                    name: '维护跟团游',
                    authority: '维护跟团游',
                    viewConfig: '维护跟团游',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/edit'),
                        })
                      : require('../productStore/packageTour/edit').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/read',
                    name: '查看跟团游',
                    authority: '查看跟团游',
                    viewConfig: '查看跟团游',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/edit'),
                        })
                      : require('../productStore/packageTour/edit').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/packageTour/addGroup',
                    name: '跟团游开团',
                    authority: '跟团游开团',
                    viewConfig: '跟团游开团',
                    hideInMenu: true,
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/packageTour/addGroup'),
                        })
                      : require('../productStore/packageTour/addGroup').default,
                    exact: true,
                  },
                  {
                    path: '/productStore/group/list',
                    name: '班期管理',
                    authority: '班期管理',
                    viewConfig: '班期管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../productStore/group/list'),
                        })
                      : require('../productStore/group/list').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: '订单管理',
                icon: 'sitemap',
                path: '/sale',
                routes: [
                  {
                    path: '/sale/placeholder/list',
                    name: '占位确认',
                    authority: '占位管理',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../sale/placeholder/list'),
                        })
                      : require('../sale/placeholder/list').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                parent: '/',
                routes: [
                  {
                    path: '/home/admin',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../Welcome'),
                        })
                      : require('../Welcome').default,
                    exact: true,
                  },
                  {
                    path: '/home/supplier',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          component: () =>
                            import(/* webpackChunkName: "layouts__BasicLayout" */ '../Welcome'),
                        })
                      : require('../Welcome').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path: '/exception/403',
                name: 'not-permission',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/403'),
                    })
                  : require('../exception/403').default,
                hideInMenu: true,
                exact: true,
              },
              {
                path: '/exception/404',
                name: 'not-find',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../404'),
                    })
                  : require('../404').default,
                hideInMenu: true,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                })
              : require('../404').default,
            hideInMenu: true,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/exception/404',
    name: 'not-find',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
        })
      : require('../404').default,
    hideInMenu: true,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/xsp/www/react-web-project/node_modules/_umi-build-dev@1.17.1@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
