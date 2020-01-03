import { IRouteValue } from "../routeConfig";
const routes: Array<IRouteValue> = [
  {
    parent: "/",
    routes: [
        {
            name: "产品班期",
            icon: "sitemap",
            path: "/productStore",
            routes: [
              {
                path: "/productStore/product/list",
                name: "产品管理",
                authority: "产品管理",
                component: "./productStore/product/list"
              },
            ]
        },
    ]
  }
];

export default routes;