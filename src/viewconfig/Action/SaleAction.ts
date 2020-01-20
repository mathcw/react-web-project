import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    占位驳回:{
        directlySubmit: true,
        confirm:'确认驳回占位订单吗?',
        submit:{
            url:"/Sale/Order/reject_zw",
            data:{id:"id"}
        }
    },
    清位:{
        directlySubmit: true,
        confirm:'本操作将会导致该订单被打回未提交状态，您确认要继续吗?',
        submit:{
            url:"/Sale/Order/qw",
            data:{id:"id"}
        }
    },
    审批订单:{
        title: "审批",
        path:"/sale/order/approve",
        read: { url: "/Sale/Order/read_edit", data: { id: 'id' } },
        submit: { url: "/comm/Flow/approve_by_post/订单实报审批",data:{"flow_id":"flow_id","opinion":"opinion","comment":"comment"} },
        btns: {
          关闭: { text: "关闭" },
        }
    },
    报名确认变更:{
        title: "变更审批",
        path:"/sale/orderChange/check",
        read: { url: "/Sale/Order/read_change_approve", data: { id: 'id' } },
        submit: { url: "/comm/Flow/approve_by_post/三方订单-报名人变更应转审批",data:{"flow_id":"flow_id","opinion":"opinion","comment":"comment"} },
        btns: {
          关闭: { text: "关闭" },
        }
    },
    接单确认变更:{
        title: "变更审批",
        path:"/sale/orderChange/jdCheck",
        read: { url: "/Sale/Order/read_jd_change_approve", data: { id: 'id' } },
        submit: { url: "/comm/Flow/approve_by_post/三方订单-接单人变更应转审批",data:{"flow_id":"flow_id","opinion":"opinion","comment":"comment"} },
        btns: {
          关闭: { text: "关闭" },
        }
    },
};

export default config;
