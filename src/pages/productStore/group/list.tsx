import React, { useEffect } from 'react';
import { IModPageProps, IModBtn } from '@/viewconfig/ModConfig';
import { useListPage, useListPageBtn, useListPageSearch } from '@/utils/ListPageHooks';
import PageHeaderWrapper,{ Extra, Content } from '@/components/PageHeaderWrapper';
import { getRowBtnArray } from '@/utils/utils';
import AppConst from '@/utils/AppConst';

import GroupTour from './components/GroupTour';

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
    const { authority } = route;
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
    } = useListPage(authority);

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
    };

    const { headerBtns, rowBtns } = useListPageBtn(authority, actionMap);
    const { dropDownSearch, textSearch } = useListPageSearch(authority);

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