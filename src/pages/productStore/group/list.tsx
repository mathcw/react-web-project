import React, { useEffect } from 'react';
import { IModPageProps, IModBtn } from '@/viewconfig/ModConfig';
import { useListPage, useListPageBtn, useListPageSearch } from '@/utils/ListPageHooks';
import PageHeaderWrapper,{ Extra, Content } from '@/components/PageHeaderWrapper';
import { getRowBtnArray } from '@/utils/utils';
import AppConst from '@/utils/AppConst';

import GroupTour from './components/GroupTour'; 
import GroupTourEdit from './components/GroupTour/editModal';
import { Modal } from 'antd';
import { get, submit } from '@/utils/req';

const editPackageTourGroup = (reload:()=>void,ref:any)=>{
    get('/Group/PackageTourGroup/read_for_edit', { main_group_id: ref.main_group_id }).then((r) => {
        if(r.data){
            const modalRef  = Modal.info({});
            const onOk = (data:any) =>{
                submit('/Group/PackageTourGroup/edit',{...data,main_group_id:ref.main_group_id}).then(
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
                title: '修改团期',
                width:1000,
                content: (
                    <GroupTourEdit info={r.data} onOk={onOk} onCancel={onCancel}/>
                ),
                okButtonProps: { className: 'hide' },
                cancelButtonProps: { className: 'hide' },
            });
        }
    });
}

const editGroup = (reload:()=>void)=>(ref:any)=>{
    if(ref.type === AppConst.GROUP_PACKAGETOUR){
        //修改跟团游
        editPackageTourGroup(reload,ref)
    }
    if(ref.type === AppConst.GROUP_TRAFFIC){

    }
}

interface GroupItemProps{
    data: {
        type: string;
        [key: string]: any;
    },
    btns?: IModBtn[],
    orderbtns?:IModBtn[],
    load: () => void
}

const GroupItem: React.FC<GroupItemProps> = ({ data, btns = [],orderbtns=[], load }) => {
    if (data.type == AppConst.PRODUCT_PACKAGETOUR) {
        return <GroupTour data={data} btns={btns} orderbtns={orderbtns} load={load} />
    }

    return null
} 

const list:React.FC<IModPageProps> = ({route})=>{
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
        '修改班期':editGroup(load)
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
                <GroupItem
                    data={item}
                    btns={getRowBtnArray(item, rowBtns)}
                    orderbtns={[]}
                    load={load}
                    key={item["id"]}
                />
            ))}
        </PageHeaderWrapper>)
    
}

export default list;