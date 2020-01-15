import { ModConfigItem } from '@/viewconfig/ModConfig';

const config: ModConfigItem = {
    '提报供应商管理': {
        read: { url: "/SupplierManagement/ErpCompany/read" },
        title: "提报处理",
        textSearch: {
            full_name: { text: '公司全称' }
        },
        dropDownSearch: {
            city_id: { text: '所在城市', type: 'City' }
        },
        headerButtons: {

        },
        rowButtons: {
            处理吸纳供应商: { text: '处理', show: { flow: [0, 1, 3] } },
            完善吸纳供应商: { text: '完善', show: { ruku_state: [3], flow: [0, 1, 3] } },
            提交吸纳审批: { text: '提交', show: { ruku_state: [3], flow: [1, 3] } },
            撤回吸纳审批: { text: '撤回', show: { ruku_state: [3], flow: [2] } },
        }
    },

    '吸纳供应商管理': {
        read: { url: "/SupplierManagement/ErpCompany/read" },
        title: "吸纳审核",
        textSearch: {
            full_name: { text: '公司全称' }
        },
        dropDownSearch: {
            city_id: { text: '所在城市', type: 'City' }
        },
        headerButtons: {

        },
        rowButtons: {
            审批吸纳供应商: { text: '通过', show: { flow: [2] } },
        }
    },

    '供应商公司管理': {
        read: { url: "/SupplierManagement/Company/read" },
        title: "公司管理",
        textSearch: {
            full_name: { text: '公司全称' }
        },
        dropDownSearch: {
            city_id: { text: '所在城市', type: 'City' },
            company_id: { text: '创建公司', type: 'Company' },
            department_id: { text: '创建部门', type: 'Department', cascade: 'company_id' },
            employee_id: { text: '创建人', type: 'Employee', cascade: 'department_id' }
        },
        headerButtons: {
            新增供应商公司: { text: '新增' },

        },
        rowButtons: {
            修改供应商公司: { text: '修改', show: { flow: [0, 1, 3], type: [1] } },
            删除供应商公司: { text: '删除', show: { flow: [0, 1, 3], type: [1] } },
            提交供应商公司: { text: '提交', show: { flow: [0, 1, 3], type: [1] } },
            撤回供应商公司: { text: '撤回', show: { flow: [2], type: [1] } },
            审批供应商公司: { text: '审批', show: { flow: [2], type: [1] } },
            维护供应商公司: { text: '维护', show: { flow: [4] } },
        }
    },

    '供应商部门管理': {
        read: { url: "/SupplierManagement/Department/read" },
        title: "部门管理",
        textSearch: {
            supplier_full_name: { text: '商家公司名称' },
            name: { text: '商家部门名称' }
        },
        dropDownSearch: {
            city_id: { text: '所在城市', type: 'City' },
            supplier_id: { text: '商家公司', type: 'Supplier' },
            company_id: { text: '创建公司', type: 'Company' },
            department_id: { text: '创建部门', type: 'Department', cascade: 'company_id' },
            employee_id: { text: '创建人', type: 'Employee', cascade: 'department_id' },
            state: { text: '部门状态', type: 'State' }
        },
        list: {
            supplier_id: { text: "供应商编号", width: 200 },
            city_id: { text: "所在城市",type:'City', width: 300 },
            supplier_full_name: { text: "商家公司名称", width: 300 },
            brand:{text:"品牌名称",width:300},
            name:{text:"商家部门名称",width:300},
            leader_names:{text:"部门领导",width:300},
            employee_nums:{ text: "旗下员工", width: 200 },
            state: { text: "部门状态", type: "State" }
        },
        headerButtons: {
            新增供应商部门: { text: '新增' },

        },
        rowButtons: {
            修改供应商部门: { text: '修改' },
            启停供应商部门: { text: '启停' },
            设置供应商部门领导: { text: '领导' }
        }
    },

    '供应商账号管理': {
        read: { url: "/SupplierManagement/Sales/read" },
        title: "账号管理",
        textSearch: {
            supplier_full_name: { text: '商家公司名称' },
            supplier_department_name: { text: '商家部门名称' },
            name: { text: '员工姓名' },
            mobile: { text: '手机号' }
        },
        dropDownSearch: {
            city_id: { text: '所在城市', type: 'City' },
            supplier_id: { text: '商家公司', type: 'Supplier' },
            supplier_department_id: { text: '商家部门', type: 'SupplierDepartment', cascade: 'supplier_id' },
            company_id: { text: '创建公司', type: 'Company' },
            department_id: { text: '创建部门', type: 'Department', cascade: 'company_id' },
            employee_id: { text: '创建人', type: 'Employee', cascade: 'department_id' },
            state: { text: '账号状态', type: 'State' }
        },
        headerButtons: {
            新增供应商账号: { text: '新增' },

        },
        rowButtons: {
            修改供应商账号: { text: '修改' },
            重置供应商账号密码: { text: '重置密码' },
            启停供应商账号: { text: '启停' },
            设置供应商权限: { text: '设置' }
        }
    },

    '供应商权限管理': {
        read: { url: "/org/Auth/read" },
        title: "权限管理",
        textSearch: {
            name: { text: '名称' },
            scope: { text: '范围' }
        },
        dropDownSearch: {
        },
        headerButtons: {
            新增供应商权限: { text: '新增' },
        },
        rowButtons: {
            编辑供应商权限: { text: '修改' },
            复制供应商权限: { text: '复制' },
            启停供应商权限: { text: '启停' },
            删除供应商权限: { text: '删除' }
        }
    },

    '供应商绑定管理': {
        read: { url: "/SupplierManagement/Company/bind_read" },
        title: "绑定管理",
        textSearch: {
            retailer_name: { text: 'ERP客户' },
            bind_dep_name: { text: '绑定部门' }
        },
        dropDownSearch: {
            supp_id:{ text:'供应商',type:'AllSupplier' }
        },
        list: {
            supp_id:{text:'供应商',type:'AllSupplier',width:200},
            retailer_name:{text:'ERP客户',width:200},
            bind_dep_name:{text:'绑定部门',width:200},
            bind_state:{text:'绑定状态',type:'BindState'}
        },
        headerButtons: {
        },
        rowButtons: {
            绑定部门: { text: '绑定',show:{bind_state:[1]} },
        }
    },

    '供应商头像审批':{
        read: { url: "/SupplierManagement/Sales/read_photo" },
        title: "头像审批",
        textSearch:{

        },
        dropDownSearch: {
            flow:{ text:'审批状态',type:'Flow'}
        },
        rowButtons: {
            审批供应商头像: {text: '审批', show:{flow:[2]}}
        }
    }
}

export default config;