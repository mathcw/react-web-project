import { ActionConfigItem } from "@/viewconfig/ActionConfig";

const config: ActionConfigItem = {
    跟团游审批: {
        title: '跟团游审批',
        path: '/productManage/productCheck/GroupTourCheck',
        read: { url: "/ProductStore/Product/read_edit", data: {id:'id'} },
        submit: { url: "/comm/Flow/approve_by_post/产品审批", data: { flow_id: 'flow_id', opinion: 'opinion', 'comment': 'comment' } },
        btns: {
            关闭: { text: '关闭' }
        }
    },
    跟团游维护: {
        title: '跟团游维护',
        path: '/productManage/productMaintain/GroupTourMaintain',
        read: { url: "/ProductStore/PackageTour/read_edit", data: {main_pd_id:'main_pd_id'} },
        submit: { url: "/ProductStore/PackageTour/submit_maintain" },
        btns: {
            关闭: { text: "关闭" },
            提交: { text: "保存" }
        }
    }
};

export default config;
