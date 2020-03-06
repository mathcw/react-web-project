interface ISYSCONFIG{
    APP_NAME: string;
    HOST:string;
    user:any;
    filters:any;
    sid: string;
}

export const sys:ISYSCONFIG = {
    APP_NAME: 'TY_B2B',
    HOST:'/b2b-back',
    user:{},
    filters: {},
    sid:'',
};

export const sysMenu:{
    [key:string]:string[]
}= {
    "办公中心":["通讯录","我的消息","公告通知","审批任务","供应商组织架构"],
    "行政管理":["公司管理","部门管理","员工管理","权限管理","公告管理","管理员头像审批"],
    "供应商管理":["提报供应商管理","吸纳供应商管理","供应商公司管理","供应商部门管理","供应商账号管理","供应商权限管理"
                ,"供应商绑定管理","供应商头像审批"],
    "产品管理":["产品审核","产品维护"],
    "业务配置":["跟团游导航","邮轮游导航","单签证导航","特色标签","数据字典","国家设置","城市设置","协议设置"],
    "系统设置":["业务流程","api管理","系统参数设置"],
    "产品中心":["产品管理","班期管理"],
    "订单管理":["占位管理","实报管理","订单变更"],
    "对账管理":["对账管理","应转对账管理"],
    "数据管理":["分销监控","竞品分析","销售机会"]
};

export const subMenu:{
    [key:string]:string[]
} = {
    "跟团游导航":[
        "一级导航",
        "二级导航"
    ]
}

export function sysInit() {
    sys.sid = localStorage[`${sys.APP_NAME}_sid`] || '';
}

export function sysUpdate(update:ISYSCONFIG){
    sys.user = update.user;
    sys.sid = update.sid;
}

export function log(...args:Array<any>) {
    // eslint-disable-next-line no-console
    console.log(...args);
}