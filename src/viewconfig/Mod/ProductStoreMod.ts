import { ModConfigItem } from '@/viewconfig/ModConfig';

const config: ModConfigItem = {
    '产品管理': {
        read: { url: "/api/ProductStore/Product/read" },
        title: "产品管理",
        textSearch: {
            pd_name: { text: '产品名称' },
            id: { text: '产品编号' }
        },
        dropDownSearch: {
            type: { text: '产品类型', type: 'PdType' },
            pd_direction: { text: '出游方向', type: 'PdDirection' },
            primary_nav: { text: '一级导航', type: 'PrimaryNav', cascade: 'pd_direction' },
            secondary_nav: { text: '二级导航', type: 'SecondaryNav', cascade: 'primary_nav' },
            sup_id: { text: '发布公司', type: 'Supplier' },
            supplier_department_id: { text: '发布部门', type: 'SupplierDepartment', cascade: 'sup_id' },
            saler_id: { text: '发布人', type: 'SupplierSales', cascade: 'supplier_department_id' }
        },
        headerButtons: {
            新增跟团游: { text: '新增团队游' },
            新增邮轮: { text: '新增邮轮' },
        },
        rowButtons: {
            修改产品: { text: '修改', show: { flow: [1, 3] } },
            提交产品: { text: '提交', show: { flow: [1, 3] } },
            复制产品: { text: '复制' },
            删除产品: { text: '删除', show: { flow: [1, 3] } },
            取消产品: { text: '取消', show: { flow: [2] } },
            产品开团: { text: '开团', show: { flow: [4] } }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '班期管理': {
        read: { url: "/api/Group/Group/read" },
        title: "班期管理",
        textSearch: {
            pd_name: { text: '产品名称' },
            gp_num: { text: '团号' },
            pd_id: { text: '产品编号' },
        },
        dropDownSearch: {
            sup_id: { text: '开团公司', type: 'Supplier' },
            supplier_department_id: { text: '开团部门', type: 'SupplierDepartment', cascade: 'sup_id' },
            saler_id: { text: '开团人', type: 'SupplierSales', cascade: 'supplier_department_id' },
            pd_type: { text: '产品类型', type: 'PdType' },
            pd_direction: { text: '出游方向', type: 'PdDirection' },
            primary_nav: { text: '一级导航', type: 'PrimaryNav', cascade: 'pd_direction' },
            secondary_nav: { text: '二级导航', type: 'SecondaryNav', cascade: 'primary_nav' }
        },
        headerButtons: {
        },
        rowButtons: {
            修改班期: { text: '修改', show: { shelf_state: [1] } },
            下架班期: { text: '下架', show: { shelf_state: [1] } }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },

}

export default config;