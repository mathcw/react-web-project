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

interface ProductItemProps {
    data: {
        type: string;
        id: string;
        list_pic: string;
        flow: string;
        [key: string]: any;
    },
    btns?: IModBtn[],
    load: () => void
}

const ProductItem: React.FC<ProductItemProps> = ({ data, btns = [], load }) => {
    if (data.type == AppConst.PRODUCT_PACKAGETOUR) {
        return <GroupTour data={data} btns={btns} load={load} />
    }

    return null
}

const approveProduct = (reload: () => void) => (ref: any) => {
    switch(ref.type){
        case AppConst.PRODUCT_PACKAGETOUR:
            getBtnClickEvent('跟团游维护')(ref)
            break;
    }
};

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
        '维护产品': approveProduct(load)
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
                    <ProductItem
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