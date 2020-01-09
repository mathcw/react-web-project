import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
  新增跟团游: {
    title: "新增跟团游",
    path: "/productStore/packageTour/add",
    submit: { url: "/api/ProductStore/PackageTour/submit" },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  },
  修改跟团游: {
    title: "修改跟团游",
    path: "/productStore/packageTour/modify",
    read: { url: "/api/ProductStore/PackageTour/read_edit", data: { main_pd_id: 'main_pd_id' } },
    submit: { url: "/api/ProductStore/PackageTour/submit" },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  },
  复制跟团游: {
    title: "复制跟团游",
    path: "/productStore/packageTour/copy",
    read: { url: "/api/ProductStore/PackageTour/read_copy", data: { main_pd_id: 'main_pd_id' } },
    submit: { url: "/api/ProductStore/PackageTour/submit" },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  },
  提交跟团游: {
    directlySubmit: true,
    submit: {
      url: "/api/ProductStore/PackageTour/submitFor",
      data: "main_pd_id"
    }
  },
  取消跟团游:{
    directlySubmit: true,
    confirm:'确认取消吗？',
    submit:{
      url:"/api/comm/Flow/cancel/产品审批",
      data:"flow_id"
    }
  },
  删除跟团游:{
    directlySubmit:true,
    confirm:'确认删除吗？',
    submit:{
      url:"/api/ProductStore/PackageTour/destroy",
      data:"main_pd_id"
    }
  },

  跟团游开团:{
    title: "跟团游开团",
    path: "/productStore/packageTour/addGroup",
    read: { url: "/api/ProductStore/PackageTour/read_for_add_group", data: { main_pd_id: 'main_pd_id' } },
    submit: { url: "/api/Group/PackageTourGroup/submit",data:{"main_pd_id":"main_pd_id","跟团游开团团期详情":"跟团游开团团期详情"} },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  }
};

export default config;
