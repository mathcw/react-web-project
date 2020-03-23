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

import { getRowBtnArray, getBtnClickEvent } from '@/utils/utils';

import AppConst from '@/utils/AppConst';
import GroupTour from './components/GroupTour';
import styles from './list.less';

const approveCheck = (reload: () => void) => (ref: any) => {
    if(ref.change_flow == 2){
        const fn = getBtnClickEvent('报名确认变更');
        fn(ref,reload,reload);
    }
    if(ref.jd_change_flow == 2){
        const fn = getBtnClickEvent('接单确认变更');
        fn(ref,reload,reload);
    }
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
        '确认变更':approveCheck(load)
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