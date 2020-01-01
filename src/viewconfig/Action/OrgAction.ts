import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
  新增权限: {
    title: "新增权限",
    path: "/org/auth/add",
    read: { url: "/api/org/Auth/read_new" },
    submit: { url: "/api/org/Auth/submit", data: "auth" },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  },
  编辑权限: {
    title: "编辑权限",
    path: "/org/auth/edit",
    read: { url: "/api/org/Auth/read_modify", data: { id: "id" } },
    submit: { url: "/api/org/Auth/submit", data: "auth" },
    btns: {
      关闭: { text: "关闭" },
      提交: { text: "提交" }
    }
  },
  // 公司
  启停公司: {
    directlySubmit: true,
    submit: {
      url: "/api/org/Company/toggle/state",
      data: { id: "id", state: "state" }
    }
  },
  // 员工
  重置员工账号密码:{
    directlySubmit: true,
    confirm:'确认重置员工账号密码吗?',
    submit: {
      url: "/api/org/Employee/reset_password",
    }
  },
  启停员工: {
    directlySubmit: true,
    submit: {
      url: "/api/org/Employee/toggle/state",
      data: { id: "id", state: "state" }
    }
  },

  // 公告
  新增公告:{
      title:"新增公告",
      path:"/org/announce/add",
      submit:{url:"/api/org/Announce/submit"},
      btns: {
        关闭: { text: "关闭" },
        提交: { text: "提交" }
      }
  },
  
  修改公告:{
      title:'修改公告',
      path:"/org/announce/edit",
      read:{url:"/api/org/Announce/read_edit",data:'id'},
      submit:{url:"/api/org/Announce/submit"},
      btns: {
        关闭: { text: "关闭" },
        提交: { text: "提交" }
      }
  },

  删除公告:{
    directlySubmit: true,
    confirm:'确认删除公告吗?',
    submit: {
      url: "/api/org/Announce/destroy",
      data: "id"
    }
  },

  提交公告:{
      directlySubmit:true,
      submit:{
          url: "/api/comm/Flow/submit_by_post/公告审批",
          data:"id"
      }
  },

  查看公告:{
    title: '查看公告',
    path:"/org/announce/see",
    read:{url:"/api/org/Announce/read_edit",data:'id'},
    btns:{
        关闭: {text:'关闭' }
    }
  },

  公告审批:{
      title:'公告审批',
      path:"/org/announce/approve",
      read:{url:"/api/org/Announce/read_approve",data:'id'},
      submit:{url:"/api/comm/Flow/approve_by_post/公告审批",data:{flow_id:'flow_id',opinion:'opinion','comment':'comment'}},
      btns:{
          关闭: {text:'关闭' }
      }
  },

  撤回公告:{
    directlySubmit:true,
    confirm:'确认撤回公告吗?',
    submit:{
        url: "/api/comm/Flow/cancel/公告审批",
        data:{'id':'id','flow_id':'flow_id'}
    }
  },

  发布公告:{
      directlySubmit:true,
      submit:{
        url: "/api/org/Announce/edit_publish",
        data:'id'
    }
  },

  审批管理员头像:{
    title:'头像审核',
    path:"/org/photo/approve",
    read:{url:"/api/org/Employee/read_approve",data:'id'},
    submit:{url:"/api/comm/Flow/approve_by_post/管理员头像审批",data:{flow_id:'flow_id',opinion:'opinion','comment':'comment'}},
    btns:{
        关闭: {text:'关闭' }
    }
  }

};

export default config;
