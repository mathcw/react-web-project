import {ModConfigItem} from '@/viewconfig/ModConfig';

const config:ModConfigItem = {
    权限管理: {
        read: { url: '/api/org/Auth/read' },
        title: '权限设置',
        textSearch: {
            name: { text: '权限名称' },
            members: { text: '角色成员' },
        },
        dropDownSearch: {
            state: { text: '启停状态', type: 'State' },
        },
        headerButtons: {
            新增权限: { text: '新增' }
        },
        rowButtons: {
            编辑权限: { text: '编辑' },
        },
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        pageSize: 100,
    }
}

export default config;