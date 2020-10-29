//应对 弹窗类多处出现的action
//as 留位在订单占位出现 同时需要在审批任务中出现
import React from 'react';
import { Modal } from 'antd';
import { submit } from './req';
import Zw from '@/pages/sale/placeholder/components/Zw';

const lw = (reload:()=>void)=>(ref:any)=>{
    const modalRef = Modal.info({});

    const onOk = (data: any) => {
        submit('/Sale/Order/zw',{id:ref.id,end_date:data.end_date,hour:data.hour,timer_end_date:data.timer_end_date}).then(
            (r:any)=>{
                modalRef.destroy();
                reload();
            }
        )
    };
    const onCancel = () => {
        modalRef.destroy();
    };
    modalRef.update({
        title: "留位",
        icon: null,
        width:520,
        className: 'modal-confirm-body',
        content: <Zw info={ref} onOk={onOk} onCancel={onCancel}/>,
        okButtonProps: { className: "hide" },
        cancelButtonProps: { className: "hide" }
    });
}

export default  {
    '留位':lw
};