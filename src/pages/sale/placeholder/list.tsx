import React, { useEffect } from 'react';
import { IModPageProps, IModBtn } from '@/viewconfig/ModConfig';
import {
    useListPage,
    useListPageBtn,
    useListPageSearch
} from "@/utils/ListPageHooks";

import PageHeaderWrapper, {
    Extra,
    Content
} from "@/components/PageHeaderWrapper";

import { getRowBtnArray } from '@/utils/utils';

import AppConst from '@/utils/AppConst';
import GroupTour from './components/GroupTour';
import Zw from './components/Zw';
import { Modal } from 'antd';
import { submit, get } from '@/utils/req';
import styles from './list.less';

const sx = (reload:()=>void) =>(ref:any)=>{
    get('/Sale/Order/read_set_sx', { id: ref.id }).then((r:any)=>{
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
            title: "时限",
            icon: null,
            width:520,
            className: 'modal-confirm-body',
            content: <Zw info={r.data} onOk={onOk} onCancel={onCancel}/>,
            okButtonProps: { className: "hide" },
            cancelButtonProps: { className: "hide" }
        });
    })
}

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

interface OrderItemProps {
    data: {
        type: string;
        state:string;
        id:string;
        [key: string]: any;
    },
    btns?: IModBtn[],
    load: () => void
}

const OrderItem:React.FC<OrderItemProps> = ({data,btns = [],load})=>{
    if (data.type == AppConst.PRODUCT_PACKAGETOUR) {
        return <GroupTour data={data} btns={btns} load={load} />
    }

    return null
} 

const list: React.FC<IModPageProps> = ({ route }) => {
    const { viewConfig } = route;
    const {
        setCurrent,
        setPageSize,
        load,
        pageSize,
        current,
        pageSizeOptions,
        total,
        query,
        setQuery,
        data
    } = useListPage(viewConfig);

    useEffect(() => {
        load();
    }, [pageSize, current]);

    const pageNumChange = (page: number) => {
        setCurrent(page);
    };

    const pageSizeChange = (_Current: number, size: number) => {
        setPageSize(size);
    };

    const actionMap = {
        '留位':lw(load),
        '占位时限':sx(load)
    };

    const { headerBtns, rowBtns } = useListPageBtn(viewConfig, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(viewConfig);

    return (
        <PageHeaderWrapper
            extra={Extra(
                pageSize,
                pageSizeOptions,
                total,
                current,
                pageNumChange,
                pageSizeChange
            )}
            content={Content(
                query,
                setQuery,
                load,
                headerBtns,
                dropDownSearch,
                textSearch
            )}
        >
            <div className={styles.ScrollHight}>
                {data.map((item: any) => (
                    <OrderItem
                        data={item}
                        btns={getRowBtnArray(item, rowBtns)}
                        load={load}
                        key={item["id"]}
                    />
                ))}
            </div>
        </PageHeaderWrapper>
    )
};

export default list;