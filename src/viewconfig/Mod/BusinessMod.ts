import { ModConfigItem } from '@/viewconfig/ModConfig';

const config: ModConfigItem = {
    '一级导航': {
        read: { url: "/business/PrimaryNav/read" },
        title: "一级导航",
        textSearch: {
            name: { text: '一级导航' },
        },
        dropDownSearch: {
            pd_direction: { text: "出游方向", type: "PdDirection" } 
        },
        headerButtons: {
            新增跟团游一级导航: { text: "新增" }
        },
        rowButtons: {
            修改跟团游一级导航: { text: "修改" }
        },
        list: {
            pd_direction: { text: "出游方向",type: "PdDirection"},
            name: { text: "一级导航" },
            secondary_nums: { text: "旗下二级"}
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '二级导航': {
        read: { url: "/business/SecondaryNav/read" },
        title: "二级导航",
        textSearch: {
            name: { text: '二级导航' },
        },
        dropDownSearch: {
            pd_direction: { text: "出游方向", type: "PdDirection" },
            primary_nav: { text: "一级导航", type: "PrimaryNav",cascade:"pd_direction" },
        },
        headerButtons: {
            新增跟团游二级导航: { text: "新增" }
        },
        rowButtons: {
            修改跟团游二级导航: { text: "修改" }
        },
        list: {
            pd_direction: { text: "出游方向",type: "PdDirection"},
            primary_nav: { text: "一级导航",type:"PrimaryNav" },
            name: { text: "二级导航"},
            state: { text: "启停状态",type:"State"},
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '邮轮公司': {
        read: { url: "/business/CruiseCompany/read" },
        title: "邮轮公司",
        textSearch: {
            name: { text: '邮轮公司' },
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增邮轮公司: { text: "新增" }
        },
        rowButtons: {
            修改邮轮公司: { text: "修改" },
            邮轮公司日志: { text: "日志" },
        },
        list: {
            name: { text: "邮轮公司"},
            ship_nums: { text: "名下船舶"},
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '船舶名称': {
        read: { url: "/business/CruiseShip/read" },
        title: "船舶名称",
        textSearch: {
            cruise_company_name: { text: '邮轮公司' },
            name: { text: '船舶名称' },
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增船舶: { text: "新增" }
        },
        rowButtons: {
            修改船舶: { text: "修改" },
            启停船舶: { text: "启停" },
            船舶日志: { text: "日志" },
        },
        list: {
            cruise_company_id: { text: "邮轮公司",type: "CruiseCompany"},
            name: { text: "船舶名称"},
            state: { text: "启停状态",type:"State"},
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '邮轮航线': {
        read: { url: "/business/CruiseLine/read" },
        title: "邮轮航线",
        textSearch: {
            name: { text: '邮轮航线' },
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增邮轮航线: { text: "新增" }
        },
        rowButtons: {
            修改邮轮航线: { text: "修改" },
            启停邮轮航线: { text: "启停" },
            邮轮航线日志: { text: "日志" },
        },
        list: {
            name: { text: "邮轮航线"},
            state: { text: "启停状态",type:"State"},
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '特色标签': {
        read: { url: "/business/ProductTheme/read" },
        title: "特色标签",
        textSearch: {
            name: { text: '标签名称' },
        },
        dropDownSearch: {
            pd_type: { text: "产品类型", type: "PdType" } 
        },
        headerButtons: {
            新增特色标签: { text: "新增" }
        },
        rowButtons: {
            修改特色标签: { text: "修改" }
        },
        list: {
            pd_type: { text: "产品类型",type: "PdType", width: 200 },
            name: { text: "标签名称", width: 300 },
            account_id: { text: "创建人",type: "Account", width: 200 },
            state: { text: "启停状态", type: "State" }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '数据字典': {
        read: { url: "/business/CommDct/read" },
        title: "数据字典",
        textSearch: {
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增数据字典: { text: "新增" }
        },
        rowButtons: {
            修改数据字典: { text: "修改" },
            启停数据字典: { text: "启停" }
        },
        list: {
            type_id: { text: "数据类型",type: "Dict", width: 200 },
            name: { text: "名称", width: 300 },
            state: { text: "启停状态", type: "State" }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '城市设置': {
        read: { url: "/business/City/read" },
        title: "城市设置",
        textSearch: {
            name: { text: '名称' },
        },
        dropDownSearch: {
            country: { text: "国家", type: "Country" } 
        },
        headerButtons: {
            新增城市: { text: "新增" }
        },
        rowButtons: {
            修改城市: { text: "修改" },
            删除城市: { text: "删除" },
            启停城市: { text: "启停" }
        },
        list: {
            country: { text: "国家",type: "Country", width: 200 },
            name: { text: "名称", width: 300 },
            state: { text: "启停状态", type: "State" }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '协议设置': {
        read: { url: "/business/SuppDct/read" },
        title: "协议设置",
        textSearch: {
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增协议: { text: "新增" }
        },
        rowButtons: {
            启停协议: { text: "启停" }
        },
        list: {
            dct_name: { text: "优惠协议"},
            state: { text: "启停状态", type: "State" }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
}

export default config;