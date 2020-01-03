import {IRouteValue} from '../routeConfig';
const routes:Array<IRouteValue> = [
    {
      parent: '/',
      routes: [
        {
          parent: '/',
          routes: [
            {path: '/home/admin', component: './Welcome'},
            {path: '/home/supplier', component: './Welcome'},  
          ],
        }
      ],
    }
  ];

export default routes;