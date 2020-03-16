import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    新增供应商公司:{
        title: "新增供应商",
        path:"/supplierManagement/company/add",
        submit: { url: "/SupplierManagement/Company/submit"},
        btns: {
          关闭: { text: "关闭" },
          提交: { text: "提交" }
        }
    },

    修改供应商公司:{
        title:"修改供应商",
        path:"/supplierManagement/company/modify",
        read: { url: "/SupplierManagement/Company/read_supp", data: { id: 'id' } },
        submit: { url: "/SupplierManagement/Company/submit"},
        btns: {
          关闭: { text: "关闭" },
          提交: { text: "提交" }
        }
    },
    提交供应商公司: { 
        directlySubmit:true,
        submit:{
            url: "/comm/Flow/submit_by_post/供应商审批",
            data:{id:"id"}
        }
    },
    撤回供应商公司: { 
        directlySubmit:true,
        confirm:'确认撤回吗?',
        submit:{
            url: "/comm/Flow/cancel/供应商审批",
            data:{'id':'id','flow_id':'flow_id'}
        }
    },
    审批供应商公司: { 
        title:"审核供应商",
        path:'/SupplierManagement/Company/approve',
        read: {url:'/SupplierManagement/Company/read_approve',data:{id:'id'}},
        submit: {url:'/comm/Flow/approve_by_post/供应商审批',data:{flow_id:'flow_id',opinion:'opinion',comment:'comment'}},
        btns:{
            关闭:{'text':"关闭"},
            提交:{'text':"保存"},
        }
    },

    维护供应商公司:{
        title:"维护供应商",
        path:"/supplierManagement/company/maintenance",
        read: { url: "/SupplierManagement/Company/read_supp", data: { id: 'id' } },
        submit: { url: "/SupplierManagement/Company/weihu"},
        btns: {
          关闭: { text: "关闭" },
          提交: { text: "提交" }
        }
    },

    完善吸纳供应商:{
        title:"完善供应商",
        path:"/supplierManagement/company/perfect",
        read:{url:"/SupplierManagement/ErpCompany/read_supp",data:{id:'id'}},
        submit: {url:"/SupplierManagement/ErpCompany/submit"},
        btns: {
          关闭: {text:"关闭"},
          提交: {text:"提交"}
        }
    },

    提交吸纳审批: {
        directlySubmit:true,
        submit:{
            url: "/comm/Flow/submit_by_post/吸纳供应商审批",
            data:{id:"id"}
        }
    },

    撤回吸纳审批: {
        directlySubmit:true,
        confirm:'确认撤回吗?',
        submit:{
            url: "/comm/Flow/cancel/吸纳供应商审批",
            data:{'id':'id','flow_id':'flow_id'}
        }
    },

    审批吸纳供应商: {
        title:"审核吸纳",
        path:'/SupplierManagement/XnCompany/approve',
        read: {url:'/SupplierManagement/ErpCompany/read_approve',data:{id:'id'}},
        submit: {url:'/comm/Flow/approve_by_post/吸纳供应商审批',data:{flow_id:'flow_id',opinion:'opinion',comment:'comment'}},
        btns:{
            关闭:{'text':"关闭"},
            提交:{'text':"保存"},
        }
    },

    启停供应商部门: {
        directlySubmit: true,
        submit: {
          url: "/SupplierManagement/Department/toggle/state",
          data: { id: "id", state:"state"}
        }
    },

    重置供应商账号密码: {
        directlySubmit: true,
        confirm:'确认重置密码吗?',
        submit: {
            url: "/SupplierManagement/Sales/reset_password",
        }
    },
    
    启停供应商账号: { 
        directlySubmit: true,
        submit: {
          url: "/SupplierOrg/Sales/toggle/state",
          data: { id: "id", state:"state"}
        } 
    },

    新增供应商权限: {
        title: "新增供应商权限",
        path: "/SupplierManagement/auth/add",
        read: { url: "/org/Auth/read_new_supplier_auth" ,data:{id:"id"}},
        submit: { url: "/org/Auth/submit", data: "auth" },
        btns: {
            关闭: { text: "关闭" },
            提交: { text: "提交" }
        }
    },

    编辑供应商权限: {
        title: "新增供应商权限",
        path: "/SupplierManagement/auth/edit",
        read: { url: "/org/Auth/read_modify_supplier_auth" ,data:{id:"id"}},
        submit: { url: "/org/Auth/submit", data: "auth" },
        btns: {
            关闭: { text: "关闭" },
            提交: { text: "提交" }
        }
    },

    复制供应商权限: {
        title: "复制供应商权限",
        path: "/SupplierManagement/auth/copy",
        read: { url: "/org/Auth/read_modify_supplier_auth" ,data:{id:"id"}},
        submit: { url: "/org/Auth/copy_submit", data: "auth" },
        btns: {
            关闭: { text: "关闭" },
            提交: { text: "提交" }
        }
    },
    启停供应商权限: { 
        directlySubmit: true,
        submit: {
          url: "/org/Auth/toggle/state",
          data: { id: "id", state:"state"}
        } 
    },
    删除供应商权限:{
        directlySubmit:true,
        confirm:'确认删除吗？',
        submit:{
            url:"/org/Auth/destroy",
            data:{id:"id"}
        }
    },

    审批供应商头像:{
        title:"审批供应商头像",
        path:'/SupplierManagement/profilePhoto/approve',
        read: {url:'/SupplierManagement/Sales/read_approve',data:{id:'id'}},
        submit: {url:'/comm/Flow/approve_by_post/供应商头像审批',data:{flow_id:'flow_id',opinion:'opinion',comment:'comment'}},
        btns:{
            关闭:{'text':"关闭"},
            提交:{'text':"保存"},
        }
    }
};

export default config;