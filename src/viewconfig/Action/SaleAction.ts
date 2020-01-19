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
    }
};

export default config;
