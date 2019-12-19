import {IRouteValue} from '../routeConfig';
const routes:Array<IRouteValue> = [
    {
      parent: '/',
      routes: [
        {
          name :'办公中心',
          icon:'sitemap',
          path:'/office',
          routes:[
            {
                path: '/office/msg/list',
                name: '我的消息',
                authority:'我的消息',
                component: './office/msg/list',
            },
            {
                path: '/office/announcement/list',
                name: '公告管理',
                authority:'公告通知',
                component:'./office/announcement/list'
            },
            {
                path: '/office/msgflow/list',
                name: '审批任务',
                authority:'审批任务',
                component:'./office/msgflow/list'
            },
          ]
        },
        {
          name :'行政管理',
          icon: 'sitemap',
          path: '/org',
          routes:[
            {
              path: '/org/auth/list',
              name: '权限管理',
              authority: '权限管理',
              component: './org/auth/list',
            },
            {
              path: '/org/auth/add',
              name: '新增权限',
              authority: '新增权限',
              hideInMenu: true,
              component: './org/auth/edit',
            },
            {
              path: '/org/auth/edit',
              name: '编辑权限',
              authority: '编辑权限',
              hideInMenu: true,
              component: './org/auth/edit',
            }
          ]
        }
      ],
    }
  ];

  export default routes;