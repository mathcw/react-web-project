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
import RendererWrapper0 from '/Users/wangcheng/www/b2b-front-beta-ts/src/pages/.umi/LocaleWrapper.jsx';
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
                require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
                    name: '公告管理',
                    authority: '公告通知',
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
                        require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
                    path: '/org/auth/list',
                    name: '权限管理',
                    authority: '权限管理',
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
                    component: () =>
                      React.createElement(
                        require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
                    component: () =>
                      React.createElement(
                        require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
                    require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
                require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
        require('/Users/wangcheng/www/b2b-front-beta-ts/node_modules/_umi-build-dev@1.16.8@umi-build-dev/lib/plugins/404/NotFound.js')
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
