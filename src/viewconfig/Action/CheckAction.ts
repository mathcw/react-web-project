import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    提交对账:{
        directlySubmit: true,
        confirm:'确认提交对账吗?',
        submit:{
            url:"/Sale/Order/submit_dz",
            data:{id:"id"}
        }
    },
    撤回对账:{
        directlySubmit: true,
        confirm:'确定撤回对账吗?',
        submit:{
            url:"/Sale/Order/cancel_dz",
            data:{id:"id"}
        }
    },
    提交应转对账:{
        directlySubmit: true,
        confirm:'确认提交对账吗?',
        submit:{
            url:"/Sale/Order/submit_dz",
            data:{id:"id"}
        }
    },
    撤回应转对账:{
        directlySubmit: true,
        confirm:'确定撤回对账吗?',
        submit:{
            url:"/Sale/Order/cancel_dz",
            data:{id:"id"}
        }
    },
};

export default config;
