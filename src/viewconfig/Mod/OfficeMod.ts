import {ModConfigItem} from '@/viewconfig/ModConfig';

const config:ModConfigItem = {
    我的消息: {
        read: { url : '/notice/MsgMain/read'},
        title: '我的消息',
        textSearch: {
        },
        dropDownSearch: {
        },
        headerButtons:{
        },
        rowButtons:{
        },
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        pageSize: 100,
    },
    公告通知: {
        read: { url : '/notice/Announcement/read'},
        title: '公告管理',
        textSearch: {
        },
        dropDownSearch: {
        },
        headerButtons:{
        },
        rowButtons:{
        },
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        pageSize: 100,
    },
    审批任务: {
        read: { url: '/notice/MsgFlow/read' },
        title: '审批任务',
        textSearch: {
        },
        dropDownSearch: {
        },
        headerButtons:{
        },
        rowButtons:{
            快捷审批: { text:'审批'}
        },
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        pageSize: 100,
    }
}

export default config;