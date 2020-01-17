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
    }
};

export default config;
