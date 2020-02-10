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
import { submit, get } from '@/utils/req';
import GroupTour from './components/GroupTour';
import CheckModal from './components/CheckModal';
import NzCheckModal from './components/CheckModal/nz';
import { Modal } from 'antd';


const check =  (reload: () => void) => (ref: any) => {
    get('/Sale/Order/read_for_dz', { id: ref.id }).then((r) => {
        if(r.data){
            const modalRef  = Modal.info({});
            const onOk = (data:any) =>{
                submit('/Sale/Order/dz',{...data,id:ref.id}).then(
                    (r)=>{
                        modalRef.destroy();
                        reload();
                    }
                )
            }

            const onSubmit = (data:any)=>{
                submit('/Sale/Order/dz',{...data,approve:1,id:ref.id}).then(
                    (r)=>{
                        modalRef.destroy();
                        reload();
                    }
                )
            }
        
            const onCancel = () =>{
                modalRef.destroy();
            }
            modalRef.update({
                title: '订单对账',
                width:1000,
                content: (
                    <CheckModal info={r.data} onOk={onOk} onCancel={onCancel} onSubmit={onSubmit}/>
                ),
                okButtonProps: { className: 'hide' },
                cancelButtonProps: { className: 'hide' },
            });
        }
    });
}

const nzCheck = (reload:()=>void) =>(ref:any)=>{
    get('/Sale/Order/read_for_dz', { id: ref.id }).then((r) => {
        if(r.data){
            const modalRef  = Modal.info({});
            const onOk = (data:any) =>{
                submit('/Sale/Order/dz',{...data,id:ref.id}).then(
                    (r)=>{
                        modalRef.destroy();
                        reload();
                    }
                )
            }

            const onSubmit = (data:any)=>{
                submit('/Sale/Order/dz',{...data,approve:1,id:ref.id}).then(
                    (r)=>{
                        modalRef.destroy();
                        reload();
                    }
                )
            }
        
            const onCancel = () =>{
                modalRef.destroy();
            }
            modalRef.update({
                title: '订单对账',
                width:1000,
                content: (
                    <NzCheckModal info={r.data} onOk={onOk} onCancel={onCancel} onSubmit={onSubmit}/>
                ),
                okButtonProps: { className: 'hide' },
                cancelButtonProps: { className: 'hide' },
            });
        }
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
        '订单对账':check(load),
        '订单应转对账':nzCheck(load)
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
            {data.map((item: any) => (
                <OrderItem
                    data={item}
                    btns={getRowBtnArray(item, rowBtns)}
                    load={load}
                    key={item["id"]}
                />
            ))}
        </PageHeaderWrapper>
    )
};

export default list;