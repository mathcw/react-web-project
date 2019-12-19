import {IRouteValue} from '../routeConfig';
const routes:Array<IRouteValue> = [
    {
      parent: '/',
      routes: [
        {
          parent: '/',
          routes: [
            {path: '/home/admin', component: './Welcome'},
          ],
        }
      ],
    }
  ];

export default routes;