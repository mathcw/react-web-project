import { ModConfigItem } from '@/viewconfig/ModConfig';

const config: ModConfigItem = {
    '对账管理': {
        read: { url: "/Sale/Order/read" },
        title: "应收对账",
        textSearch: {
            retailer_order_id: { text: '订单号' },
            pd_name: { text: '产品名称' }
        },
        dropDownSearch: {
            sup_id: { text: '确认公司', type: 'Supplier' },
            supplier_department_id: { text: '确认部门', type: 'SupplierDepartment', cascade: 'sup_id' },
            saler_id: { text: '确认人', type: 'SupplierSales', cascade: 'supplier_department_id' },
        },
        headerButtons: {
        },
        rowButtons: {
            订单对账: { text: '对账', show: { flow: [0, 1, 3], check_flow: [0, 1, 3, 4] } },
            提交对账: { text: '提交', show: { flow: [0, 1, 3], check_flow: [1, 3] } },
            撤回对账: { text: '撤回', show: { flow: [0, 1, 3], check_flow: [2] } }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
    '应转对账管理': {
        read: { url: "/Sale/Order/read" },
        title: "内转对账",
        textSearch: {
            retailer_order_id: { text: '订单号' },
            pd_name: { text: '产品名称' }
        },
        dropDownSearch: {
            sup_id: { text: '确认公司', type: 'Supplier' },
            supplier_department_id: { text: '确认部门', type: 'SupplierDepartment', cascade: 'sup_id' },
            saler_id: { text: '确认人', type: 'SupplierSales', cascade: 'supplier_department_id' },
        },
        headerButtons: {
        },
        rowButtons: {
            订单对账: { text: '对账', show: { flow: [0, 1, 3], check_flow: [0, 1, 3, 4] } },
            提交对账: { text: '提交', show: { flow: [0, 1, 3], check_flow: [1, 3] } },
            撤回对账: { text: '撤回', show: { flow: [0, 1, 3], check_flow: [2] } }
        },
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        pageSize: 100
    },
}

export default config;