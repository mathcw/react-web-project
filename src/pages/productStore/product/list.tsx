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
import Cruise from './components/Cruise';
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

const editProduct = (reload: () => void) => (ref: any) => {
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('修改跟团游');
        fn(ref,reload,reload);
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
};

const copyProduct = (reload:()=>void)=> (ref:any) => {
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('复制跟团游');
        fn(ref,reload,reload);
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
}

const submitProduct = (reload:()=>void) => (ref:any) =>{
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('提交跟团游');
        fn(ref,reload,reload)
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
}

const deleteProrduct = (reload:()=>void) => (ref:any) => {
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('删除跟团游');
        fn(ref,reload,reload)
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
}

const cancelProduct = (reload:()=>void) => (ref:any) => {
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('取消跟团游');
        fn(ref,reload,reload)
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
}

const addGroup = (reload:()=>void) => (ref:any) => {
    if(ref.type === AppConst.PRODUCT_PACKAGETOUR){
        const fn = getBtnClickEvent('跟团游开团');
        fn(ref,reload,reload)
    }
    if(ref.type === AppConst.PRODUCT_CRUISE_TRAVEL){

    }
}

const ProductItem: React.FC<ProductItemProps> = ({ data, btns = [], load }) => {
    if (data.type == AppConst.PRODUCT_PACKAGETOUR) {
        return <GroupTour data={data} btns={btns} load={load} />
    }
    if (data.type == AppConst.PRODUCT_CRUISE_TRAVEL) {
        return <Cruise data={data} btns={btns} load={load} />;
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
        '修改产品':editProduct(load),
        '复制产品':copyProduct(load),
        '提交产品':submitProduct(load),
        '删除产品':deleteProrduct(load),
        '取消产品':cancelProduct(load),
        '产品开团':addGroup(load)
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