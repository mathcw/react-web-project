import {IRouteValue} from '../routeConfig';
const routes:Array<IRouteValue> = [
    {
      parent: '/',
      routes: [
        {
          parent: '/',
          routes: [
            {path: '/home/admin', component: './home/Admin'},
            {path: '/home/supplier', component: './home/Supplier'},  
          ],
        }
      ],
    }
  ];

export default routes;