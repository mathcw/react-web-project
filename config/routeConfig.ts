import admin from './routes/admin';
import home from './routes/home';
import supplier from './routes/supplier';

export interface IRouteValue{
    path?: string,
    component?: string,
    authority?: string,
    icon?: string,
    parent?: string,
    name?: string,
    hideInMenu?: boolean,
    redirect?: string,
    routes?: Array<IRouteValue>
};

const config: Array<IRouteValue> = [
  {
    path: '/user',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
    },
    ]
  }
];

function init() {
    let subConfig : Array<IRouteValue>= [];
    let routes : Array<IRouteValue> = [];
    subConfig = [...admin,...supplier,...home];
  
    subConfig.forEach(sub => {
      if (sub.parent && sub.parent === '/' && sub.routes) {
        routes = [...routes,...sub.routes];
      }
    })
    let rootConfig : IRouteValue = {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/SecurityLayout',
          routes: [
              {
              path: '/',
              component: '../layouts/BasicLayout',
              routes:[
                  {
                  path: '/',
                  redirect: '/welcome',
                  },
                  ...routes,
                  {
                  path: '/exception/403',
                  name: 'not-permission',
                  component: './exception/403',
                  hideInMenu: true,
                  },
                  {
                  path: '/exception/404',
                  name: 'not-find',
                  component: './404',
                  hideInMenu: true,
                  },
              ]
              },
              {
              path: '/exception/404',
              name: 'not-find',
              component: './404',
              hideInMenu: true,
              },
          ],
      }]
    };
    config.push(rootConfig);
    config.push({
        path: '/exception/404',
        name: 'not-find',
        component: './404',
        hideInMenu: true,
    })
}

init();

export default config;




